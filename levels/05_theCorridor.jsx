#BEGIN_PROPERTIES#
{
    "version": "0.1",
    "commandsIntroduced": []
}
#END_PROPERTIES#
/***************
 * theCorridor.js *
 ***************
 */

function startLevel(map) {
#START_OF_START_LEVEL#
    map.displayChapter('Chapter 5\nChapters are supposed to be\nmore than one level long');

    map.defineObject('trap_left', {
        'type': 'dynamic',
        'symbol': '>',
        'color': '#900',
        'impassable': 'true',
        'behavior': function (me) {
            trap_behaviour(me, 1, 4);
        }
    }
    );
    map.defineObject('trap_right', {
        'type': 'dynamic',
        'symbol': '<',
        'color': '#900',
        'impassable': 'true',
        'behavior': function (me) {
            trap_behaviour(me, -3, 0);
        }
    }
    );
    map.defineObject('laser', {
        'type': 'dynamic',
        'symbol': '-',
        'color': '#f00',
        'onCollision': function (player) {
            player.killedBy('a laser');
        }
    }
    );
    function trap_behaviour (me, left, right) {
        var player_pos = me.findNearest('player');
        if (player_pos.y - me.getY() <= 1 && !me.trapTriggered) {
            me.trapTriggered = true;
            for (var x = left; x < right; ++x) {
                map.placeObject(x, me.getY(), 'laser')
            }
        }
    }

    var level_map = [
        '#######'
        '#  x  #'
        '#     #'
        '>     #'
        '#     #'
        '#     <'
        '#     #'
        '>     #'
        '#     #'
        '#     <'
        '#     #'
        '#  g e#'
        '#######'
    ]
    var width = map.getWidth();
    var height = map.getHeight();
    var map_left = (width - level_map[0].length) % 2;
    var map_top = (height - level_map.length) % 2;
    map.createFromGrid(level_map, {
      'x': 'exit',
      '#': 'block',
      '@': 'player',
      'e': 'eye',
      '>': 'trap_left',
      '<': 'trap_right'
    }, map_left, map_top);

#BEGIN_EDITABLE#

#END_EDITABLE#
#END_OF_START_LEVEL#
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}
