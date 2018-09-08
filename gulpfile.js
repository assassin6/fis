var config = {
    base:"base",
    people:"people",
}
var gulp = require('gulp');

// 引入组件
var less = require('gulp-less'), // less
    concat = require('gulp-concat'), // 合并文件
    minifycss = require('gulp-minify-css'), // CSS压缩
    rename = require('gulp-rename'), // 重命名
    clean = require('gulp-clean'), //清空文件夹
    uglify = require('gulp-uglify'), // js压缩
    livereload = require('gulp-livereload'), //监听网页
    browserSync = require('browser-sync'),
    gutil = require('gulp-util');
    seajsCombo = require('gulp-seajs-combo');　 //browserSync = require('browser-sync'); //浏览器同步

//测试模块合并
gulp.task("seajs", function() {
    gulp.src(['./src/test/ms.base.js','./src/test/ms.base.extend.js','./src/test/main.js'])
        .pipe(seajsCombo())
        .pipe(gulp.dest('./dest/test/'))
        .pipe(rename({
            suffix: '.min'
        }))  
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/test/'));;
});

//server配置
gulp.task('browser-sync', function() {
    var files = [
        'dest/**/*.html',
        'dest/css/**/*.css',
        'dest/images/**/*.png',
        'dest/javascript/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './dest'
        },
        port: 8080,
        ui: false
    });
});

// less解析
gulp.task('build-less', function() {
    //将src/less/*.less文件编译并发布到dest/css下面
    gulp.src('./skin/manager/4.7.0/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./skin/manager/4.7.0/css/'))
        .pipe(livereload());

    //移动端会员中心less编译,将people-mall/m/less编译成css放people-mall/m/m_css下
    gulp.src('./skin/people-mall/m/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dest/skin/people-mall/m/m_css/'))
        .pipe(livereload());

    //PC会员中心less编译,将people-mall/less编译成css放people-mall/people_css下
    gulp.src('./skin/people-mall/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dest/skin/people-mall/people_css/'))
        .pipe(livereload());
});


