import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: ['**/components.d.ts', '**/dist/**', '**/assets/**'],
  },
  {
    rules: {
      // 对所有控制语句强制执行一致的大括号样式
      'curly': 'off',

      // 强制使用一致的类型
      'ts/consistent-type-definitions': ['error', 'type'],

      // 禁止 process
      'node/prefer-global/process': 'off',

      // 禁止 console
      'no-console': 'off',

      // 每次链式调用换行
      'newline-per-chained-call': 'error',

      // 语句之间的填充行
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: [
            'const',
            'let',
            'var',
            'block',
            'block-like',
            'import',
            'export',
            'class',
            'try',
          ],
          next: '*',
        },
      ],
      'padded-blocks': 'off',

      // 强制在注释中 // 或 /* 使用一致的空行  beforeBlockComment  在块注释之前  beforeLineComment  在行注释之前
      'lines-around-comment': [
        'error',
        {
          // beforeBlockComment:  在块注释之前
          beforeBlockComment: true,

          // beforeLineComment:  在行注释之前
          beforeLineComment: true,

          // allowBlockStart:  允许块注释开始
          allowBlockStart: true,

          // allowObjectStart:  允许对象开始
          allowObjectStart: true,

          // allowArrayStart:  允许数组开始
          allowArrayStart: true,

          // ignorePattern:  忽略的模式
          ignorePattern:
            'eslint|jshint|jslint|istanbul|global|exported|jscs|组件|弹窗',
        },
      ],

      // 在注释中的 // 或 /*后面强制保持一致的间距
      'spaced-comment': [
        'error',
        'always',
        {
          //  markers   必须要有空格
          markers: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
        },
      ],

      //  空行最多不能超过 3行
      // 'no-multiple-empty-lines': ['error', { max: 3 }],

      // ///////////////////////////////  Vue  ///////////////////////////////////////////

      // Vue 强制每行的最大属性数
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],

      // vue 强制执行第一个属性的位置
      'vue/first-attribute-linebreak': [
        'error',
        {
          singleline: 'below',
          multiline: 'below',
        },
      ],

      // 强制在多行元素的内容之前和之后进行换行。
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          // allowEmptyLines  是否允许空行
          allowEmptyLines: true,
        },
      ],

      // vue 单行元素内容换行
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          // 是否忽略没有属性的元素
          ignoreWhenNoAttributes: false,
        },
      ],

      // 要求或禁止模板中同级标签之间的换行符
      'vue/padding-line-between-tags': [
        'error',
        [
          {
            blankLine: 'always',
            prev: '*',
            next: '*',
          },
        ],
      ],

      // 强制要求每个 prop 都有一个记录它的注释。
      'vue/require-prop-comment': [
        'error',
        {
          type: 'JSDoc',
        },
      ],

      //  要求三元表达式始终使用多行格式，除了在 JSX 中忽略此规则
      'style/multiline-ternary': [
        'error',
        'always-multiline',
        { ignoreJSX: true },
      ],

      // 'vue/script-indent': ['error', 4, {
      // / /  顶级语句的缩进乘数
      // baseIndent: 1,

      // }],

      // 'overrides': [
      // {
      // files: ['*.vue'],
      // rules: {
      // indent: 'off',
      // },
      // },
      // ],

      'no-alert': 'off',

    },
  },
)
