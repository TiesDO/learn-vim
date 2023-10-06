const UI = document.getElementById('vtext')

document.addEventListener('keydown', (event) => {
    event.preventDefault()

    switch (event.key) {
        case 'h':
            moveHorizontal(-1)
            break
        case 'j':
            moveVertical(1)
            break
        case 'k':
            moveVertical(-1)
            break
        case 'l':
            moveHorizontal(1)
            break
        case 'i':
            updateUICursor()
            break
    }
})

const CURSOR = {
    position: { x: 0, y: 0 },
    target_col: 0,
}

const BUFFER = {
    lines: [],
}

BUFFER.lines = UI.value.split('\n')

function updateUICursor() {
    const index = convertPositionToIndex(CURSOR.position)

    UI.focus();
    UI.setSelectionRange(index, index + 1);
}

function convertPositionToIndex(position) {
    const previous_lines = BUFFER.lines.slice(0, position.y)
    const previous_chars = previous_lines.reduce((acc, line) => acc + 1 + line.length, 0)

    return previous_chars + position.x
}

function moveHorizontal(amount) {
    if (CURSOR.position.x + amount < 0) {
        CURSOR.position.x = 0
        CURSOR.target_col = 0
        return
    }
    const current_line = BUFFER.lines[CURSOR.position.y]

    if (CURSOR.position.x + amount > current_line.length) {
        CURSOR.position.x = current_line.length
        CURSOR.target_col = current_line.length
        return
    }

    CURSOR.position.x += amount
    CURSOR.target_col = CURSOR.position.x

    updateUICursor()
}

function moveVertical(amount) {
    if (BUFFER.lines[CURSOR.position.y + amount] === undefined) {
        return
    }

    if (CURSOR.position.y + amount < 0) {
        CURSOR.position.y = 0
        return
    }

    const target_line = BUFFER.lines[CURSOR.position.y + amount]

    if (CURSOR.target_col > target_line.length) {
        CURSOR.position.x = target_line.length
    } else if (CURSOR.target_col > CURSOR.position.x) {
        CURSOR.position.x = CURSOR.target_col
    }

    CURSOR.position.y += amount

    updateUICursor()
}
