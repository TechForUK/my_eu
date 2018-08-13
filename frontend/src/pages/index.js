import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HeadCollector } from 'react-head'
import cheerio from 'cheerio'

import Page from './page'

// Based on https://github.com/markdalgleish/static-site-generator-webpack-plugin#asset-support
function findPageProps(data) {
  const path = data.path
  const assets = Object.keys(data.webpackStats.compilation.assets)
  const nonStaticAssets = assets.filter(file => !file.startsWith('static'))
  const scripts = nonStaticAssets.filter(file => file.match(/\.js$/))
  const stylesheets = nonStaticAssets.filter(file => file.match(/\.css$/))
  return { path, scripts, stylesheets }
}

// Seems untidy to have the data-rh attributes, so remove them.
function removeDataAttrs(html) {
  const $ = cheerio.load(html)
  $('*').removeAttr('data-rh')
  return $.html('head *')
}

//
// The static-site-generator-webpack-plugin calls this method once for each
// page in its routes list (in webpack.config.js), at build time.
//
module.exports = function render(data) {
  const headTags = []
  const content = ReactDOMServer.renderToStaticMarkup(
    <HeadCollector headTags={headTags}>
      <Page {...findPageProps(data)} />
    </HeadCollector>
  )
  const headHtml = ReactDOMServer.renderToStaticMarkup(headTags)
  return `
<!doctype html>
<html lang="en">
<head>${removeDataAttrs(headHtml)}</head>
<body>${content}</body>
</html>`.trim()
}
