window.addEventListener(
"click",
()=>{


if(Game.screen==="title"){


    Game.start();


}
else if(Game.screen==="play"){


    if(ObjectManager.objects.length>0){


        const obj =
        ObjectManager.objects[0];


        obj.damage();


        if(obj.isBroken()){


            Game.score += obj.score;


        }


    }


}


});