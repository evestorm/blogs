import{_ as a,c as e,o,a5 as t}from"./chunks/framework.CAnTzXjG.js";const i="/blogs/assets/%E5%88%A9%E7%94%A8Apifox%E5%8E%8B%E5%8A%9B%E6%B5%8B%E8%AF%95/apifox-test.png",h=JSON.parse('{"title":"利用 Apifox 压力测试","description":"","frontmatter":{"date":"2024-09-17T00:00:00.000Z"},"headers":[],"relativePath":"2-后端/3-工具/Apifox/1-利用 Apifox 压力测试.md","filePath":"2-后端/3-工具/Apifox/1-利用 Apifox 压力测试.md"}'),p={name:"2-后端/3-工具/Apifox/1-利用 Apifox 压力测试.md"},r=t('<h1 id="利用-apifox-压力测试" tabindex="-1">利用 Apifox 压力测试 <a class="header-anchor" href="#利用-apifox-压力测试" aria-label="Permalink to &quot;利用 Apifox 压力测试&quot;">​</a></h1><h2 id="文档" tabindex="-1">文档 <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;文档&quot;">​</a></h2><ul><li><a href="https://apifox.com/blog/performance-testing/" target="_blank" rel="noreferrer">在 Apifox 中开展 API 性能测试的全面指南</a></li></ul><p>文档写的很详细就不用我再 copy 一份了。这里主要记录下它的问题和暂时解决方案。</p><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h2><p>截止目前 2024-09-17，Apifox 的这个 beta 版本的性能测试功能感觉还不是很好用，实际测下来它的确单位时间内模拟了 n 个用户调用 api，但给出的实时数据和报告不太准确。所以我改为使用「功能测试」的多线程来代替压测功能:</p><p><img src="'+i+'" alt="利用Apifox压力测试"></p><p>上图中把线程数调整为 40 来模拟同时有 40 个用户调用接口，这种方案下 Apifox 得到的报告才是准确的，和我后台记录的吻合。后续如果 Apifox 有更新再来更新。</p>',8),_=[r];function s(f,n,c,l,x,A){return o(),e("div",null,_)}const m=a(p,[["render",s]]);export{h as __pageData,m as default};
