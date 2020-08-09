import * as fs from 'fs';
import * as cheerio from 'cheerio';

export const loadFileAsCheerio = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(fileContent, { decodeEntities: false });
  return $;
};
