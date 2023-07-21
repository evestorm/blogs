<script setup>
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
const { page } = useData();
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
  <Layout>
    <template #doc-footer-before>
      <div class="last-updated">上次更新: {{ formatDate(page.frontmatter.date) }}</div>
    </template>
  </Layout>
</template>

<style scoped>
.last-updated {
  margin-bottom: 10px;
}
</style>