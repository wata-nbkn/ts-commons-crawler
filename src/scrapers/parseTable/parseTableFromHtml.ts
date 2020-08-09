import * as cheerio from 'cheerio';
import { parseTable } from './parseTable';

export type ParseTableOptions = {
  tableSelector?: string;
  firstLineAsHeader?: boolean;
};

export const parseTableFromHtml = (body: string, options?: ParseTableOptions) => {
  const { tableSelector = 'table', firstLineAsHeader = true } = options || {};
  const $ = cheerio.load(body, { decodeEntities: false });
  const table = $(tableSelector);
  return parseTable(table, { firstLineAsHeader });
};
