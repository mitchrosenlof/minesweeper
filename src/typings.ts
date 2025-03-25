export namespace Types {
  export type Cell = {
    hidden?: boolean;
    isMine?: boolean;
    adjMines: number;
    flag?: boolean;
  };
}
