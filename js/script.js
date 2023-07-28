const cols = document.querySelectorAll('.col')



document.addEventListener('keydown', (event) => {
    if (event.code !== 'F5' && event.code !== 'F12') {
        event.preventDefault()
    }
    console.log(event.code)
    if (event.code === 'Space') {
        setRandomColors();
    }
})

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;
    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
        node.classList.toggle('fa-lock-open')
    } else if (type === 'copy') {
        const textHex = event.target.textContent
        copyHEX(textHex)
    } else {
        return
    }
})

function generateColor() {
    const hex = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hex[Math.trunc(Math.random() * hex.length)]
    }

    return `#${color}`
}

function setRandomColors(initial) {
    const colors = initial ? getColorsFromHash() : []
    console.log(`цвета из загрузки: ${colors}`)
    console.log(colors)
    cols.forEach((col, index) => {
        const isNonLocked = col.querySelector('i').classList.contains('fa-lock-open');
        const color = initial 
            ? colors[index] 
                ? colors[index] 
                : generateColor() 
            : generateColor();
        console.log(`цвета: ${colors[index]}`)
        // if (initial) {
        //     const color = colors[index]
        // }
        const text = col.querySelector('h2');
        
        if (isNonLocked) {
            text.textContent = color;
            col.style.background = color;
            if (!initial) {
                colors.push(color)
            }
        } else {
            if (!initial) {colors.push(text.textContent)}
        }
    })
    updateColorsHash(colors)
    console.log(colors)
}

function copyHEX(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors) {
    col = colors.toString().split(',#').join('+')
    document.location.hash = col;
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('+').map(color => `#${color}`)
    }
    return []
}

setRandomColors(true);
