const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");


const GAME_WIDTH = 800;

let GAME_HEIGHT;

if(window.innerWidth < 700){

    GAME_HEIGHT = 1200;

}
else{

    GAME_HEIGHT = 700;

}


function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



Game.init(canvas,ctx);

Input.init(canvas);



function loop(){


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



    let scale;


if(window.innerWidth < 700){

    // スマホ縦

    scale = canvas.width / GAME_WIDTH;

}
else{

    // PC

    scale = Math.min(
        canvas.width / GAME_WIDTH,
        canvas.height / GAME_HEIGHT
    );

}



    const offsetX =
    (canvas.width - GAME_WIDTH * scale) / 2;


    const offsetY =
    (canvas.height - GAME_HEIGHT * scale) / 2;



    ctx.setTransform(
        scale,
        0,
        0,
        scale,
        offsetX,
        offsetY
    );



    Game.update();

    Renderer.draw(Game);



    requestAnimationFrame(loop);

}


loop();