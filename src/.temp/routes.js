export default [
  {
    path: "/settings/",
    component: () => import(/* webpackChunkName: "page--src--templates--storyblok-entry-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/src/templates/StoryblokEntry.vue")
  },
  {
    path: "/home/",
    component: () => import(/* webpackChunkName: "page--src--templates--storyblok-entry-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/src/templates/StoryblokEntry.vue")
  },
  {
    path: "/editor/",
    component: () => import(/* webpackChunkName: "page--src--pages--editor-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/src/pages/Editor.vue")
  },
  {
    path: "/about/",
    component: () => import(/* webpackChunkName: "page--src--templates--storyblok-entry-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/src/templates/StoryblokEntry.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/james.lovallo/Documents/GitHub/gridsome-test/node_modules/gridsome/app/pages/404.vue")
  }
]

