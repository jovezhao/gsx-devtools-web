<template>
  <div class="logo" />
  <a-menu
    theme="dark"
    mode="horizontal"
    v-model:selectedKeys="current"
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
import { defineComponent, ref, watch } from "vue";
import PubSub from "pubsub-js";
import { useStore } from "vuex";
import { MenuTreeList } from "../domain/MenuTreeList";

export default defineComponent({
  setup() {
    const moduleList = (useStore().state.menu as MenuTreeList).getMoudleList();
    const current = ref(["01"]);

    const moduleChanged = (newValue: string[]) => {
      PubSub.publish("moduleChanged", newValue[0]);
    };

    watch(current, moduleChanged);

    return {
      moduleList,
      current,
    };
  },
});
</script>
