const { createReadStream, writeFile, readFile, readFileSync } = require('fs')
const path = require('path')
const catModel = require('./src/model/cat.js')

const dbJsonPath = path.resolve(process.cwd(), 'src/services/db_cats.json')
const dbUserJsonPath = path.resolve('/Users/evgenijgravdin/Desktop/node-sj-lesson-34/src/services/db_user.json')

const readJSONAsync = (path) => new Promise((resolve) => {
    const readStream = createReadStream(path)
    let result = ''
    readStream
        .on('data', (chunk) => {
            result += chunk.toString()
        })
        .on('end', (chunk) => {
            if (!result) {
                resolve([])
            } else {
                resolve(JSON.parse(result))
            }
        })
})

const writeJSONAsync = (path, data) => new Promise((resolve, reject) => {
    const buff = Buffer.from(JSON.stringify(data, null, 4))
    writeFile(path, buff, (err) => {
        err ? reject(err) : resolve()
    })
})


describe('Filter cats array', () => {
    let arr = readJSONAsync('/Users/evgenijgravdin/Desktop/node-sj-lesson-34/src/services/db_cats.json', { encoding: 'utf8' })

    test('Should working array be editable', () => {

    })
    test('Should be defined', () => {
        expect(arr).toBeDefined()
        expect(arr).not.toBeUndefined()
    })
})
