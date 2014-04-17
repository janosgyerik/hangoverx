#BEGIN_PROPERTIES#
{
    "version": "0.2",
    "commandsIntroduced":
        ["global.startLevel", "map.placePlayer",
         "map.placeObject", "map.getHeight", "map.getWidth",
         "map.displayChapter", "map.getPlayer",
         "map.getObjectTypeAt",
         "map.getCanvasContext", "canvas.beginPath", "canvas.strokeStyle",
         "canvas.lineWidth", "canvas.moveTo", "canvas.lineTo",
         "canvas.stroke"],
    "mapProperties": {
        "showDrawingCanvas": true
    }
}
#END_PROPERTIES#
/***************************
 * somewhereInTheDesert.js *
 ***************************
 *
 * Good morning, Mr.... uhm, who are you again?
 *
 * You are in the middle of the desert.
 * You don't remember who you are and what you're doing here.
 * And that headache...is...painful... Not your best Monday!
 *
 * What you see:
 *
 * - Desert. Everywhere. Some bushes.
 * - A floating red eye. Following your every move.
 *   Whatever it is, it's kind of unsettling...
 * - At least you have this computer. But what the heck for?
 * - And a small building with a gate. Watch that DEADLY laser!
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    //map.displayChapter('Chapter 1\nUhm... Wha..?');

    var exit_x = parseInt(map.getWidth() / 2);
    var exit_y = parseInt(map.getHeight() / 2);
    map.placeObject(exit_x, exit_y, 'exit');
    for (var i = 0; i < 3; ++i) {
        map.placeObject(exit_x - 1, exit_y - 1 + i, 'block');
        map.placeObject(exit_x + 1, exit_y - 1 + i, 'block');
    }
    map.placeObject(exit_x, exit_y - 1, 'block');

    function xToCanvas(x) { return x / map.getWidth() * 600; }
    function yToCanvas(y) { return y / map.getHeight() * 500; }

    var x1 = xToCanvas(exit_x);
    var y1 = yToCanvas(exit_y + 1.8);
    var x2 = xToCanvas(exit_x + 1);
    var y2 = yToCanvas(exit_y + 1.8);
    map.createLine([x1, y1], [x2, y2], function (player) {
        player.killedBy('deadly laser');
    });
    var ctx = map.getCanvasContext();
    ctx.beginPath();
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 5;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    map.placePlayer(map.getWidth()-17, map.getHeight()-7);
    map.placeObject(map.getWidth()-11, map.getHeight()-7, 'computer');

    function generateDesert() {
        for (var i = 0; i < map.getWidth(); i++) {
            for (var j = 0; j < map.getHeight(); j++) {
                if (map.getPlayer().atLocation(i,j)
                    || map.getObjectTypeAt(i, j) === 'block'
                    || map.getObjectTypeAt(i, j) === 'computer'
                    || map.getObjectTypeAt(i, j) === 'exit') {
                    continue;
                }

                var rv = Math.random();
                if (rv < 0.01) {
                    map.placeObject(i, j, 'tree');
                }
            }
        }
    }
    generateDesert();

#END_OF_START_LEVEL#
}

function onExit(map) {
    if (!map.getPlayer().hasItem('computer')) {
        map.writeStatus("Don't forget to pick up the computer!");
        return false;
    }
    return true;
}
