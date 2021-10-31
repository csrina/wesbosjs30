/* get ourt elements*/

const player = document.querySelector('.player__video')
const progress = document.querySelector('.progress__filled')
const progressm = document.querySelector('.progress')
const playButton = document.querySelector('.player__button.toggle')
const volume = document.querySelector('.player__slider[name="volume"]')
const playbackRate = document.querySelector('.player__slider[name="playbackRate"]')
const skipTen = document.querySelector('.player__button[data-skip="-10"]')
const skipTwenty = document.querySelector('.player__button[data-skip="25"]')
const fs = document.querySelector('.full_screen')
const full_player = document.querySelector('.player')

/* build oru functions*/

togglePlay = () => player.paused? player.play() : player.pause()

updateButton = () =>  playButton.textContent = player.paused ? '►'  : '| |';

function skip () {
    player.currentTime = player.currentTime + parseInt(this.getAttribute("data-skip"))
}

player.ontimeupdate = () => progress.style.setProperty('flex-basis', `${player.currentTime/player.duration*100}%`)
player.onvolumechange = () => volume.value = player.volume;
player.onratechange = () => playbackRate.value = player.playbackRate;

volumeUpdate = () => player.volume = volume.value;
playbackRateUpdate = () => player.playbackRate = playbackRate.value;
progressUpdate = (e) => player.currentTime = e.offsetX/progressm.clientWidth*player.duration;

let isFull = false
toggleFS = () =>  {
    isFull? document.exitFullscreen() : full_player.requestFullscreen();
    isFull = !isFull
}
/* hook up our event liteners */

player.addEventListener('click', togglePlay)
player.addEventListener('play', updateButton)
player.addEventListener('pause', updateButton)

playButton.addEventListener('click', togglePlay)

skipTen.addEventListener('click', skip)
skipTwenty.addEventListener('click', skip)

volume.addEventListener('change', volumeUpdate);
playbackRate.addEventListener('change', playbackRateUpdate);
volume.addEventListener('mousemove', volumeUpdate);
playbackRate.addEventListener('mousemove', playbackRateUpdate);

let mouseDown = false
progressm.addEventListener('click', progressUpdate);
progressm.addEventListener('mousemove', (e) => mouseDown && progressUpdate(e));
progressm.addEventListener('mouseup', () => mouseDown = false);
progressm.addEventListener('mousedown', () => mousedown = true);

fs.addEventListener('click', toggleFS)