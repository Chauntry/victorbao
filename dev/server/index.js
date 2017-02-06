/**
 * json-server
 */
var shell = require('shelljs')
var fs = require('fs')
var watch = require('watch')
var jsonServer = require('json-server')
var middlewares = jsonServer.defaults({
    watch: true
})
var chalk = require('chalk')

var rootPath = './server'

// 遍历api文件夹 生成db.json
function getJson(cb) {
    var db = {}
    var rewriter = {}

    fs.readdir(rootPath + '/api', (err, data) => {
        data.forEach((v, i) => {
            var _path = rootPath + '/api/' + v
            var isDir = fs.lstatSync(_path).isDirectory()
            if (isDir) {
                fs.readdir(_path, (err, data) => {
                    data.forEach((v2, i2) => {
                        var fileName = v2.replace(/.json/, '')
                        var fullFileName = _path + '/' + v2
                        var apiKey = v + '_' + fileName
                        var routerKey = v + '/' + fileName

                        if (/.json/.test(fullFileName)) {
                            var _json = JSON.parse(fs.readFileSync(_path + '/' + v2, 'utf8'))
                            db[apiKey] = _json
                            rewriter['/' + routerKey] = '/' + apiKey
                        }
                    })

                    fs.writeFileSync(rootPath + '/db/router.json', JSON.stringify(rewriter, null, "    "), 'utf8', err=>{
                        if (err) throw err
                    })

                    fs.writeFileSync(rootPath + '/db/db.json', JSON.stringify(db, null, "    "), 'utf8', err=>{
                        if (err) throw err
                    })

                    cb && cb()
                })
            }
        })
    })
}

function start () {
    var server = jsonServer.create()
    var router = jsonServer.router(rootPath + '/db/db.json')

    server.use(middlewares)
    server.use(jsonServer.rewriter(rewriter))
    // Use default router
    server.use(router)
    server.listen(3001, function () {
        console.log('api list:')
        for (var k in rewriter) {
            console.log(chalk.gray('http://localhost:3001' + k))
        }

        console.log('')
        console.log(chalk.gray('JSON Server is running on 3001'))
    })
}

// watch api目录 重新生成 json.db
watch.watchTree(rootPath + '/api/', function (f, curr, prev) {
    console.log('db change...')
    getJson()
})

// getJson(() => {
//     // shell.exec('json-server -w -p 3001 -r server/db/router.json server/db/db.json')
// })

