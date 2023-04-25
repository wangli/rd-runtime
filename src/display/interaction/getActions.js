import { jsonData } from '@/utils'

export default function (data, event) {
    let actions = jsonData(data.getActionList(event.actions))
    if (event.actionValue && typeof event.actionValue == 'object') {
        actions.forEach(action => {
            if (event.actionValue[action.id]) {
                action.value = data.getDataSource(event.actionValue[action.id])
            }
        })
    }
    return actions
}