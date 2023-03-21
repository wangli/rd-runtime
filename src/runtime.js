const runtime = {}
export default runtime
export const setProps = function (o) {
    Object.assign(runtime, o)
    return runtime
}