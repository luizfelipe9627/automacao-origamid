const gulp = require("gulp"); // Importa pelo node o gulp e armazena na variável gulp.
const sass = require("gulp-sass")(require("sass")); // Importa pelo node o gulp-sass e o sass e armazena na variável sass, se não for instalado o sass, o gulp-sass não funciona.

// Função responsável por compilar o SASS para CSS.
function compilaSass() {
  return (
    gulp
      // O src é o caminho para encontrar o(s) arquivo(s) scss. O ** é para indicar que é para procurar em todas as pastas e subpastas. O * é para indicar que é para procurar por todos os arquivos que terminam com .scss.
      .src("css/scss/**/*.scss")
      // O pipe é responsável por encadear as funções, nesse caso está chamando o sass que converte o scss para css e passa como parâmetro a opção de outputStyle como compressed, que é para comprimir o arquivo de saída.
      .pipe(sass({ outputStyle: "compressed" }))
      // O pipe é responsável por encadear as funções, nesse caso está chamando o gulp e dentro dele a função dest, que é para definir o destino do(s) arquivo(s) compilado(s), nesse caso é a pasta css.
      .pipe(gulp.dest("css"))
  );
}

gulp.task("sass", compilaSass); // Executa a função compilaSass quando rodar o comando gulp sass.
