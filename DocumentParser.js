const DocumentParser = {
  removeChildren: (document, target) => document.querySelector(target).innerHTML = '',
  getElements: (document, target) => document.querySelector(target).innerHTML,
  getWholeFileAsString: (document) => document.querySelectorAll('*').item(0).innerHTML,
  changeImageSrc: (document, title) =>  document.querySelectorAll('img')
    .forEach(imageElement => {
      if (!imageElement.src.includes('./img')) {
        return;
      }
      const fileName = imageElement.src.split('/')[2];
      imageElement.setAttribute('src', `/img/${title}/${fileName}`);
    }),
}

const removeUselessElements = (document) => {
  DocumentParser.removeChildren(document, 'head');
  DocumentParser.removeChildren(document, '.article-header');
  DocumentParser.removeChildren(document, '.tags')
}

module.exports = {DocumentParser, removeUselessElements};