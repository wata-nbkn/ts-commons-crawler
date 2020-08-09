import { MathUtil } from '@wata-nbkn/ts-commons/lib/utils';
import { trimCell } from './trimCell';
import { parseCellAsArray } from './parseCellAsArray';
import { getCheerioStatic } from '../getCheerioStatic';

export const parseTableRows = (table: Cheerio, options?: { ignoreLineBreak: boolean }) => {
  const { ignoreLineBreak = true } = options || {};
  const rows: string[][] = [];

  const $ = getCheerioStatic(table);
  const trs = table.find('tr');

  trs.each((trIndex, tr) => {
    const cells: string[] = [];

    const pushCell = (v: CheerioElement) => {
      let trimmedValue: any;
      if (ignoreLineBreak) {
        trimmedValue = trimCell($(v).text());
        if (MathUtil.isNumber(trimmedValue)) {
          trimmedValue = Number(trimmedValue);
        }
      } else {
        trimmedValue = parseCellAsArray($(v).html());
      }
      cells.push(trimmedValue);
    };

    $(tr)
      .find('th')
      .each((tdIndex, td) => pushCell(td));

    $(tr)
      .find('td')
      .each((tdIndex, td) => pushCell(td));

    if (cells.length) {
      rows.push(cells);
    }
  });

  return rows;
};
