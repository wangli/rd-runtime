import dispatchEvent from "./dispatchEvent"
import cmd from '@/command'
export default {
    props: {
        id: { type: String, default: "" },
        // 是否可见
        visible: { type: Boolean, default: true },
        // 横坐标
        x: { type: Number, default: 0 },
        // 纵坐标
        y: { type: Number, default: 0 },
        // 宽度
        width: { type: Number, default: 0 },
        // 高度
        height: { type: Number, default: 0 },
        // 透明
        opacity: { type: Number, default: 100 },
        // 角度
        angle: { type: Number, default: 0 },
        // 边框
        border: { type: Object, default() { return {} } },
        // 内边距
        padding: { type: String, default: "" },
        // 背景
        background: { type: Object, default() { return {} } },
        // 阴影
        shadow: { type: Object, default() { return {} } },
        // 深度
        zIndex: { type: Number, default: 0 },
        // 事件名称
        events: { type: Array, default() { return [] } },
        // 附加配置项
        options: { type: Object, default() { return {} } },
        // 是否被选中
        selected: { type: Boolean, default: false },
        // 锁
        lock: { type: Boolean, default: false },
        // 划过
        hover: { type: Boolean, default: false },
        // 捆绑玉约束
        bind: { type: Boolean, default: false },
        // 动效
        anim: { type: Object, default() { return {} } },
        // 数据
        data: [String, Number, Object, Array],
        // 标题（说明）
        title: String
    },
    computed: {
        rect() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        },
        style() {
            let anim = (typeof this.anim == 'object' && this.anim.options) ? this.anim.options : {}
            return {
                position: 'absolute',
                width: this.width > 0 ? this.width + 'px' : 'auto',
                height: this.height > 0 ? this.height + 'px' : 'auto',
                top: this.y + 'px',
                left: this.x + 'px',
                zIndex: this.selected ? 100000 + this.zIndex : this.zIndex,
                transform: 'rotate(' + this.angle + 'deg)',
                opacity: this.opacity / 100,
                padding: this.padding,
                ...this.border,
                ...this.background,
                ...this.shadow,
                ...anim
            }
        }
    },
    created() {
        if (this.id) {
            cmd.addEventListener(`run_function_${this.id}`, data => {
                this.cmdRunning && this.cmdRunning(data)
            })
        }
    },
    mounted() {
        dispatchEvent(this.$el, 'timeout', this, 'mounted')
        dispatchEvent(this.$el, 'interval', this, 'mounted')
    },
    beforeUnmount() {
        if (this.id) {
            cmd.removeEventListener(`run_function_${this.id}`)
        }
        dispatchEvent(this.$el, 'timeout', this, 'beforeUnmount')
        dispatchEvent(this.$el, 'interval', this, 'beforeUnmount')
    }
}