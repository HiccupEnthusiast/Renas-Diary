import styles from '../styles/window.module.css'
import { windowTypes } from './utils'
import textarea from '../styles/contentstyle.module.css'

type windowArgs = {
    type: windowTypes
    title?: string
    id: string
}
export class Window {
    type: windowTypes
    title: string
    id: string

    constructor({ type, title, id }: windowArgs) {
        this.type = type
        title ? this.title = title : this.title = this.type
        this.id = "win-" + id
    }

    private moveWindow(e1: MouseEvent) {
        let x1: number, y1: number, x2: number, y2: number;
        x1 = e1.clientX
        y1 = e1.clientY

        let win = (<HTMLElement>e1.currentTarget).parentElement

        let start = (e2: MouseEvent) => {
            if (win) {
                x2 = x1 - e2.clientX
                y2 = y1 - e2.clientY
                x1 = e2.clientX
                y1 = e2.clientY

                win.style.left = `${win.offsetLeft - x2}px`
                win.style.top = `${win.offsetTop - y2}px`
            }
        }
        let end = () => {
            document.removeEventListener('mousemove', start)
            document.removeEventListener('mouseup', end)
        }

        document.addEventListener('mousemove', start)
        document.addEventListener('mouseup', end)
    }
    private closeWindow(e: MouseEvent) {
        let win = (<HTMLElement>e.currentTarget).closest('.' + styles.window)
        win?.remove()
    }

    private createNode() {
        let window = document.createElement('div')
        window.classList.add(styles.window!)
        window.id = this.id

        window.innerHTML = `
        <div class=${styles.windowTitle}>
            <p>${this.title}</p>
            <div class=${styles.buttons}>
                <button></button
                ><button class=closeBtn></button>
            </div>
        </div>
        <div class=${styles.windowContent}>
            ${getContent(this.type)}
        </div>
        `

        let title = window.querySelector<HTMLDivElement>('.' + styles.windowTitle)
        title?.addEventListener("mousedown", this.moveWindow)

        let closeBtn = window.querySelector<HTMLButtonElement>('.closeBtn')
        closeBtn?.addEventListener("click", this.closeWindow)


        return window;
    }
    render(where: HTMLElement) {
        where.append(this.createNode())
    }
}
function getContent(type: windowTypes): string {
    switch (type) {
        case 'notepad': {
            return `
                <textarea spellcheck=false class='${textarea}'></textarea>`
        } default: {
            return `
                CONTENT ERROR
            `
        }
    }
}