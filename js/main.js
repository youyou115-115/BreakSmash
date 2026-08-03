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
Sound.init();


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

    GAME_HEIGHT =
    GAME_WIDTH *
    (canvas.height / canvas.width);


    scale = canvas.width / GAME_WIDTH;


}
else{

    scale = Math.min(
        canvas.width / GAME_WIDTH,
        canvas.height / GAME_HEIGHT
    );

}



    const offsetX =
    (canvas.width - GAME_WIDTH * scale) / 2;


    const offsetY =
(window.innerWidth < 700)
? 0
: (canvas.height - GAME_HEIGHT * scale) / 2;


let shakeX = 0;
let shakeY = 0;


if(Game.shake > 0){

    shakeX = Math.random()*20-10;
    shakeY = Math.random()*20-10;

}
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