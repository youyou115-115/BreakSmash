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

                // 描画倍率
                const scale = Math.min(
                    canvas.width / Game.width,
                    canvas.height / Game.height
                );

                // 中央寄せ
                const offsetX =
                    (canvas.width - Game.width * scale) / 2;

                const offsetY =
                    (canvas.height - Game.height * scale) / 2;

                // ゲーム座標へ変換
                const gameX = (x - offsetX) / scale;
                const gameY = (y - offsetY) / scale;

                //====================
                // タイトル
                //====================

                if(Game.screen === "title"){

                    const buttonY = Game.height / 2;

                    if(
                        gameX > 250 &&
                        gameX < 550 &&
                        gameY > buttonY - 30 &&
                        gameY < buttonY + 120
                    ){

                        if(Sound.ctx){
                            Sound.ctx.resume();
                        }

                        Game.start();
                    }

                    return;
                }

                //====================
                // ゲームオーバー
                //====================

                if(Game.screen === "gameover"){

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

                //====================
                // オブジェクト判定
                //====================

                for(const obj of ObjectManager.objects){

                    if(
                        obj.active &&
                        obj.state === "normal" &&
                        gameX > obj.x &&
                        gameX < obj.x + obj.width &&
                        gameY > obj.y &&
                        gameY < obj.y + obj.height
                    ){

                        obj.damage(gameX, gameY);
                        break;
                    }
                }

            }
        );

    }

};