const fs = require('fs').promises;
const jsdom = require('jsdom');
const {documentBaseURL} = require("jsdom/lib/jsdom/living/helpers/document-base-url");

const {JSDOM} = jsdom;

const rootDirectory = './iskull-dev';

const controlDocument = {
  removeChildren: (document, target) => document.querySelector(target).innerHTML = '',
  getHtmlElements: (document, target) => document.querySelector(target).innerHTML,
  getTextElements: (document, target) => document.querySelector(target).innerText,
  getWholeFileAsString: (document) => document.querySelectorAll('*').item(0).innerHTML,
}

const changeDirectoryName = async () => {
  const oldPath = './blog';
  const newPath= './iskull-dev'
  await fs.rename(oldPath, newPath);
}

const getHtmlAsString = async () => {
    const filePath = `${rootDirectory}/3/`;
    const htmlFileName = ((await (fs.readdir(filePath))).filter(fn => fn.endsWith('.html')))[0];
    return await fs.readFile(`${filePath}${htmlFileName}`, 'utf8');
}

const createMetaData = (title, tags) => `
---
layout:       post
title:        "${title}"
author:       "yunki kim"
header-style: text
catalog:      true
tags: ${tags.map(tag => `- ${tag}\n`)}
---
`

getHtmlAsString().then(data => {
  const document = (new JSDOM(data)).window.document;
  const tags = controlDocument.getHtmlElements(document, '.tags');
  const date = controlDocument.getHtmlElements(document, '.date');
  const title = controlDocument.getHtmlElements(document, 'title');
  console.log(tags, date, title);
  controlDocument.removeChildren(document, 'head');
  controlDocument.removeChildren(document, '.article-header');
  controlDocument.removeChildren(document, '.tags')
  console.log(controlDocument.getWholeFileAsString(document));
});
