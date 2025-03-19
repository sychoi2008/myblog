// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 페이지 컴포넌트 import (pages 폴더 안에서 불러오는게 일반적)
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import WritePost from "../pages/WritePost.vue";
import SignUp from "../pages/Signup.vue";
import Welcome from "../pages/Welcome.vue";
import Post from "../pages/Post.vue";
import { useAuth } from "@/stores/auth";

const routes = [
  { path: "/", component: Welcome },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/write", component: WritePost },
  { path: "/write/:id", component: WritePost },
  { path: "/signup", component: SignUp },
  { path: "/posts/:id", component: Post },
];

const router = createRouter({
  history: createWebHistory(), // 히스토리 모드 사용 (URL 깔끔하게)
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuth();

  const publicPages = ["/", "/login", "/signup"];
  const authRequired = !publicPages.includes(to.path); // 현재 이동하려는 경로가 publicPages에 속하지 않는 경로라면!

  if (authRequired && !auth.isLoggedIn) {
    next("/login"); // 로그인 안돼있으면 로그인 페이지로
  } else {
    next(); // 로그인 돼있으면 통과
  }
});

export default router;
