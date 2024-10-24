---
date: 2024-04-15
---

# Tinymce 设置默认字体

## 问题发现

项目中需要用到 Tinyemce 富文本编辑器，为了不涉及版权问题，需要将默认字体改为开源字体（选择了「阿里巴巴普惠体」）。

## 解决方案

> 参考文档：<https://www.tiny.cloud/blog/tinymce-custom-font-family/>

### 1. init 中配置 font_family_formats

```js{2}
const init = {
  font_family_formats: "阿里巴巴普惠体=Alibaba_Normal;Andale Mono=andale mono,times;"
}
```

### 2. init 中配置 content_style - Tinymce 富文本内生效

body 中的就是默认字体

```js{3-9}
// ⬇️ 下边是设置菜单栏的默认选中，并不会设置默认行为，默认行为的样式在 @src/style/index.scss 中设置 ⬇️
const init = {
  content_style: `
    @font-face { font-family: 'Alibaba_Normal'; src: url('https://one-admin-coco-1302339726.cos.ap-shanghai.myqcloud.com/font/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
    body {
      font-family: 'Alibaba_Normal';
      font-size: 14px;
    }
  `,
};
```

### 3. 网站通用样式中 tinymce.css - 网站生效

一样的要配置

```scss
// 在 @src/style/tinymce.scss 中设置, 原理是全局设置 .mce-content-body 下的所有默认样式
@font-face {
  font-family: 'Alibaba_Normal';
  src: url('https://one-admin-coco-1302339726.cos.ap-shanghai.myqcloud.com/font/Alibaba_PuHuiTi_2.0_55_Regular_55_Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.mce-content-body {
  font-family: 'Alibaba_Normal',"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 14px;
}
```
