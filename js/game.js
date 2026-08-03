const Game = {


canvas:null,
ctx:null,


screen:"title",


score:0,


spawnTimer:null,


init(canvas,ctx){

    this.canvas = canvas;
    this.ctx = ctx;

    Assets.load();

    ObjectManager.init();

},



update(){


    if(this.screen==="play"){


        ObjectManager.update();


        Effects.update();



        if(
            ObjectManager.objects.length===0 &&
            this.spawnTimer===null
        ){


            this.spawnTimer = setTimeout(()=>{


                ObjectManager.spawn();


                this.spawnTimer=null;


            },500);


        }


    }


},



start(){


    this.screen="play";

    this.score=0;


    ObjectManager.spawn();


}


};