const AC_GAME_OBJECT = [];

export class AcGameObject {
    constructor() {
        AC_GAME_OBJECT.push(this);
        this.timedelta = 0;
        this.has_called_start = false;
    }

    start() {   //只执行一次


    }

    update() {  // 每一帧执行一次，除了第一帧之外

    }

    on_destroy() {  //删除前执行

    }

    destroy() {
        this.on_destroy();
        for (let i in AC_GAME_OBJECT) {
            const obj = AC_GAME_OBJECT[i];
            if (obj === this) {
                AC_GAME_OBJECT.splice(i);
                break;
            }
        }
    }

}

let last_timestamp;
const step = timestamp => {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_called_start) {
            obj.has_called_start = true;
            obj.start();
        } else {
            obj.timedelta = timestamp -last_timestamp;
            obj.update();
        }
    }
    requestAnimationFrame(step);
}

requestAnimationFrame(step);