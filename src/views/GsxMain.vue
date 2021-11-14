<template>
  <a-layout>
    <a-layout-header class="header">
      <GsxHeader></GsxHeader>
    </a-layout-header>
    <a-layout class="content">
      <a-layout-sider
        class="content-menu"
        v-model:collapsed="collapsed"
        :trigger="null"
        collapsible
      >
        <GsxLeftMenu></GsxLeftMenu>
      </a-layout-sider>
      <a-layout-sider
        width="16"
        @click="() => (collapsed = !collapsed)"
        style="background: #f0f2f5"
      >
        <a-button style="height: 100%; border: 0px; padding: 0px" block>
          <template #icon><Iconfont :type="collapseIcon" /></template>
        </a-button>
      </a-layout-sider>

      <a-layout style="background: #fff; padding: 0px 0px 0px">
        <GsxTabs></GsxTabs>
        <a-layout-content class="content-main">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import GsxLeftMenu from "@/component/base/GsxLeftMenu.vue";
import GsxHeader from "@/component/base/GsxHeader.vue";
import GsxTabs from "@/component/base/GsxTabs.vue";
import { ref, computed, Ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { NavService } from "@/services/NavService";

const collapsed = ref(false);
const collapseIcon: Ref<string> = computed(() =>
  collapsed.value ? "icon-youjiantou" : "icon-zuojiantou"
);

const nav: NavService = new NavService(useStore(), useRouter());
nav.to("00");
</script>
<style scoped>
/* .site-layout-background {
  background: #fff;
} */

.content {
  height: calc(100vh - 64px);
  padding-top: 10px;
  overflow: hidden;
}
.content-menu {
  background-color: #fff;
  height: 100%;
  overflow: auto;
}
.content-main {
  height: 100%;
  overflow: auto;
  border-left: 1px solid #f0f0f0;
  margin-top: -16px;
  padding: 20px;
}
</style>
