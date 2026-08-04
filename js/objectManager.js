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
    const margin = 50;

obj.x =
margin + Math.random() *
(800 - obj.width - margin * 2);


    if(window.innerWidth < 700){

        obj.gravity = 0.8;

    }



    this.objects.push(obj);

},

spawnDouble(){

    let leftType=this.randomType();

    let left=new GameObject(leftType);


    if(window.innerWidth < 700){
        left.gravity = 0.8;
    }


    left.x = 50;

    this.objects.push(left);



    let rightType=this.randomType();

    let right=new GameObject(rightType);


    if(window.innerWidth < 700){
        right.gravity = 0.8;
    }


    right.x = 800 - right.width - 50;

    this.objects.push(right);

},



update(){


    for(let obj of this.objects){

        obj.update();


        if(
    obj.isBroken() &&
    obj.broken &&
    !obj.counted
){

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


},
spawnMultiple(){

    let count = 3;


    if(Game.score >= 5000){

        const r = Math.random();

        if(r < 0.1){
            count = 3;
        }
        else if(r < 0.6){
            count = 4;
        }
        else{
            count = 5;
        }

    }
    else if(Game.score >= 3000){

        const r = Math.random();

        if(r < 0.3){
            count = 3;
        }
        else if(r < 0.8){
            count = 4;
        }
        else{
            count = 5;
        }

    }
    else{

        const r = Math.random();

        if(r < 0.6){
            count = 3;
        }
        else if(r < 0.9){
            count = 4;
        }
        else{
            count = 5;
        }

    }


    for(let i=0;i<count;i++){

        this.spawn();

    }

}


};