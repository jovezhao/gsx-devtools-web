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
          <a-menu @click="onTabMenuItemClick">
            <a-menu-item key="closeAll">
              <!-- <UserOutlined /> -->
              全部关闭
            </a-menu-item>
            <a-menu-item key="closeOther">
              <!-- <UserOutlined /> -->
              关闭其他
            </a-menu-item>
            <a-menu-item key="closeLeft">
              <!-- <UserOutlined /> -->
              关闭左侧选项
            </a-menu-item>
            <a-menu-item key="closeRight">
              <!-- <UserOutlined /> -->
              关闭右侧选项
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          标签选项
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </template>
  </a-tabs>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { DownOutlined } from "@ant-design/icons-vue";
import { MenuInfo } from "ant-design-vue/lib/menu/src/interface";
import { NavService } from "@/domain/base/NavService";

export default defineComponent({
  components: {
    DownOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const nav: NavService = new NavService(store, router);
    const tabList = nav.tabList

    const onEdit = (targetKey: string, action: string) => {
      if (action == "remove") {
        nav.close(targetKey);
      }
    };
    const onChange = (activeKey: string) => {
      nav.to(activeKey);
    };
    const onTabMenuItemClick = (menuInfo: MenuInfo) => {
      switch (menuInfo.key) {
        case "closeAll":
          nav.closeAll();
          break;
        case "closeOther":
          nav.closeOther();
          break;
        case "closeLeft":
          nav.closeLeft();
          break;
        case "closeRight":
          nav.closeRight();
          break;
      }
    };
    return {
      tabList,
      onEdit,
      onChange,
      onTabMenuItemClick,
    };
  },
});
</script>
