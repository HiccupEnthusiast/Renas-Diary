import styles from '../styles/tasks.module.css'
import { changeFocus } from './utils'

type TaskArgs = {
    title: string
    id: string
}
export class Task {
    title: string
    id: string
    constructor({ title, id }: TaskArgs) {
        this.title = title
        this.id = 'task-' + id
    }
    private createNode() {
        let task = document.createElement('div')
        task.classList.add(styles.task!)
        task.id = this.id

        task.innerHTML = `
            <p>${this.title}</p>    
        `

        task.addEventListener('click', () => { changeFocus(this.id.replace('task-', '')) })

        return task
    }
    render() {
        let bar = document.querySelector('.taskbar')
        bar?.append(this.createNode())
    }
}