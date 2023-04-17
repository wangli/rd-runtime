import { getCurrentInstance } from 'vue'

export default function () {
    const { appContext: { config: { globalProperties: global = {} } } } = getCurrentInstance()
    return global.AppSetup || null
}