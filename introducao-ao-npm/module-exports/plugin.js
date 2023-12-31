// Função chamada imc que recebe dois parâmetros: peso e altura. Sendo essa função responsável por calcular o IMC e retornar o valor do IMC.
function imc(peso, altura) {
 let imc = peso / (altura * altura); // Calcula o IMC e armazena na variável imc.
 return imc; // Retorna o valor do IMC.
}

module.exports.imc = imc; // Exporta a função imc para ser usada em outros arquivos.

// Função chamada quadrado que recebe um parâmetro x e retorna o quadrado desse número.
function quadrado(x) {
  return x * x; // Retorna o quadrado de x.
}

module.exports.quadrado = quadrado; // Exporta a função quadrado para ser usada em outros arquivos.