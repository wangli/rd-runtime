export default [{
    name: '应用启动',
    event: 'launch',
    pams: null,
    actions: [],
    actionValue: {}
},
{
    name: '定时任务',
    event: 'interval',
    pams: { delay: 1000 },
    actions: [],
    actionValue: {}
},
{
    name: '延迟任务',
    event: 'timeout',
    pams: { delay: 1000 },
    actions: [],
    actionValue: {}
}]