import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 아까 만든 라우터 import
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router); // 라우터 등록
app.mount("#app");
