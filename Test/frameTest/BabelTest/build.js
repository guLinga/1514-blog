const babel = require("@babel/core");

const code = `
    const sayHi = () => {
        console.log('你好')
    }
    sayHi()
`

const optionsObject = {}

const result = babel.transform(code, optionsObject)

console.log(result)
