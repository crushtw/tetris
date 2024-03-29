## 项目介绍

-   俄罗斯方块小游戏
-   在线体验：https://crushtw.github.io/tetris/
-   github 地址：https://github.com/crushtw/tetris
-   主分支：main

## 环境依赖及主要技术栈

-   node@v16.20.0
-   react + ts

## 如何开始

安装依赖：`npm install`

项目启动：

-   `npm start`

项目打包：

-   `npm run build`

## 项目结构

    |-- lanoyade
    |-- .gitignore            	    // git忽略文件配置
    |-- README.md                   // help
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- yarn.lock
    |-- config                      // webpack配置
    |   |-- webpack.base.js
    |   |-- webpack.dev.js
    |   |-- webpack.prod.js
    |-- public                      // 静态资源目录
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.css	                // 全局样式
        |-- App.tsx					// 模块入口文件
        |-- index.css
        |-- index.tsx				// 项目入口文件
    	|-- assets                  // 图片、css等资源文件
        |   |-- images				// 图片文件
    	|   |-- style				// 样式文件
        |-- common
        |   |-- constants.ts        // 常量
        |   |-- interface.ts        // 通用接口
        |-- endBoard				// 游戏结束组件
        |   |-- EndBoard.css
        |   |-- EndBoard.tsx
        |-- sideBoard				// 侧边栏组件
        |   |-- Sider.css
        |   |-- Sider.tsx
        |-- startBoard				// 游戏开始组件
        |   |-- StartBoard.css
        |   |-- StartBoard.tsx
        |-- utils					// 工具文件
            |-- arrowAction.ts		// 移动方块fn
            |-- block.ts			// 方块获取、计算、转换等fn
            |-- color.ts			// 颜色相关fn
