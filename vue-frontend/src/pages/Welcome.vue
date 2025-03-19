<template>
  <div class="welcome">
    <p>Welcome to My Blog!</p>
    <div class="button-wrapper">
      <button class="loginbtn" @click="goToLogin">Sign In</button>
      <button class="signupbtn" @click="goToSignup">Sign Up</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => router.push("/login");
const goToSignup = () => router.push("/signup");
</script>

<style scoped>
p {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 미디어 쿼리 - 모바일 */
@media screen and (max-width: 480px) {
  .loginbtn {
    width: 50vw;
  }

  .signupbtn {
    width: 50vw;
  }
}
</style>
