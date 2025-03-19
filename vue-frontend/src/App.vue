<template>
  <div class="container">
    <header class="header">
      <h1>My Blog</h1>
    </header>

    <div>
      <main><router-view /></main>
    </div>
  </div>
</template>

<script setup></script>

<style>
/* 반응형을 위한 기본 세팅 */
body {
  margin: 0;
  font-family: sans-serif;
}

h1 {
  text-align: center;
  margin: 40px 0;
}

button {
  border: none;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* 미디어 쿼리 - 태블릿 */
@media screen and (max-width: 768px) {
  .container {
    padding: 0 10px;
  }
}

/* 미디어 쿼리 - 모바일 */
@media screen and (max-width: 480px) {
  .container {
    padding: 0 5px;
  }
}
</style>
