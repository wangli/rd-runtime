import { onMounted, onUnmounted } from "vue"
import cmd from '@/command'

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