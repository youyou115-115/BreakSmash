const Input = {


init(canvas){


    canvas.addEventListener(
        "pointerdown",
        (e)=>{


            // スマホ
            if(window.innerWidth < 700){


                if(ObjectManager.objects.length > 0){

                    ObjectManager.objects[0].damage();

                }


                return;

            }



            // PCは今まで通り座標判定

            const rect = canvas.getBoundingClientRect();


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



            const gameX =
            (x - offsetX) / scale;


            const gameY =
            (y - offsetY) / scale;



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