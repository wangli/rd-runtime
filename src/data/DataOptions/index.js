import level from "./level"
import actions from "./actions"
import dataTypes from "./dataTypes"
import component from "./component"
import events from "./events"

/**
 * 此模块是数据相关定义、初始化、配置等
 */
export default {
    get level() { return level },
    get actions() { return actions },
    get dataTypes() { return dataTypes },
    get component() { return component },
    get events() { return events }
}