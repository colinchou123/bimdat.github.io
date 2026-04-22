---
title: 内容管理流程示例
date: 2026-04-22 10:20:00
categories:
  - 运维
tags:
  - workflow
  - github-actions
---

这篇文章演示从本地写作到 GitHub Pages 发布的完整流程。

## 1. 新建文章

```bash
npx hexo new "我的新文章"
```

## 2. 本地预览

```bash
npm run server
```

## 3. 提交代码

```bash
git add .
git commit -m "新增文章"
git push origin main
```

## 4. 自动部署

推送到 `main` 后，GitHub Actions 会自动执行构建并发布到 GitHub Pages。
