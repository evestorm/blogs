---
date: 2023-11-09
---

# 无法访问 github 导致 git pull 拉取项目失败的解决方案

## 1. 寻找可用的IP地址

这里我们通过 PING 测试工具来检查有哪些 github 可用的 IP

```shell
工具：https://ping.chinaz.com/github.com
```

在此网站监听结果列表中找寻延迟低的。

## 2. 修改HOSTS

这里我们需要修改 HOSTS:

```shell
sudo vi /etc/hosts
```

在里边新增两行:

```shell
20.205.243.166 github.com
20.205.243.166 raw.githubusercontent.com
```

最后 `:wq` 保存就好了
