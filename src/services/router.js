const router = require('find-my-way')()
const catController = require('../controller/cat')
const userController = require('../controller/cat')

router.on('GET', '/user/:userID', async (req, res, params) => {
    const result = await userController.getUsers(res, params.userID)
    res.end(JSON.stringify(result))
})

router.on('GET', '/cat', async (req, res) => {
    const result = await catController.getCats()
    res.end(JSON.stringify(result))
})

router.on('GET', '/cat/:catId', async (req, res, params) => {
    const result = await catController.getCatById(res, params.catId)
    res.end(JSON.stringify(result))
})

router.on('POST', '/cat', async (req, res) => {
    const result = await catController.createCat(req)
    res.end(JSON.stringify(result))
})

router.on('PUT', '/cat/:catId', async (req, res, { catId }) => {
    const result = await catController.updateCatById(req, res, catId)
    res.end(JSON.stringify(result))
})

router.on('DELETE', '/cat/:catId', async (req, res, { catId }) => {
    const result = await catController.deleteCatById(res, catId)
    res.end(JSON.stringify(result))
})

module.exports = router
