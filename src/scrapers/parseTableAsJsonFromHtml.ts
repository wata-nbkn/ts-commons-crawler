import { parseTableFromHtml, ParseTableOptions } from './parseTable';
import { convertTableToJson } from './convertTableToJson';

export const parseTableAsJsonFromHtml = (body: string, options?: ParseTableOptions) => {
  const table = parseTableFromHtml(body, options);
  return convertTableToJson(table.headers, table.rows);
};
