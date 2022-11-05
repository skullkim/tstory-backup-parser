const jsdom = require('jsdom');

const {DataParser, getRequiredDataFromDocument} = require("./DataParser");
const {removeUselessElements, DocumentParser} = require("./DocumentParser");
const {createMetaData, exportPosting, getHtmlAsString, copyImages} = require("./fileio");

const {JSDOM} = jsdom;

for (let directoryName = 1; directoryName <= 335; directoryName++) {
  getHtmlAsString(directoryName).then(data => {
    const document = (new JSDOM(data)).window.document;
    const {title, tags, date} = getRequiredDataFromDocument(document);
    const metaData = createMetaData(title, tags);
    const encodedTitle = Buffer.from(title, "utf8").toString('base64');
    DocumentParser.changeImageSrc(document, encodedTitle);
    removeUselessElements(document);
    const posting = DataParser.combineMetaDataAndMainContext(metaData, DocumentParser.getWholeFileAsString(document));
    exportPosting(posting, `${date}-${title}`);
    copyImages(directoryName, encodedTitle);
  })
    .catch(() => {});
}
