export default [{
    name: '显示隐藏',
    action: "show",
    target: 'component',
    valueType: 'boolean',
    value: true
},
{
    name: '显示开关',
    action: "toggle",
    target: 'component',
    valueType: "undefined",
    value: null
},
{
    name: '发送数据',
    action: "sendData",
    target: 'component',
    valueType: 'object',
    value: null
}, {
    name: '打开外链',
    action: 'href',
    target: 'url',
    valueType: 'string',
    value: ''
}, {
    name: '页面切换',
    action: 'singleModule',
    target: 'modules',
    valueType: 'string',
    value: ""
}, {
    name: '开关弹窗',
    action: 'popup',
    target: 'module',
    valueType: 'string',
    value: ""
}]
