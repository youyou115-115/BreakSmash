const ObjectData = {

    iron:{
        width:300,
        height:150,
        hp:3,
        score:300
    },


    tv:{
        width:300,
        height:180,
        hp:4,
        score:500
    },


    board:{
        width:300,
        height:150,
        hp:2,
        score:200
    },


    bottle:{
        width:150,
        height:200,
        hp:1,
        score:100
    },


    sofa:{
        width:350,
        height:200,
        hp:5,
        score:800
    }

};


class GameObject{

    


constructor(type){

    
    

    this.type=type;


    // 初期位置
    this.x=250;
    this.y=-200;


    // 落下
    this.vx=0;
    this.vy=0;
    this.gravity=0.5;

    this.damageFlash = 0;
    this.shake = 0;
 
    this.lifeTimer = 0;

    this.active=false;



    const data = ObjectData[type];


this.width = data.width;
this.height = data.height;


this.maxHp = data.hp;
this.hp = data.hp;


this.score = data.score;


this.state="normal";


this.destroyTimer=0;
this.destroyDelay=8;


}



damage(){


    if(this.state!=="normal"){
        return;
    }


    this.hp--;


    this.damageFlash = 30;
    this.shake = 30;


    if(this.hp<=0){


        this.destroyTimer=60;

        this.state="damaged";


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


    //====================
    // 落下
    //====================

    if(!this.active){

        this.y += this.vy;

        this.vy += this.gravity * Game.speed;

        let groundY;

        if(window.innerWidth < 700){

            groundY = 600;

        }
        else{

            groundY = 300;

        }

        if(this.y >= groundY){

            this.y = groundY;

            this.vy = 0;

            this.active = true;

        }

    }


    //====================
    // 地面到着後2秒でミス
    //====================

    if(this.active){

        this.lifeTimer++;

        if(this.lifeTimer >= 150){

            Game.miss();

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

}



isBroken(){


    return(
        this.state==="destroy"
        &&
        this.destroyTimer<=0
    );


}


}