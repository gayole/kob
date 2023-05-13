export class Cell {
    // r 表示行， c 表示列
    constructor(r, c){
        this.r = r;
        this.c = c;
        this.x = c + 0.5;
        this.y = r + 0.5;
    }
}   