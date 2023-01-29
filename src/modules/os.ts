import { bootLogs } from './bootup'
import styles from '../styles/os.module.css'

type OsArgs = {
    hasBootSequence?: boolean;
    background?: string;
    scanlines?: string;
}
export class Os {
    hasBootSequence: boolean
    background: string
    scanlines: string

    constructor({ hasBootSequence = true, background = '', scanlines = '' }: OsArgs) {
        this.hasBootSequence = hasBootSequence
        this.background = background
        this.scanlines = scanlines
    }
    private createNode() {
        let app = document.createElement('div')
        let bg = document.createElement('div')
        let scanlines = document.createElement('div')

        bg.classList.add(styles.background!)
        scanlines.classList.add(styles.scanlines!)

        bg.style.backgroundImage = `url(${this.background})`
        scanlines.style.backgroundImage = `url(${this.scanlines})`

        app.appendChild(bg)
        app.appendChild(scanlines)

        return app
    }
    render(where: HTMLElement) {
        if (this.hasBootSequence) { bootLogs() }
        where.append(this.createNode())
    }
}