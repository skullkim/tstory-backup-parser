const {DocumentParser} = require("./DocumentParser");

const DATE_INDEX = 0;
const HASH_TAG_DELIMITER = '#';

const DataParser = {
  getDate: (dateTime) => dateTime.split(' ').at(DATE_INDEX),
  getTagsAsArray: (rawTags) => rawTags.replace(/\s/g, '')
    .split(HASH_TAG_DELIMITER)
    .filter(tag => tag !== ''),
  combineMetaDataAndMainContext: (metaData, mainContext) => `${metaData}\n${mainContext}`,
}

const getRequiredDataFromDocument = (document) => {
  const title = DocumentParser.getElements(document, 'title');
  console.log(DataParser.getTagsAsArray(DocumentParser.getElements(document, '.tags')));
  const tags = DataParser.getTagsAsArray(DocumentParser.getElements(document, '.tags'));
  const date = DataParser.getDate(DocumentParser.getElements(document, '.date'));

  return {title, tags, date};
}

module.exports = {DataParser, getRequiredDataFromDocument};