import { trimCell } from '../trimCell';

describe('trimCell', () => {
  it('should trim', () => {
    const result = trimCell(' value\n1\n2    ');
    expect(result).toEqual('value12');
  });

  it('should trim empty value', () => {
    const result = trimCell('');
    expect(result).toEqual('');
  });

  it('should return empty value if null is provided', () => {
    const result = trimCell(null);
    expect(result).toEqual('');
  });
});
