---
date: 2024-04-15
---

# Tinyemce 插件编写

> 参考来源：<https://www.cnblogs.com/cinea/p/17868777.html>

## 首先创建文件

![创建文件夹](/assets/Tinymce插件编写/tinymce-plugin.png)

## 插件编写

```js
import tinymce from "tinymce/tinymce";
import { useBookStore } from "@/store/modules/book";
import CocoSymbol from "@/components/Coco/enums";
import {numberToChinese} from "@/utils/translate";

function generateOutline(editor) {
  const bookStore = useBookStore();
  const outlineTreeList = bookStore.currentBook.bookOutline;
  // 根据 outlineTreeList 生成目录大纲树的 html 片段
  const htmlStr= arrayToHTML(outlineTreeList);
  editor.insertContent(htmlStr);
}

tinymce.PluginManager.add('outline', (editor, url) => {
  // 为插件注册一个按钮
  editor.ui.registry.addButton("outline", {
    icon: "toc",
    tooltip: "生成目录大纲",
    onAction: function () {
      generateOutline(editor);
    },
  })

  // 为插件注册一个菜蛋项
  editor.ui.registry.addMenuItem("outline", {
    icon: "toc",
    text: "生成目录大纲",
    onAction: function () {
      generateOutline(editor);
    },
  })

  // 返回插件的元数据
  return {
    getMetadata: function () {
      return {
        name: "Outline",
        url: "https://www.cinea.cc/",
      }
    },
  }
});

function arrayToHTML(treeArray) {
  let htmlString = '<ul style="list-style-type: none;">';
  treeArray.forEach(node => {
    if ([CocoSymbol.CustomViewType].includes(node.outlineType)) return;
    htmlString += `<li>${generatorOutlineName(node)}`;
    if (node.children && node.children.length > 0) {
      htmlString += arrayToHTML(node.children);
    }
    htmlString += '</li>';
  });
  htmlString += '</ul>';
  return htmlString;
}

function generatorOutlineName(outline) {
  // 生成目录大纲的名称
  const outlineTypeName = [CocoSymbol.SectionType, CocoSymbol.CustomViewType].includes(outline.outlineType) ? '' : outline.outlineType;
  const outlineNumber = [CocoSymbol.ModuleType].includes(outline.outlineType) ? numberToChinese(outline.sort) : outline.sort;
  const connectSymbol = [CocoSymbol.SectionType, CocoSymbol.CustomViewType].includes(outline.outlineType) ? '' : '';
  const outlineName = outline.outlineName;
  return `${outlineTypeName}${outlineNumber}  ${connectSymbol}  ${outlineName}`;
}
```

## 选择图标

<https://www.tiny.cloud/docs/tinymce/latest/editor-icon-identifiers/>

## 插件效果

![插件效果](/assets/Tinymce插件编写/gen-outline.png)
