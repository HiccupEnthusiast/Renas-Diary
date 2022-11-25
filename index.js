const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

let nTypeA = 0
let nTypeB = 0
//let windows = Array.from(document.querySelectorAll('.window'))
let windows = new Array

windows.push(createWindow("type-a"))
windows.push(createWindow("type-a"))

windows.push(createWindow("type-b"))
windows.push(createWindow("type-b"))

for(i = 0;i < windows.length;i++) {
    makeDraggable(windows[i])
    windows[i].style.zIndex = i + 1
    drawWindows(windows[i])
}

function createWindow(winType) {
    let window = document.createElement('div')
    let winCounter
    window.classList.add('window')
    if (winType == 'type-a') {
        winCounter = ++nTypeA
    } else if (winType == 'type-b') {
        winCounter = ++nTypeB
    }
    window.id = 'win-' + winType + '-' + winCounter
    

    let windowTitle = document.createElement('div')
    windowTitle.classList.add('window-title')

    let pTitle = document.createElement('p')
    pTitle.innerText = window.id
    windowTitle.append(pTitle)

    let windowContent = document.createElement('div')
    windowContent.classList.add('window-content')
    

    window.append(windowTitle, windowContent)

    return window
}
function drawWindows(win) {
    document.body.append(win)
}

function makeDraggable(element) {
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0
    if (element.firstElementChild) {
        element.firstElementChild.onmousedown = startDrag
    }
    element.onmousedown = adjustFocus

    function adjustFocus() {
        let totalWindows = String(windows.length)
        let oldIndex = element.style.zIndex

        windows.forEach(win => {
            if (win.style.zIndex > oldIndex) {
                win.style.zIndex -= 1
            }
        });
        element.style.zIndex = totalWindows
    }

    function startDrag (e) {
        element.firstElementChild.style.backgroundColor = "var(--dark-purple)"
        x1 = e.clientX
        y1 = e.clientY

        document.onmouseup = endDrag
        document.onmousemove = moveElement
    }
    function moveElement(e) {
        x2 = x1 - e.clientX
        y2 = y1 - e.clientY
        x1 = e.clientX
        y1 = e.clientY

        element.style.left = (element.offsetLeft - x2) + 'px'
        element.style.top = (element.offsetTop - y2) + 'px'
    }
    function endDrag(e) {
        element.firstElementChild.style.backgroundColor = "var(--purple)"
        document.onmouseup = null
        document.onmousemove = null
    }
}