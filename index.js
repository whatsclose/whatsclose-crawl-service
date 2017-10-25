/* const production = process.env.NODE_ENV === 'production'
if (!production) {
  const chokidar = require('chokidar')
  const watcher = chokidar.watch('./')
  watcher.on('ready', function () {
    watcher.on('all', function () {
      console.log('Clearing /app/ module cache from server')
      Object.keys(require.cache).forEach(function (id) {
        if (/[\\]app[\\]/.test(id)) delete require.cache[id]
      })
    })
  })
} */

import {initialize} from './worker/entrypoint/index'

initialize()
