import Vue from "vue";
import Router from "vue-router";

//引入组件
import News from "../page/news/index.vue";
import User from "../page/user/index.vue";
import Login from "../components/Login.vue";


Vue.use(Router);
const router = new Router({
  routes: [
    // {
    //   path: "/",
    //   // 重定向，页面进入时进入news页面
    //   component: Login,
    //   redirect: "/login"
    // },
    {
      // path:浏览器访问显示路径，component：对应的组件名称
      path: "/news",
      name: "News",
      component: News
    },
    {
      path: "/user",
      name: "User",
      component: User
    },

    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

export default router;
