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


    this.active=false;



    if(type==="board"){


        this.width=300;
        this.height=150;


        this.maxHp = 1;
        this.hp = this.maxHp;

        this.score=100;


        this.state="normal";

        this.destroyTimer=0;
        this.destroyDelay=8;

    }


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
            this.x+this.width/2,
            this.y+this.height/2
        );


    }


}



update(){


    // 破壊中
    if(this.state==="damaged"){


    this.damageFlash--;

    this.shake--;


    if(this.damageFlash<=0){


        this.state="destroy";


    }


    return;

}



if(this.state==="destroy"){

    this.destroyTimer--;

    return;

}



    // 落下中

    if(!this.active){


        this.y += this.vy;


        this.vy += this.gravity;



        if(this.y>=300){


            this.y=300;


            this.vy=0;


            this.active=true;


        }


    }
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