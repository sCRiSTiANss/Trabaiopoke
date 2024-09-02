const bird = document.querySelector('.bird');
const varCSS = document.documentElement;    // acessa campo de var do style.css
const pipeNormal = document.querySelector('.pipeNormal');
const pipeInvert = document.querySelector('.pipeInvert');
const score = document.querySelector('.points');
const scoreMenu = document.querySelector('.pointsMenu');
const menu = document.querySelector('.menu');
const buttonPlay = document.querySelector('.iconPlay');
const gameBoard = document.querySelector('.gameBoard');
const coin = document.querySelector('.coin');
const difficultyButton = document.querySelectorAll('.difficultyButton');

var points = 0;
var highScore = 0;
var flagPoints = false;

var flagJump = true;
var flagFall = true;
var flagMenu = false;

let lives = 3;
let invincible = false;

let valueBottom = getComputedStyle(bird).getPropertyValue('bottom');    //pega valor atual de bottom do bird
let valuePositionMoment = getComputedStyle(varCSS).getPropertyValue('--positionMoment');
let valuePositionJumpFinal = getComputedStyle(varCSS).getPropertyValue('--positionJumpFinal');

updateValue();