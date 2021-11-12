import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './infrastructure/router'
import store from '@/infrastructure/store';

import Antd from "ant-design-vue";
// import * as Icons from '@ant-design/icons-vue'
import "ant-design-vue/dist/antd.css"

import { createFromIconfontCN } from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2920807_ahy9s8y7i3i.js',
});


const app = createApp(App)
  .use(store)
  .use(Antd)
  .use(router)
  .component("Iconfont", IconFont)

// console.log("1111",IconFont.name,IconFont);

// for (const [key, val] of Object.entries(Icons)) {
//   // console.log("@@@", key, val);

//   app.component(key, val)
// }


app.mount('#app');

