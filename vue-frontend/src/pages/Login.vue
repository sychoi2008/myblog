<template>
  <main>
    <div class="login-wrapper">
      <div class="input-wrapper">
        <label>E-mail</label>
        <input v-model="inputEmail" placeholder="ex) test@example.com" />
        <label>Password</label>
        <input v-model="inputPWD" type="password" />
      </div>
      <div class="button-wrapper">
        <button class="loginbtn" @click="submitForm">login</button>
        <button class="homebtn" @click="goToHome">cancel</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import { useAuth } from "@/stores/auth";

const auth = useAuth();

const router = useRouter();

const inputEmail = ref("");
const inputPWD = ref("");

const goToHome = () => {
  router.push("/");
};

const submitForm = () => {
  axios
    .post(
      "http://localhost:3000/users/sign_in",
      {
        user: {
          email: inputEmail.value,
          password: inputPWD.value,
        },
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      alert("ログイン成功!");
      console.log(response.data);
      auth.login(response.data.user);
      router.push("/home");
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
      alert("ログイン失敗！IDやPASSWORDをご確認ください。");
    });
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center; /* 세로 중앙 */
}

.login-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 각 input 사이 간격 */
  width: 300px; /* 적당한 너비 (원하는 값으로 변경 가능) */
}
.input-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column; /* 세로 정렬 */
  gap: 10px; /* 각 input 사이 간격 */
  width: 300px; /* 적당한 너비 (원하는 값으로 변경 가능) */
}

.input-wrapper input {
  padding: 10px; /* 안쪽 여백 */
  font-size: 16px; /* 글씨 크기 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 4px; /* 모서리 둥글게 */
}

.button-wrapper {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  gap: 10px;
}

.homebtn {
  background-color: red;
}

@media screen and (max-width: 480px) {
  .loginbtn {
    width: 50vw;
  }

  .homebtn {
    width: 50vw;
  }
}
</style>
