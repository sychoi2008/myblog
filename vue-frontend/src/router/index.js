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

// 페이지 이동 전에 여기서 "어디로 갈지"를 체크한다
router.beforeEach((to, from, next) => {
  const auth = useAuth(); // pinia 스토어 가져오기(state, actions 등을 사용할 수 있음)

  const userInStorage = localStorage.getItem("pinia_user");
  if (userInStorage && !auth.isLoggedIn) {
    // 로컬 스토리지에는 있는데 pinia 스토어에서는 로그인 상태가 아니라면
    const userData = JSON.parse(userInStorage); // 로컬 스토리지에 있는 value를 다시 json으로 바꾸기
    auth.login(userData); // 그걸 pinia 스토어에 넣기
  }

  const publicPages = ["/", "/login", "/signup"]; // 로그인 하지 않아도 접근 가능한 페이지
  const authRequired = !publicPages.includes(to.path); // 현재 이동하려는 경로가 publicPages에 속하지 않는 경로라면!(인증이 필요한 페이지)

  if (authRequired && !auth.isLoggedIn) {
    // 인증이 필요한 페이지에다가 로그인이 안 되어 있다면
    next("/login"); // 로그인 안돼있으면 로그인 페이지로
  } else {
    next(); // 로그인 되어 있거나 로그인이 필요없는 페이지라면 이동 허용
  }
});

export default router;
