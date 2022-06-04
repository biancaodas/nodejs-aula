const chalk = require('chalk');
const pegaArquivo = require('./index');
const validaURLs = require('./http-validação');

const caminho = process.argv;

 async function processaTexto(caminhoDeArquivo) {
    const resultado = await pegaArquivo(caminhoDeArquivo[2]);
    if (caminho[3] === 'validar') {
        console.log(chalk.yellow('links validados'), await validaURLs(resultado));
    } 
    else {
        console.log(chalk.yellow('lista de links'), resultado);
    }
}

processaTexto(caminho);

//console.log(pegaArquivo(caminho[2])); //passamos para a linha de comando, a responsábilidade de passar o caminho do arquivo para dentro da função pegaArquivo.