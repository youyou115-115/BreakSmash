const Game = {


canvas:null,
ctx:null,


screen:"title",


score:0,
combo:0,
maxCombo:0,
speed:1,
shake:0,
message:"",
messageTimer:0,
messageColor:"#ffffff",

hp:3,
maxHp:3,

width:800,
height:1200,
damageFlash:0,

spawnTimer:null,


init(canvas,ctx){

    this.canvas = canvas;
    this.ctx = ctx;


    this.height = 1200;


    Assets.load();

    ObjectManager.init();

},



update(){


    if(this.screen==="play"){



ObjectManager.update();


        Effects.update();

        if(this.messageTimer > 0){

    this.messageTimer--;

}

if(this.damageFlash > 0){

    this.damageFlash--;

}

if(this.shake > 0){

    this.shake--;

}



       if(
    ObjectManager.objects.length===0 &&
    this.spawnTimer===null
){

    this.spawnTimer = setTimeout(()=>{


        if(this.score >= 1000){

    let count;


    const rand = Math.random();


    // 1000〜3000点
    if(this.score < 3000){

        if(rand < 0.6){
            count = 3;
        }
        else if(rand < 0.9){
            count = 4;
        }
        else{
            count = 5;
        }

    }

    // 3000点以降
    else{

        if(rand < 0.3){
            count = 3;
        }
        else if(rand < 0.7){
            count = 4;
        }
        else{
            count = 5;
        }

    }


    ObjectManager.spawnMultiple(count);


}
else{

    ObjectManager.spawn();

}


        this.spawnTimer=null;


    },500);

}


    }


},



start(){

    this.screen="play";


    this.score=0;

    this.combo=0;

    this.maxCombo=0;

    if(window.innerWidth < 700){

    this.speed = 2.0;

}
else{

    this.speed = 1;

}

    this.hp=3;

   this.spawnTimer=null;
    ObjectManager.objects=[];


    ObjectManager.spawn();
    

},
addScore(value){

    this.combo++;


    if(this.combo > this.maxCombo){

        this.maxCombo=this.combo;

    }


    let multiplier = 1;


    if(this.combo >= 10){
        multiplier = 2;
    }

    if(this.combo >= 20){
        multiplier = 3;
    }

    if(this.combo >= 50){
        multiplier = 5;
    }


    this.score += value * multiplier;


    //速度アップ

    this.speed += 0.035;


    if(this.speed > 3){

        this.speed = 3;

    }

},
miss(){

    this.hp--;

    this.combo=0;


    if(this.hp<=0){

        this.screen="gameover";

    }

}


};