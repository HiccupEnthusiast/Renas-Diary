import { Splash } from './modules/splash'
import { initGlobalStyles, windowTypes } from './modules/utils'
import { Os } from './modules/os'

initGlobalStyles()

let body = document.querySelector('body')
body!.style.margin = '0'
body!.style.backgroundColor = 'black'

let os = new Os({ hasBootSequence: true, background: "/wallpaper.png", scanlines: '/scanlines.png' })
os.render(body!)


// Makeshift solution to elements rendering before loading screen can
let initial_screen = new Splash({ title: "Welcome back, <span>Rena</span>" })
setTimeout(() => {
    initial_screen.render(body!)
    os.iconGrid.newIcon({ action: "open-window", open: windowTypes.Notepad, icon: "/notes.png" })
}, 500)