// 合并、压缩、重命名css
gulp.task('stylesheets', ['build-less'], function() {

    // 注意这里通过数组的方式写入两个地址,仔细看第一个地址是css目录下的全部css文件,
    //第二个地址是css目录下的areaMap.css文件,但是它前面加了!,这个和.gitignore的写法类似,就是排除掉这个文件.
    // gulp.src(['./dest/css/**/*.css', '!./javis/static/build/css/areaMap.css']) //需要合并的目录文件
    //需要根据不同的模块来合并，如用户、商城等分别为ms.people.css ms.mall.css，对应压缩文件ms.people.min.css ms.mall.css
    gulp.src(['./skin/manager/4.7.0/css/ms.manager.css', '!./other.css']) //需要合并的目录文件
        .pipe(concat('ms.manager.css'))　 //合并后的文件
        .pipe(gulp.dest('./dest/skin/manager/css/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(minifycss())　 //压缩css
        .pipe(gulp.dest('./dest/skin/manager/4.6.0/css/')); //压缩后存放的位置

    //mstore的css
    gulp.src(['./skin/manager/4.7.0/css/ms.mstore.css', '!./other.css']) //需要合并的目录文件
        .pipe(concat('ms.mstore.css'))　 //合并后的文件
        .pipe(gulp.dest('./dest/skin/manager/css/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(minifycss())　 //压缩css
        .pipe(gulp.dest('./dest/plugins/ms/mstore/4.6.0/css/')); //压缩后存放的位置
        
    //演示站头部css
    gulp.src(['./plugins/ms/mstore/mstore-header.css', '!./other.css']) //需要合并的目录文件
        .pipe(concat('mstore-header.css'))　 //合并后的文件
        .pipe(gulp.dest('./dest/plugins/ms/mstore/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(minifycss())　 //压缩css
        .pipe(gulp.dest('./dest/plugins/ms/mstore/4.6.0/css/')); //压缩后存放的位置

    // 合并、压缩、重命名移动端会员中心css
     gulp.src(['./dest/skin/people-mall/m/m_css/*.css']) //需要合并的目录文件
        .pipe(concat('ms.mall.m.people.css'))　 //合并后的文件
        .pipe(gulp.dest('./dest/skin/people-mall/m/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(minifycss())　 //压缩css
        .pipe(gulp.dest('./dest/skin/people-mall/m/css/')); //压缩后存放的位置
     gulp.src(['./dest/skin/people-mall/people_css/*.css']) //需要合并的目录文件
        .pipe(concat('ms.mall.people.css'))　 //合并后的文件
        .pipe(gulp.dest('./dest/skin/people-mall/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(minifycss())　 //压缩css
        .pipe(gulp.dest('./dest/skin/people-mall/css/')); //压缩后存放的位置
});


// 合并，压缩js文件
gulp.task('javascripts', function() {
    //需要根据不同的模块来合并，如用户、商城等分别为ms.people.js ms.mall.js，对应压缩文件ms.people.min.js ms.mall.js
    //基础模块
    gulp.src(['./model/ms.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置    
    //main配置文件
    gulp.src(['./model/main.js','!./other.js']) //需要合并的目录文件
        //.pipe(concat('main.js'))　 //合并后的文件
        //.pipe(gulp.dest('./dest/model/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //上传模块
    gulp.src(['./model/ms.upload.js', '!./other.js']) //需要合并的目录文件
        //.pipe(concat('ms.upload.js'))　 //合并后的文件
        //.pipe(gulp.dest('./dest/model/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //升级器模块
    gulp.src(['./model/ms.upgrader.js', '!./other.js']) //需要合并的目录文件
        //.pipe(concat('ms.upgrader.js'))　 //合并后的文件
        //.pipe(gulp.dest('./dest/model/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //升级器模块
    gulp.src(['./model/ms.mcode.js', '!./other.js']) //需要合并的目录文件
        //.pipe(concat('ms.mcode.js'))　 //合并后的文件
        //.pipe(gulp.dest('./dest/model/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //商城模块
    gulp.src(['./model/ms.mall.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mall.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //会员模块
    gulp.src(['./model/ms.people.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.people.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //文章管理模块
    gulp.src(['./model/ms.mcms.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mcms.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //论坛模块
    gulp.src(['./model/ms.mbbs.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mbbs.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置
  //mstore模块
    gulp.src(['./model/ms.mstore.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mstore.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置
    //运费模块
    gulp.src(['./model/ms.freight.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.freight.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //支付模块
    gulp.src(['./model/ms.pay.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.pay.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 

    //支付模块
    gulp.src(['./model/ms.mbank.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mbank.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
    //微信模块
    gulp.src(['./model/ms.mweixin.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mweixin.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置 
	//mstore
    gulp.src(['./model/ms.mstore.client.js', '!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.mstore.client.js'))　 //合并后的文件
         .pipe(gulp.dest('./dest/model/4.6.0/'))//合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/model/4.6.0/')); //压缩后存放的位置
})


// 合并，压缩后台管理的js文件
gulp.task('managerjs', function() {
    //mstore客户端JS的压缩
    gulp.src(['./plugins/ms/mstore/mstore-client.js','!./other.js']) //需要合并的目录文件
        .pipe(concat('mstore-client.js'))　 //合并后的文件
        .pipe(gulp.dest('./dest/plugins/ms/mstore/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/plugins/ms/mstore/4.6.0/js/')); //压缩后存放的位置 
    gulp.src(['./plugins/ms/mstore/mstore-header.js','!./other.js']) //需要合并的目录文件
        .pipe(concat('mstore-header.js'))　 //合并后的文件
        .pipe(gulp.dest('./dest/plugins/ms/mstore/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/plugins/ms/mstore/4.6.0/js/')); //压缩后存放的位置 
    //后台manager的js压缩
    /*gulp.src(['./skin/manager/4.7.0/js/ms.manager.js','!./other.js']) //需要合并的目录文件
        .pipe(concat('ms.manager.js'))　 //合并后的文件
        .pipe(gulp.dest('./dest/skin/manager/')) //合并后的文件存放位置
        .pipe(rename({
            suffix: '.min'
        })) //重命名
        .pipe(uglify())　 //压缩js
        .pipe(gulp.dest('./dest/skin/manager/4.6.0/js/')); //压缩后存放的位置 */
})

// 清空图片、样式、js
gulp.task('clean', function() {
    return gulp.src(['./dest/*'], {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

// 将文件复制对应到指定位置
gulp.task("build-file", function() {
    //将cms模板下的内容复制到D盘项目中
    /*gulp.src(['./skin/cms/*.htm'])
        .pipe(gulp.dest('D:/bbs/JTM-MCMS-4.5.5/apache-tomcat-7.0.55/webapps/ROOT/templets/86/cms/*.htm')) //复制htm文档
   */  
});

// 定义develop任务在日常开发中使用
gulp.task('develop', function() {
    gulp.run("build-file", 'build-less', 'javascripts', 'stylesheets', 'browser-sync');
    //监听样式的修改
    livereload.listen(); //要在这里调用listen()方法
    gulp.watch('./src/less/**/*.less', ['stylesheets']);
    gulp.watch(['./src/**/*.htm', './src/**/*.html'], ['build-file']);
    gulp.watch(['./src/**/*.js'], ['javascripts']);
});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task('default', ['clean'], function() {
    gulp.run('develop');
});

