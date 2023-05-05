import { AcGameObject } from "./AcGameObeject";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 30;

        this.wall = [];
    }

    // flood fill算法
    // 参数， 图， 起点的x，y 终点的x，y
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;
        
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }

        return false;
    }


    creat_walls() {

        // 二维bool数组初始化
        const g = [];
        for (let r = 0; r < this.cols; r++) {
            g[r] = [];
            for (let c = 0; c < this.cols; c++) {
                g[r][c] = false;
            }
        }

        // 给四周加上墙
        for (let r = 0; r < this.rows; r++) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for (let c = 0; c < this.cols; c++) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 5; j++) {
                //随机一个数
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) continue;

                // 排除左下角和右上角
                if (r == this.rows - 2 && c == 1 ||
                    r == 1 && c == this.cols - 2) 
                    continue;
                
                // 对称
                g[r][c] = g[c][r] = true;
                break;
            }
        }

        //判断是否连通
        // 复制当前状态
        const copy_g = JSON.parse(JSON.stringify(g)); // 复制json再转换回来
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;


        // 绘画 true的位置绘画
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (g[r][c]) {
                    this.wall.push(new Wall(r, c, this));
                }
            }
        }

        return true;

    }

    start() {
        // 地图不连通则重新生成
        for (let i = 0; i < 1000; i++)
            if (this.creat_walls())
                break;
    }

    updete_size() {
        // 计算机小正方形的边长
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    update() {
        this.updete_size();
        this.render();
    }
     
    //渲染函数
    render() {
        // 画图
        // 取颜色
        const color_eve = "#AAD751", color_odd = "#A2D149";
        // 染色
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_eve;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }

}