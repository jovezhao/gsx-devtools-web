<template>
  <a-cascader
    v-model:value="selectValues"
    :options="options"
    :load-data="loadData"
    placeholder="请选择区域"
    change-on-select
    style="width: 300px"
  />

  {{ selectValues }}
  <button @click="setCode">设置回显</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { AreaCodeService } from "@/services/AreaCodeService";
import { AreaCode } from "@/types/base/AreaCode";
interface Option {
  value: string;
  label: string;
  loading?: boolean;
  isLeaf?: boolean;
  children?: Option[];
  level: number;
}
export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const options = ref<Option[]>([]);
    const areaService = new AreaCodeService();
    const selectValues = ref<string[]>(areaService.getFullCode(props.value));

    const initData = async (values: string[]) => {
      //加载省份
      let provinceList = await areaService.getProvinceList();
      options.value = codeToOption(provinceList);
      console.log(options.value, values[0]);

      //加载市
      let provinceOption = options.value.find((p) => p.value == values[0]);

      await loadOption(provinceOption);
      //加载区县
      let cityOption = provinceOption?.children?.find(
        (p) => p.value == values[1]
      );
      await loadOption(cityOption);
      //加载乡镇
      let countyOption = cityOption?.children?.find(
        (p) => p.value == values[2]
      );
      await loadOption(countyOption);
    };

    const loadOption = async (option: Option | undefined) => {
      console.log("@@@", option);

      if (option) {
        const children = await areaService.getChildren(option.value);
        if (children) option.children = codeToOption(children);
      }
    };

    const codeToOption = (codes: AreaCode[]) => {
      return codes.map(
        (q) =>
          ({
            label: q.name,
            value: q.code,
            isLeaf: q.level == 4,
            level: q.level,
          } as Option)
      );
    };

    const loadData = async (selectedOptions: Option[]) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      await loadOption(targetOption);
      targetOption.loading = false;
    };

    const setCode = () => {
      selectValues.value = [
        "440000000000",
        "440100000000",
        "440104000000",
        "440104003000",
      ];
    };

    initData(selectValues.value).then(() => {
      console.log("加载完成");
      
    });

    return {
      selectValues,
      setCode,
      options,
      loadData,
    };
  },
});
</script>
