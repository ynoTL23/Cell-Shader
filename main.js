let currentColor = getSelectedColor = () => {
    // get the selected color value
    return document.querySelector('#color-menu').value
}

// Set the current color
document.querySelector('#color-menu').addEventListener('change', (e) => {
    currentColor = getSelectedColor()
    const darkColors = ['slategray', 'deeppink', 'green', 'darkgreen', 'blue', 'darkblue', 'darkviolet', 'purple', 'indigo']
    let selectedColor = e.srcElement.value
    if (darkColors.includes(selectedColor)) {
        e.srcElement.style.color = 'white'
        e.srcElement.style.backgroundColor = currentColor
    } else {
        e.srcElement.style.color = 'black'
        e.srcElement.style.backgroundColor = currentColor
    }
    
})



let holding = false // handle drag event
let table = document.querySelector('table')
// mouse is being held down
table.onmousedown = () => {
        holding = true
}
// mouse was released
table.onmouseup = () => {
        holding = false
}
// mouse left table region
table.onmouseleave = () => {
    holding = false
}

// update the table
updateTable = (operation) => {
    switch (operation) {
        case 'addRow':
            addRow() // add a row at bottom
            updateTable() // update cells with listeners
            break;
        case 'deleteRow':
            deleteRow() // delete the last row
            updateTable() // update cells with listeners
            break;
        case 'addCol':
            addCol() // add a column at end
            updateTable() // update cells with listeners
            break;
        case 'deleteCol':
            deleteCol() // delete the last column
            updateTable() // update cells with listeners
            break;
        case 'fillAll':
            fillAll()
            updateTable()
            break;
        case 'fillUncolored':
            fillUncolored()
            updateTable()
            break; 
        case 'reset':
            reset()
            updateTable()
            break; 
        default:
            // update new cells with event listeners
            document.querySelectorAll('td').forEach((cell) => { // add listeners to every cell
                // mouse is moving
                cell.onmouseover = () => {
                    if (holding) { // check if holding mousedown
                        changeCellColor(cell)
                    }
                }
                // a single mouse click
                cell.onmousedown = () => {
                    changeCellColor(cell)
                }
            })
    }

}

// adds a row to the bottom
addRow = () => {
    const table = document.querySelector('table') // get table element
    const row = table.insertRow(-1) // add an empty row at the end
    const cols = table.rows[0].cells // get cols for numOfCols
    
    for (let i = 0; i < cols.length; i++) {
        row.insertCell(i) // insert cells into the row
    }
    updateTable() // update the table
}

// delete the last row
deleteRow = () => {
    const table = document.querySelector('table') // get table element

    // make sure row will still be at least one row
    if(table.rows.length === 1) {
        alert('You can\'t have less than one row.')
    } else {
        table.deleteRow(-1) // delete the last row
    }
}

// add a col at the end
addCol = () => {
    // grab all the rows
    const rows = document.querySelectorAll('tr')
    rows.forEach((row) => {
        // insert a cell at the end of each row
        row.insertCell()
    })
}

// delete the last column
deleteCol = () => {
    // make sure the table won't disappear
    const table = document.querySelector('table')
    if(table.rows[0].cells.length === 1) {
        alert('You can\'t have less than one row.')
    } else {
        // grab all the rows
        const col = document.querySelectorAll('tr')
        col.forEach((row) => {
            // delete the last cell for each row
            row.deleteCell(-1)
        })
    }
}

// fill all cells a single color
fillAll = () => {
    // grab all the cells
    const cells = document.querySelectorAll('td')
    currentColor = getSelectedColor()

    cells.forEach((cell) => {
        changeCellColor(cell)
    })
}

// fill uncolored cells
fillUncolored = () => {
    // grab all the cells
    const cells = document.querySelectorAll('td')
    cells.forEach((cell) => {
        const cellColor = cell.style.backgroundColor
        
        // look for unfilled cells
        if (cellColor === 'white' || cellColor === undefined || cellColor === '') {
            // fill in the cells
            changeCellColor(cell)
        }
    })
}

reset = () => {
    // grab all the cells
    const cells = document.querySelectorAll('td')
    currentColor = 'white' // set color to white
    // go through each cell
    cells.forEach((cell) => {
        // fill in the cells
        changeCellColor(cell)
    })
    currentColor = getSelectedColor()
}

// change the cell's color
changeCellColor = (cell) => {
    cell.style.backgroundColor = currentColor
}

// init and add listeners for table/cells
updateTable()