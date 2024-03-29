class Util {
    static bpm2ms(bpm, d) {
        return (60*1000/bpm*4)/d;
    }
    static note2freq(n) {
        // get midiNote
        const getValue = (v) => {
            let noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
            for (let i = noteStrings.length -1; i >= 0; i--)
                if (noteStrings[i] == v) return i;
        };
        let note = n[0];
        let scale = n[1];
        let midiNote = getValue(note) + 12 * scale;
        return this.mininote2frequencey(midiNote);
    }
    static mininote2frequencey(m) {
        return 440 * Math.pow(2, (m - 69)/12) * 2;
    }
}

class Note {
    constructor(fq = 240) {
        this.osc = new p5.Oscillator();
        this.osc.setType('sine'); // 'sine', 'triangle', 'sawtooth', 'square'
        this.osc.freq(fq);
        this.osc.amp(0);
        this.osc.start();
    }
    _play() {
        this.osc.amp(0.5, 0.1); // volume 0.5 over 0.1 seconds.
        this.playing = true;
    }
    _pause() {
        this.osc.amp(0, 0.6); // volume 0 over 0.5 seconds.
        this.playing = false;
    }
    freq(fq) {
        this.osc.freq(fq);
    }
    play() {
        this._play();
        setTimeout(()=> {
            this._pause();
        }, 120);
    }
}

class Synth {
    constructor() {
        this.actx = new AudioContext();
        this.bpm = 80;
        this.step = 0;
    }
    stepup() {
        this.step++;
        if (this.step > 15)
            this.step = 0;
    }
    stop() {
        clearInterval(this.interval);
    }
    run() {
        this.stop();
        this.interval = setInterval(() => {
            let x = this.step;
            for (let y = 0; y < ROWS; y++) {
                if (matrix[y][x] == 1) {
                    let note = PentatonicScale[y % PentatonicScale.length];
                    let scale = PentatonicScale.length - int(y / PentatonicScale.length);
                    console.log(`(x:${x},y:${y}) note:${note}, scale:${scale}`);
                    let freq = Util.note2freq(''+note+scale);
                    console.log(freq);
                    notes[y][x].freq(freq);
                    notes[y][x].play();
                }
            }
            this.stepup();
        }, Util.bpm2ms(this.bpm, 16));
    }
}

let matrix;
let notes;
const boxSize = 20;
const ROWS = 16;
const COLS = 16;
const PentatonicScale = ['C', 'A', 'G', 'E', 'D'];
let st;
function setup() {
    createCanvas(boxSize*COLS+1, boxSize*ROWS+1);
    matrix = new Array(ROWS).fill(0).map(()=>new Array(COLS).fill(0));
    notes = new Array(ROWS).fill(0).map(()=>new Array(COLS).fill(0).map(()=>new Note()));
    synth = new Synth();
    synth.run();
    st = createP('');
}
function draw() {
    background(240);
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            fill((matrix[y][x] == 1) ? "#fff" : "#ccc");
            rect(boxSize*x, boxSize*y, boxSize, boxSize);
        }
    }
    st.html('step:' + synth.step);
}
function mousePressed() {
    let x = Math.floor(mouseX/boxSize);
    let y = Math.floor(mouseY/boxSize);
    if ((0 <= x && x < COLS) &&(0 <= y && y < ROWS))
        matrix[y][x] = !matrix[y][x];
}
