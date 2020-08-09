import * as cheerio from 'cheerio';

export const getCheerioStatic = (elem: Cheerio) => {
  const parent = elem.parent();
  let html = '';
  if (parent) {
    html = parent.html() || '';
  } else {
    html = elem.html() || '';
  }
  return cheerio.load(html, { decodeEntities: false });
};
