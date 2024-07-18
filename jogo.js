//pegando a altura e largura

var altura; //criando variaveis para usar dentro e fora da função
var largura; //criando variaveis para usar....
var vidas = 1;
var tempo = 10;

var criaMosquitoTempo = 1500

//variavel que pega a url, mas só oq vem dps do ?, junto cm o ?
var nivel = window.location.search
//aq eu retiro o ? e substituo por vazio
nivel = nivel.replace('?', '')
//aq eu faço uma estrutura condicional, para q cada dificuldadde tenha um tempo diferente
//para o mosquito aparecer e sumir. aí eu chamo essa variavel lá no html
if(nivel === 'facil'){
    criaMosquitoTempo = 1500
}else if(nivel === ' normal'){
    criaMosquitoTempo = 1000
}else if(nivel === 'dificil'){
    criaMosquitoTempo = 750
}
//função que pega o tamamho attual da dela, altura e largura
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight;
  largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

//variavel do cronometro
var cronometro = setInterval(function(){
    //aqw eu pego o elemento o id dele e adciono um html, que é o tempo e que vai diminuindo a cada segundo
    tempo--
    if(tempo < 0){ //aq se o tempo zerar vc ganha
        //aq vou dar um clear interval, para ele parar de execultar a função, elimina as
        //funçoes da memoria
        clearInterval(cronometro)
        //aq eu vou usar outro clear para parar de gerar os mosquitos, pegando la do html
        //a função q foi criada
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    }else{
    document.getElementById('cronometro').innerHTML = tempo

    }
}, 1000)
//encapsulei tudo em uma função para poder chamar ela dps do script
function posicaoRandomica() {


  //controle para remover o mosquito caso ja exista um em tela
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    //parte que contra as vidas diminuindo elas
    if(vidas > 3){
       //aq eu vou por pra ele redirecionar a pagina qnd der game over
       window.location.href= 'fim_de_jogo.html'
    }else {
        console.log(vidas)
        document.getElementById('v' + vidas ).src = 'imagens/coracao_vazio.png'
        vidas++
    }
  }
  //variaveis que criam posições randomicas nos eixos x e y
  var posicaoX = Math.floor(Math.random() * largura) - 90; //usei o floor para arrendondar
  var posicaoY = Math.floor(Math.random() * altura) - 90; //o numero randomico

  //variavel de controle para que qnd o numero for menor q 0, para q a img nao suma da tela

  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  //criar o elemento HTML dentro do js
  //crio uma variavel e atribuo a ela o elemento
  var mosquito = document.createElement("img");
  //aq eu atribuo o src da img
  mosquito.src = "imagens/mosquito.png";
  //aq eu atribuo a classe para a estilização, porem dps eu criei uma função para ter uma classe randomica
  //e atrubui aqui| e tbem coloco aq a classe que muda o lado do mosquito
  mosquito.className = tamamhoAleatorio() + " " + ladoAleatorio();
  //aq eu to acessando o body e colocando um elemento filho para ele

  //colocando a posição aleatoria da img
  mosquito.style.position = "absolute";
  //agr vou atribuir o numero randomico aos eixos
  mosquito.style.left = posicaoX + "px";
  //agr no eixo horizontal
  mosquito.style.top = posicaoY + "px";
  document.body.appendChild(mosquito);

  //criando um id mosquito para o nosso elemento
  mosquito.id = "mosquito";

  //click no mosquto
  mosquito.onclick = function () {
    this.remove(); //this referencia o elemento html
  };
  //aq eu chamo a função que muda o lado do mosquito
  ladoAleatorio();
}

//função que cria um tamanho aleatorio para o mosquito
function tamamhoAleatorio() {
  var classe = Math.floor(Math.random() * 3); //um numero randon q multiplica por 3

  switch (classe) {
    case 0:
      return "mosquito1";
    case 1:
      return "mosquito2";
    case 2:
      return "mosquito3";
  }
}

//função que vai gerar um lado aleatorio, lado que o mosquito estará virado

function ladoAleatorio() {
  var lado = Math.floor(Math.random() * 2); //um numero randon q ficará entre 0 e 1

  console.log(lado);
  switch (lado) {
    case 0:
      return "ladoA";
    case 1:
      return "ladoB";
  }
}
