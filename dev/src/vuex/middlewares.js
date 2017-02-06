// import createLogger from 'vuex/logger'
import App from 'common/app'

const localStorageMiddleware = {
  onMutation (mutation, { index }) {
    App.ls.set('count', index.count)
  }
}

export default [localStorageMiddleware]
// export default process.env.NODE_ENV !== 'production'
//     ? [createLogger(), localStorageMiddleware]
//     : [localStorageMiddleware]
