# **引入 CSS 有哪几种方式**

## **导入式**

```html
<style type="text/css">
  @import "mystyle.css"; <!-- 此注意.css文件的路径 -->
</style>
```

## **外链式**

```html
<link rel="stylesheet" type="text/css" href="my.css" />
```

## **行内式**

```html
<!-- 直接在页面的标签里加 -->
<div style="border:1px red solid;">测试信息</div>
```

## **内嵌式**

```html
<!-- 在head部分加入 -->
<style type="text/css">div { margin: 0; }</style>
```