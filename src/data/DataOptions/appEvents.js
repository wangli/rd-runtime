export default [{
    name: '启动',
    event: 'launch',
    pams: null,
    actions: []
},
{
    name: '定时任务',
    event: 'interval',
    pams: { delay: 1000 },
    actions: []
},
{
    name: '延迟任务',
    event: 'timeout',
    pams: { delay: 1000 },
    actions: []
}]