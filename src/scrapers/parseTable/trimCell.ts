export const trimCell = (cell: string | null | undefined) => {
  if (cell == null) {
    return '';
  }
  return cell.replace(/\n/g, '').trim();
};
