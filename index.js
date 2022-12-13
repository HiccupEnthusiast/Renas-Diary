const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

let wrongGuesses = 0

// Counter for each type of window and icon
let wTypeError = 0
let iTypeError = 0

let wTypeExplorer = 0
let iTypeExplorer = 0

let wTypeNotepad = 0
let iTypeNotepad = 0

let wTypeDoc = 0
let iTypeDoc = 0

// References and abstracions to DOM objects
let windows = new Array
let bar = document.querySelector('.task-bar')
let iconGrid = document.querySelector('.icons')
let icons = document.querySelectorAll('.icon')

iconGrid.append(createIcon('explorer'))
iconGrid.append(createIcon('notepad'))


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


let initialNote = createWindow('notepad')
initialNote.querySelector('textarea')
    .innerText = 'Greetings stranger! If you found this, then that means that I\'m most likely dead! The positive side is that if you haven\'t been blocked out from here, then that means that the agency hasn\'t found out yet. Which reminds me, be careful with where you dabble in here, it should be disconnected from the internet but you know how\'s the agency, and if they find out then having locked my computer is the least of our worries... Please bring to the light everything they have done detective, you\'re my last hope... I\'m sorry for getting you involved, but there\'s no way back, be safe and farewell, Stay alert, You never know what Lies in the darkness, the Key is to keep our eyes open.'

