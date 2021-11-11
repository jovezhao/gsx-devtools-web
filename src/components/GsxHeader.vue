<template>
  <div class="logo" />
  <a-menu
    theme="dark"
    @click="moduleChanged"
    mode="horizontal"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item v-for="menu in moduleList" :key="menu.key">
      <span>
        <!-- <user-outlined /> -->
        <Iconfont v-if="menu.icon" :type="menu.icon" />
        <span> {{ menu.title }}</span>
      </span>
    </a-menu-item>
  </a-menu>
</template>
<style scoped>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PubSub from "pubsub-js";
import { menuList } from "@/service/menu";

export default defineComponent({
  setup() {
    const moduleList = menuList.getMoudleList();
    const current = ref("01");

    const moduleChanged = (args: { key: string }) => {
      current.value = args.key;
      PubSub.publish("moduleChanged", current);
    };

    return {
      moduleList,
      moduleChanged,
      current,
    };
  },
});
</script>
