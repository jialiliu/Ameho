/**
 * gulp config file for Ameho
 * @author syhily
 * @since 2016-02-01 14:20:01
 */
// Get gulp
var gulp = require('gulp');

// Gulp function units
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jshint = require('gulp-jshint');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-cssnano');
var rename = require('gulp-rename');

// Image optimization
var imagemin = require('gulp-imagemin'); // Consume a huge amount of memory, use it at your own risk.
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');
var imageResize = require('gulp-image-resize');

// Error handler
var plumber = require("gulp-plumber");
var stylish = require("jshint-stylish");

// Convenience function configuration
var package = require('./package.json'); // Load theme configuration file
var chalk = require('chalk'); // Terminal string styling done right
var dateFormat = require('dateformat'); // Better datetime helper
var csscomb = require('gulp-csscomb'); // Coding style formatter on prefix order for css

var zip = require('gulp-zip'); // Zip function for release & distribute theme

var Utils = (function() {
    var utils = {};
    // Setting working file paths, regard it as constant variable.
    // Your may customize the path for your own purpose.
    var PATHS = {
        "dev": {
            "sass": "sources/styles/sass",
            "css" : "sources/styles/",
            "fonts" : "sources/fonts/",
            "img" : "sources/images/",
            "js" : "sources/scripts/"
        },
        "dist": {
            "css" : "assets/styles/",
            "fonts" : "assets/fonts/",
            "img" : "assets/images/",
            "js" : "assets/scripts/"
        }
    };
    var LOGGER = {
        "warn": "yellow",
        "debug": "grey",
        "error": "red",
        "info": "green"
    };
    // Define working path
    // Usage: Utils.get_dev_css_path(); Utils.get_dev_css(); Utils.get_dev_css("filename");
    for (var path in PATHS) {
        (function(_path) {
            for (var type in PATHS[_path]) {
                (function(_type) {
                    utils["get_" + _path + "_" + _type + "_path"] = function() {
                        return PATHS[_path][_type];
                    };
                    utils["get_" + _path + "_" + _type] = function(file) {
                        return PATHS[_path][_type] + (file || "**/*");
                    };
                })(type);
            }
        })(path);
    }
    // Better Logger
    for (var type in LOGGER) {
        (function(_type) {
            utils[_type] = function(msg) {
                console.log(chalk[LOGGER[_type]]("[" + _type.toUpperCase() + "]\t" + msg));
            };
        })(type);
    }
    return utils;
})();

/**
 * Utils test, useless.
 * $ gulp test
 */
gulp.task('test', function() {
    Utils.debug("This is a debug message.");
    Utils.error("This is a error message.");
    Utils.info("This is a info message.   " + Utils.get_dev_css_path());
    Utils.warn(Utils.get_dev_css());
    Utils.warn(Utils.get_dev_img("**/*.png"));
});

/**
 * Distribute the theme
 * $ gulp build
 */
gulp.task('build', function() {
    del(['build'], function() {
        Utils.error("[Clean] Remove old distribution.");
    });
    // TODO - Main build work
});

/**
 * Compress theme files, auto concat timestamp as distribute file name.
 * $ gulp zip
 */
gulp.task('zip', function() {
    var now = new Date();
    del(['zipped/*.zip'], function() {
        Utils.error("[clean] Delete old files");
    });
    Utils.warn("[Pack] Generate final package");
    gulp.src('build/**/*')
        .pipe(zip(package.name + '-' + dateFormat(now, 'yyyy-mmmm-dS-h-MMTT') + '.zip'))
        .pipe(gulp.dest('zipped/'))
});


/**
 * Clean working dir & accept alternative options
 * $ gulp clean [options]
 */
gulp.task('clean', function(cb) {
    del(['build'], cb);
});

/**
 * Sass parser
 * $ gulp sass
 */
gulp.task('sass', function() {
    // Dev version, add sourcemap for better edit on Chrome develop tools
    Utils.debug("Sass path: " + Utils.get_dev_sass_path())
    Utils.debug("Distribute Path: " + Utils.get_dist_css_path());
    gulp.src(Utils.get_dev_sass())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(Utils.get_dev_css_path()))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(rename('dev.min.css'))
        .pipe(gulp.dest(Utils.get_dist_css_path()));

    // Production version, the minimal css sets.
    // Use for saving bandwith & better brower prformance.
    gulp.src(Utils.get_dev_sass())
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(csscomb())
        .pipe(rename('uncompressed.css'))
        .pipe(gulp.dest(Utils.get_dist_css_path()))
        .pipe(minifycss())
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest(Utils.get_dist_css_path()));
});

/**
 * Jshint
 * $ gulp hint
 */
gulp.task('lint', function() {
    return gulp.src(Utils.get_dev_js())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * JavaScript resolver
 * $ gulp scripts
 */
gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    gulp.src(Utils.get_dev_js())
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(Utils.get_dist_js_path()))
        .pipe(rename('dev.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(Utils.get_dist_js_path()));

    // TODO - Requirejs integeration
});

/**
 * Image compress
 * $ gulp image
 */
gulp.task('image', function() {
    return gulp.src(Utils.get_dev_img("**/*.png"))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(Utils.get_dist_img_path()));
});

/**
 * Auto generate css sprites & @2x retina sprites
 * $ gulp sprite
 * @see https://github.com/Ensighten/spritesmith
 */
gulp.task('sprite', ['retinasprite', 'standardsprite'], function() {
    del([Utils.get_dev_img("sprite*.png")], function() {
        Utils.error("[Clean] Delete old css sprites")
    });
});

/**
 * Retina(@2x) sprites generation
 */
gulp.task('retinasprite', function(cb) {
    var spriteData = gulp.src(Utils.get_dev_img("sprites/*.png")).pipe(spritesmith({
        imgName: 'sprite@2x.png',
        cssName: '_sprite.scss',
        algorithm: 'binary-tree',
        padding: 10 // Recommend 10px whitespace
    }));
    spriteData.img.pipe(gulp.dest(Utils.get_dev_img_path())); // 输出合成图片
    spriteData.css.pipe(gulp.dest(Utils.get_dev_sass_path())).on('end', cb)
    Utils.info("[Sprites] Generated retina sprite");
});

/**
 * Normal(@1x) sprites generation
 */
gulp.task('standardsprite', ['retinasprite'], function(cb) {
    Utils.info("[Sprites] Generated normal sprite");
    gulp.src(Utils.get_dev_img("sprite@2x.png")).pipe(imageResize({
        width: '50%'
    }))
    .pipe(rename('sprite.png'))
    .pipe(gulp.dest(Utils.get_dev_img_path())).on('end', cb)
})

/**
 * Watch file change
 * $ gulp watch
 */
 gulp.task('watch', function() {
    Utils.warn("[Listen] gulp auto compile initialization, workflow for frontend.");
    gulp.watch(Utils.get_dev_js(), ['scripts']);
    gulp.watch(Utils.get_dev_sass(), ['sass']);
});

gulp.task('default', ['watch', 'scripts']);
gulp.task('watch:base', ['watch']);
