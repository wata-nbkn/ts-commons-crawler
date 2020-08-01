import { parseTable, ParseTableOptions } from './parseTable';
import { convertTableToJson } from './convertTableToJson';

export const parseTableAsJson = (body: Cheerio, options?: ParseTableOptions) => {
  const table = parseTable(body, options);
  return convertTableToJson(table.headers, table.rows);
};
