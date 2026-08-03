const Input = {


init(canvas){


    canvas.addEventListener(
        "pointerdown",
        (e)=>{


            const rect = canvas.getBoundingClientRect();


            const x =
(e.clientX - rect.left) * (canvas.width / rect.width);


const y =
(e.clientY - rect.top) * (canvas.height / rect.height);



            let scale;


if(window.innerWidth < 700){

    scale = canvas.width / 800;

}
else{

    scale = Math.min(
        canvas.width / 800,
        canvas.height / Game.height
    );

}


const offsetX =
(canvas.width - 800 * scale) / 2;


const offsetY =
(canvas.height - Game.height * scale) / 2;



            const gameX =
            (x - offsetX) / scale;


            const gameY =
            (y - offsetY) / scale;



            //====================
            // タイトル画面
            //====================

            if(Game.screen==="title"){


    const buttonY = Game.height / 2;


    if(
        gameX > 250 &&
        gameX < 550 &&
        gameY > buttonY - 30 &&
        gameY < buttonY + 120
    ){

        if(Sound.ctx){

            if(Sound.ctx){
    Sound.ctx.resume();
}

        }


        Game.start();

    }


    return;

}
            if(Game.screen==="gameover"){

    if(
        gameX > 250 &&
        gameX < 550 &&
        gameY > 520 &&
        gameY < 600
    ){
        Game.start();
    }

    return;
}




let target = null;


for(let obj of ObjectManager.objects){

    if(
        obj.active &&
        obj.state==="normal" &&
        gameX > obj.x &&
        gameX < obj.x + obj.width &&
        gameY > obj.y &&
        gameY < obj.y + obj.height
    ){

        obj.damage(
            gameX,
            gameY
        );

        break;

    }

}

  

}


    );


}


};  