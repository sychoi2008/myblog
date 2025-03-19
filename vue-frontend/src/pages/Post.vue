<template>
  <div class="button-wrapper">
    <button class="editbtn" @click="goToEdit">Edit</button>
    <button class="deletebtn" @click="goToDelete">Delete</button>
  </div>

  <main>
    <div v-if="post">
      <div class="item">
        <h2>Title: {{ post.title }}</h2>
        <p>Tag: {{ post.tag.name }}</p>
        <p>Date: {{ post.updated_at.slice(0, 16).replace("T", " ") }}</p>
        <p>{{ post.content }}</p>
      </div>
    </div>

    <div v-else>
      <p>글을 불러오는 중입니다...</p>
    </div>
  </main>

  <div>
    <button class="backbtn" @click="goToHome">back</button>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

/**
Vue는 onMounted가 실행되면 데이터를 가져오고, 그 데이터가 렌더링되기 전까지는 post가 null일 수도 있어.
그래서 보통 v-if를 써서 데이터가 도착했을 때만 렌더링하는 패턴을 많이 사용해.
**/
const post = ref(null);

const goToHome = () => {
  router.push("/home");
};

const goToEdit = () => {
  router.push(`/write/${postId}`);
};

const goToDelete = () => {
  axios
    .delete(`http://localhost:3000/posts/${postId}`, {
      withCredentials: true,
    })
    .then((res) => {
      alert("글 삭제 성공");
      router.push("/home"); // 작성/수정 후 이동할 경로
    });
};

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/posts/${postId}`, {
      withCredentials: true,
    });
    console.log(res.data);
    post.value = res.data;
  } catch (err) {
    console.error("기본 값 가져오기 실패:", err);
  }
});
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-bottom: 10px;
}
p {
  white-space: pre-line;
}

/* 미디어 쿼리 - 모바일 */
@media screen and (max-width: 480px) {
  .editbtn {
    width: 50vw;
  }

  .deletebtn {
    width: 50vw;
  }

  .backbtn {
    width: 100%;
  }
}
</style>
