const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function manejaErros(erro) {
    throw new Error(erro.message);
}

async function checaStatus(arrLinks) {
    try {
      const arrStatus = await Promise
        .all(arrLinks
          .map(async (url) => {
            const res = await fetch(url);
            return `${res.status} - ${res.statusText}`;
          }));
      return arrStatus;
    } catch (error) {
      errorHandler(error.message);
    }
}

function geraArrayDeURLs(arrayLinks) {
    //loop para cada {chave:valor}
    //objeto -> [valor]
    //Object.values(Object)
    return arrayLinks
        .map(objetoLink => Object
            .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {  
    const links = geraArrayDeURLs(arrayLinks);
    const statusLinks = await checaStatus(links);
    //spread operator -> operador de espalhamento: desconstroi e remonta um objeto.
    const resultados = arrayLinks.map((objeto, indice) => ({ 
        ...objeto, 
    status: statusLinks[indice] 
}))
return resultados;
}

module.exports = validaURLs;