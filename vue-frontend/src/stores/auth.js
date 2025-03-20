import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  // useAuth : 다른 컴포넌트에서 스토어를 사용할 때 import 문에서 사용. auth : 스토어의 고유 이름
  state: () => ({
    isLoggedIn: false, // 로그인 여부
    user: null, // 로그인한 사용자 정보
  }),
  actions: {
    // state 값을 변경하거나 비동기 처리 담당
    login(userData) {
      // 로그인 성공 후 호출하는 함수. 로그인을 하면 이 메서드를 호출해서 상태를 업데이트
      this.user = userData;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
});
