const Sound = {


ctx:null,


init(){

    this.ctx = new AudioContext();

},



playHit(type){


    if(!this.ctx){
        return;
    }


    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();


    osc.connect(gain);
    gain.connect(this.ctx.destination);



    let freq = 200;
    let duration = 0.1;


    switch(type){

        case "bottle":
            freq = 600;
            break;


        case "board":
            freq = 300;
            break;


        case "iron":
            freq = 120;
            break;


        case "tv":
            freq = 180;
            break;


        case "sofa":
            freq = 80;
            break;

    }



    osc.frequency.value = freq;

    osc.type = "square";


    gain.gain.setValueAtTime(
        0.3,
        this.ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.ctx.currentTime + duration
    );


    osc.start();

    osc.stop(
        this.ctx.currentTime + duration
    );


}


};