import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AdminLayout from "../views/AdminLayout";
import auth from "../middleware/auth.js";
import NotFound from "../views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    component: AdminLayout,

    children: [
      {
        path: "",
        name: "Home",
        meta: {
          auth: true,
        },
        component: Home,
      },
      {
        path: "about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to , from ,next) => {
//   if(to.meta.auth){
//     return next('/login')
//   }
//   next()
// })

export default router;
