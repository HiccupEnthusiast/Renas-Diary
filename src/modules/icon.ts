import styles from '../styles/icon.module.css'
import { getWindowTaskPair, windowTypes } from './utils'

type IconArgs = {
    action: "open-window" | "open-folder"
    open: windowTypes
    icon: string
}

export class Icon {
    action: "open-window" | "open-folder"
    open: windowTypes
    icon: string

    constructor({ action, open, icon }: IconArgs) {
        this.action = action
        this.open = open
        this.icon = icon
    }
    handleDblClick = (e: MouseEvent) => {
        document.body.style.cursor = 'wait';
        (<HTMLElement>e.target).style.cursor = 'wait'

        setTimeout(() => {
            switch (this.action) {
                case 'open-window':
                    let { win, task } = getWindowTaskPair(this.open)
                    win.render(document.body)
                    let taskbar = document.querySelector('.taskbar')
                    if (taskbar) {
                        task.render()
                    }
                    break;
                case 'open-folder':
                    break;
            };

            (<HTMLElement>e.target).style.cursor = 'pointer'
            document.body.style.cursor = 'auto'
        }, 750)

    }
    private createNode() {
        let icon = document.createElement('div')
        icon.classList.add(styles.icon!)

        icon.innerHTML = `
            <img src=${this.icon}>
            <p>${this.open}</p>
        `
        icon.addEventListener('dblclick', this.handleDblClick)

        return icon
    }
    render(where: HTMLElement) {
        where.append(this.createNode())
    }
}
export class IconGrid {
    domRef: HTMLElement | null

    constructor() {
        this.domRef = null
    }

    private createNode() {
        let grid = document.createElement('div')
        grid.classList.add(styles.iconGrid!)

        return grid
    }
    newIcon(args: IconArgs) {
        if (this.domRef) {
            let icon = new Icon(args)
            icon.render(this.domRef)
        }
    }

    render(where: HTMLElement) {
        let g = this.createNode()
        where.append(g)
        this.domRef = g
    }
}