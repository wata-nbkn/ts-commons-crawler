import { MathUtil } from '@wata-nbkn/ts-commons/lib/utils';

export const parseCellAsArray = (cell: string | null | undefined) => {
  if (cell == null) {
    return '';
  }
  return cell
    .split(/\n|<br>|<br\/>|<br \/>/)
    .map((c) => c.trim())
    .filter((c) => c !== '')
    .map((c) => {
      if (MathUtil.isNumber(c)) {
        return Number(c);
      }
      return c;
    });
};
