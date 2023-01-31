import json from '../default-theme.json'
import { Window } from './windows'
import { Task } from './tasks'

import winStyles from '../styles/window.module.css'
import taskStyles from '../styles/tasks.module.css'

export let idRegistry: string[] = new Array

export function initGlobalStyles() {

    let root = document.documentElement
    document.body.style.fontFamily = json.fonts.generic

    let fullParse = (j: Object) => {
        Object.entries(j).map(entries => {
            const key = "--" + entries[0]
            const value = entries[1]

            root.style.setProperty(key, value)
        })
    }

    fullParse(json["main_colors"])
    if (json.tasks.has_tasks) {
        fullParse(json.tasks)
    }

    root.style.setProperty('--boot-lines-color', json.boot.lines_color)
    root.style.setProperty('--border', `${json.borders.size} ${json.borders.color} ${json.borders.style}`)

    root.style.overflow = "hidden"
}
export function uid() {
    let d = Date.now().toString(36)
    let r = Math.random().toString(36).substring(2)
    return (d + r).substring(0, 16)
}

export function getWindowTaskPair(type: windowTypes) {
    let id = uid()
    let win = new Window({ type: type, id: id })
    let task = new Task({ title: type.toString(), id: id })

    idRegistry.push(id)

    return { win: win, task: task }
}
export function killWindow(id: string) {
    let win = document.querySelector('#win-' + id)
    let task = document.querySelector('#task-' + id)
    win?.remove()
    task?.remove()
    let i = idRegistry.indexOf(id)
    if (i === -1) { return }
    idRegistry.splice(i, 1)
}
export function changeFocus(newFocus: Window | string) {
    let id: string;
    if (typeof newFocus === 'string') {
        id = newFocus
    } else {
        id = newFocus.id.replace('win-', '')
    }
    let focusWindow = idRegistry.indexOf(id)
    idRegistry.push(idRegistry.splice(focusWindow, 1)[0]!)

    let wins = document.querySelectorAll<HTMLDivElement>('[id^="win-"]')
    for (let i = 0; i < wins.length; i++) {
        const win = wins[i]
        const index = idRegistry.indexOf(win!.id.replace('win-', ''))
        win!.style.zIndex = String(index)
        if (index === wins.length - 1) {
            win?.classList.remove(winStyles.unfocused!)
            document.querySelector('#task-' + id)?.classList.add(taskStyles.active!)
        } else {
            win?.classList.add(winStyles.unfocused!)
            document.querySelector('#task-' + win?.id.replace('win-', ''))?.classList.remove(taskStyles.active!)

        }
    }
}

export const enum windowTypes {
    Notepad = 'notepad',
    Explorer = 'explorer',
}