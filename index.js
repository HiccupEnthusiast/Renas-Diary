const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

let windows = Array.from(document.querySelectorAll('.window'))

windows.push(createWindow())
document.body.appendChild(windows[2])

for(i = 0;i < windows.length;i++) {
    makeDraggable(windows[i])
}

function createWindow() {
    let window = document.createElement("div")
    window.classList.add("window")
    
    let windowTitle = document.createElement('div')
    windowTitle.classList.add('window-title')
    let pTitle = document.createElement('p')
    pTitle.innerText = 'Window'
    windowTitle.append(pTitle)

    let windowContent = document.createElement('div')
    windowContent.classList.add('window-content')
    
    window.append(windowTitle, windowContent)

    return window
}

let lastClicked
function makeDraggable(element) {
    let x1 = 0, y1 = 0, x2 = 0, y2 = 0
    if (element.firstElementChild) {
        element.firstElementChild.onmousedown = startDrag
    }
    element.onmousedown = adjustFocus

    function adjustFocus() {
        element.style.zIndex = "2"
        if (lastClicked !== undefined && element != lastClicked) {
            lastClicked.style.zIndex = "1"
        }
        lastClicked = element
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