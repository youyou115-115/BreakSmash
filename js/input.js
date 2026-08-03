const Input = {


init(canvas){


    canvas.addEventListener(
        "pointerdown",
        (e)=>{


            const rect = canvas.getBoundingClientRect();


            // 実際の画面座標

            const x =
            e.clientX - rect.left;


            const y =
            e.clientY - rect.top;



            const scale = Math.min(
                canvas.width / 800,
                canvas.height / 700
            );



            const offsetX =
            (canvas.width - 800 * scale) / 2;


            const offsetY =
            (canvas.height - 700 * scale) / 2;



            // 仮想800×700へ変換

            const gameX =
            (x - offsetX) / scale;


            const gameY =
            (y - offsetY) / scale;

            // タイトル画面

if(Game.screen==="title"){

    Game.start();

    return;

}



            // クリック判定

            for(let obj of ObjectManager.objects){


                if(
                    gameX > obj.x &&
                    gameX < obj.x + obj.width &&
                    gameY > obj.y &&
                    gameY < obj.y + obj.height
                ){

                    obj.damage();

                    break;

                }


            }


        }
    );


}


};