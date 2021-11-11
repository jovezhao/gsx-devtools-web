<template>
  <div>
    <a-modal visible="true" title="用户登录" @ok="handleOk" :closable="false">
      <a-form name="custom-validation" layout="horizontal" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="用户名" name="username">
          <a-input placeholder="请输入用户名..." />
        </a-form-item>
        <a-form-item label="密码" name="pass">
          <a-input type="password" placeholder="请输入密码..." />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">登录</a-button>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const loading = ref<boolean>(false);

    const handleOk = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        router.push("/main");
      }, 1000);
    };

    return {
      labelCol: { style: { width: '150px' } ,span:8},
      wrapperCol: { span: 14 },
      loading,
      handleOk,
    };
  },
});
</script>
