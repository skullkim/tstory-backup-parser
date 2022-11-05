const fsExtr = require("fs-extra");
const fs = require('fs').promises;

const changeDirectoryName = async () => {
  const oldPath = './blog';
  const newPath= './iskull-dev'
  await fs.rename(oldPath, newPath);
}

const createMetaData = (title, tags) => `---
layout:       post
title:        "${title}"
author:       "yunki kim"
header-style: text
catalog:      true
tags: 
${tags.map(tag => `- ${tag}`).join('\n')}
---
`;

const exportPosting = (posting, fileName, fileExtension = '.md') => {
  const DIRECTORY_PATH = './output/postings/'
  fs.writeFile(`${DIRECTORY_PATH}${fileName}${fileExtension}`, posting)
    .then(() => console.log(`${fileName} created\n`))
    .catch(err => console.log(err));
}

const SOURCE_ROOT_PATH = './iskull-dev';

const getHtmlAsString = async (directoryName) => {
  const filePath = `${SOURCE_ROOT_PATH}/${directoryName}/`;
  const htmlFileName = ((await (fs.readdir(filePath))).filter(fn => fn.endsWith('.html')))[0];
  return await fs.readFile(`${filePath}${htmlFileName}`, 'utf8');
}

const copyImages = (previousTitle, newTitle) => {
  fsExtr.copy(`./iskull-dev/${previousTitle}/img`, `./output/images/${newTitle}`)
    .catch(() => {});
}

module.exports = {
  changeDirectoryName,
  createMetaData,
  exportPosting,
  getHtmlAsString,
  copyImages,
};