drawWindows(initialNote, 200, 100)


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

    let pTask = document.createElement('p')


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

        pTitle.innerText = 'File explorer'

        let navbar = document.createElement('div')
        navbar.classList.add('navbar')

        let navtext = document.createElement('p')
        navtext.innerText = '~'
        navbar.append(navtext)

        let folders = document.createElement('div')
        folders.style.position = 'static'
        folders.classList.add('icons')
        folders.style.grid = 'auto auto auto / auto auto auto'

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
    } else if (winType == 'notepad') {
        winCounter = ++wTypeNotepad
        pTitle.innerText = 'Notepad'

        let textArea = document.createElement('textarea')
        textArea.spellcheck = false
        windowContent.append(textArea)
    } else if (winType.includes('doc_')) {
        winCounter = ++wTypeDoc

        pTitle.innerText = winType.split('_').splice(1,2).join(' ')
        pTask.innerText = winType.split('_').splice(1,2).join('_')

        windowContent.append(getDocument(pTitle.innerText.replace(' ', '_')))
    }
    window.id = 'win-' + winType + '-' + winCounter 
    if (pTitle.innerText == '') { pTitle.innerText = window.id }
    

    closeBtn.addEventListener('click', deleteWindow)


    // Create bar and tasks in it   
    let barElement = document.createElement('div')
    barElement.classList.add('task')
    barElement.id = 'task-' + winType + '-' + winCounter
    
    if (pTask.innerText == '') {
        pTask.innerText = winType.charAt(0).toUpperCase() + winType.slice(1).replace('_', ' ')
    }
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
function deleteWindow(e) {
    let winParent = e.target.closest('.window')
    let associatedTask = document.getElementById(winParent.id.replace('win', 'task'))
        
    windows.splice(windows.indexOf(winParent), 1)
    associatedTask.remove()
    winParent.remove()
}
function createError(errType) {
    let constructedContent = document.createElement('div')
    constructedContent.classList.add('error')

    let errorBody = document.createElement('div')
    errorBody.classList.add('error-body')
    let img = document.createElement('img')
    let message = document.createElement('p')
    let acceptBtn = document.createElement('button')
    acceptBtn.classList.add('acceptBtn')

    errorBody.append(img)
    errorBody.append(message)
    constructedContent.append(errorBody)

    switch (errType) {
        case 'oom':
            img.src = './img/err.png'
            message.innerText = 'Not enough memory to proceed.\nPlease consider closing some windows'
            break;
        case 'auth':
            img.src = './img/warn.png'
            message.innerText = 'Please verify your indentity before proceeding'

            let passDiv = document.createElement('div')
            passDiv.classList.add('error-body')

            let passP = document.createElement('p')
            passP.innerText = 'Password: '

            let passInput = document.createElement('input')
            passInput.type = 'password'

            passDiv.append(passP)
            passDiv.append(passInput)

            constructedContent.append(passDiv)
            break;
        default:
            break;
    }

    constructedContent.append(acceptBtn)
    
    if (acceptBtn.innerText == '') {acceptBtn.innerText = 'Accept'}
    acceptBtn.addEventListener('click', deleteWindow)

    return constructedContent
}
function getDocument(doc) {
    let content = document.createElement('div')
    content.classList.add('body-text')

    switch (doc) {
        case 'fkfqfxi_cfkafkdp':
            let title = document.createElement('h1')
            let body = document.createElement('p')

            title.innerText = doc.replace('_', ' ')
            body.innerText = 'Ro··vtaocem"rt-1Mi··iro:nsgo·aua·e·██"ea"soioeitsa,seuasii·l,hwla·ee··ea.T·sh·k·eisfa·vtar·rh·ann·ttewha·bsro·naipenta·toiaeeo·ncdynanwle··d·iptnF·rioaovirosG0006·-6261I2211,G0003·hra····od··itptshu·egcptripgmi·scliotf..-OSFNSGO-Imolkgoa··ritsa·t·totrpo·iaonpc·aaoirl·mcsi,omyiso·vts·aImodntsuomo·eu,··tryuhIa·ohhgtdli·rd·eroieitnoneFe"··ovotser·vtartmpt·n<█>T·w··wnldnh·s··rsleotre·ei·kt·aot·s·hceatet·v··sieitsf·irs·ldeisi·nNi··rc·rca··,nerfclnarcdt··ygti·atbgrnei.omenrtniter·-6251I2211,G0003·-6232·eeritbpvebpveai·rgt·eyansprr·tapi·su··5·-T··VTAR···toi·rrtwknh·sb·g··h·tntsnygsheltnselteoun·wa·m··heoatt··togh·tfywpar·an·a,r,·veu·isoe·taey·ptfnsgi·da·os·0·tefh·ptIeitse·deRa██·hHkin·vv··iceap·u·nryuss·ltehldfhce·ea·sanhleoptnsgo,otseooyecv·trkouomeaptitii·yxafi·dvsoueba·e·lldoaeesco·ro·fmi·s·ptI2212,G0003·-6231I2211.T·wdsoeridyra·retohhan·reh·oawh·eadcno7%·NEOIEIT-"an·onfwdoo··iceuIonoeoi,h·ni·yovui··ayi·nmgh·ntedIa··yh·an·i·io···nlseImocz·g·hengtn··awhla"·' + 
            '\n\n [2]00[0]1/2[1]20^1/2+1\nxx+x'

            content.style.width = '500px'

            content.append(title)
            content.append(body)
            break;
    
        default:
            break;
    }

    return content
}
function getAuthentication(origin) {
    let folder = origin.id.split('-')[1].split('_')[1]
    let window = origin.closest('.window') 
    let err = createWindow('error_auth')

    let errAccept = err.querySelector('.acceptBtn')
    let errInput = err.querySelector('input')
    adjustFocus(err)

    errAccept.removeEventListener('click', deleteWindow)
    let pass
    switch (folder) {
        case 'investigations':
            pass = 'sylk'
            break;
        case '03':
            pass = 'rena'
            break;
        default:
            break;
    }
    errAccept.addEventListener('click', (e) => {
        let isCorrectPass = errInput.value.toLowerCase() == pass
        let folders = getFoldersAt(folder)

        document.body.style.cursor = 'wait'
        errAccept.style.cursor = 'wait'

        setTimeout(() => {
            if (document.querySelector('#' + window.id) === null) {
                if (isCorrectPass) {
                    let createdWindow = createWindow('explorer')

                    let foldersContainer = createdWindow.querySelector('.icons')
                    createdWindow.querySelector('.navbar p').innerText = '~/documents/investigation' // TODO

                    foldersContainer.innerText = ''

                    folders.forEach(folder => {
                        foldersContainer.append(folder)
                    });

                    drawWindows(createdWindow, 200, 200)
                    deleteWindow(e)
                } else {
                    err.querySelector('.error-body img').src = './img/err.png'
                    err.querySelector('.error-body p').innerText = 'Wrong password!'
                    wrongGuess()
                }
            } else {    
                if (isCorrectPass) {
                    let foldersContainer = window.querySelector('.icons')
                    window.querySelector('.navbar p').innerText += '/'+folder
                    foldersContainer.innerText = ''
    
                    folders.forEach(folder => {
                        foldersContainer.append(folder)
                    });
                    deleteWindow(e)
                } else {
                    err.querySelector('.error-body img').src = './img/err.png'
                    err.querySelector('.error-body p').innerText = 'Wrong password!'
                    wrongGuess()
                }
            }
            document.body.style.cursor = 'auto'
            errAccept.style.cursor = 'pointer'
        }, 500)
    })

    return (err)
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
        case '03':
            folders.push(createIcon('doc_fkfqfxi_cfkafkdp'))
            break;
        default:
            let notFound = document.createElement('p')
            notFound.innerText = ' < Nothing to be found here > '
            notFound.style.color = 'aliceblue'
            folders.push(notFound)
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
    let p = document.createElement('p')


    if (winType.includes('error')) {
        iCounter = ++iTypeError
    } else if (winType == 'explorer') {
        iCounter = ++iTypeExplorer

        img.src = './img/folder.png'
    } else if (winType == 'notepad') {
        iCounter = ++iTypeNotepad

        img.src = './img/notes.png'
    } else if (winType.includes('doc_')) {
        iCounter = ++iTypeDoc

        let a = winType.split('_')
        a.shift()
        let fileName = a.join('_') + '.doc'
        p.innerText = fileName

        img.src = './img/notes.png'
    }
    icon.id = 'icon-' + winType + '-' + iCounter
    
    if (p.innerText == ''){
        p.innerText = winType.charAt(0).toUpperCase() + winType.slice(1).replace('_', ' ')
    }

    icon.append(img)
    icon.append(p)

    if (winType.includes('folder')) {
        img.src = './img/folder.png'

        let destination = winType.split('_')[1]
        p.innerText = destination.charAt(0).toUpperCase() + destination.slice(1)
        icon.addEventListener('dblclick', (e) => {

            if (windows.length == 10){
                let err = createWindow("error_oom")
                adjustFocus(err)
                drawWindows(err, 100, 100)
                return
            } else if (windows.length > 10){
                return
            }
            
            if (destination == 'investigations' || destination == '.local' 
                || destination == 'music' || destination == 'pictures' || destination == '04' 
                || destination == '00' || destination == '01' || destination == '02' 
                || destination == '03') {
                
                drawWindows(getAuthentication(icon), e.clientX-100, e.clientY-100)

                return
            }

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
                    let err = createWindow("error_oom")
                    adjustFocus(err)
                    drawWindows(err, 100, 100)
                    document.body.style.cursor = "auto" 
                    return
                } else if (windows.length > 10){
                    document.body.style.cursor = "auto" 
                    return
                }
                if (iteration>=(initialValue*4)) { iteration = initialValue}
                let win = createWindow(icon.id.split("-")[1])
                adjustFocus(win)
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
function adjustFocus(e) {
    let topElement = e instanceof Element? e : this
    let totalWindows = String(windows.length)
    let oldIndex = topElement.style.zIndex

    windows.forEach(win => {
        if (win.style.zIndex > oldIndex) {
            win.style.zIndex -= 1
        }
        if (win.style.zIndex < 1) {
            win.style.zIndex = 1
        }
    });
    topElement.style.zIndex = totalWindows
}
function wrongGuess() {
    ++wrongGuesses
    if (wrongGuesses > 5) {
        let gameOverDiv = document.createElement('div')
        gameOverDiv.classList.add('splash')
        gameOverDiv.classList.add('center-content')

        let scan = document.createElement('div')
        scan.classList.add('scanlines')

        let gameOverText = document.createElement('h1')
        gameOverText.style.color = 'rgb(125,0,0)'

        gameOverText.innerText = 'You\'ve been found'

        document.body.innerText = ''
        document.body.append(gameOverDiv)
        gameOverDiv.append(gameOverText)
        document.body.append(scan)
    }
}