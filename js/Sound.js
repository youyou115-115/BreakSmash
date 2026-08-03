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

},
playGroan(){

    if(!this.ctx){
        return;
    }


    const now =
    this.ctx.currentTime;


    // 低い声の土台

    const osc =
    this.ctx.createOscillator();


    const gain =
    this.ctx.createGain();


    const filter =
    this.ctx.createBiquadFilter();


    osc.type="sawtooth";


    osc.frequency.setValueAtTime(
        120,
        now
    );


    osc.frequency.exponentialRampToValueAtTime(
        45,
        now+0.5
    );


    filter.type="lowpass";
    filter.frequency.value=400;


    gain.gain.setValueAtTime(
        0.4,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.6
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.6);

},

playDestroy(type){

    if(type==="bottle"){
        return;
    }


    // sofaとironは低音系多め
    if(type==="sofa" || type==="iron"){

        const voice = Math.floor(Math.random()*2);

        if(voice===0){
            this.playZombieVoice1();
        }
        else{
            this.playZombieVoice3();
        }

        return;
    }


    const voice = Math.floor(Math.random()*4);


    switch(voice){

        case 0:
            this.playZombieVoice1();
            break;

        case 1:
            this.playZombieVoice2();
            break;

        case 2:
            this.playZombieVoice3();
            break;

        case 3:
            this.playZombieVoice4();
            break;

    }

},


playChainsaw(){

    if(!this.ctx){
        return;
    }


    const now =
    this.ctx.currentTime;


    const osc =
    this.ctx.createOscillator();


    const gain =
    this.ctx.createGain();


    const filter =
    this.ctx.createBiquadFilter();


    osc.type="sawtooth";


    // エンジン音
    osc.frequency.setValueAtTime(
        90,
        now
    );


    osc.frequency.linearRampToValueAtTime(
        160,
        now+0.3
    );


    osc.frequency.linearRampToValueAtTime(
        70,
        now+0.8
    );


    filter.type="lowpass";

    filter.frequency.value=800;


    gain.gain.setValueAtTime(
        0.25,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+1
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+1);

},
playZombieVoice1(){

    if(!this.ctx)return;

    const now=this.ctx.currentTime;

    const osc=this.ctx.createOscillator();
    const gain=this.ctx.createGain();
    const filter=this.ctx.createBiquadFilter();

    osc.type="sawtooth";

    osc.frequency.setValueAtTime(110,now);
    osc.frequency.exponentialRampToValueAtTime(45,now+0.7);

    filter.type="bandpass";
    filter.frequency.value=500;
    filter.Q.value=3;


    gain.gain.setValueAtTime(0.35,now);
    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.7
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.7);


    this.playZombieNoise(0.7,0.12);

},


playZombieVoice2(){

    if(!this.ctx)return;

    const now=this.ctx.currentTime;


    const osc=this.ctx.createOscillator();
    const gain=this.ctx.createGain();
    const filter=this.ctx.createBiquadFilter();


    osc.type="triangle";


    osc.frequency.setValueAtTime(
        180,
        now
    );

    osc.frequency.exponentialRampToValueAtTime(
        60,
        now+0.6
    );


    filter.type="lowpass";
    filter.frequency.value=450;


    gain.gain.setValueAtTime(
        0.3,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.6
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.6);


    this.playZombieNoise(0.6,0.1);

},


playZombieVoice3(){

    if(!this.ctx){
        return;
    }

    const now = this.ctx.currentTime;


    //====================
    // 声の芯
    //====================

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";


    // 人間の低い声っぽい下降
    osc.frequency.setValueAtTime(
        130,
        now
    );

    osc.frequency.exponentialRampToValueAtTime(
        55,
        now + 0.8
    );


    gain.gain.setValueAtTime(
        0.35,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.8
    );


    // 声のこもり
    const filter = this.ctx.createBiquadFilter();

    filter.type="bandpass";
    filter.frequency.value=600;
    filter.Q.value=2;


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.8);



    //====================
    // 息・ガラガラ成分
    //====================

    const bufferSize =
    this.ctx.sampleRate * 0.8;


    const buffer =
    this.ctx.createBuffer(
        1,
        bufferSize,
        this.ctx.sampleRate
    );


    const data =
    buffer.getChannelData(0);


    for(let i=0;i<bufferSize;i++){

        data[i]=
        (Math.random()*2-1);

    }


    const noise =
    this.ctx.createBufferSource();

    noise.buffer=buffer;


    const noiseFilter =
    this.ctx.createBiquadFilter();

    noiseFilter.type="bandpass";
    noiseFilter.frequency.value=900;


    const noiseGain =
    this.ctx.createGain();


    noiseGain.gain.setValueAtTime(
        0.12,
        now
    );


    noiseGain.gain.exponentialRampToValueAtTime(
        0.001,
        now+0.8
    );


    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);


    noise.start(now);
    noise.stop(now+0.8);

},


playZombieVoice4(){

    if(!this.ctx)return;


    const now=this.ctx.currentTime;


    const osc=this.ctx.createOscillator();
    const gain=this.ctx.createGain();
    const filter=this.ctx.createBiquadFilter();


    osc.type="sawtooth";


    osc.frequency.setValueAtTime(
        220,
        now
    );


    osc.frequency.exponentialRampToValueAtTime(
        70,
        now+0.35
    );


    filter.type="bandpass";
    filter.frequency.value=700;
    filter.Q.value=2;


    gain.gain.setValueAtTime(
        0.35,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.35
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.35);


    this.playZombieNoise(0.35,0.15);

},
playZombieNoise(length = 0.4, volume = 0.05){

    if(!this.ctx){
        return;
    }


    const now = this.ctx.currentTime;


    const bufferSize =
    this.ctx.sampleRate * length;


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
        Math.random()*2-1;

    }


    const noise =
    this.ctx.createBufferSource();

    noise.buffer = buffer;



    const filter =
    this.ctx.createBiquadFilter();


    filter.type="lowpass";
    filter.frequency.value=600;



    const gain =
    this.ctx.createGain();


    gain.gain.setValueAtTime(
        volume,
        now
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now+length
    );



    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);



    noise.start(now);
    noise.stop(now+length);

},
playZombieFail(){

    if(!this.ctx){
        return;
    }


    const now = this.ctx.currentTime;


    // 怒った低いうなり声
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();


    osc.type = "sawtooth";


    osc.frequency.setValueAtTime(
        80,
        now
    );

    osc.frequency.exponentialRampToValueAtTime(
        25,
        now + 0.8
    );


    filter.type="lowpass";
    filter.frequency.value=350;


    gain.gain.setValueAtTime(
        0.45,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.01,
        now+0.8
    );


    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);


    osc.start(now);
    osc.stop(now+0.8);



    // ガラガラした息
    this.playZombieNoise(0.8,0.15);

},
};