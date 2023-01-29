import styles from '../styles/splash.module.css'

type splashArgs = {
    title: string,
    subtitle?: string,
    emphasis_color?: string,
}
export class Splash {
    title: string
    subtitle: string
    emphasis_color: string


    constructor(
        {
            title,
            emphasis_color = "var(--accent)",
            subtitle = "< Click anywhere to close >"
        }: splashArgs) {
        this.title = title;
        this.subtitle = subtitle
        this.emphasis_color = emphasis_color
    }
    private handleClick() {
        let ref = document.querySelector<HTMLDivElement>("." + styles.splash!)
        ref!.style.opacity = "0"
        setTimeout(() => {
            ref!.remove()
        }, 500);
    }
    private createNode() {
        let splash = document.createElement("div")
        splash.classList.add(styles.splash!)

        splash.addEventListener('click', this.handleClick)

        splash.innerHTML = `
            <h1>${this.title}</h1>
            <p>${this.subtitle}</p>
        `

        let span = splash.querySelector('span')
        span?.style.setProperty('color', this.emphasis_color)

        return splash;

    }
    render(where: HTMLElement) {
        where.append(this.createNode())
    }
}