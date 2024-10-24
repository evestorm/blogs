<script setup lang="ts">
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { nextTick, provide } from 'vue';

const { page, isDark } = useData();

const formatDate = date => {
  const currentDate = new Date();
  // 获取当前年份
  const year = currentDate.getFullYear();
  // 获取当前月份，注意月份从 0 开始计数，所以需要加 1
  const month = (currentDate.getMonth() + 1).toString().padStart(2, 0);
  // 获取当前日期
  const day = (currentDate.getDate()).toString().padStart(2, 0);

  return !date ? `${year}-${month}-${day}` : date.split('T')[0];
}
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-footer-before>
      <div class="last-updated">上次更新: {{ formatDate(page.frontmatter.date) }}</div>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.last-updated {
  margin-bottom: 10px;
}
</style>