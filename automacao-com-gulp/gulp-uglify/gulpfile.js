const gulp = require("gulp"); // Importa pelo Node o gulp e armazena na variável gulp.
const sass = require("gulp-sass")(require("sass")); // Importa pelo Node o gulp-sass e o sass e armazena na variável sass, se não for instalado o sass, o gulp-sass não funciona.
const autoprefixer = require("gulp-autoprefixer"); // Importa pelo Node o gulp-autoprefixer e armazena na variável autoprefixer.
const browserSync = require("browser-sync").create(); // Importa pelo Node o browser-sync criando um servidor local e armazena na variável browser.
const concat = require("gulp-concat"); // Importa pelo Node o gulp-concat e armazena na variável concat.
const babel = require("gulp-babel"); // Importa pelo Node o gulp-babel e armazena na variável babel.
const uglify = require("gulp-uglify"); // Importa pelo Node o gulp-uglify e armazena na variável uglify.

// Função responsável por concatenar/juntar os arquivos js.
function gulpJS() {
  // Sempre quando queremos modificar um arquivo tem que usar o return.
  return (
    gulp
      // O src é o caminho para encontrar o(s) arquivo(s) js. O "*" é para indicar que é para procurar por todos os arquivos que terminam com .js.
      .src("js/main/*.js")
      // O pipe é responsável por encadear as funções, nesse caso está chamando o concat e passa como parâmetro o nome do arquivo de saída, que é o main.js.
      .pipe(concat("main.js"))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o babel e passa como parâmetro o preset-env, tendo como seu valor um array com o valor @babel/env, que é para converter o código js para uma versão mais antiga, para que todos os navegadores consigam ler.
      .pipe(babel({ presets: ["@babel/env"] }))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o uglify, que é para comprimir o código js.
      .pipe(uglify())
      // O pipe é responsável por encadear as funções, nesse caso está chamando o gulp e dentro dele a função dest, que é para definir o destino do(s) arquivo(s) compilado(s), nesse caso é a pasta js.
      .pipe(gulp.dest("js"))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o browserSync.stream, que é para atualizar o servidor local.
      .pipe(browserSync.stream())
  );
}

gulp.task("mainjs", gulpJS); // Executa a função gulpJS quando rodar o comando gulp mainjs.

// Função responsável por criar um servidor local.
function browser() {
  // O init é responsável por iniciar o servidor local, nesse caso está passando como parâmetro um objeto com a propriedade server e dentro dela a propriedade baseDir, que é para indicar qual é a pasta base do servidor local.
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

gulp.task("browser-sync", browser); // Executa a função browser quando rodar o comando gulp browser-sync.

// Função responsável por compilar o SASS para CSS.
function compilaSass() {
  // Sempre quando queremos modificar um arquivo tem que usar o return.
  return (
    gulp
      // O src é o caminho para encontrar o(s) arquivo(s) scss. O "**"" é para indicar que é para procurar em todas as pastas e subpastas. O "*" é para indicar que é para procurar por todos os arquivos que terminam com .scss.
      .src("css/scss/**/*.scss")
      // O pipe é responsável por encadear as funções, nesse caso está chamando o sass que converte o scss para css e passa como parâmetro a opção de outputStyle como compressed, que é para comprimir o arquivo de saída.
      .pipe(sass({ outputStyle: "compressed" }))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o autoprefixer é passado como parâmetro o browsers, que é para indicar a partir de qual versão do navegador o prefixo será adicionado e o cascade como false, que é para não deixar o código com identação.
      .pipe(autoprefixer({ browsers: ["last 2 versions"], cascade: false }))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o gulp e dentro dele a função dest, que é para definir o destino do(s) arquivo(s) compilado(s), nesse caso é a pasta css.
      .pipe(gulp.dest("css"))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o browserSync.stream, que é para atualizar o servidor local.
      .pipe(browserSync.stream())
  );
}

gulp.task("sass", compilaSass); // Executa a função compilaSass() quando rodar o comando gulp sass.

// Função responsável por observar os arquivos scss.
function watch() {
  // O watch é responsável por observar os arquivos, nesse caso está observando o arquivo scss, quando houver alteração ele executa a função compilaSass. O "**" é para indicar que é para procurar em todas as pastas e subpastas. O "*" é para indicar que é para procurar por todos os arquivos que terminam com .scss.
  gulp.watch("css/scss/**/*.scss", compilaSass);
  // O watch é responsável por observar os arquivos, nesse caso está observando o arquivo js, quando houver alteração ele executa a função gulpJS. O "*" é para indicar que é para procurar por todos os arquivos que terminam com .js.
  gulp.watch("js/main/*.js", gulpJS);
  // O watch é responsável por observar os arquivos, nesse caso está observando o arquivo html, quando houver alteração ele executa a função browserSync.reload, que é para atualizar o servidor local. Para observar mais de um arquivo é só colocar dentro de uma array uma vírgula e o caminho do outro arquivo.
  gulp.watch(["*.html"]).on("change", browserSync.reload);
}

gulp.task("watch", watch); // Executa a função watch quando rodar o comando gulp watch.

// O parallel é responsável por executar todas as funções ao mesmo tempo.
gulp.task("default", gulp.parallel("watch", "browser-sync", "sass", "mainjs")); // Executa as funções watch, browser-sync, sass e mainjs ao mesmo tempo quando rodar o comando gulp.
