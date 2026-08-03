const ObjectManager = {


objects:[],



init(){


    this.objects=[];


},



spawn(){


this.objects.push(

    new GameObject(
        "board"
    )

);


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