const { series, src, dest } = require('gulp')
const sassPlugin = require('gulp-sass')
const DartSass = require('sass')
const autoprefixer = require('gulp-autoprefixer')

const sassTransform = sassPlugin(DartSass)

// 编译scss文件
function compile() {
  return src('./src/*.scss')
    .pipe(sassTransform())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest('./lib'))
}

// 移动字体图标
function copyFonts() {
  return src('./src/fonts/**').pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyFonts)
