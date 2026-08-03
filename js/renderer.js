const Renderer = {


draw(game){

const ctx = game.ctx;


ctx.clearRect(
0,
0,
800,
game.height
);


if(game.screen==="title"){


ctx.fillStyle="#222";
ctx.fillRect(0,0,800,700);



// タイトル

ctx.fillStyle="white";
ctx.font="60px Arial";

ctx.textAlign="center";


ctx.fillText(
    "BreakSmash",
    400,
    game.height / 2 - 80
);



// スタートボタン

ctx.fillStyle="#333";

ctx.fillRect(
    250,
    game.height / 2,
    300,
    80
);


ctx.fillStyle="white";

ctx.font="35px Arial";

ctx.fillText(
    "START",
    400,
    game.height / 2 + 52
);



}



if(game.screen==="play"){


    //====================
    // 背景
    //====================


        if(Assets.background){

    ctx.drawImage(
        Assets.background,
        0,
        0,
        800,
        game.height
    );

    }



    //====================
    // スコア
    //====================

    ctx.fillStyle="black";

    ctx.font="30px Arial";

    ctx.fillText(
        "Score : "+game.score,
        100,
        50
    );



    //====================
    // 物を描画
    //====================

    for(let obj of ObjectManager.objects){


        if(obj.type==="board"){


            if(obj.state==="destroy"){
                continue;
            }



            let drawX=obj.x;
            let drawY=obj.y;



            // 揺れ

            if(obj.shake>0){

                drawX += Math.random()*20-10;
                drawY += Math.random()*20-10;

            }



            // 影

            ctx.fillStyle="rgba(0,0,0,0.3)";

            ctx.fillRect(
                drawX+10,
                drawY+10,
                obj.width,
                obj.height
            );



            // 板画像

            if(Assets.board){

                ctx.drawImage(
                    Assets.board,
                    drawX,
                    drawY,
                    obj.width,
                    obj.height
                );

            }



            // 赤点滅

            if(obj.damageFlash>0){

                ctx.fillStyle="rgba(255,0,0,0.35)";

                ctx.fillRect(
                    drawX,
                    drawY,
                    obj.width,
                    obj.height
                );

            }



            // HPバー

            const barWidth=obj.width;
            const barHeight=12;


            ctx.fillStyle="#333";

            ctx.fillRect(
                drawX,
                drawY-25,
                barWidth,
                barHeight
            );


            ctx.fillStyle="#00ff66";

            ctx.fillRect(
                drawX,
                drawY-25,
                barWidth*(obj.hp/obj.maxHp),
                barHeight
            );

        }

    }


    Effects.draw(ctx);


}
}

};