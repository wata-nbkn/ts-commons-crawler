import * as cheerio from 'cheerio';
import { parseTable } from '../parseTable';
import { basicTable, theadWithTd, noTheadWithTh, noTheadWithTd, invalidTable } from './testData';

describe('parseTable', () => {
  it('should parse table with thead + th', () => {
    const $ = cheerio.load(basicTable);
    const table = $('table');
    const result = parseTable(table);
    expect(result.headers).toEqual(['head1', 'head2']);
    expect(result.rows[0]).toEqual(['val11', 'val12']);
    expect(result.rows[1]).toEqual(['val21', 'val22']);
  });

  it('should parse table with thead + td', () => {
    const $ = cheerio.load(theadWithTd);
    const table = $('table');
    const result = parseTable(table);
    expect(result.headers).toEqual(['head1', 'head2']);
    expect(result.rows[0]).toEqual(['val11', 'val12']);
    expect(result.rows[1]).toEqual(['val21', 'val22']);
  });

  it('should parse table with no thead + th', () => {
    const $ = cheerio.load(noTheadWithTh);
    const table = $('table');
    const result = parseTable(table);
    expect(result.headers).toEqual(['head1', 'head2']);
    expect(result.rows[0]).toEqual(['val11', 'val12']);
    expect(result.rows[1]).toEqual(['val21', 'val22']);
  });

  it('should parse table with no thead + td', () => {
    const $ = cheerio.load(noTheadWithTd);
    const table = $('table');
    const result = parseTable(table);
    expect(result.headers).toEqual(['head1', 'head2']);
    expect(result.rows[0]).toEqual(['val11', 'val12']);
    expect(result.rows[1]).toEqual(['val21', 'val22']);
  });

  it('should return empty array with an invalid table', () => {
    const $ = cheerio.load(invalidTable);
    const table = $('table');
    const result = parseTable(table);
    expect(result.headers).toEqual([]);
    expect(result.rows).toEqual([]);
  });

  describe('with no header option', () => {
    it('should parse table with thead + th', () => {
      const $ = cheerio.load(basicTable);
      const table = $('table');
      const result = parseTable(table, { firstLineAsHeader: false });
      expect(result.headers).toEqual([]);
      expect(result.rows[0]).toEqual(['head1', 'head2']);
      expect(result.rows[1]).toEqual(['val11', 'val12']);
      expect(result.rows[2]).toEqual(['val21', 'val22']);
    });

    it('should parse table with thead + td', () => {
      const $ = cheerio.load(theadWithTd);
      const table = $('table');
      const result = parseTable(table, { firstLineAsHeader: false });
      expect(result.headers).toEqual([]);
      expect(result.rows[0]).toEqual(['head1', 'head2']);
      expect(result.rows[1]).toEqual(['val11', 'val12']);
      expect(result.rows[2]).toEqual(['val21', 'val22']);
    });

    it('should parse table with no thead + th', () => {
      const $ = cheerio.load(noTheadWithTh);
      const table = $('table');
      const result = parseTable(table, { firstLineAsHeader: false });
      expect(result.headers).toEqual([]);
      expect(result.rows[0]).toEqual(['head1', 'head2']);
      expect(result.rows[1]).toEqual(['val11', 'val12']);
      expect(result.rows[2]).toEqual(['val21', 'val22']);
    });

    it('should parse table with no thead + td', () => {
      const $ = cheerio.load(noTheadWithTd);
      const table = $('table');
      const result = parseTable(table, { firstLineAsHeader: false });
      expect(result.headers).toEqual([]);
      expect(result.rows[0]).toEqual(['head1', 'head2']);
      expect(result.rows[1]).toEqual(['val11', 'val12']);
      expect(result.rows[2]).toEqual(['val21', 'val22']);
    });
  });
});
