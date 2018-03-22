const DEFAULT_COLOR = '#8080ff'; // default color for first color
const CLEAR_COLOR = '#E7E9F7'; // default color for erasing



function setDefaultValues() {
    $('#colorPicker').val(DEFAULT_COLOR);
}

function makeGrid() {
    const height = $('#inputHeight').val();
    const width = $('#inputWidth').val();
    const $table = $('#pixelCanvas');
    for (let i = 0; i < height; i++) {
        const $row = $('<tr />');
        // Create cells      
        for (let j = 0; j < width; j++) {
            // Add cell to current row         
            const $cell = '<td />';
            $row.append($cell);
        }
        $table.append($row);
    }
}

/** Function to clear the table after entering new values **/
function clearTable() {
    const $table = $('#pixelCanvas');
    $table.html('');
}

function paintCell($cell, color) {
    let colorPicker = $('#colorPicker').val();
    let chosenColor = color || colorPicker;
    $cell.css('background', chosenColor);
}

(function runApp() {
    setDefaultValues();
    $('#sizePicker').submit(function(event) {
        event.preventDefault();
        clearTable();
        makeGrid();
    });

    // Attach event listener on cell
    $('#pixelCanvas').on('click', 'td', function() {
        let $cell = $(this);
        paintCell($cell);
    });

    // Drag cell
    var isDragging = false;
    $('#pixelCanvas').on('mousedown', 'td', function() {
        isDragging = true;
    });

    $('#pixelCanvas').on('mousemove', 'td', function() {
        let $cell = $(this);
        if (isDragging) {
            paintCell($cell);
        }
    });
    /**
     * When mouse is up then we know dragging has ended
     * When mouse leaves the canvas. Set isDragging to false
     */
    $(document).on('mouseup mouseleave dragstart', function() {
        isDragging = false;
    });

    //disabled right click
    document.addEventListener('contextmenu', event => event.preventDefault());
})();

/** When user selects CLEAR button  - animation clears canvas **/
function eraseCanvas() {
    let x = 0;
    loop();

    function loop() {
        const height = $('#inputHeight').val();
        const width = $('#inputWidth').val();
        let $cell = $('#pixelCanvas tr td:eq(' + x + ')');
        paintCell($cell, CLEAR_COLOR);
        if (x < (height * width)) {
            setTimeout(loop, 10);
        }
        x++;
    }
}