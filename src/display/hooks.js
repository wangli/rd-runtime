import { onMounted, onUnmounted } from "vue"
import { interval, timeout } from '@/utils'
import { EVENTS } from '@/events'
import cmd from '@/command'
import getActions from './interaction/getActions'

const dispatchEvent = function ($el, event, component, value) {
    if ($el && $el.getAttribute && $el.getAttribute(event)) {
        $el.dispatchEvent(new CustomEvent(event, {
            detail: {
                component,
                value
            }
        }))
    }
}

export const lifecycleHook = function (vnode, props, context) {
    let $el = null
    onMounted(() => {
        if (props.id) {
            cmd.addEventListener(`run_function_${props.id}`, data => {
                if (vnode.child && vnode.child.value) {
                    vnode.child.value.cmdRunning && vnode.child.value.cmdRunning(data)
                }
            })
        }
        if (vnode.value && vnode.value.el) {
            $el = vnode.value.el
            dispatchEvent($el, 'timeout', vnode.value, 'mounted')
            dispatchEvent($el, 'interval', vnode.value, 'mounted')
        }
    })
    onUnmounted(() => {
        if (props.id) {
            cmd.removeEventListener(`run_function_${props.id}`)
        }
        if ($el) {
            dispatchEvent($el, 'timeout', vnode.value, 'beforeUnmount')
            dispatchEvent($el, 'interval', vnode.value, 'beforeUnmount')
        }
    })
}

export const stageHook = function (data) {
    let it = null
    let ti = null
    onMounted(() => {
        cmd.emit(EVENTS.STAGE_MOUNTED)
        if (data.AppSetup.interaction) {
            const appid = data.info.id
            const evtLaunch = data.eData.getGAction('launch')
            const evtInterval = data.eData.getGAction('interval')
            const evtTimeout = data.eData.getGAction('timeout')
            if (evtLaunch && Array.isArray(evtLaunch.actions)) {
                cmd.execute(getActions(data, evtLaunch), 'app', appid)
            }
            if (evtInterval && Array.isArray(evtInterval.actions)) {
                let delay = evtInterval.pams ? evtInterval.pams.delay || 1000 : 1000
                it = interval.add(() => cmd.execute(getActions(data, evtInterval), 'app', appid), parseInt(delay))
            }
            if (evtTimeout && Array.isArray(evtTimeout.actions)) {
                let delay = evtTimeout.pams ? evtTimeout.pams.delay || 1000 : 1000
                ti = timeout.add(() => cmd.execute(getActions(data, evtTimeout), 'app', appid), parseInt(delay))
            }

        }
    })
    onUnmounted(() => {
        interval.del()
        timeout.del()
    })
}