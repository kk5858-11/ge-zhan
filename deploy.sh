#!/usr/bin/env bash

set -euo pipefail

# 用法：
# ./deploy.sh "更新说明"
# 如果不传更新说明，会使用默认提交信息。
MESSAGE="${1:-update site content}"

echo "==> 检查仓库状态"
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "错误：当前目录不是 Git 仓库。"
  exit 1
fi

echo "==> 添加文件到提交区"
git add .

# 如果没有改动，直接提示并退出，避免空提交报错。
if git diff --cached --quiet; then
  echo "没有检测到文件改动，无需发布。"
  exit 0
fi

echo "==> 提交改动"
git commit -m "$MESSAGE"

echo "==> 推送到 GitHub（main）"
git push origin main

echo "发布完成：GitHub Pages 会在几分钟内同步更新。"
