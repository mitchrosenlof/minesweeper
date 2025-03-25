export function getRow(index: number, nCols: number) {
  return Math.floor(index / nCols);
}

export function getCol(index: number, nCols: number) {
  return index % nCols;
}
