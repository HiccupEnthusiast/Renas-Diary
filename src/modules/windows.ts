import classes from '../styles/window.module.css'

export class Window {
    type: String;
    /**
     *
     */
    constructor({ type }: { type: String }) {
        this.type = type
    }
    yes() {
        let a = document.createElement('p')
        a.innerText = "b"
        a.classList.add(classes.a!)
        document.querySelector('body')?.append(a)
    }
}