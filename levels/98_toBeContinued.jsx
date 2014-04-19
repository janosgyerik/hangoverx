#BEGIN_PROPERTIES#
{
    "version": "1.0"
}
#END_PROPERTIES#
/********************
 * toBeContinued.js *
 ********************/

function startLevel(map) {
#START_OF_START_LEVEL#
    var width = map.getWidth();
    var start_y = parseInt(map.getHeight() / 2) - 5;
    var lines = [
        '... TO BE CONTINUED ...',
        '... or ...',
        '... do it yourself, fork the story!',
        'https://github.com/janosgyerik/hangoverx',
        ';-)'
    ];

    function drawLine(i) {
        var line = lines[i];
        var x = parseInt((width - line.length) / 2);
        var y = start_y + i * 2;
        map._display.drawText(x, y, line);

        if (++i < lines.length) {
            setTimeout(function () {drawLine(i);}, 2000)
        }
    }

    setTimeout(function () {drawLine(0);}, 4000);

#END_OF_START_LEVEL#
}
