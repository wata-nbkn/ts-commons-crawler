import { parseTableAsJsonFromHtml } from '../parseTableAsJsonFromHtml';
import { basicTable } from '../parseTable/__tests__/testData';

describe('parseTableAsJsonFromHtml', () => {
  it('should parse table as json', () => {
    const result: any = parseTableAsJsonFromHtml(basicTable);
    expect(result[0].head1).toEqual('val11');
    expect(result[0].head2).toEqual('val12');
    expect(result[1].head1).toEqual('val21');
    expect(result[1].head2).toEqual('val22');
    expect(result[2].head1).toEqual(1000);
    expect(result[2].head2).toEqual(2000);
  });

  it('should parse table as json with selector', () => {
    const result: any = parseTableAsJsonFromHtml(basicTable, { tableSelector: '.test-table' });
    expect(result[0].head1).toEqual('val11');
    expect(result[0].head2).toEqual('val12');
    expect(result[1].head1).toEqual('val21');
    expect(result[1].head2).toEqual('val22');
    expect(result[2].head1).toEqual(1000);
    expect(result[2].head2).toEqual(2000);
  });
});
