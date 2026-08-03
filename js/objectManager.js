const ObjectManager = {


objects:[],



init(){


    this.objects=[];


},



spawn(){

    let obj = new GameObject("board");


    if(window.innerWidth < 700){

        obj.gravity = 0.8;

    }


    this.objects.push(obj);

},



update(){


    for(let obj of this.objects){

        obj.update();

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


            if(obj.isBroken()){

                Game.score += obj.score;

            }


            return;

        }


    }


}


};