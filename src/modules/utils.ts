import json from '../default-theme.json'
import { Window } from './windows'
import { Task } from './tasks'

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
    let task = new Task({ title: type, id: id })


    return { win: win, task: task }
}

export type windowTypes = 'notepad' | 'explorer'