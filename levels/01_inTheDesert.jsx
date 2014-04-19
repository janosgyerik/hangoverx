#BEGIN_PROPERTIES#
{
    "version": "0.2",
    "commandsIntroduced": []
}
#END_PROPERTIES#
/******************
 * inTheDesert.js *
 ******************
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

    map.defineObject('laser', {
        'symbol': '-',
        'color': 'red',
        'onCollision': function (player) {
            player.killedBy('deadly laser');
        },
        'passableFor': ['player', 'eye'],
        'locked': true,
        'unlockableBy': ['eye'],
        'onUnlock': function (game) {
            game.map.writeStatus('machine voice: "d-e-a-c-t-i-v-a-t-e"');
        }
    });

    var exit_x = parseInt(map.getWidth() / 2);
    var exit_y = parseInt(map.getHeight() / 2) - 5;
    map.placeObject(exit_x, exit_y, 'exit');
    for (var i = 0; i < 4; ++i) {
        map.placeObject(exit_x - 1, exit_y - 1 + i, 'block');
        map.placeObject(exit_x + 1, exit_y - 1 + i, 'block');
    }
    map.placeObject(exit_x, exit_y - 1, 'block');
    map.placeObject(exit_x, exit_y + 1, 'laser');
    map.placeObject(exit_x, exit_y + 2, 'laser');

    map.placePlayer(map.getWidth()-17, map.getHeight()-7);
    map.placeObject(map.getWidth()-17, map.getHeight()-5, 'eye');
    map.placeObject(map.getWidth()-11, map.getHeight()-7, 'computer');

    function generateDesert() {
        for (var i = 0; i < map.getWidth(); i++) {
            for (var j = 0; j < map.getHeight(); j++) {
                if (map.getPlayer().atLocation(i,j)
                    || map.getObjectTypeAt(i, j) !== 'empty') {
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
