<template>
  <a-button type="primary" shape="circle">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <a-button type="primary" shape="circle">A</a-button>
  <a-button type="primary">
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
  <a-button shape="circle">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <a-button>
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
  <a-button shape="circle">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <a-button>
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
  <a-button type="dashed" shape="circle">
    <template #icon><SearchOutlined /></template>
  </a-button>
  <a-button type="dashed">
    <template #icon><SearchOutlined /></template>
    Search
  </a-button>
</template>
<script lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SearchOutlined,
  },
};
</script>

