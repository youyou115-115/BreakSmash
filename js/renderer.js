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
ctx.fillRect(
    0,
    0,
    800,
    game.height
);



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

    ctx.font="30px Arial";

ctx.fillText(
    "HP : " + game.hp + " / " + game.maxHp,
    100,
    90
);


ctx.fillText(
    "Combo : "+game.combo,
    100,
    130
);



    //====================
    // 物を描画
    //====================

 for(let obj of ObjectManager.objects){


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



    // オブジェクト画像

    if(Assets[obj.type]){

        ctx.drawImage(
            Assets[obj.type],
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
    //====================
// 弱点ロックオン
//====================

if(
    obj.active &&
    obj.state==="normal" &&
    obj.weakTimer > 0
){

    // 残り30フレームは点滅
    if(
        obj.weakTimer < 30 &&
        Math.floor(obj.weakTimer / 5) % 2 === 0
    ){
        continue;
    }


    const data = ObjectData[obj.type];


    const cx =
    obj.x + obj.width * (data.weakX + data.weakW / 2);


    const cy =
    obj.y + obj.height * (data.weakY + data.weakH / 2);


    ctx.strokeStyle="red";
    ctx.lineWidth=4;


    ctx.beginPath();

    ctx.arc(
        cx,
        cy,
        25,
        0,
        Math.PI * 2
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(cx-35,cy);
    ctx.lineTo(cx+35,cy);

    ctx.moveTo(cx,cy-35);
    ctx.lineTo(cx,cy+35);

    ctx.stroke();

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
if(game.messageTimer > 0){

    ctx.textAlign="center";

    ctx.fillStyle = game.messageColor;
    ctx.font="60px Arial";

   ctx.shadowColor="black";
ctx.shadowBlur=10;

ctx.fillText(
    game.message,
    400,
    250
);

ctx.shadowBlur=0;
}

    Effects.draw(ctx);


}

 if(game.screen==="gameover"){

    ctx.fillStyle="#111";
    ctx.fillRect(0,0,800,game.height);

    ctx.textAlign="center";

    ctx.fillStyle="white";
    ctx.font="70px Arial";
    ctx.fillText("GAME OVER",400,220);

    ctx.font="35px Arial";
    ctx.fillText(
        "処理落ちが発生しました",
        400,
        300
    );

    ctx.font="30px Arial";
    ctx.fillText(
        "Score : " + game.score,
        400,
        380
    );

    ctx.fillText(
        "Max Combo : " + game.maxCombo,
        400,
        430
    );

    // RETRYボタン
    ctx.fillStyle="#333";
    ctx.fillRect(250,520,300,80);

    ctx.fillStyle="white";
    ctx.font="35px Arial";
    ctx.fillText("RETRY",400,575);

}
}

};