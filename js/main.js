const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height = 700;


Game.init(canvas,ctx);


function loop(){

    Game.update();

    Renderer.draw(Game);


    requestAnimationFrame(loop);

}




loop();