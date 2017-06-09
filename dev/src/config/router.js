export function configRouter(router) {
  router.map({
    '/': {
      component: require('components/home/homepage.vue')
    },
    // '/triple/eye': {
    //   component: require('components/triple/eye-marilyn.vue')
    // },
    // '/triple/eye-animation': {
    //   component: require('components/triple/eye-animation.vue')
    // },
    // '/triple/display': {
    //   component: require('components/triple/display.vue')
    // },
    '/catalog': {
      component: require('components/triple/catalogs.vue')
    },

    '/catalog/:cata': {
       name: 'cata',
      component: require('components/triple/catalog.vue')
    },


    '/item/:id': {
      name: 'id',
      component: require('components/triple/itemPage.vue')
    },


    '/index.mobile': {
      component: require('components/triple.mobile/jewelry.vue')
    },
    '/index': {
      component: require('components/triple/jewelry.vue')
    },

    '/index/:id': {
      name: 'jewelry',
      component: require('components/triple/jewelryobj.vue')
    },

    '/index.mobile/:id': {
      name: 'jewelry',
      component: require('components/triple.mobile/jewelryobj.vue')
    },

    '/scrollthree': {
      component: require('components/triple/scrollthree.vue'),
    },

    '/admin': {
      component: require('components/admin/admin.vue')
    },


  })

  router.redirect({
    '*': '/'
  })


  router.beforeEach((transition) => {
    window.scrollTo(0, 0)
    transition.next()
  })
}
