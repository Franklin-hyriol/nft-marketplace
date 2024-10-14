const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const merge = require('merge-stream');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Chemins mis à jour
const paths = {
    scss: 'assets/scss/**/*.scss',
    mainPage: 'assets/scss/page/**/*.scss',
    criticalScss: 'assets/scss/critical/**/*.scss',
    js: {
        common: 'assets/js/common/**/*.js',
        plugins: 'assets/js/plugins/**/*.js',
        page: 'assets/js/page/**/*.js',
        critical: 'assets/js/critical/**/*.js'
    },
    images: 'assets/images/**/*.*',
    fonts: 'assets/fonts/**/*.*', // Chemin pour les polices
    outputDir: 'dist'
};

function compilePageScss() {
    return gulp.src(paths.mainPage)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(cleanCSS()) // Minification du CSS
        .pipe(rename({ extname: '.min.css' })) // Ajouter .min à l'extension du fichier
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${paths.outputDir}/css/page`));
}

function compileCriticalScss() {
    return gulp.src(paths.criticalScss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(cleanCSS()) // Minification du CSS
        .pipe(rename({ extname: '.min.css' })) // Ajouter .min à l'extension du fichier
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${paths.outputDir}/css/critical`));
}

function compileCommonJs() {
    return gulp.src(paths.js.common)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) // Minification des fichiers JS
        .pipe(rename({ suffix: '.min' })) // Ajouter .min à chaque fichier
        .pipe(gulp.dest(`${paths.outputDir}/js/common`));
}

function compilePluginsJs() {
    return gulp.src(paths.js.plugins)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) // Minification des fichiers JS
        .pipe(rename({ extname: '.min.js' })) // Ajouter .min à l'extension du fichier
        .pipe(gulp.dest(`${paths.outputDir}/js/plugins`));
}

function compilePageJs() {
    return gulp.src(paths.js.page)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) // Minification des fichiers JS
        .pipe(rename({ extname: '.min.js' })) // Ajouter .min à l'extension du fichier
        .pipe(gulp.dest(`${paths.outputDir}/js/page`));
}

function compileCriticalJs() {
    return gulp.src(paths.js.critical)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify()) // Minification des fichiers JS
        .pipe(rename({ extname: '.min.js' })) // Ajouter .min à l'extension du fichier
        .pipe(gulp.dest(`${paths.outputDir}/js/critical`));
}

function copyImages() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(`${paths.outputDir}/images`));
}

function copyFonts() {
    return gulp.src(paths.fonts) // Sélectionne tous les fichiers dans assets/fonts
        .pipe(gulp.dest(`${paths.outputDir}/fonts`)); // Copie vers dist/fonts
}

function watchFiles() {
    gulp.watch(paths.scss, gulp.series(compilePageScss, compileCriticalScss));
    gulp.watch(paths.js.common, compileCommonJs);
    gulp.watch(paths.js.plugins, compilePluginsJs);
    gulp.watch(paths.js.page, compilePageJs);
    gulp.watch(paths.js.critical, compileCriticalJs);
    gulp.watch(paths.images, copyImages);
    gulp.watch(paths.fonts, copyFonts); // Surveille le dossier fonts
}

function build() {
    return merge(
        compilePageScss(),
        compileCriticalScss(),
        compileCommonJs(),
        compilePluginsJs(),
        compilePageJs(),
        compileCriticalJs(),
        copyImages(),
        copyFonts() // Ajoute la tâche pour copier les polices
    );
}

exports.build = build;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts; // Expose la tâche pour les polices
exports.default = gulp.series(build, watchFiles);
