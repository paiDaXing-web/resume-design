<!-- 全局主题设置 -->
<template>
  <div class="resume-theme-box">
    <el-form label-width="120px" label-position="left">
      <!-- 左右布局时主题颜色配置 -->
      <template v-if="designJsonStore.LAYOUT === 'leftRight'">
        <el-form-item label="左侧主题颜色:">
          <color-picker-custom-vue
            v-model="designJsonStore.GLOBAL_STYLE.leftThemeColor"
          ></color-picker-custom-vue>
        </el-form-item>
        <el-form-item label="左侧容器宽度：">
          <el-input-number v-model="form.leftWidth" :min="0" :max="820" @change="handleLeftWidth" />
        </el-form-item>
        <el-form-item label="右侧主题颜色:">
          <color-picker-custom-vue
            v-model="designJsonStore.GLOBAL_STYLE.rightThemeColor"
          ></color-picker-custom-vue>
        </el-form-item>
        <el-form-item label="右侧容器宽度：">
          <el-input-number
            v-model="form.rightWidth"
            :min="0"
            :max="820"
            @change="handleRightWidth"
          />
        </el-form-item>
      </template>
      <el-form-item label="主题颜色:">
        <color-picker-custom-vue
          v-model="designJsonStore.GLOBAL_STYLE.themeColor"
          @change="changeThemeColor"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体大小设置 -->
      <el-form-item label="模块标题字体大小:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.firstTitleFontSize"
          class="m-2"
          placeholder="请选择"
          @change="changeFirstTitleFontSize"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级标题字体大小:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleFontSize"
          class="m-2"
          placeholder="请选择"
          @change="secondTitleFontSizeChange"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="正文字体大小:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.textFontSize"
          class="m-2"
          placeholder="请选择"
          @change="textFontSizeChange"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 字体颜色设置 -->
      <el-form-item label="二级标题颜色:">
        <color-picker-custom-vue
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleColor"
          @change="secondTitleColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <el-form-item label="正文字体颜色:">
        <color-picker-custom-vue
          v-model="designJsonStore.GLOBAL_STYLE.textFontColor"
          @change="textColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体粗细设置 -->
      <el-form-item label="二级标题字体粗细:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleWeight"
          class="m-2"
          placeholder="请选择"
          @change="secondTitleWeightChange"
        >
          <el-option
            v-for="(item, index) in fontWeightList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="正文字体粗细:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.textFontWeight"
          class="m-2"
          placeholder="请选择"
          @change="textFontWeight"
        >
          <el-option
            v-for="(item, index) in fontWeightList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 模块上下边距设置 -->
      <el-form-item label="模块上外边距:">
        <el-input-number v-model="mTop" :min="-100" :max="100" @change="handleChange" />
      </el-form-item>
      <el-form-item label="模块下外边距:">
        <el-input-number v-model="mBottom" :min="-100" :max="100" @change="handleChangeMBottom" />
      </el-form-item>

      <!-- 模块上下内边距 -->
      <el-form-item label="模块上下内边距:">
        <el-input-number
          v-model="pTopBottom"
          :min="-100"
          :max="100"
          @change="handleChangePTopBottom"
        />
      </el-form-item>
      <!-- 模块左右内边距 -->
      <el-form-item label="模块左右内边距:">
        <el-input-number
          v-model="pLeftRight"
          :min="-100"
          :max="100"
          @change="handleChangePLeftRight"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { pxTonumber } from '@/utils/common';
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';
  import { IMATERIALITEM } from '@/interface/material';

  const { designJsonStore } = appStore.useDesignStore;

  // 表单数据
  const form = reactive({
    leftWidth: 270,
    rightWidth: 550
  });
  // 左侧宽度改变
  const handleLeftWidth = (value: number) => {
    form.rightWidth = 820 - value;
    designJsonStore.GLOBAL_STYLE.leftWidth = `${form.leftWidth}px`;
    designJsonStore.GLOBAL_STYLE.rightWidth = `${820 - value}px`;
  };

  // 右侧宽度改变
  const handleRightWidth = (value: number) => {
    form.leftWidth = 820 - value;
    designJsonStore.GLOBAL_STYLE.rightWidth = `${form.rightWidth}px`;
    designJsonStore.GLOBAL_STYLE.leftWidth = `${820 - value}px`;
  };

  // 改变主题色
  const changeThemeColor = (item: { rgb: string; hex: string }) => {
    // 改变一级标题颜色
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.themeColor = item.hex;
    });
  };
  // 改变一级字体大小
  const changeFirstTitleFontSize = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.firstTitleFontSize = value;
    });
  };

  // 字体大小
  const fontSizeList = useFontSizeList();

  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 二级标题字体大小发生变化时
  const secondTitleFontSizeChange = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 正文字体大小发生变化
  const textFontSizeChange = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 二级标题颜色改变
  const secondTitleColorChange = (item: { hex: string; rgba: string }) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleColor = item.hex;
    });
  };

  // 正文字体颜色发生改变
  const textColorChange = (item: { hex: string; rgba: string }) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textColor = item.hex;
    });
  };

  // 二级标题字体粗细
  const secondTitleWeightChange = (value: number) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontWeight = value;
    });
  };

  // 正文字体粗细
  const textFontWeight = (value: number) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textFontWeight = value;
    });
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(designJsonStore.GLOBAL_STYLE.modelMarginTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.modelMarginTop = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.mTop = designJsonStore.GLOBAL_STYLE.modelMarginTop;
    });
  };
  // 下外边距
  const defaultMbottom: number = pxTonumber(designJsonStore.GLOBAL_STYLE.modelMarginBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.modelMarginBottom = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.mBottom = designJsonStore.GLOBAL_STYLE.modelMarginBottom;
    });
  };

  // 上下内边距
  const defaultPTopBottom: number = pxTonumber(designJsonStore.GLOBAL_STYLE.pTopBottom);
  const pTopBottom = ref<number>(defaultPTopBottom);
  const handleChangePTopBottom = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.pTopBottom = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.pTopBottom = designJsonStore.GLOBAL_STYLE.pTopBottom;
    });
  };

  // 左右内边距
  const defaultPLeftRight: number = pxTonumber(designJsonStore.GLOBAL_STYLE.modelMarginBottom);
  const pLeftRight = ref<number>(defaultPLeftRight);
  const handleChangePLeftRight = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.pLeftRight = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.pLeftRight = designJsonStore.GLOBAL_STYLE.pLeftRight;
    });
  };
</script>
<style lang="scss" scoped>
  .resume-theme-box {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
