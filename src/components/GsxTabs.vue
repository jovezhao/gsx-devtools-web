<template>
  <a-tabs
    v-model:activeKey="tabList.currentKey"
    hide-add
    type="editable-card"
    @edit="onEdit"
    @change="onChange"
  >
    <!-- <a-tab-pane key="00" tab="首页" :closable="false" /> -->
    <a-tab-pane
      v-for="tabInfo in tabList.openTabs"
      :key="tabInfo.key"
      :closable="tabInfo.closable"
    >
    <template #tab>
     <span>
        <!-- <user-outlined /> -->
        <Iconfont v-if="tabInfo.icon" :type="tabInfo.icon" />
        <span> {{ tabInfo.title }}</span>
      </span>
    </template>
    </a-tab-pane>
    <template #tabBarExtraContent>
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1">
              <!-- <UserOutlined /> -->
              全部关闭
            </a-menu-item>
            <a-menu-item key="2">
              <!-- <UserOutlined /> -->
              关闭其他
            </a-menu-item>
            <a-menu-item key="3">
              <!-- <UserOutlined /> -->
              关闭左侧选项
            </a-menu-item>
            <a-menu-item key="4">
              <!-- <UserOutlined /> -->
              关闭右侧选项
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          标签选项
          <!-- <DownOutlined /> -->
        </a-button>
      </a-dropdown>
    </template>
  </a-tabs>
</template>
<script lang="ts">
import { NavUtils } from "@/service/nav";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const nav: NavUtils = new NavUtils(store, router);

    const tabList = nav.tabList;
    //  computed(() => {
    //   return nav.tabList;
    // });

    const onEdit = (targetKey: string, action: string) => {
      if (action == "remove") {
        nav.close(targetKey);
      }
    };
    const onChange = (activeKey: string) => {
      nav.to(activeKey);
    };
    return {
      tabList,
      onEdit,
      onChange,
    };
  },
});
</script>
