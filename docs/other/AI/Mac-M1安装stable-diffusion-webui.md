---
date: 2023-09-27
---

# Mac M1 安装 stable-diffusion-webui

## 什么是 Stable Diffusion

Stable Diffusion 是2022年发布的深度学习文本到图像生成模型。它主要用于根据文本的描述生成详细图像，它也可以应用于其他任务，如内补绘制、外补绘制，以及在提示词​（英语）指导下产生图生图的翻译。

## 什么是 SD-webui（stable-diffusion-webui）

越南超人 AUTOMATIC1111 针对 Stable Diffusion 开发的一套 GUI 图形化界面。它集成了大量代码层面的繁琐应用，将 Stable Diffusion 的各项绘图参数转化成可视化的选项数值和操控按钮。如今各类开源社区里 90%以上的拓展应用都是基于它而研发的。

## SD-webui 地址

GitHub: <https://github.com/AUTOMATIC1111/stable-diffusion-webui>

## 安装环境

- 芯片: Apple M1 Pro
- 内存: 32G
- MacOS: Ventura 13.0.1

官方安装指南：[Installation-on-Apple-Silicon](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon)

## 安装步骤

### homebrew 安装

进入 <https://brew.sh/> 官网，复制命令到本机 Terminal 执行：

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![homebrew-install](/assets/sd-webui-install/homebrew.png)

看到上图的安装成功字眼后，复制「Next steps」下方的命令执行就 OK 了。

### 安装 python3 和其他工具

终端执行:

```shell
brew install cmake protobuf rust python@3.10 git wget
```

- Cmake:开源的跨平台的构建工具，它用于自动化构建、测试和打包软件。
- Protobuf：Google 开发的一种数据序列化格式，它可以将结构化数据序列化为二进制格式，提高数据传输效率。
- Rust：系统级编程语言，它被设计为安全、并发和高效的语言，可以用于开发高性能的系统软件。
- Python@3.10：Python 编程语言的一个版本，这里是指 Python 的 3.10 版本。
- Git：分布式版本控制系统，用于跟踪和管理代码的变化，使得多人协作开发变得更加容易。
- Wget：用于从 Web 上下载文件的命令行工具，可以通过命令行下载文件或者从脚本中自动下载文件。

### 下载 SD-webui 项目

进入你想要存放项目的目录下执行:

```shell
git clone git@github.com:AUTOMATIC1111/stable-diffusion-webui.git
```

注意点：

安装的路径不要有中文且减少输入空格：因为整个代码运行都是使用的英文字符，文件夹中文名会导致在检索过程中出现无法识别等报错问题，所以记得将文件夹替换成拼音或者英文。
放置 WebUI 程序的文件夹预留至少 50G 以上空间：在后续使用 AI 绘画过程中会下载大量模型，要提取预留出磁盘空间。

## 运行 SD-webui

在 SD-webui 项目目录下，终端输入命令 `./webui.sh` ，日后我们每次使用 WebUI 时都是用这个方法来打开。

![sd-webui-start](/assets/sd-webui-install/sd-webui-start.png)

运行完成后会显示本地运行地址，将其粘贴到浏宽器中打开就好了。

![webui](/assets/sd-webui-install/webui.png)

## 模型下载及初步绘图

### 常用模型下载网站

Hugging Face（抱脸网）：专注于构建、训练和部署先进开源机器学习模型的网站，包含的内容非常广泛，不仅仅包括 AI 绘画，还包括很多其他 AI 领域的东西。

网站地址： <https://huggingface.co/models>

![huggingface](/assets/sd-webui-install/huggingface.png)

Civitai（C 站）：专业的 AI 绘画模型分享平台，无需注册即可访问和下载模型，包含模型的详细介绍、使用教程、参考图等丰富内容

网站地址： <https://civitai.com/>

![civitai](/assets/sd-webui-install/civitai.png)

哩布哩布 AI：国内的 AI 绘画原创模型网站，包含大量模型和绘图作品，还支持在线 Stable Diffusion 绘图。

网站地址： <https://www.liblib.ai/>

![liblib](/assets/sd-webui-install/liblib.png)

### 下载模型

首先了解一下模型存放路径。

基本模型比较大，每个都是几个G，放在：

```shell
stable-diffusion-webui/models/Stable-diffusion
```

官方1.4和1.5模型，点击一个模型，然后点击 Files and versions 。寻找以.ckpt 或.safetensors为扩展名的文件，然后点击文件大小右边的向下箭头下载它们:

- [Stable DIffusion 1.4](https://huggingface.co/CompVis/stable-diffusion-v-1-4-original) [(sd-v1-4.ckpt)](https://huggingface.co/CompVis/stable-diffusion-v-1-4-original/resolve/main/sd-v1-4.ckpt)
- [Stable Diffusion 1.5](https://huggingface.co/runwayml/stable-diffusion-v1-5) [(v1-5-pruned-emaonly.ckpt)](https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt)
- [Stable Diffusion 1.5 Inpainting](https://huggingface.co/runwayml/stable-diffusion-inpainting) [(sd-v1-5-inpainting.ckpt)](https://huggingface.co/runwayml/stable-diffusion-inpainting/resolve/main/sd-v1-5-inpainting.ckpt)

Stable Diffusion 2.0和2.1需要一个模型和一个配置文件，在生成图像时，图像宽度和高度需要设置为768或更高。

- [Stable Diffusion 2.0](https://huggingface.co/stabilityai/stable-diffusion-2) [(768-v-ema.ckpt)](https://huggingface.co/stabilityai/stable-diffusion-2/resolve/main/768-v-ema.ckpt)
- [Stable Diffusion 2.1](https://huggingface.co/stabilityai/stable-diffusion-2-1) [(v2-1_768-ema-pruned.ckpt)](https://huggingface.co/stabilityai/stable-diffusion-2-1/resolve/main/v2-1_768-ema-pruned.ckpt)

lora模型通常只有一百兆左右，放在 `stable-diffusion-webui/models/Lora`

### 文生图基本流程

找的网图：

![sdweb-intro](/assets/sd-webui-install/sdweb-intro.jpeg)
