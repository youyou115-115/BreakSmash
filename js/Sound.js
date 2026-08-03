const Sound = {

    ctx:null,


    init(){

        this.ctx = new AudioContext();

    },


    playShot(){

    if(!this.ctx){
        return;
    }


    const now = this.ctx.currentTime;


    //====================
    // 爆発ノイズ
    //====================

    const bufferSize =
    this.ctx.sampleRate * 0.15;


    const buffer =
    this.ctx.createBuffer(
        1,
        bufferSize,
        this.ctx.sampleRate
    );


    const data =
    buffer.getChannelData(0);


    for(let i=0;i<bufferSize;i++){

        data[i] =
        (Math.random()*2-1);

    }


    const noise =
    this.ctx.createBufferSource();


    noise.buffer=buffer;


    const noiseGain =
    this.ctx.createGain();


    noiseGain.gain.setValueAtTime(
        0.5,
        now
    );


    noiseGain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.12
    );


    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);



    //====================
    // 低音衝撃
    //====================

    const osc =
    this.ctx.createOscillator();


    const bassGain =
    this.ctx.createGain();


    osc.type="sine";


    osc.frequency.setValueAtTime(
        120,
        now
    );


    osc.frequency.exponentialRampToValueAtTime(
        40,
        now+0.1
    );


    bassGain.gain.setValueAtTime(
        0.6,
        now
    );


    bassGain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.15
    );


    osc.connect(bassGain);
    bassGain.connect(this.ctx.destination);



    noise.start(now);
    osc.start(now);


    noise.stop(now+0.15);
    osc.stop(now+0.15);

}

};