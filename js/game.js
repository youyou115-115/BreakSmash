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
height:700,

spawnTimer:null,


init(canvas,ctx){

    this.canvas = canvas;
    this.ctx = ctx;


    if(window.innerWidth < 700){

        this.height = 1200;

    }
    else{

        this.height = 700;

    }


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


if(this.shake > 0){

    this.shake--;

}



        if(
            ObjectManager.objects.length===0 &&
            this.spawnTimer===null
        ){


            this.spawnTimer = setTimeout(()=>{


    if(this.score >= 500){

        ObjectManager.spawnDouble();

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

    this.speed = 1.8;

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