export const trimCell = (cell: string | null) => {
  if (cell == null) {
    return '';
  }
  return cell.replace(/\n/g, '').trim();
};
