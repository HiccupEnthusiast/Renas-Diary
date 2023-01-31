import styles from '../styles/window.module.css'
import { windowTypes, killWindow, changeFocus } from './utils'
import contentStyles from '../styles/contentstyle.module.css'

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
        title ? this.title = title : this.title = this.type.toString()
        this.id = "win-" + id
    }

    moveWindow = (e1: MouseEvent) => {
        let x1: number, y1: number, x2: number, y2: number;
        x1 = e1.clientX
        y1 = e1.clientY

        let win = (<HTMLElement>e1.currentTarget).parentElement
        changeFocus(this)

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

    createNode = () => {
        let window = document.createElement('div')
        window.classList.add(styles.window!)
        window.id = this.id

        window.innerHTML = `
        <div class=${styles.windowTitle}>
            <p>${this.title}</p>
            <div class=${styles.buttons}>
                <button></button
                ><button class=${styles.closeBtn}></button>
            </div>
        </div>
        `
        let contDiv = document.createElement('div')
        contDiv.classList.add(styles.windowContent!)
        window.append(contDiv)

        let content = getContent(this.type)
        contDiv.append(content)

        let title = window.querySelector<HTMLDivElement>('.' + styles.windowTitle)
        title?.addEventListener("mousedown", this.moveWindow)

        let closeBtn = window.querySelector<HTMLButtonElement>('.' + styles.closeBtn!)
        closeBtn?.addEventListener("mousedown", (e) => { e.stopPropagation() }, true)
        closeBtn?.addEventListener("mouseup", () => {
            killWindow(this.id.replace('win-', ''))
        }, true)

        window.addEventListener('click', () => { changeFocus(this) })

        return window;
    }
    render(where: HTMLElement) {
        where.append(this.createNode())
    }
}
function getContent(type: windowTypes) {
    switch (type) {
        case windowTypes.Notepad: {
            let txt = document.createElement('textarea')
            txt.spellcheck = false
            txt.placeholder = '< Click me! >'
            txt.classList.add(contentStyles.textarea!)

            return txt
        } default: {
            return `
                CONTENT ERROR
            `
        }
    }
}