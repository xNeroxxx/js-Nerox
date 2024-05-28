//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro /2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}


function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisãoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
 // verificaColisãoRaquete();
  verificaColisãoRaquete(xRaquete, yRaquete);
  verificaColisãoRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluirPlacar();
  marcaPonto();
}
function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}
  
function verificaColisãoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
}

function mostraRaquete(x,y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisãoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento
     && yBolinha - raio < yRaquete + raqueteAltura
     && yBolinha + raio > yRaquete) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function colisãoMinhaRaqueteBiblioteca() {
  colidiu = collideRectCircle(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluirPlacar() {
  stroke(225);
  textAlign(CENTER);
  textSize(16);
  fill(color(225, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(225, 140, 0));
  rect(450, 10, 40, 20);
  fill(225);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    ponto.play();
  }
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}