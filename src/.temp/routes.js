export default [
  {
    path: "/home/",
    component: () => import(/* webpackChunkName: "page--src--templates--storyblok-entry-vue" */ "/Users/james.lovallo/my-project/src/templates/StoryblokEntry.vue")
  },
  {
    path: "/editor/",
    component: () => import(/* webpackChunkName: "page--src--pages--editor-vue" */ "/Users/james.lovallo/my-project/src/pages/Editor.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/james.lovallo/my-project/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/james.lovallo/my-project/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/james.lovallo/my-project/node_modules/gridsome/app/pages/404.vue")
  }
]

