function Sound(source) {
    this.tracks = {
    };

    this.defaultTracks = [ // (not currently used, as all levels now have explicit tracks)
        'GameScratch',
        'Y',
        'Searching',
        'Soixante-8',
        'Come and Find Me'
    ];

    this.sources = {
        'local': '',
        'cloudfront': 'http://dk93t8qfl63bu.cloudfront.net/'
    };

    this.bgPlayerElt = $("#jquery_bgPlayer");
    this.soundPlayerElt = $("#jquery_soundPlayer");
    this.muted = false;
    this.currentLevelNum = -1;

    this.init = function() {
        var sound = this;

        this.source = this.sources[source];

        this.bgPlayerElt.jPlayer({
            wmode: "window",
            loop: true,
            swfPath: "lib/Jplayer.swf",
            volume: 0.6
        });
        this.soundPlayerElt.jPlayer({
            wmode: "window",
            loop: false,
            supplied: 'wav',
            swfPath: "lib/Jplayer.swf"
        });

        $(window).focus(function () {
            $(sound.bgPlayerElt).jPlayer('play');
        }).blur(function () {
            $(sound.bgPlayerElt).jPlayer('pause');
        });
    };

    this.playTrackByName = function (name) {
        this.trackForLevel = name;

        var track = this.tracks[name];
        if (!track) return;
        if (track.url) {
            var nowPlayingMsg = 'Now playing: "' + track.title + '" - <a target="_blank" href="' + track.url + '">' + track.artist + '</a>';
        } else {
            var nowPlayingMsg = 'Now playing: "' + track.title + '" - ' + track.artist;
        }
        $('#nowPlayingMsg').html(nowPlayingMsg);

        if (!this.muted && this.currentlyPlayingTrack !== name) {
            var path = this.source + track.path;
            $(this.bgPlayerElt).jPlayer('stop');
            $(this.bgPlayerElt).jPlayer("setMedia", {
                'mp3': path
            });
            $(this.bgPlayerElt).jPlayer('play');

            this.currentlyPlayingTrack = name;
        }
    };

    this.playTrackByNum = function (num) {
        this.playTrackByName(this.defaultTracks[(num - 1) % this.defaultTracks.length]);
    };

    this.playSound = function (name) {
        $(this.soundPlayerElt).jPlayer('stop');
        $(this.soundPlayerElt).jPlayer("setMedia", {
            'wav': 'sound/' + name + '.wav'
        });
        $(this.soundPlayerElt).jPlayer('play');
    };

    this.toggleSound = function() {
        if (this.muted) {
            this.bgPlayerElt.jPlayer('unmute');
            this.soundPlayerElt.jPlayer('unmute');
            $("#muteButton img").attr('src', 'images/mute-off.png');
            this.muted = false;
            this.playTrackByName(this.trackForLevel);
        } else {
            this.bgPlayerElt.jPlayer('mute');
            this.soundPlayerElt.jPlayer('mute');
            $("#muteButton img").attr('src', 'images/mute-on.png');
            this.muted = true;
        }
    };

    // constructor
    this.init();
}
