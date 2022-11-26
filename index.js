const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

let nTypeA = 0
let nTypeB = 0

let windows = new Array
let bar = document.querySelector('.task-bar')


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
    
    let closeBtn = document.createElement('button')
    closeBtn.addEventListener('click', (e) => {
        let winParent = closeBtn.parentElement.parentElement
        let associatedTask = document.getElementById(winParent.id.replace('win', 'task'))
        
        windows.splice(windows.indexOf(winParent), 1)
        associatedTask.remove()
        winParent.remove()
    })
    windowTitle.append(closeBtn)

    let windowContent = document.createElement('div')
    windowContent.classList.add('window-content')
    

    window.append(windowTitle, windowContent)
    
    let barElement = document.createElement('div')
    barElement.classList.add('task')
    barElement.id = 'task-' + winType + '-' + winCounter
    
    let pTask = document.createElement('p')
    pTask.innerText = winType + '(' + winCounter + ')'
    barElement.append(pTask)
    barElement.addEventListener('mousedown', () => {
        barElement.style.backgroundColor = 'var(--faint-purple)'
        barElement.style.border = '5px inset var(--faint-purple)'
    })
    barElement.addEventListener('mouseup', () => {
        let associatedWin = document.getElementById(barElement.id.replace('task', 'win'))
        associatedWin.classList.toggle('invisible')
        barElement.style.backgroundColor = 'var(--purple)'
        barElement.style.border = '5px outset var(--purple)'
    })
    barElement.addEventListener('mouseout', () => {
        barElement.style.backgroundColor = 'var(--purple)'
        barElement.style.border = '5px outset var(--purple)'
    })

    bar.append(barElement)

    return window
}
function drawWindows(win) {
    win.style.top = '200px'
    win.style.left = '200px'
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