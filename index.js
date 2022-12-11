const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

// Counter for each type of window and icon
let wTypeError = 0
let iTypeError = 0

let wTypeExplorer = 0
let iTypeExplorer = 0

// References and abstracions to DOM objects
let windows = new Array
let bar = document.querySelector('.task-bar')
let iconGrid = document.querySelector('.icons')
let icons = document.querySelectorAll('.icon')

iconGrid.append(createIcon('error_oom'))
iconGrid.append(createIcon('explorer'))


// TODO
for(i = 0;i < windows.length;i++) {
    windows[i].style.zIndex = i + 1
    drawWindows(windows[i], 200, 200)
}
icons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.backgroundColor = 'var(--purple)'
    })
    icon.addEventListener('mouseout', () => {
        icon.style.backgroundColor = 'transparent'
    })
});


function createWindow(winType) {
    let window = document.createElement('div')
    let winCounter
    window.classList.add('window')

    // Build containers for the window
    let windowTitle = document.createElement('div')
    windowTitle.classList.add('window-title')

    let windowContent = document.createElement('div')
    windowContent.classList.add('window-content')
    
    window.append(windowTitle, windowContent)


    let pTitle = document.createElement('p')
    windowTitle.append(pTitle)

    let closeBtn = document.createElement('button')
    windowTitle.append(closeBtn)




    // Determine window type
    if (winType.includes('error')) {
        winCounter = ++wTypeError

        let errType =  winType.split('_')[1]

        windowContent.append(createError(errType))
        pTitle.innerText = "An error has occured"


    } else if (winType == 'explorer') {
        winCounter = ++wTypeExplorer
        window.style.width = '500px'
        window.style.height = '300px'

        let navbar = document.createElement('div')
        navbar.classList.add('navbar')

        let navtext = document.createElement('p')
        navtext.innerText = '~'
        navbar.append(navtext)

        let folders = document.createElement('div')
        folders.style.position = 'static'
        folders.classList.add('icons')

        let backBtn = document.createElement('button')
        navbar.append(backBtn)
        backBtn.addEventListener('click', () => {
            let arr = navtext.innerText.split('/')
            if (arr.length > 1) {
                arr.pop(arr.length-1)
                navtext.innerText = arr.join('/')
                let newFolders = getFoldersAt(arr[arr.length-1])
                folders.innerText = ''


                newFolders.forEach(folder => {
                    folders.append(folder)
                });
            }
        })

        windowContent.append(navbar)


        let arrFolders = getFoldersAt('home')
        arrFolders.forEach(folder => {
            folders.append(folder)
        });

        windowContent.append(folders)
    }
    window.id = 'win-' + winType + '-' + winCounter 
    if (pTitle.innerText == '') { pTitle.innerText = window.id }
    

    closeBtn.addEventListener('click', () => {
        let winParent = closeBtn.parentElement.parentElement
        let associatedTask = document.getElementById(winParent.id.replace('win', 'task'))
        
        windows.splice(windows.indexOf(winParent), 1)
        associatedTask.remove()
        winParent.remove()
    })


    // Create bar and tasks in it   
    let barElement = document.createElement('div')
    barElement.classList.add('task')
    barElement.id = 'task-' + winType + '-' + winCounter
    
    let pTask = document.createElement('p')
    pTask.innerText = 
        winType.charAt(0).toUpperCase() + winType.slice(1).replace('_', ' ')
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
    windows.push(window)
    return window
}
function createError(errType) {
    let constructedContent = document.createElement('div')
    constructedContent.classList.add('error')

    let errorBody = document.createElement('div')
    errorBody.classList.add('error-body')
    let img = document.createElement('img')
    let message = document.createElement('p')
    let acceptBtn = document.createElement('button')

    errorBody.append(img)
    errorBody.append(message)
    constructedContent.append(errorBody)
    constructedContent.append(acceptBtn)

    if (errType == 'oom') {
        img.src = './img/err.png'
        message.innerText = 'Not enough memory to proceed.\nPlease consider closing some windows'
    }
    
    acceptBtn.innerText = 'Accept'
    acceptBtn.addEventListener('click', () => {
        let winParent = acceptBtn.parentElement.parentElement.parentElement
        let associatedTask = document.getElementById(winParent.id.replace('win', 'task'))
        
        windows.splice(windows.indexOf(winParent), 1)
        associatedTask.remove()
        winParent.remove()
    })

    return constructedContent
}
function getFoldersAt(location) {
    let folders = new Array
    if (location == '~') { location = 'home' }

    switch (location) {
        case 'home':
            folders.push(createIcon('folder_music'))
            folders.push(createIcon('folder_pictures'))
            folders.push(createIcon('folder_documents'))
            folders.push(createIcon('folder_.local'))         
            break;
        case 'music':
            folders.push(createIcon('folder_test2'))
            folders.push(createIcon('folder_test3'))
            break;
        case 'documents':
            folders.push(createIcon('folder_investigations'))
            break;
        case 'investigations':
            folders.push(createIcon('folder_00'))
            folders.push(createIcon('folder_01'))
            folders.push(createIcon('folder_02'))
            folders.push(createIcon('folder_03'))
            folders.push(createIcon('folder_04'))
            break;
        default:
            break;
    }

    return folders
}
function drawWindows(win, x, y) {
    win.style.top = y + 'px'
    win.style.left = x + 'px'
    makeDraggable(win)
    document.body.append(win)
}


let iteration = 4
let initialValue = iteration
function createIcon(winType) {
    let icon = document.createElement('div')
    icon.classList.add('icon')

    let img = document.createElement('img')


    if (winType.includes('error')) {
        iCounter = ++iTypeError
    } else if (winType == 'explorer') {
        iCounter = ++iTypeExplorer

        img.src = './img/folder.png'
    }
    icon.id = 'icon-' + winType + '-' + iCounter
    
    let p = document.createElement('p')
    p.innerText = winType.charAt(0).toUpperCase() + winType.slice(1).replace('_', ' ')

    icon.append(img)
    icon.append(p)

    if (winType.includes('folder')) {
        img.src = './img/folder.png'

        let destination = winType.split('_')[1]
        p.innerText = destination.charAt(0).toUpperCase() + destination.slice(1)
        icon.addEventListener('dblclick', () => {
            let parentContainer = icon.parentElement
            let navtext = parentContainer.parentElement.firstChild.firstChild
            parentContainer.innerText = ''
            navtext.innerText = navtext.innerText + '/' + destination

            let foldersAtDestination = getFoldersAt(destination)

            foldersAtDestination.forEach(folder => {
                parentContainer.append(folder)
            });
        })
    } else {
        icon.addEventListener('dblclick', () => {
            document.body.style.cursor = 'wait'
            icon.style.cursor = 'wait'
            setTimeout(() => {
                if (windows.length == 10){
                    let win = createWindow("error_oom")
                    drawWindows(win, 100, 100)
                    document.body.style.cursor = "auto" 
                    return
                } else if (windows.length > 10){
                    document.body.style.cursor = "auto" 
                    return
                }
                if (iteration>=(initialValue*4)) { iteration = initialValue}
                let win = createWindow(icon.id.split("-")[1])
                drawWindows(win, 100 + (15*(iteration%initialValue)),
                                100 + (15*(iteration%initialValue)) + (30*(Math.ceil((iteration+1)/initialValue))-2))
                document.body.style.cursor = "auto" 
                icon.style.cursor = 'pointer'
                ++iteration
            }, 400)
        })
    }

    return icon
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
            if (win.style.zIndex < 1) {
                win.style.zIndex = 1
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