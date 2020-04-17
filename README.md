# Kelvin Mok Personal Website
- Using [Gatsby Starter blog template created with web developers](https://www.gatsbyjs.org/starters/willjw3/gatsby-starter-developer-diary/)

## development server
```bash
yarn dev
# OR
gatsby develop
```
- Go to the http://localhost:8000 to see your new blog.
- Go to http://localhost:8000/___graphql to explore your site with a simple GraphQL interface.
- Go to the http://localhost:8000/admin/ to access the content management system. (Make sure you've set things up with  Netlify CMS first - see "Adding blog posts using Netlify CMS (Content Management System)" below)

## Adding Posts with Netlify CMS
去到 /admin 登入後直接 Netlify CMS 上 edit
**注意在後台的對文章的操作會直接 commit 到 Master分支 -> Netlify 會 auto deploy

## Adding Blog Posts Manually
在 `post` folder下建立 markdown 檔案
```
---
title: 'Make a Blog With React'
tags: ["react", "nodejs"]
published: true
date: '2019-05-29'
---
```
