<template>
  <a-menu style="height: 100%" mode="inline">
    <a-sub-menu :key="subMenu.key" v-for="subMenu in getSubMenu(moduleKey)">
      <template #title>
        <span>
          <user-outlined />
          <span>{{ subMenu.title }}</span>
        </span>
      </template>
      <a-menu-item
        v-for="menuItem in getMenuItem(subMenu.key)"
        :key="menuItem.key"
        >{{ menuItem.title }}</a-menu-item
      >
    </a-sub-menu>

    <a-menu-item key="9">
      <file-outlined />
      <span>File</span>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { MenuItem } from "@/service/menu";
import { ref, defineComponent, Ref } from "vue";
import { useStore } from "vuex";
import PubSub from "pubsub-js";

export default defineComponent({
  setup() {
    const store = useStore();
    const moduleKey = ref("01");

    PubSub.subscribe("moduleChanged", (message: string, value: Ref<string>) => {
      moduleKey.value = value.value;
    });
    const getSubMenu: (moduleKey: string) => Array<MenuItem> = (key) => {
      return store.state.menuList.filter(
        (p: MenuItem) => p.key?.startsWith(key) && p.key.length === 4
      );
    };
    const getMenuItem: (menuKey: string) => Array<MenuItem> = (key) => {
      return store.state.menuList.filter(
        (p: MenuItem) => p.key?.startsWith(key) && p.key.length === 6
      );
    };

    return {
      moduleKey,
      getSubMenu,
      getMenuItem,
    };
  },
});
</script>
