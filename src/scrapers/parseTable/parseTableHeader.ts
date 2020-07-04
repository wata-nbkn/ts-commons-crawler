import { CommonUtil } from '@wata-nbkn/ts-commons/lib/utils';
import { trimCell } from './trimCell';
import { getCheerioStatic } from '../getCheerioStatic';

export const parseTableHeader = (table: Cheerio) => {
  const logger = CommonUtil.getLogger(__filename);
  logger.debug('Enter [parseTableHeader]');

  const $ = getCheerioStatic(table);
  const headers: string[] = [];

  const push = (v: CheerioElement) => {
    const value = trimCell($(v).text());
    headers.push(value);
  };

  const pushHeads = (elem: CheerioElement) => {
    const ths = $(elem).find('th');
    if (ths && ths.length) {
      logger.trace('<th> is found');
      ths.each((i, th) => push(th));
    } else {
      logger.trace('<th> is not found so use <td> as head');
      const tds = $(elem).find('td');
      tds.each((i, td) => push(td));
    }
  };

  const thead = table.find('thead').find('tr');
  if (thead && thead[0]) {
    logger.trace('<thead> is found');
    pushHeads(thead[0]);
  } else {
    logger.trace('<thead> is not found so parse the first <tr>');
    const trs = table.find('tr');
    if (trs && trs[0]) {
      pushHeads(trs[0]);
    } else {
      logger.trace('<tr> is not found');
    }
  }

  logger.debug('Exit [parseTableHeader]');
  return headers;
};
