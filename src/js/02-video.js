'use strict'
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';
const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);
player.setCurrentTime(Number(localStorage.getItem(CURRENT_TIME)));

function playerTime(event) {
  localStorage.setItem(CURRENT_TIME, event.seconds);
}

player.on('timeupdate', throttle(playerTime, 1000));
