import json from '../default-theme.json'

export function initGlobalStyles() {
    let root = document.documentElement
    Object.entries(json["main_colors"]).map(entries => {
        const key = "--" + entries[0]
        const value = entries[1]

        root.style.setProperty(key, value)
    })
    root.style.setProperty('--boot-lines-color', json.boot.lines_color)
    root.style.setProperty('--border', `${json.borders.size} ${json.borders.color} ${json.borders.style}`)

    root.style.overflow = "hidden"
}