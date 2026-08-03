const ObjectManager = {


objects:[],



init(){


    this.objects=[];


},

randomType(){

const list=[
"iron",
"tv",
"board",
"bottle",
"sofa"
];


return list[
Math.floor(Math.random()*list.length)
];

},


spawn(){

    let type=this.randomType();

let obj=new GameObject(type);

    if(window.innerWidth < 700){

        obj.gravity = 0.8;

    }


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