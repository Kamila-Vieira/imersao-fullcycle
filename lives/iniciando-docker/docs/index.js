/**
  Exemplo do que seria uma Imagem no Docker:
  
  - Funciona como um molde;
  - Define o ambiente em que o container vai ser executado;
  - Toda imagem é IMUTÁVEL.
**/
class Imagem {
  programas;
  variaveisDeAmbiente;
  aplicacao;
  camadas;
  versoes;
}

/**
  * Exemplo do que seria um Container no Docker:
  
  - Todo container é baseado numa imagem e é MUTÁVEL.
**/
const container = new Imagem();

/** 
  É possível criar vários containers baseados numa mesma imagem
**/
const container2 = new Imagem();

/**
  Exemplo do que seria uma Imagem que herda outra imagem:
  
  - Toda imagem pode ser baseada em outra imagem.
**/
class ImagemNode extends Imagem {}

const container3 = new ImagemNode();
