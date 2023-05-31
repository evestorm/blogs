const path = require('path');
import dirTree from 'directory-tree';

interface ITreeItem {
  name: string;
  path: string;
  children?: ITreeItem[] | undefined;
}

function toSidebarOption(tree: ITreeItem[] = []) {
  if (!Array.isArray(tree)) return [];

  return tree.map((v) => {
    if (v.children !== undefined) {
      return {
        text: v.name,
        collapsible: true,
        collapsed: false,
        items: toSidebarOption(v.children),
      };
    } else {
      return {
        text: v.name.replace(".md", ""),
        link: v.path.split("docs")[1].replace(".md", ""),
      };
    }
  });
}

function autoGetSidebarOptionBySrcDir(srcPath, title) {
  const srcDir = dirTree(srcPath, {
    extensions: /\.md$/,
    normalizePath: true,
  });


  return [
    {
      text: title == undefined ?  srcDir.name : title ,
      collapsible: true,
      collapsed: false,
      items: toSidebarOption(srcDir.children),
    },
  ];
}

export {
  autoGetSidebarOptionBySrcDir
}

