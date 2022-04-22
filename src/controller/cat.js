const catModel = require('../model/cat')
const userModel = require('../model/cat')
const { v4: uuid } = require('uuid')

// console.log(userModel)

const getNotFoundResponse = (res) => {
    res.writeHead(404)
    return {
        error: {
            message: "Not found",
            code: 404
        }
    }
}

const parseJsonBody = (request) => new Promise((resolve, reject) => {
    let rawJson = ''
    request
        .on('data', (chunk) => {
            rawJson += chunk
        })
        .on('end', () => {
            try {
                if (rawJson) {
                    const requestBody = JSON.parse(rawJson)
                    resolve(requestBody)
                } else {
                    resolve(null)
                }
            } catch (err) {
                reject(err)
            }
        })
        .on('error', reject)
})

const createCache = () => {
    let cache = {}

    setInterval(() => {
        cache = {}
        console.log('Cache clear!')
    }, 60000)

    return async (key, cb, res) => {
        if (cache[key]) {
            res.setHeader('X-Cached-Key', key)
            return cache[key]
        }
        const data = await cb(key)
        cache[key] = data
        return data
    }
}

const cache = createCache()

exports.getUsers = async (res, userId) => {
    const users = await cache(userId, userModel.fetchUserById, res)
    if (!users) {
        return getNotFoundResponse(res)
    }

    const catsDb = await catModel.fetchAllCats();
    const cats = catsDb.cats.filter((cat) => {
        if (cat.ownerId) {
            return cat.ownerId === user.id;
        }

        return false;
    });

    user.pets = cats;
    return users
}

exports.getUsersWithoutAnimals = async () => {
    const users = await userModel.fetchAllUsersWithoutAnimal()
    return users
}

exports.getCats = async () => {
    const cats = await catModel.fetchAllCats()
    // if (!cats.lenght) {
    //     return getNotFoundResponse(res)
    // }
    return cats
}

exports.getCatById = async (res, catId) => {
    const cat = await cache(catId, catModel.fetchCatById, res)
    if (!cat) {
        return getNotFoundResponse(res)
    }
    return cat
}

exports.createCat = async (req) => {
    const catData = await parseJsonBody(req)
    catData.id = uuid()
    await catModel.addNewCat(catData)
    return {
        catData
    }
}

exports.createUser = async (req) => {
    const userData = await parseJsonBody(req)
    userData.id = uuid()
    await userModel.addNewUser(userData)
    return {
        userData
    }
}

exports.updateCatById = async (req, res, catId) => {
    const updateData = await parseJsonBody(req)
    const cat = await catModel.fetchCatById(catId)
    const updatedCat = { ...cat, ...updateData }
    const updateResult = await catModel.update(updatedCat)
    if (!updateResult) {
        return getNotFoundResponse(res)
    }
    return updatedCat
}


exports.updateUserById = async (req, res, userId) => {
    const updateData = await parseJsonBody(req)
    const user = await userModel.fetchUserById(userId)
    const updatedUser = { ...user, ...updateData }
    const updateResult = await userModel.userUpdate(updatedUser)
    if (!updateResult) {
        return getNotFoundResponse(res)
    }
    return updateResult
}

exports.deleteUserById = async (res, userId) => {
    const updateResult = await userModel.delete(userId);

    if (!updateResult) {
        return getNotFoundResponse(res);
    }

    return { id: userId };
};


exports.deleteCatById = async (res, catId) => {
    const updateResult = await catModel.delete(catId)
    if (!updateResult) {
        return getNotFoundResponse(res)
    }
    return {
        id: catId
    }
}