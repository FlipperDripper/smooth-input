import {Interval} from "./Interval";

const ELEMENT_CLASSES = {
    primary: 'smooth-text-container',
    carriageHide: 'smooth-text-container--carriage-hide'
}
const defaultConfig: SmoothInputOptions = {
    symbolsPerSecond: 10,
    delay: 0,
    symbolsDelay: {},
    text: null,
    carriage: {
        visible: true
    }
}

export class SmoothInput {
    /**
     * Text for printing
     */
    protected _smoothText = ''
    /**
     * Content of target element
     */
    protected _textContent = ''
    /**
     * Element which contain text
     */
    protected _element: HTMLElement
    /**
     * SmoothInput config
     */
    protected _config: SmoothInputOptions
    /**
     * Interval id
     */
    protected _interval: Interval


    constructor(element: HTMLElement, config: SmoothInputOptions = defaultConfig) {
        if (config !== defaultConfig) {
            this._config = {...defaultConfig, ...config}
        } else {
            this._config = config
        }
        this._element = element
        this._interval = new Interval()
        this.beforeInputHook()
    }

    protected get smoothText() {
        return this._smoothText
    }

    protected set smoothText(val) {
        this._smoothText = val
        this.print(this.smoothText)
    }

    protected init() {
        this._textContent = this._config.text || this._element.innerText
        this.clearElementContent()
        if (this._config.delay) {
            setTimeout(() => this.initInputInterval(), this._config.delay)
        } else {
            this.initInputInterval()
        }
        this.initCarriage()
        this.addClassToElement(ELEMENT_CLASSES.primary)
    }

    protected initCarriage() {
        if (!this._config.carriage.visible) {
            this.hideCarriage()
        }
    }

    protected hideCarriage() {
        this.addClassToElement(ELEMENT_CLASSES.carriageHide)
    }

    protected initInputInterval() {
        const interval = 1000 / this._config.symbolsPerSecond
        this._interval = new Interval(this.inputText(), interval)
        this._interval.start()
    }

    protected inputText() {
        let symbolIndex = 0
        const updateSmoothText = (symbol: string) => {
            this.smoothText += symbol
            symbolIndex++
        }
        return () => {
            const symbol = this._textContent[symbolIndex]
            if (this.smoothText.length === this._textContent.length) {
                this._interval.clear()
                this.afterInputHook()
                return
            }
            if (this._config.symbolsDelay && symbol in this._config.symbolsDelay) {
                this._interval.pause()
                setTimeout(() => {
                    updateSmoothText(symbol)
                    this._interval.continue()
                }, this._config.symbolsDelay[symbol])

            } else {
                updateSmoothText(symbol)
            }
        }

    }

    protected print(text: string) {
        this._element.innerText = text
    }

    protected clearElementContent() {
        this.print('')
    }

    protected addClassToElement(...classes: string[]) {
        const notExistingClasses = classes.filter((cls) => !this._element.classList.contains(cls))
        this._element.classList.add(...notExistingClasses)
    }

    protected afterInputHook() {
        const {hideDelay, hideAfterInput} = this._config.carriage
        if (hideAfterInput) {
            setTimeout(this.hideCarriage.bind(this), hideDelay || 0)
        }
    }

    protected beforeInputHook() {
        this.init()
    }
}

export type SmoothInputOptions = {
    /**
     * Count of symbols per second
     * @default 10
     */
    symbolsPerSecond: number,
    /**
     * Time before start
     * @default 0
     */
    delay?: number,
    /**
     * Delay for certain symbols
     * @default {}
     */
    symbolsDelay?: { [key: string]: number }
    /**
     * Content of target element. If there isn't take textContent of element
     * @default null
     */
    text: string | null,
    /**
     * Config for carriage
     */
    carriage?: CarriageOptions
}

type CarriageOptions = {
    /**
     * Visibility of carriage
     * @default true
     */
    visible: boolean,
    /**
     * Hide carriage after all text input
     * @default false
     */
    hideAfterInput?: boolean,
    /**
     * Time before hide carriage after input
     * @default 0
     */
    hideDelay?: number
}
