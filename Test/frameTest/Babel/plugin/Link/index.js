const { transformFromAstSync } = require('@babel/core');
const  parser = require('@babel/parser');
const forDirectionLint = require('./plugin');
const fs = require('fs');
const path = require('path');

const sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[forDirectionLint, {
        trackerPath: 'tracker'//向 autoTrackPlugin 插件传值
    }]]
});


fs.writeFile('./build.js', code, (err) => {
    if (err) {
        console.error(err)
        return
    }
})

//使用 node index 运行该文件
