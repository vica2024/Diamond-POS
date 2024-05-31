//此处的规则供参考，其中多半其实都是默认值，可以根据个人习惯改写
module.exports = {
    // 1.一行代码的最大字符数，默认是80(printWidth: <int>)
    printWidth: 120, //单行长度
    // 2.tab宽度为2空格(tabWidth: <int>)
    tabWidth: 4, //缩进长度
    // 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
    useTabs: true, //使用空格代替tab缩进
    // 4.结尾是否添加分号
    semi: true, //句末使用分号
    // 5.使用单引号(singleQuote: <bool>)
    singleQuote: false, //使用单引号
    // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
    quoteProps: "as-needed", //仅在必需时为对象的key添加引号
    // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
    jsxSingleQuote: false, // jsx中使用单引号
    // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
    trailingComma: "all", //多行时尽可能打印尾随逗号
    // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
    bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
    // 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
    jsxBracketSameLine: false, //多属性html标签的‘>’折行放置
    // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
    arrowParens: "always", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
    // rangeStart: 0, //格式化文件的范围起始
    // rangeEnd: Infinity, //格式化文件的范围结束

    requirePragma: false, //无需顶部注释即可格式化
    insertPragma: false, //在已被preitter格式化的文件顶部加上标注
    // proseWrap: 'preserve', //不知道怎么翻译
    htmlWhitespaceSensitivity: "ignore", //对HTML全局空白不敏感
    // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
    vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
    // 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
    endOfLine: "lf", //结束行形式
    // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
    embeddedLanguageFormatting: "auto", //对引用代码进行格式化

    //   printWidth: 80,

    //   tabWidth: 2,

    //   useTabs: false,

    //   semi: false,
    //   // 5.使用单引号(singleQuote: <bool>)
    //   singleQuote: true,
    //   // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
    //   quoteProps: 'as-needed',
    //   // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
    //   jsxSingleQuote: false,
    //   // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
    //   trailingComma: 'es5',
    //   // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
    //   bracketSpacing: true,
    //   // 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
    //   jsxBracketSameLine: false,
    //   // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
    //   arrowParens: 'always',
    //   // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
    //   rangeStart: 0,
    //   rangeEnd: Infinity,
    //   // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
    //   vueIndentScriptAndStyle: false,
    //   // 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
    //   endOfLine: 'lf',
    //   // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
    //   embeddedLanguageFormatting: 'off',
};
