<template>
  <div class="home-wrapper">
    <div class="button-wrapper">
      <button class="signbtn" @click="logout">Sign Out</button>
      <button class="writebtn" @click="goToWrite">Write</button>
    </div>
    <div class="search-wrapper">
      <input v-model="searchQuery" />
      <select v-model="selectedTag" id="tags">
        <option value="">all</option>
        <option v-for="tag in tags" :key="tag.id" :value="tag.id">
          {{ tag.name }}
        </option>
      </select>
    </div>
    <main class="blog-wrapper">
      <template v-for="item in filteredPosts" :key="item.id">
        <div class="item">
          <label>Title: </label>
          <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
          <p>Tag: {{ item.tag.name }}</p>
          <p>Date: {{ item.updated_at.slice(0, 16).replace("T", " ") }}</p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import { useAuth } from "@/stores/auth";

const auth = useAuth();

const router = useRouter();

const searchQuery = ref("");
const selectedTag = ref("");
const filteredPosts = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch =
      searchQuery.value === "" || item.title.includes(searchQuery.value);

    const matchesTag =
      selectedTag.value === "" || item.tag.id === selectedTag.value;

    return matchesSearch && matchesTag;
  });
});

const items = ref([]);
const tags = ref([]);

onMounted(async () => {
  try {
    const resTags = await axios.get("http://localhost:3000/tags", {
      withCredentials: true,
    });
    tags.value = resTags.data;

    const res = await axios.get("http://localhost:3000/posts", {
      withCredentials: true,
    });
    console.log(res.data);
    items.value = res.data;
  } catch (err) {
    console.error("목록 불러오기 실패:", err);
  }
});

const goToWrite = () => {
  router.push("/write");
};

const logout = () => {
  axios
    .delete("http://localhost:3000/users/sign_out", {
      withCredentials: true,
    })
    .then((response) => {
      alert("로그아웃 성공!");

      router.replace("/");
    })
    .catch((error) => {
      auth.logout();
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패!");
    });
};
</script>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-bottom: 10px;
}

input {
  padding: 12px; /* 안쪽 여백 */
  width: 300px;
  font-size: 16px; /* 글씨 크기 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 4px; /* 모서리 둥글게 */
}

select {
  font-size: 16px; /* 글씨 크기 */
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 4px; /* 모서리 둥글게 */
}

.item {
  border: 1px solid #ccc; /* 테두리 */
  border-radius: 4px; /* 모서리 둥글게 */

  padding: 10px;
  margin-bottom: 10px;
}

.search-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  margin-bottom: 10px;
}

/* 태블릿 대응 */
@media screen and (max-width: 768px) {
  input {
    width: 200px;
    padding: 10px;
    font-size: 14px;
  }
}

/* 모바일 대응 */
@media screen and (max-width: 480px) {
  input {
    width: 70vw; /* 부모 요소에 맞게 꽉 차게 */
    padding: 8px;
    font-size: 12px;
  }

  select {
    width: 30vw;
    padding: 8px;
  }

  .signbtn {
    width: 50vw;
  }

  .writebtn {
    width: 50vw;
  }

  .item {
    width: 100%;
  }
}
</style>
