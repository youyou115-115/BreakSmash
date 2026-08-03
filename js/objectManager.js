const ObjectManager = {


objects:[],



init(){


    this.objects=[];


},

randomType(){

const rand = Math.random();


if(rand < 0.35){

    return "bottle";

}
else if(rand < 0.65){

    return "board";

}
else if(rand < 0.85){

    return "iron";

}
else if(rand < 0.95){

    return "tv";

}
else{

    return "sofa";

}


},


spawn(){

    let type=this.randomType();

    let obj=new GameObject(type);


    if(window.innerWidth < 700){

        obj.gravity = 0.8;

    }


    // 出現位置ランダム
    obj.x = Math.random() * 300 + 100;


    this.objects.push(obj);

},

spawnDouble(){

    this.spawn();


    let type=this.randomType();

    let obj=new GameObject(type);


    if(window.innerWidth < 700){

        obj.gravity = 0.8;

    }


    obj.x = Math.random() * 300 + 400;


    this.objects.push(obj);

},



update(){


    for(let obj of this.objects){

        obj.update();


        if(obj.isBroken() && !obj.counted){

            Game.addScore(obj.score);

            obj.counted=true;

        }

    }



    this.objects =
    this.objects.filter(
        obj=>!obj.isBroken()
    );


},



hit(x,y){


    for(let obj of this.objects){


        if(
            x>obj.x &&
            x<obj.x+obj.width &&
            y>obj.y &&
            y<obj.y+obj.height
        ){


            obj.damage();


            return;

        }


    }


}


};