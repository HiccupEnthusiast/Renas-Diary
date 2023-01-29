import styles from '../styles/splash.module.css'

type splashArgs = {
    title: string,
    subtitle?: string,
}
export class Splash {
    title: string
    subtitle: string

    constructor({ title, subtitle = "< Click anywhere to close >" }: splashArgs) {
        this.title = title;
        this.subtitle = subtitle
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
        return splash;

    }
    render(where: HTMLElement) {
        where.append(this.createNode())
    }
}