import Vue from "vue";
import Router from "vue-router";

//引入组件
import News from "../page/news/index.vue"
import User from "../page/user/index.vue"
import Sign from "../page/sign/index.vue"
import Phone from "../page/phone/index.vue"
import Login from "../components/Login.vue"
import Banner from "../page/banner/index.vue"
import Letter from "../page/letter/index.vue"
import Course from "../page/course/index.vue"


Vue.use(Router);
const router = new Router({
  routes: [{
      path: "/",
      // 重定向，页面进入时进入news页面
      component: Login,
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: '/course',
      name: "Course",
      component: Course
    },
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
      path: '/letter',
      name: "Letter",
      component: Letter
    },
    {
      path: "/phone",
      name: "Phone",
      component: Phone
    },
    {
      path: "/banner",
      name: "Banner",
      component: Banner
    },
    {
      path: '/sign',
      name: "Sign",
      component: Sign
    }
  ]
});

export default router;
