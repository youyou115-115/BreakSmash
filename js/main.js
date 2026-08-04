const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//====================
// 仮想ゲームサイズ
//====================

const GAME_WIDTH = 800;
const GAME_HEIGHT = 700;

//====================
// リサイズ
//====================

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

Game.init(canvas, ctx);

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

Input.init(canvas);
Sound.init();

//====================
// メインループ
//====================

function loop(){

    // 一度リセット
    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // 画面全体に収まる倍率
    const scale = Math.min(
        canvas.width / GAME_WIDTH,
        canvas.height / GAME_HEIGHT
    );

    // 中央配置
    const offsetX =
        (canvas.width - GAME_WIDTH * scale) / 2;

    const offsetY =
        (canvas.height - GAME_HEIGHT * scale) / 2;

    // 画面揺れ
    let shakeX = 0;
    let shakeY = 0;

    if(Game.shake > 0){

        shakeX = Math.random() * 20 - 10;
        shakeY = Math.random() * 20 - 10;

    }

    ctx.setTransform(
        scale,
        0,
        0,
        scale,
        offsetX + shakeX,
        offsetY + shakeY
    );

    Game.update();

    Renderer.draw(Game);

    requestAnimationFrame(loop);

}

loop();