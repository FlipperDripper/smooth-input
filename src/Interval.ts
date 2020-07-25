export class Interval {
    private _interval: null | number = null
    private readonly _cb: Function
    private _isPaused = false
    private readonly _intervalMs: number
    constructor(cb = Function.prototype, intervalMs= 0) {
        this._cb = cb
        this._intervalMs = intervalMs
    }
    start() {
        if(this._interval) this.clear()
        this._interval = setInterval(()=> {
            if(this._isPaused) return
            this._cb()
        }, this._intervalMs)
    }
    pause() {
        this._isPaused = true
    }
    continue() {
        this._isPaused = false
    }
    clear() {
        clearInterval(this._interval)
    }
    isActive() {
        return Boolean(this._interval)
    }
}