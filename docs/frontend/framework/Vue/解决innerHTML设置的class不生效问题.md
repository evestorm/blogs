---
date: 2022-04-15
---

# 解决 innerHTML 设置的 class 不生效问题

## 问题

在使用 innerHtml 拼接字符串 svg 渲染页面时，拼接的 svg 里有使用到 class 的，但是不生效。

## 解决方法

使用样式穿透进行修改样式，如下:

```vue
<style lang="scss" scoped>
/deep/ .animated-line {
  fill: none;
  stroke: blue;
  stroke-width: 2;
  stroke-dasharray: 1000;
  animation: dash 15s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -1000;
  }
}
</style>
```

## 原因

在 Vue 中，如果直接使用 `innerHTML` 来设置 HTML 内容，会绕过 Vue 的虚拟 DOM，导致 Vue 无法感知到更新的内容，从而不会触发响应式更新和重新渲染。因此，通过 innerHTML 设置的内容无法应用 Vue 的绑定和响应式功能。
