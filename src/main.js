import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import Vue3TouchEvents from 'vue3-touch-events';
import 'element-plus/dist/index.css';
import './styles/base.css';
import './styles/dark-mode.css';
import './styles/weather.css';
import './styles/nav.css';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(Vue3TouchEvents);
app.mount('#app');
