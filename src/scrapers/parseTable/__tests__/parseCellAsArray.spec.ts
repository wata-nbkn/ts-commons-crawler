import { parseCellAsArray } from '../parseCellAsArray';

describe('parseCellAsArray', () => {
  it('should parse as array', () => {
    const result = parseCellAsArray(' value ');
    expect(result).toEqual(['value']);
  });

  it('should parse as array 2', () => {
    const result = parseCellAsArray(' value\n0\n2<br>a<br/>b<br />  <br>  ');
    expect(result).toEqual(['value', 0, 2, 'a', 'b']);
  });

  it('should parse empty value', () => {
    const result = parseCellAsArray('');
    expect(result).toEqual([]);
  });

  it('should return empty value if null is provided', () => {
    const result = parseCellAsArray(null);
    expect(result).toEqual('');
  });
});
