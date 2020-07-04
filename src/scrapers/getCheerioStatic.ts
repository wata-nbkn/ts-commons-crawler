import * as cheerio from 'cheerio';

export const getCheerioStatic = (elem: Cheerio) => {
  const html = elem.html() || '';
  return cheerio.load(html);
};
