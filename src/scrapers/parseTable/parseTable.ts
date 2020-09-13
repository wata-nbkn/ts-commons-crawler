import { LogUtil } from '@wata-nbkn/ts-commons/lib/utils';
import { INTERNAL_LOGDIR_PATH } from 'consts';
import { parseTableRows } from './parseTableRows';

export interface ParsedTable {
  headers: string[];
  rows: string[][];
}

export const parseTable = (table: Cheerio, options?: { firstLineAsHeader?: boolean }): ParsedTable => {
  const { firstLineAsHeader = true } = options || {};

  const logger = LogUtil.getLogger(`${INTERNAL_LOGDIR_PATH}/parseTable`);
  logger.debug('Enter:: [parseTable]');

  const rows: string[][] = parseTableRows(table);
  let headers: string[] = [];
  if (firstLineAsHeader && rows[0]) {
    headers = rows.shift() || [];
    logger.trace(`header = ${headers.join(', ')}`);
  }

  logger.trace(`rows = ${rows.join(', ')}`);
  logger.debug('Exit:: [parseTable]');

  return {
    headers,
    rows,
  };
};
