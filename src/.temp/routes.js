export default [
  {
    path: "/settings/",
    component: () => import(/* webpackChunkName: "page--src-templates-storyblok-entry-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\src\\templates\\StoryblokEntry.vue")
  },
  {
    path: "/home/",
    component: () => import(/* webpackChunkName: "page--src-templates-storyblok-entry-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\src\\templates\\StoryblokEntry.vue")
  },
  {
    path: "/editor/",
    component: () => import(/* webpackChunkName: "page--src-pages-editor-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\src\\pages\\Editor.vue")
  },
  {
    path: "/about/",
    component: () => import(/* webpackChunkName: "page--src-templates-storyblok-entry-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\src\\templates\\StoryblokEntry.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\node_modules\\gridsome\\app\\pages\\404.vue")
  },
  {
    path: "/",
    component: () => import(/* webpackChunkName: "page--src-templates-storyblok-entry-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\src\\templates\\StoryblokEntry.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules-gridsome-app-pages-404-vue" */ "c:\\Users\\james\\Documents\\GitHub\\storygrid\\node_modules\\gridsome\\app\\pages\\404.vue")
  }
]

