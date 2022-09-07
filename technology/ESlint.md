## 规范前端工程代码规范

### ESLint 代码检查工具
你可以在ESLint中配置你的各种代码格式，如果是使用单引号还是双引号，js代码后面是否加引号，等。
1. .eslintrc.js ESLint配置文件
使用npm安装ESLint
```
npm i eslint -D
```
安装成功后我们需要设置一个配置文件
```
./node_modules/.bin/eslint --init
```

上面的命令会出现一些选项，根据自己的需求选择配置什么样的代码格式。
全部选择完后会在项目根目录下生成一个.eslintrc.js文件，该文件就是ESLint的配置文件。
1. .eslintignore ESLint配置忽略文件
在.eslintignore文件中直接写入文件名，当ESLint检查时就会跳过该文件。
例：
```
node_modules
```
3. 使用命令修改不符合格式的代码
```
eslint --fix src(文件名or文件夹or文件扩展名)
```
4. vscode中ESLint插件
在vscode中安装ESLint插件，并修改其工作区
```
{
  "eslint.run": "onType",
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
}
```
