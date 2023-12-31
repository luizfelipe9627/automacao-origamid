let plugin = require("./plugin.js"); // Cria uma variável chamada plugin que importa todas os module.exports do arquivo plugin.js.

// Quando não é passado um caminho relativo, o node por padrão procura no diretório node_modules.
let moment = require("moment"); // Cria uma variável chamada moment que importa as funções do módulo moment.

console.log(moment().format("DD/MM/YYYY")); // Acessa a função format dentro do módulo moment e imprime o resultado no console, mostrando a data atual no formato DD/MM/YYYY.

console.log(plugin.imc(60, 1.7)); // Acessa a função imc dentro do arquivo plugin.js e imprime o resultado no console.
console.log(plugin.quadrado(5)); // Acessa a função quadrado dentro do arquivo plugin.js e imprime o resultado no console.