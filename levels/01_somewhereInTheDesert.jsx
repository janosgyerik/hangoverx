#BEGIN_PROPERTIES#
{
    "version": "0.9",
    "commandsIntroduced":
        ["global.startLevel", "map.placePlayer",
         "map.placeObject", "map.getHeight", "map.getWidth",
         "map.displayChapter", "map.getPlayer",
         "map.getObjectTypeAt"]
}
#END_PROPERTIES#
/***************************
 * somewhereInTheDesert.js *
 ***************************
 *
 * Good morning, Mr.... 
 *
 * Mr.... who are you again?
 *
 * Well you don't know. This might be your worst hangover ever...
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter('Chapter 1\nUhm... Wha..?');

    map.placeObject(25, 0, 'exit');
    map.placePlayer(25, 3);

    function generateDesert() {
        for (var i = 0; i < map.getWidth(); i++) {
            for (var j = 0; j < map.getHeight(); j++) {
                if (map.getPlayer().atLocation(i,j)
                    || map.getObjectTypeAt(i, j) === 'block'
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
