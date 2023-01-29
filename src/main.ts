import { Splash } from './modules/splash'
import { initGlobalStyles } from './modules/utils'
import { Os } from './modules/os'
import { IconGrid } from './modules/icon'

let body = document.querySelector('body')
body!.style.margin = '0'
body!.style.backgroundColor = 'black'

let os = new Os({ hasBootSequence: true, background: "/wallpaper.png", scanlines: '/scanlines.png' })
os.render(body!)

initGlobalStyles()


// Makeshift solution to elements rendering before loading screen can
let initial_screen = new Splash({ title: "Welcome back, <span>Rena</span>" })

// to create icons the grid first need to be rendered, function needs to throw 
// errors when this doesn't happen TODO
let icongrid = new IconGrid()
icongrid.render(body!)
icongrid.newIcon({ action: "open-window", open: "notepad", icon: "/notes.png" })

setTimeout(() => {
    initial_screen.render(body!)
}, 500)

