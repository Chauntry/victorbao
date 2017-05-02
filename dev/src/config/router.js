export function configRouter(router) {
  router.map({
    '/index': {
      component: require('components/index/index.vue')
    },
    '/cookiesindex': {
      component: require('components/cookiesindex/index.vue')
    },

    '/triple': {
      component: require('components/triple/index.vue')
    },

    '/triple/rose': {
      component: require('components/triple/index_rose.vue')
    },

    '/triple/eye': {
      component: require('components/triple/eye-marilyn.vue')
    },
    '/triple/eye-animation': {
      component: require('components/triple/eye-animation.vue')
    },
    '/triple/display': {
      component: require('components/triple/display.vue')
    },
    '/triple.mobile/jewelry': {
      component: require('components/triple.mobile/jewelry.vue')
    },

    '/triple.mobile/jewelry/:id': {
      name: 'jewelry',
      component: require('components/triple.mobile/jewelryobj.vue')
    },

    '/triple/jewelry': {
      component: require('components/triple/jewelry.vue')
    },

    '/triple/jewelry/:id': {
      name: 'jewelry',
      component: require('components/triple/jewelryobj.vue')
    },
    '/scrollthree': {
      component: require('components/triple/scrollthree.vue'),
    },
    '/notice': {
      component: require('components/notice/index.vue'),
    },
    '/blog': {
      component: require('components/blog/index.vue'),
    },
    '/about': {
      component: require('components/about/index.vue'),
    },
    '/register': {
      component: require('components/register/index.vue'),
    },



    // '/cpanel': {
    //   component: require('components/cpanel/index.vue'),
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
