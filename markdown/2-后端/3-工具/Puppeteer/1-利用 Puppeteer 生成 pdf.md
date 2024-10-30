---
date: 2024-08-23
---

# 利用 Puppeteer 生成 PDF

## 需求

项目中有个需求是能够把在线的电子教材导出成 pdf 下载到本地。这里记录下实现方案。

## 整体思路

前端提供给后端一个能够访问预览 pdf 的 url 地址 ，后端通过 Puppeteer 访问前端提供的 url 地址，得到 pdf Buffer 后，再转为文件对象返回给前端。

## 具体实现

后端使用 express 搭建。

### 下载相关包

```shell
npm install puppeteer@22.15.0 puppeteer-core@22.15.0 @sparticuz/chromium@123.0.1
```

### 编写 Controller

```ts
import chromium from "@sparticuz/chromium";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export default {
  async downloadCoco(req, res) {
        const params = validate(res, Object.assign({}, req.query, req.params, req.body), schema);
        const { bookId, bookName, baseUrl, bookPageConfig, mode = 'edit' } = params; // bookId: 教材 id, baseUrl: baseUrl地址, bookPageConfig: 教材页面配置, mode: 模式（edit: 支持选中文字 ｜detail: 不支持选中文字）
        const { size } = bookPageConfig;

        let p = null;
        let options = {};
        if (isDev) {
            p = puppeteer;
            options = {
                headless: true
            }
        } else {
            p = puppeteerCore;
            options = {
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(), // 生产环境使用我们自定义的chromium路径
                headless: chromium.headless,
            }
        }

        const browser = await p.launch(options);
        const page = await browser.newPage();
        // 添加 token
        await page.setExtraHTTPHeaders({
            'Authorization': req.headers.authorization
        });
        await page.goto('前端提供的 url 地址', {waitUntil: 'networkidle0'});
        const scale = 1;
        const pdf = await page.pdf({
            printBackground: true,
            width: size.width * scale + 'px',
            height: size.height * scale + 'px',
            scale: scale,
        });
        await browser.close();

        if (pdf) {
            // 将 PDF Buffer 转换为文件对象
            const pdfFile = Buffer.from(pdf);
            const [err, data] = await uploadFileToCos(pdfFile, {
                fileName: bookName,
                ContentType: 'application/pdf',
                'Content-Disposition': `attachment; filename=${encodeURIComponent(bookName)}.pdf`
            }, config.cos.SOURCE_PDF_TEMP_PATH);
            if (err) {
                return sendResponse(res, {
                    success: false,
                    error_msg: '上传 PDF 文件到 COS 失败',
                    err,
                });
            } else {
                return sendResponse(res, {
                    data: {
                        url: data
                    },
                    error_msg: '下载成功'
                });
            }
        } else {
            return sendResponse(res, {
                success: false,
                error_msg: '生成 PDF 文件失败'
            });
        }
    },
}
```
