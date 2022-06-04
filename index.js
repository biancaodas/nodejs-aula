const chalk = require('chalk');
const fs = require ('fs');

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
  const arrayResultados = [];
  let temp;
  while((temp = regex.exec(texto)) !==null) {
    arrayResultados.push({ [temp[1]]: temp[2]})
  }
  return arrayResultados.length === 0 ? 'não há links' : arrayResultados; //Esse aqui só para lembrarmos é um operador ternário, ou seja, é um if ternário, é um tipo de if, isso aqui é uma expressão que recebe 3, trabalha com três operadores, então o que estamos fazendo aqui é uma comparação se arrayResultados.length === 0 ele vai retornar true, ou false, se for true é a primeira opção antes dos dois pontos, retornamos só uma string dizendo ’não há links’.  Se ao contrário, arrayResultados.length === 0 for false, ou seja, se tiver pelo menos uma informação, um índice dentro desse array, vamos retornar o array como estava antes.
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, 'não há arquivo no caminho'));
}

//async, await

async function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  try {
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
    return extraiLinks(texto);
  } catch(erro) {
    trataErro(erro);
  }
 }


module.exports = pegaArquivo;






//quando avisamos o js com o async queremos dizer que dentro da função terá um código assíncrono, e nas linhas onde o código necessita ser assíncrono, esperando o readFile acontecer avisamos um await na frente do resultado. 


//.then
/*function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  fs.promises
  .readFile(caminhoDoArquivo, encoding) 
  .then((texto) => chalk.green(console.log(texto)))
  .catch((erro) => trataErro(erro))

  /*passando pelo readFile (ler arquivo), passando pelo caminhoDoArquivo, ele vai ler o arquivo. Então (.then) quando estiver pronto, o produto do readFile, vai ser passado para frente na função callback (console.log(texto)). E por fim, após todos os processos o método catch vai ter a responsabilidade de pegar o erro, e tratar o erro na função trataErro. 
}*/

/*function pegaArquivo(caminhoDoArquivo) {
  const encoding = 'utf-8';
  fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
    if (erro) {
      trataErro(erro);
    }
    console.log(chalk.green(texto));
  })
}*/

//fs = file system
//promises = código assíncrono - No caso da resolução de promessas, existem dois métodos mais utilizados: o .then() e as palavras-chave async e await.
//.then = método callback
//.catch = pegar
