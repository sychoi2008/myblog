<template>
  <main>
    <div>
      <div class="titleandtag">
        <input v-model="title" placeholder="title" />
        <select v-model="selectedTag" id="tags">
          <option disabled value="">Tag</option>
          <option v-for="tag in tags" :key="tag.id" :value="tag.id">
            {{ tag.name }}
          </option>
        </select>
      </div>
      <textarea v-model="content" placeholder="content" />
    </div>
    <div class="button-wrapper">
      <button class="writebtn" @click="submitPost">write</button>
      <button class="cancelbtn" @click="goToHome">cancel</button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const tags = ref([]);
const post = ref(null);

const title = ref("");
const content = ref("");
const selectedTag = ref("");

const goToHome = () => {
  router.push("/home");
};

onMounted(async () => {
  try {
    const resTags = await axios.get("http://localhost:3000/tags", {
      withCredentials: true,
    });
    tags.value = resTags.data;

    if (postId) {
      const resPost = await axios.get(`http://localhost:3000/posts/${postId}`, {
        withCredentials: true,
      });

      title.value = resPost.data.title;
      content.value = resPost.data.content;
      selectedTag.value = resPost.data.tag_id;
    }
  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
  }
});

// 글 작성 요청
const submitPost = () => {
  const postData = {
    title: title.value,
    content: content.value,
    tag_id: selectedTag.value,
  };

  const request = postId
    ? axios.patch(
        `http://localhost:3000/posts/${postId}`,
        { post: postData },
        {
          withCredentials: true,
        }
      )
    : axios.post(
        "http://localhost:3000/posts",
        { post: postData },
        {
          withCredentials: true,
        }
      );

  request
    .then((res) => {
      alert(postId ? "글 수정 성공!" : "글 작성 성공!");
      console.log(res.data);
      router.push("/home"); // 작성/수정 후 이동할 경로
    })
    .catch((err) => {
      alert(postId ? "修正失敗!" : "作成失敗!");
      console.error("글 저장 실패:", err);
    });
};
</script>

<style scoped>
.titleandtag {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70vw;
}

select {
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 30vw;
  padding: 12px;
}

textarea {
  height: 200px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-bottom: 10px;
}

.cancelbtn {
  background-color: red;
}

@media screen and (max-width: 480px) {
  input {
    width: 70vw; /* 부모 요소에 맞게 꽉 차게 */
    padding: 8px;
    font-size: 12px;
  }

  select {
    width: 30vw;
    padding: 8px;
    font-size: 12px;
  }

  .textarea {
    width: 100%;
  }

  .writebtn {
    width: 50vw;
  }

  .cancelbtn {
    width: 50vw;
  }
}
</style>
