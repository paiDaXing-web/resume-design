<!-- 技能特长属性设置 -->
<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" stretch>
    <el-tab-pane label="样式设置" name="style">
      <el-form label-width="100px" label-position="left">
        <!-- 公共样式属性 -->
        <common-options></common-options>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="数据配置" name="data">
      <el-form label-width="70px" label-position="left">
        <el-form-item label="标题名称:">
          <el-input v-model="modelItem.title" type="text" maxlength="15" show-word-limit />
        </el-form-item>
        <div v-for="(item, index) in modelItem.LIST" class="skill-list">
          <el-form-item :label="`技能${index + 1}:`">
            <el-input
              v-model="item.introduce"
              type="textarea"
              maxlength="50"
              show-word-limit
              :rows="4"
            />
            <el-button
              :disabled="index === 0"
              type="danger"
              :icon="SemiSelect"
              circle
              @click="deleteSkill(index)"
            />
            <el-button
              :disabled="index !== modelItem.LIST.length - 1"
              type="primary"
              :icon="Plus"
              circle
              @click="addSkill"
            />
          </el-form-item>
        </div>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import appStore from '@/store';
  import CommonOptions from '@/components/CommonOptions/CommonOptions.vue';
  import { Plus, SemiSelect } from '@element-plus/icons-vue';
  import { useModelIndex } from '@/hooks/useModelIndex';
  defineOptions({ name: 'SKILL_SPECIALTIES' });
  // store
  const { resumeJsonStore } = appStore.useResumeJsonStore;

  // 选中的模块
  const index = useModelIndex(); // 选中的索引
  const modelItem = reactive<ISKILLSPECIALTIES>(resumeJsonStore.LIST[index] as ISKILLSPECIALTIES);
  let activeName = ref('style');

  /**
   * 数据配置
   */
  // 删除技能
  const deleteSkill = (index: number): void => {
    modelItem.LIST.splice(index, 1);
  };
  // 添加技能
  const addSkill = (): void => {
    modelItem.LIST.push({
      skillName: 'JavaScript', // 技能名称
      proficiency: '熟悉', // 熟练度
      introduce: '熟练掌握该项技术' // 介绍
    });
  };
</script>
<style lang="scss" scoped>
  .skill-list {
    .el-button {
      margin-left: 10px;
    }
  }
</style>
