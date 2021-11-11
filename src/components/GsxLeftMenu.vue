<template>
  <a-menu mode="inline" style="height: 100%" @click="menuItemClick">
    <template v-for="menu in menuTree">
      <a-sub-menu
        v-if="menu.children && menu.children.length > 0"
        :key="menu.key"
      >
        <template #title>
          <span>
            <!-- <user-outlined /> -->
            <Iconfont v-if="menu.icon" :type="menu.icon" />
            <span> {{ menu.title }}</span>
          </span>
        </template>
        <a-menu-item
          v-for="item in menu.children"
          :key="item.key"
          :title="item.title"
        >
          <Iconfont v-if="item.icon" :type="item.icon" />
          {{ item.title }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="menu.key" :title="menu.title">
        <span>
          <!-- <user-outlined /> -->
          <Iconfont v-if="menu.icon" :type="menu.icon" />
          <span> {{ menu.title }}</span>
        </span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, computed } from "vue";
import PubSub from "pubsub-js";
import { MenuInfo } from "ant-design-vue/lib/menu/src/interface";
import { useRouter } from "vue-router";
import { menuList } from "@/service/menu";
import { useStore } from "vuex";
import { TabInfo } from "@/service/types";
import { NavUtils } from "@/service/nav";

export default defineComponent({
  setup() {
    const moduleKey = ref("01");

    PubSub.subscribe("moduleChanged", (message: string, value: string) => {
      moduleKey.value = value;
    });

    const menuTree = computed(() => {
      return menuList.getMenuTree(moduleKey.value);
    });

    const router = useRouter();
    const store = useStore();

    const menuItemClick = (menu: MenuInfo) => {
      //根据key查询route获得name，title信息，并且加入tabs信息

      const navUtils = new NavUtils(store, router);
      navUtils.to(menu.key.toLocaleString());
    };

    return {
      menuTree,
      menuItemClick,
    };
  },
});
</script>
