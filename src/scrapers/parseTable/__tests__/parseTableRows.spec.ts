import * as cheerio from 'cheerio';
import { parseTableRows } from '../parseTableRows';
import { basicTable, theadWithTd, invalidTable } from './testData';

describe('parseTableRows', () => {
  it('should return rows when including th', () => {
    const $ = cheerio.load(basicTable);
    const table = $('table');

    const result = parseTableRows(table);
    expect(result[0]).toEqual(['head1', 'head2']);
    expect(result[1]).toEqual(['val11', 'val12']);
    expect(result[2]).toEqual(['val21', 'val22']);
    expect(result[3]).toEqual([1000, 2000]);
  });

  it('should return rows when not including th', () => {
    const $ = cheerio.load(theadWithTd);
    const table = $('table');

    const result = parseTableRows(table);
    expect(result[0]).toEqual(['head1', 'head2']);
    expect(result[1]).toEqual(['val11', 'val12']);
    expect(result[2]).toEqual(['val21', 'val22']);
  });

  it('should return empty array with an invalid table', () => {
    const $ = cheerio.load(invalidTable);
    const table = $('table');

    const result = parseTableRows(table);
    expect(result).toEqual([]);
  });

  describe('with ignoreLineBreak = false', () => {
    it('should return rows when including th', () => {
      const $ = cheerio.load(basicTable);
      const table = $('table');

      const result = parseTableRows(table, { ignoreLineBreak: false });
      expect(result[0]).toEqual([['head1'], ['head', 2]]);
      expect(result[1]).toEqual([['val11'], ['val12']]);
      expect(result[2]).toEqual([['val21'], ['va', 'l22']]);
      expect(result[3]).toEqual([[1000], [200, 0]]);
    });

    it('should return rows when not including th', () => {
      const $ = cheerio.load(theadWithTd);
      const table = $('table');

      const result = parseTableRows(table, { ignoreLineBreak: false });
      expect(result[0]).toEqual([['head1'], ['head', 2]]);
      expect(result[1]).toEqual([['val11'], ['val12']]);
      expect(result[2]).toEqual([['val21'], ['va', 'l22']]);
    });

    it('should return empty array with an invalid table', () => {
      const $ = cheerio.load(invalidTable);
      const table = $('table');

      const result = parseTableRows(table, { ignoreLineBreak: false });
      expect(result).toEqual([]);
    });
  });
});
