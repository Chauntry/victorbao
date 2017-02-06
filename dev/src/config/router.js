export function configRouter(router) {
  router.map({
    '/index': {
      component: require('components/index/index.vue')
    },
    '/cookiesindex': {
      component: require('components/cookiesindex/index.vue')
    },

    // '/login': {
    //   component: require('components/login/index.vue')
    // },

    '/notice': {
      component: require('components/notice/index.vue'),
    },
    '/blog': {
      component: require('components/blog/index.vue'),
    },
    '/about': {
      component: require('components/about/index.vue'),
    },
    // '/cpanel': {
    //   component: require('components/cpanel/index.vue'),
    // },
    // '/smallprize/:id': {
    //   name: 'smallprize',
    //   component: require('components/smallprize/index.vue'),
    // },
    // '/bigprize/:id': {
    //   name: 'bigprize',
    //   component: require('components/bigprize/index.vue'),
    // },
    // '/gprize/:id': {
    //   name: 'gprize',
    //   component: require('components/gprize/index.vue'),
    // },
    // '/uploadimg/:id': {
    //   name: 'uploadimg',
    //   component: require('components/uploadimg/index.vue'),
    // },
    // '/myprize': {
    //   component: require('components/myprize/index.vue')
    // },
    // '/rprize': {
    //   component: require('components/rprize/index.vue')
    // },
    // '/error': {
    //   component: require('components/error/index.vue')
    // }
  })

  router.redirect({
    '*': '/index'
  })


  router.beforeEach((transition) => {
    window.scrollTo(0, 0)
    transition.next()
  })
}
