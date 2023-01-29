import { Window } from './modules/windows'
import { Splash } from './modules/splash'
import { initGlobalStyles } from './modules/utils'
import { Os } from './modules/os'

let body = document.querySelector('body')
body!.style.margin = '0'
body!.style.fontFamily = "'Courier New', Courier, monospace"

let os = new Os({ hasBootSequence: true, background: "/wallpaper.png", scanlines: '/scanlines.png' })
os.render(body!)

initGlobalStyles()

let initial_screen = new Splash({ title: "Welcome back, <span>Rena</span>" })
initial_screen.render(body!)

