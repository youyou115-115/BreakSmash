const Effects={


particles:[],



createBreak(x,y){


    for(let i=0;i<20;i++){


        this.particles.push({

            x:x,
            y:y,

            vx:(Math.random()-0.5)*10,
            vy:(Math.random()-0.5)*10,

            life:30

        });


    }


},



update(){


    this.particles.forEach(p=>{


        p.x+=p.vx;
        p.y+=p.vy;


        p.vy+=0.5;


        p.life--;


    });



    this.particles =
    this.particles.filter(
        p=>p.life>0
    );


},



draw(ctx){


    ctx.fillStyle="#c58a45";


    for(let p of this.particles){


        ctx.fillRect(
            p.x,
            p.y,
            8,
            8
        );


    }


}


};