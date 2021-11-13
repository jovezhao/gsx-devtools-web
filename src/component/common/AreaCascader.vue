<template>
  <a-cascader
    :options="options"
    :load-data="loadData"
    placeholder="请选择区域"
    change-on-select
  />
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { AreaCodeService } from "@/domain/common/AreaCodeService";
interface Option {
  value: string;
  label: string;
  loading?: boolean;
  isLeaf?: boolean;
  children?: Option[];
  level: number;
}
export default defineComponent({
  setup() {
    const options = ref<Option[]>([]);

    const service = new AreaCodeService();

    service.getProvinceList().then((p) => {
      options.value.push(
        ...p.map(
          (q) =>
            ({
              label: q.name,
              value: q.code,
              isLeaf: false,
              level: q.level,
            } as Option)
        )
      );
    });

    const loadData = (selectedOptions: Option[]) => {

      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      service.getChildren(targetOption.value).then((p) => {
        targetOption.loading = false;
        targetOption.children = p.map(
          (q) =>
            ({
              label: q.name,
              value: q.code,
              level: q.level,
              isLeaf: q.level == 4,
            } as Option)
        );
      });
    };

    return {
      options,
      loadData,
    };
  },
});
</script>
