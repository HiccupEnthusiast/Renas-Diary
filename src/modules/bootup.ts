import { fLogs } from './fakelogs'
import styles from '../styles/bootup.module.css'

export function bootLogs() {

    let ul = document.createElement('ul')
    ul.classList.add(styles.bootLines!)
    document.querySelector('body')?.append(ul)

    const lines = fLogs
    let acc = 0
    for (let i = 0; i < lines.length; i++) {
        const currentLine = lines[i];
        const timestamp = Date.now()
        const currentTime = new Date(timestamp).toLocaleString()
        let formatedLine = currentLine?.replace("TIME", currentTime)
            .replace("HOST", "SX-104")

        if (formatedLine?.charAt(0) === "#") {
            formatedLine = formatedLine.replace("#", "")
            acc += Math.random() * 1000 + 250
        }

        setTimeout(() => {
            const e = document.createElement("li")
            e.innerHTML = `
                ${formatedLine}
            `
            ul.prepend(e)

        }, 10 * i + acc)
    }
    setTimeout(() => {
        ul.remove()
    }, (10 * lines.length + acc) + 50)
}