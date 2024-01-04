const Jimp = require("jimp"); // Está importando o módulo/biblioteca Jimp.
const fs = require("fs"); // Está importando o módulo/biblioteca fs que é nativo do Node.js.

// O readdirSync está lendo todos os arquivos da pasta img e armazenando em um array.
const imagens = fs.readdirSync("img");

// O forEach está percorrendo o array de imagens.
imagens.forEach((arquivo) => {
  // Está lendo a imagem que está sendo percorrida.
  Jimp.read(`img/${arquivo}`)
    // O then é executado quando a imagem é lida, assim armazenando a imagem no parâmetro imagem.
    .then(function (imagem) {
      // Está manipulando a imagem passada como parâmetro.
      imagem
        .cover(400, 400) // Está alterando o tamanho da imagem para 400px sem distorcer a imagem, diferente do resize que distorce a imagem.
        .greyscale() // Está alterando a cor da imagem para cinza.
        .write(`otimizadas/${arquivo}`); // Está salvando a imagem com o nome passado como parâmetro.
    })
    // O catch é executado quando ocorre algum erro, o erro é armazenado no parâmetro err.
    .catch(function (err) {
      console.error(err); // Está imprimindo o erro no console.
    });
});
