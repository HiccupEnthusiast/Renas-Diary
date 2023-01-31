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
        let content = getContent(this.type)
        window.append(content)

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
        let win = this.createNode()
        where.append(win)
        createHandles(win)
    }
}
function getContent(type: windowTypes) {
    switch (type) {
        case windowTypes.Notepad: {
            let container = document.createElement('div')
            container.classList.add(styles.windowContent!)
            container.innerHTML = `
                <div style='display:flex;'><input class=${contentStyles.input}></input><button class='${contentStyles.button}'>Set font size</button></div>
                <textarea class=${contentStyles.textarea} spellcheck=false placeholder='< Click me! >'
                ></textarea>
            `
            let setSize = () => {
                let input = container.querySelector<HTMLInputElement>('.' + contentStyles.input)?.value.match(/\d+/)
                if (input) {
                    let size = Number(input[0])
                    container.querySelector<HTMLAreaElement>('.' + contentStyles.textarea)!.style.fontSize = size + 'px'
                }
            }
            container.querySelector<HTMLButtonElement>('.' + contentStyles.button)!.addEventListener('click', setSize)

            return container
        } default: {
            return `
                CONTENT ERROR
            `
        }
    }
}
function createHandles(el: HTMLDivElement) {
    let tl = document.createElement('div')
    let tr = document.createElement('div')
    let bl = document.createElement('div')
    let br = document.createElement('div')
    tl.id = 'tl'
    tr.id = 'tr'
    bl.id = 'bl'
    br.id = 'br'

    let borderSize = getComputedStyle(el).border.substring(0, 3)
    let windowWidth = getComputedStyle(el).width
    let windowHeight = getComputedStyle(el).height

    let initCorner = (c: HTMLDivElement) => {
        //c.style.background = 'yellow'
        c.style.width = borderSize
        c.style.height = borderSize
        c.style.position = 'absolute'

        c.addEventListener('mouseover', (e: MouseEvent) => {
            let id = (<HTMLDivElement>e.target).id
            if (id === 'tl' || id === 'br') {
                c.style.cursor = 'nwse-resize'
            } else {
                c.style.cursor = 'nesw-resize'
            }
        })

        let drag = (e1: MouseEvent) => {
            let id = (<HTMLDivElement>e1.target).id
            let x1: number, y1: number, x2: number, y2: number;
            x1 = e1.clientX
            y1 = e1.clientY

            let minw = Number(getComputedStyle(el).minWidth.match(/\d+/)![0])
            let minh = Number(getComputedStyle(el).minHeight.match(/\d+/)![0])

            changeFocus(el.id.replace('win-', ''))

            let start = (e2: MouseEvent) => {
                if (el) {
                    x2 = x1 - e2.clientX
                    y2 = y1 - e2.clientY
                    x1 = e2.clientX
                    y1 = e2.clientY

                    let cw = Number(getComputedStyle(el).width.match(/\d+/)![0])
                    let ch = Number(getComputedStyle(el).height.match(/\d+/)![0])

                    switch (id) {
                        case 'br':
                            el.style.width = `${cw - x2}px`
                            el.style.height = `${ch - y2}px`
                            break;
                        case 'bl':
                            el.style.width = `${cw + x2}px`
                            el.style.height = `${ch - y2}px`
                            if (cw !== minw) el.style.left = `${el.offsetLeft - x2}px`
                            break;
                        case 'tr':
                            el.style.width = `${cw - x2}px`
                            el.style.height = `${ch + y2}px`
                            if (ch !== minh) el.style.top = `${el.offsetTop - y2}px`
                            break;
                        case 'tl':
                            el.style.width = `${cw + x2}px`
                            el.style.height = `${ch + y2}px`
                            if (cw !== minw) el.style.left = `${el.offsetLeft - x2}px`
                            if (ch !== minh) el.style.top = `${el.offsetTop - y2}px`
                            break;
                        default:
                            break;
                    }
                }
            }
            let end = () => {
                document.removeEventListener('mousemove', start)
                document.removeEventListener('mouseup', end)
            }

            document.addEventListener('mousemove', start)
            document.addEventListener('mouseup', end)
        }
        c.addEventListener('mousedown', drag)

        el.append(c)
    }
    initCorner(tl)
    initCorner(tr)
    initCorner(bl)
    initCorner(br)

    tl.style.top = '-' + borderSize
    tl.style.left = '-' + borderSize
    tr.style.top = '-' + borderSize
    tr.style.right = '-' + borderSize
    bl.style.left = '-' + borderSize
    bl.style.bottom = '-' + borderSize
    br.style.right = '-' + borderSize
    br.style.bottom = '-' + borderSize
}
