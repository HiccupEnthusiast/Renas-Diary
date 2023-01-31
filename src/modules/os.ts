import { bootLogs } from './bootup'
import styles from '../styles/os.module.css'
import taskbarStyles from '../styles/tasks.module.css'
import { IconGrid } from './icon'

type OsArgs = {
    hasBootSequence?: boolean;
    background?: string;
    scanlines?: string;
}
export class Os {
    hasBootSequence: boolean
    background: string
    scanlines: string

    iconGrid: IconGrid

    constructor({ hasBootSequence = true, background = '', scanlines = '' }: OsArgs) {
        this.hasBootSequence = hasBootSequence
        this.background = background
        this.scanlines = scanlines

        this.iconGrid = new IconGrid

    }
    private createNode() {
        let app = document.createElement('div')
        let bg = document.createElement('div')
        let scanlines = document.createElement('div')
        let taskbar = document.createElement('div')
        let windows = document.createElement('div')

        let iconGrid = this.iconGrid.createNode()

        bg.classList.add(styles.background!)
        scanlines.classList.add(styles.scanlines!)
        taskbar.classList.add(taskbarStyles.taskbar!)
        taskbar.classList.add('taskbar')
        windows.classList.add('windows')

        bg.style.backgroundImage = `url(${this.background})`
        scanlines.style.backgroundImage = `url(${this.scanlines})`

        app.appendChild(bg)
        app.appendChild(scanlines)
        app.appendChild(taskbar)
        app.appendChild(windows)
        app.appendChild(iconGrid)

        return app
    }
    render(where: HTMLElement) {
        if (this.hasBootSequence) { bootLogs(where) }
        where.append(this.createNode())
    }
}