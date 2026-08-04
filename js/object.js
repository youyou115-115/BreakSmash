const ObjectData = {

    iron:{
        width:300,
        height:150,
        hp:3,
        score:300,

        weakX:0.4,
        weakY:0.3,
        weakW:0.2,
        weakH:0.3
    },


   tv:{
    width:300,
    height:180,
    hp:4,
    score:500,

    weakX:0.55,
    weakY:0.05,
    weakW:0.35,
    weakH:0.3
},


   board:{
    width:300,
    height:150,
    hp:2,
    score:200,

    weakX:0.35,
    weakY:0.05,
    weakW:0.3,
    weakH:0.3
},


    bottle:{
        width:150,
        height:200,
        hp:1,
        score:100,
    },


    sofa:{
    width:350,
    height:200,
    hp:5,
    score:800,

    weakX:0.25,
    weakY:0.05,
    weakW:0.5,
    weakH:0.3
}

};

const BreakEffectData = {

    bottle:{
        text:"SPLASH!",
        shake:5,
        color:"#66ccff"
    },

    board:{
        text:"BREAK!",
        shake:10,
        color:"#ffff66"
    },

    iron:{
        text:"CRASH!",
        shake:18,
        color:"#ff9900"
    },

    tv:{
        text:"SMASH!",
        shake:15,
        color:"#ff66cc"
    },

    sofa:{
        text:"DESTROY!!",
        shake:25,
        color:"#ff3333"
    }

};

class GameObject{

    


constructor(type){

    // ボトルだけ落下
this.isFalling = (type==="bottle");

this.z = 0;
this.speedZ = 0.015;



    this.type=type;

    this.broken=false;
    // 初期位置
    this.x=250;
    this.y=-200;

    this.targetX =
200 + Math.random()*400;


    // 落下
    this.vx=0;
    this.vy=0;
    this.gravity=0.5;

    this.damageFlash = 0;
    this.shake = 0;
 
    this.lifeTimer = 0;
    this.weakTimer = 0;

    this.counted=false;

    this.active=false;



    const data = ObjectData[type];


this.width = data.width;
this.height = data.height;

this.baseWidth = data.width;
this.baseHeight = data.height;


this.maxHp = data.hp;
this.hp = data.hp;


this.score = data.score;


this.state="normal";


this.destroyTimer=0;
this.destroyDelay=8;


}



damage(x,y,power=1){

    


    if(this.state!=="normal"){
        return;
    }

// 接近後一定時間でミス
    if(!this.active){
        return;
    }

    if(this.hp <= 0){
    return;
}

   const data = ObjectData[this.type];


// ボトル以外は弱点判定
if(this.type !== "bottle"){

    if(
        x > this.x + this.width * data.weakX &&
        x < this.x + this.width * (data.weakX + data.weakW) &&
        y > this.y + this.height * data.weakY &&
        y < this.y + this.height * (data.weakY + data.weakH)
    ){

        power *= 2;

        Game.message = "CRITICAL!!";
        Game.messageTimer = 30;

    }

}


      this.hp -= power;
      this.hp = Math.max(0,this.hp);
      Sound.playShot();

    this.damageFlash = 30;
    this.shake = 30;


    if(this.hp<=0){
        this.broken=true;


        this.destroyTimer=60;

        this.state="damaged";
        Sound.playDestroy(this.type);

        const effect = BreakEffectData[this.type];


    Game.shake = effect.shake;

    Game.message = effect.text;

Game.messageColor = effect.color;

Game.messageTimer = 45;

    


        Effects.createBreak(
    this.x + this.width / 2,
    this.y + this.height / 2,
    this.type
);


    }


}



update(){

    //====================
    // 破壊中
    //====================

    if(this.state==="damaged"){

        this.damageFlash--;

        this.shake--;

        if(this.damageFlash<=0){

            this.state="destroy";

        }

        return;

    }


    //====================
    // 破壊済み
    //====================

    if(this.state==="destroy"){

        this.destroyTimer--;

        return;

    }


if(!this.active){


    //====================
    // ボトル
    //====================

    if(this.isFalling){


        this.y += this.vy;

        this.vy += this.gravity * Game.speed;


        if(this.y >= Game.height / 2){

    this.y = Game.height / 2;

            this.vy = 0;

            this.active = true;

            this.weakTimer = 0;

        }

    }


    //====================
    // その他 奥から接近
    //====================

    else{


        this.z += this.speedZ * Game.speed;


        const scale = 0.3 + this.z;


        this.width =
        this.baseWidth * scale;


        this.height =
        this.baseHeight * scale;



        this.x =
        this.targetX - this.width/2;


       this.y =
Game.height / 2 - this.height / 2;



        if(this.z >= 1){

            this.z = 1;

            this.active=true;

            this.weakTimer=90;

        }

    }

}

 //====================
// 地面到着後2秒でミス
//====================

if(this.active){

    this.lifeTimer++;


if(
    this.lifeTimer >= 150 &&
    this.state==="normal"
){


    // ボトルは失敗扱いにしない
    if(this.type !== "bottle"){


        // 赤点滅
        Game.damageFlash = 45;


        // ゾンビ失敗ボイス
        Sound.playZombieFail();


        // ソファだけチェンソー追加
        if(this.type==="sofa"){

            Sound.playChainsaw();

        }


        // HP減少
        Game.miss();

    }

        this.destroyTimer = 30;

        this.state = "destroy";

    }

}



    //====================
    // 演出
    //====================

    if(this.damageFlash>0){

        this.damageFlash--;

    }

    if(this.shake>0){

        this.shake--;

    }

    if(this.weakTimer > 0){

    this.weakTimer--;

}

}



isBroken(){


    return(
        this.state==="destroy"
        &&
        this.destroyTimer<=0
    );


}


}