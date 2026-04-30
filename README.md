# 个人作品集网站

这是一个纯前端（HTML + CSS + JavaScript）的极简作品集个站。

## 目标

- 参考 `https://nevflynn.com/` 的风格，做一个简洁、现代、可读性强的个人主页
- 不依赖框架，方便初学者直接修改和部署
- 支持深色/浅色主题切换

## 文件说明

- `index.html`：页面结构
- `assets/css/style.css`：页面样式
- `assets/js/script.js`：交互逻辑（主题切换、当前年份）
- `assets/images/`：图片资源目录

## 本地运行

如果你安装了 Python，在当前目录执行：

```bash
python3 -m http.server 8080
```

然后打开：

`http://localhost:8080`

## 一键发布到 GitHub Pages

首次使用前给脚本执行权限：

```bash
chmod +x deploy.sh
```

之后每次改完网站内容，在项目目录运行：

```bash
./deploy.sh "更新说明"
```

示例：

```bash
./deploy.sh "更新首页文案和项目卡片"
```

发布成功后，GitHub Pages 会自动重新部署，通常 1-5 分钟同步到线上链接。

## 后续可改

- 替换个人信息（名字、简介、社交链接）
- 替换项目卡片内容
- 增加博客详情页或项目详情页
