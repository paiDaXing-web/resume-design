<template>
  <div class="model-list-box">
    <div class="model-ul">
      <draggable
        :list="resumeJsonStore.LIST"
        item-key="id"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        @start="onStart"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div
            :class="[
              'model-list-item',
              { active: appStore.useResumeModelStore.id == element.id },
              { 'collapse-center': !leftShowStatus }
            ]"
            @click="selectModel(element)"
          >
            <!-- 是否添加模块 -->
            <div class="left">
              <div :class="['icon-box', { 'collapse-size': !leftShowStatus }]">
                <el-tooltip
                  class="box-item"
                  placement="right"
                  effect="dark"
                  :content="element.title"
                  :disabled="leftShowStatus"
                >
                  <svg-icon
                    :icon-name="element.iconfont"
                    class-name="icon"
                    :color="leftShowStatus ? '#c4c4c4' : '#00c091'"
                    size="16px"
                  ></svg-icon>
                </el-tooltip>
              </div>
              <p v-show="leftShowStatus">{{ element.title }}</p>
            </div>
            <div v-show="leftShowStatus" class="right">
              <!-- 模块开关 -->
              <el-switch v-model="element.show" size="small" active-color="#00C091" />
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useModelOptionsComName } from '@/hooks/useModelOptionsComName';
  import appStore from '@/store';
  import draggable from 'vuedraggable';

  defineProps<{
    leftShowStatus: Boolean;
  }>();

  // 列表数据
  const { resumeJsonStore } = appStore.useResumeJsonStore;

  // 选中模块
  const { setResumeModel } = appStore.useResumeModelStore;
  const selectModel = (item: any) => {
    let optionsName: string = useModelOptionsComName(`${resumeJsonStore.NAME}-${item.model}`);
    let updateData = {
      model: item.model,
      optionsName: optionsName,
      title: item.title,
      id: item.id
    };
    setResumeModel(updateData.model, updateData.optionsName, updateData.title, updateData.id);
  };
  //拖拽开始的事件
  const onStart = () => {
    console.log('开始拖拽');
  };

  //拖拽结束的事件
  const onEnd = () => {
    console.log('结束拖拽');
  };
</script>
<style lang="scss" scoped>
  .model-list-box {
    padding: 0 1px;
    .model-ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
      .icon-box {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #c4c4c4;
        border-radius: 50%;
      }
      .collapse-size {
        transform: scale(1.2);
      }
      .model-list-item {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: all-scroll;
        border: 1px solid transparent;
        padding: 0 12px;
        position: relative;
        &:hover {
          border: 1px dashed #00c091;
        }
        &::after {
          content: '';
          width: 80%;
          height: 1px;
          background-color: #f4f4f4;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .left {
          display: flex;
          align-items: center;
          p {
            margin: 0 0 0 10px;
            padding: 0;
            display: inline-block;
            height: 64px;
            max-width: 64px;
            line-height: 64px;
            font-size: 12px;
            color: #666666;
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            white-space: nowrap;
          }
        }
        .right {
          display: flex;
          align-items: center;
          .add-model-box {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
        }
      }

      .collapse-center {
        justify-content: center;
      }
      .active {
        background-color: rgba(227, 231, 234, 0.6);
      }
    }
  }
</style>
