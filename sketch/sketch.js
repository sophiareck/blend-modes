//this was very finicky. I tried to do it within an instrumrnt class but it just got mixed up
//so i ended up doing this very step-by-step :p but it works!!!!

var colors = ['#e6261f', '#eb7532', '#f7d038', '#a3e048', '#49da9a', '#34bbe6', '#4355db', '#d23be7'];

function preload() { //preload all tracks
  soundFormats('mp3', 'ogg');
  lead = loadSound('lead.mp3');
  backup = loadSound('backup.mp3');
  guitar = loadSound('guitar.mp3');
  bass = loadSound('bass.mp3');
  drums = loadSound('drums.mp3');
  organ = loadSound('organ.mp3');
  strings = loadSound('strings.mp3');
  congas = loadSound('congas.mp3');
}

function setup() {
  createCanvas(900, 550);
  background(0);

  leadFFT = new p5.FFT(); //creates a FFT object that's used to analyze frequency
  leadFFT.setInput(lead);

  backupFFT = new p5.FFT();
  backupFFT.setInput(backup);

  guitarFFT = new p5.FFT();
  guitarFFT.setInput(guitar);

  bassFFT = new p5.FFT();
  bassFFT.setInput(bass);

  drumsFFT = new p5.FFT();
  drumsFFT.setInput(drums);

  organFFT = new p5.FFT();
  organFFT.setInput(organ);

  stringsFFT = new p5.FFT();
  stringsFFT.setInput(strings);

  congasFFT = new p5.FFT();
  congasFFT.setInput(congas);

  playButton = createButton('play/pause'); //button to play/pause
  playButton.position(1020, 550);
  playButton.mousePressed(playAll); //goes to function
  playButton.style('font-size', '15pt'); //style
  playButton.style('font-weight', 'bold');
  playButton.style('border', 'solid');
  playButton.style('padding', '5px');

  leadCheck = createCheckbox('Lead Vocals', true); //checkbox for lead vocals
  leadCheck.position(1020, 140);
  leadCheck.style('font-size', '15pt'); //style
  leadCheck.style('font-weight', 'bold');
  leadCheck.style('background-color', colors[7]);
  leadCheck.style('border', 'solid');
  leadCheck.style('padding', '5px');

  backupCheck = createCheckbox('Backup Vocals', true); //checkbox for backup vocals
  backupCheck.position(1020, 190);
  backupCheck.style('font-size', '15pt'); //style
  backupCheck.style('font-weight', 'bold');
  backupCheck.style('background-color', colors[6]);
  backupCheck.style('border', 'solid');
  backupCheck.style('padding', '5px');

  guitarCheck = createCheckbox('Guitar', true); //checkbox for guitar
    guitarCheck.position(1020, 240); guitarCheck.style('font-size', '15pt'); //style
    guitarCheck.style('font-weight', 'bold'); guitarCheck.style('background-color', colors[5]); guitarCheck.style('border', 'solid'); guitarCheck.style('padding', '5px');

    bassCheck = createCheckbox('Bass', true); //checkbox for bass
    bassCheck.position(1020, 290); bassCheck.style('font-size', '15pt'); //style
    bassCheck.style('font-weight', 'bold'); bassCheck.style('background-color', colors[4]); bassCheck.style('border', 'solid'); bassCheck.style('padding', '5px');

    organCheck = createCheckbox('Organ + Keys', true); //checkbox for organ
    organCheck.position(1020, 340); organCheck.style('font-size', '15pt'); //style
    organCheck.style('font-weight', 'bold'); organCheck.style('background-color', colors[3]); organCheck.style('border', 'solid'); organCheck.style('padding', '5px');

    stringsCheck = createCheckbox('Strings + French Horn', true); //checkbox for strings
    stringsCheck.position(1020, 390); stringsCheck.style('font-size', '15pt'); //style
    stringsCheck.style('font-weight', 'bold'); stringsCheck.style('background-color', colors[2]); stringsCheck.style('border', 'solid'); stringsCheck.style('padding', '5px');

    congasCheck = createCheckbox('Congas + Tambourine', true); //checkbox for congas
    congasCheck.position(1020, 440); congasCheck.style('font-size', '15pt'); //style
    congasCheck.style('font-weight', 'bold'); congasCheck.style('background-color', colors[1]); congasCheck.style('border', 'solid'); congasCheck.style('padding', '5px');

    drumsCheck = createCheckbox('Drums', true); //checkbox for drums
    drumsCheck.position(1020, 490); drumsCheck.style('font-size', '15pt'); //style
    drumsCheck.style('font-weight', 'bold'); drumsCheck.style('background-color', colors[0]); drumsCheck.style('border', 'solid'); drumsCheck.style('padding', '5px');

  }

  function draw() {
    background(0);

    //in reverse order so lead vocals are in front, drums in back when drawn
    //also, the function is set up so it won't display if there is nothing audible
    //so they technically display even when inaudible, but nothing is visible of course
    displayPitch(drumsFFT, colors[0]);
    displayPitch(congasFFT, colors[1]);
    displayPitch(stringsFFT, colors[2]);
    displayPitch(organFFT, colors[3]);
    displayPitch(bassFFT, colors[4]);
    displayPitch(guitarFFT, colors[5]);
    displayPitch(backupFFT, colors[6]);
    displayPitch(leadFFT, colors[7]);

    //the tracks are actually always playing to keep them in synch
    //the volume is adjusted to zero if the checkbox is unchecked
    if (leadCheck.checked() == false) {
      lead.amp(0);
    } else {
      lead.amp(1);
    }

    if (backupCheck.checked() == false) {
      backup.amp(0);
    } else {
      backup.amp(1);
    }

    if (guitarCheck.checked() == false) {
      guitar.amp(0);
    } else {
      guitar.amp(1);
    }


    if (bassCheck.checked() == false) {
      bass.amp(0);
    } else {
      bass.amp(1);
    }


    if (drumsCheck.checked() == false) {
      drums.amp(0);
    } else {
      drums.amp(1);
    }


    if (organCheck.checked() == false) {
      organ.amp(0);
    } else {
      organ.amp(1);
    }


    if (stringsCheck.checked() == false) {
      strings.amp(0);
    } else {
      strings.amp(1);
    }


    if (congasCheck.checked() == false) {
      congas.amp(0);
    } else {
      congas.amp(1);
    }
  }

  function displayPitch(sound, color) { //visualizes frequency
    let spectrum = sound.analyze(); //part of p5 FFT
    noStroke();
    fill(color);
    for (let i = 0; i < spectrum.length; i++) { //map frequencies to x y axis, only those within human hearing range
      let x = map(i, 0, spectrum.length, 0, width);
      let h = -height + map(spectrum[i], 0, 255, height, 0);
      rect(x, height, width / spectrum.length, h) //displayed in multiple rectangle/bars
    }
  }

  function playAll() { //plays and pauses all sounds (since they're all technically playing even when one is muted)
    if (lead.isPlaying()) {
      lead.pause();
      backup.pause();
      guitar.pause();
      bass.pause();
      drums.pause();
      organ.pause();
      strings.pause();
      congas.pause();
    } else {
      lead.loop();
      backup.loop();
      guitar.loop();
      bass.loop();
      drums.loop();
      organ.loop();
      strings.loop();
      congas.loop();
    }
  }
