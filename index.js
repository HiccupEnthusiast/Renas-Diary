const splashScreen = document.querySelector('.splash')
splashScreen.addEventListener('click',() => {
    splashScreen.style.opacity = 0
    setTimeout(() => {
        splashScreen.remove()
    }, 500);
})

const windows = document.querySelectorAll('.window')
for(i = 0;i < windows.length;i++) {
    makeDraggable(windows[i])
}

var lastClicked
function makeDraggable(element) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0
    if (element.firstElementChild) {
        element.firstElementChild.onmousedown = startDrag
    }
    element.onmousedown = adjustFocus

    function adjustFocus (e) {
        var clickedWindow = e.target.parentElement 
        clickedWindow.style.zIndex = "2"
        if (lastClicked !== undefined && clickedWindow != lastClicked) {
            lastClicked.style.zIndex = "1"
        }
        lastClicked = clickedWindow
    }

    function startDrag (e) {
        e.target.style.backgroundColor = "var(--dark-purple)"
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
        e.target.style.backgroundColor = "var(--purple)"
        document.onmouseup = null
        document.onmousemove = null
    }
}