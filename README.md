# bimdat.github.io

基于 Hexo 的博客项目，支持 Markdown 内容管理，并通过 GitHub Actions 自动发布到 GitHub Pages。

## 本地开发

1. 安装依赖

	npm install

2. 启动本地服务

	npm run server

3. 生成静态文件

	npm run build

4. 预览草稿（可选）

	npm run server:drafts

## 新建 Markdown 文章

执行命令：

npm run new:post -- "文章标题"

文章会生成在 `source/_posts` 目录，使用 Markdown 编写即可。

创建页面：

npm run new:page -- "about"

## 自动部署

- 已配置工作流：`.github/workflows/deploy.yml`
- 当代码推送到 `main` 分支时，GitHub Actions 会自动构建并发布到 GitHub Pages

### Pages 设置要求

- 仓库 `Settings -> Pages -> Build and deployment -> Source` 必须选择 `GitHub Actions`
- 不要选择 `Deploy from a branch`，否则会触发 Jekyll 解析根目录 `_config.yml`

### 常见报错

如果出现 `The landscape theme could not be found`，说明正在走 Jekyll 流程，而不是 Hexo Actions 流程。

处理方式：

1. 将 Pages Source 改为 `GitHub Actions`
2. 确认工作流 `Deploy Hexo To GitHub Pages` 执行成功
3. 重新推送一次 `main` 分支触发部署

## 导航与页面

- 已配置顶部导航：Home / Archives / Categories / Tags / About
- About 页面：`source/about/index.md`
- 主题配置：`_config.landscape.yml`

## 模板规范

- 文章模板：`scaffolds/post.md`
- 草稿模板：`scaffolds/draft.md`
- 页面模板：`scaffolds/page.md`

## 示例文章

- `source/_posts/markdown-basics.md`
- `source/_posts/markdown-levels.md`
- `source/_posts/content-management-workflow.md`
