var song


let scalars = [1,0.9,0.8,0.75,0.85,0.95]
function preload() {
    song = loadSound('Anoushka Shankar Lasya (Official Video).mp3')
}

console.log('hello')
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    strokeWeight(3)
    fft = new p5.FFT()
} 

let numbersArray = []

function draw() {
    background(0)
    stroke(255)
    

    fft.analyze()
    amp = fft.getEnergy(20,300)
    mids = fft.getEnergy(500, 1000)
    highs = fft.getEnergy(1000,20000)
    translate(width/2, height/2)
    let wave = fft.waveform()
    wave = wave.map(x => x*2);

    // var p = new Particle()
    // particles.push(p)


    // for (let i=particles.length-1; i>=0; i--) {
    //     if(!particles[i].edges()) {
    //         particles[i].update(amp>175)
    //         particles[i].show()
    //     } else {
    //         particles.splice(i,1)
    //     }
    // }
    
    for(let m = 0.8;m<=1.2;m+=0.4) {
        for(let k = 0.05; k<=2; k+=m*0.07) {
            noFill()
            beginShape()
            for(let i = 0; i<= 180; i++) {
                let index = floor(map(i,0,180,0,wave.length- 1))
                let randomElement = scalars[Math.floor(Math.random() * scalars.length)];
                let r = k*map(wave[index], -1, 1, 150, 350)*highs*mids/10000
                let random2 = map(r,150,350,0,1)
                let anotherRandom = random2/(1.5-k)
                let red  = Math.floor(Math.random()*256)*randomElement*anotherRandom/10
                let green = Math.floor(Math.random()*256)*randomElement*anotherRandom/10
                let blue = Math.floor(Math.random()*256)*randomElement*anotherRandom/10
                stroke(red,green,blue)
                let x = r*sin(i)/1.5
                let y = r*cos(i)/1.5
                vertex(x,y)
            }
            endShape()

            beginShape()
            for(let i = 0; i<= 180; i++) {
                let index = floor(map(i,0,180,0,wave.length- 1))
                let jk = map(wave[index], -1, 1, 500, 1000)
                let r = k*map(wave[index], -1, 1, 150, 350)*mids*highs/10000
                

                let x = r*-sin(i)/1.5
                let y = r*cos(i)/1.5
                vertex(x,y)
            }
            endShape()
        }
    }

}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause()
        noLoop()
        console.log(numbersArray)
    } else {
        song.play()
        loop()
    }
}