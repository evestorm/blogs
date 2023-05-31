# 表格 Table

## 属性

- table `display: table`
  - attr
    - `border` 边框
    - `cellpadding` 单元格内边距
    - `cellspacing` 单元格边距
  - `caption` 标题标签 `display: table-caption`
  - `tr` - table row 表格行标签 `display: table-row`
    - `th` - table header cell 表头标签 `display: table-cell`
    - `td` - table data cell 单元格标签 `display: table-cell`
      - `rowspan` - 合并n行
      - `colspan` - 合并n列
      - align - left | right | center 对齐方式
  - `thead` - table head 表格页眉标签 `display: table-header-group`
  - `tfoot` - table foot 表格页尾标签 `display: table-footer-group`
  - `tbody` - table body 表格主体标签 `display: table-row-group`

## 🌈 注意点

- `thead、tfoot、tbody` 要写的意义：
  - 不写，如果数据多，整个表格会等数据完全加载完后才显示；如果都写了，页眉和页尾则不用等数据完全加载完就会先展示出来
- 加载顺序：`thead -> tfoot -> tbody`
  - 就算把 `tfoot` 写在 `thead` 前面，也不会影响它们的显示顺序，`thead` 还是会在 `tfoot` 上面显示

## 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <table border="1" cellpadding="10" cellspacing="10">
    <caption>用户</caption>
    <thead>
      <tr>
        <th>ID</th>
        <th>姓名</th>
        <th>电话</th>
        <th>年龄</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Lance</td>
        <td>18722212223</td>
        <td>26</td>
      </tr>
      <tr>
        <td>2</td>
        <td>GC</td>
        <td>18677721122</td>
        <td>30</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Jerry</td>
        <!-- 合并n列 -->
        <td colspan="2">colspan合并2列</td>
      </tr>
      <tr>
        <td>4</td>
        <td>QB</td>
        <td>17699921242</td>
        <td rowspan="2">rowspan合并2行</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Sherry</td>
        <td>18677721122</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" align="right">合并整行</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>
```

![Table Demo](/assets/表格Table/table-demo.png)
