#BEGIN_PROPERTIES#
{
    "version": "0.1"
}
#END_PROPERTIES#
/**************
 * credits.js *
 **************/

function startLevel(map) {
#START_OF_START_LEVEL#
    var credits = [
        [15, 1, "H A N G O V E R X"],
        [20, 2, "- or - "],
        [3, 3, "THE CONTINUING ADVENTURES OF MR. ?(CLULESS?)"],
        [15, map.getHeight() - 2, "Thank_you: 'for playing!'"],
        [1, map.getHeight() - 1, "}"]
    ];

    function drawCredits(i) {
        if (i >= credits.length) {
            return;
        }

        // redraw lines bottom to top to avoid cutting off letters
        for (var j = i; j >= 0; j--) {
            var line = credits[j];
            map._display.drawText(line[0], line[1], line[2]);
        }

        setTimeout(function () {drawCredits(i+1);}, 2000)
    }

    setTimeout(function () {drawCredits(0);}, 4000);

#END_OF_START_LEVEL#
}
