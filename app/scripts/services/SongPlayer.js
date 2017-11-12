(function (){
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
      
    /**
    * @desc private object holds current album properties
    * @type {object}
    */
     var currentAlbum = Fixtures.getAlbum();
            
    /**   
    * @desc object audio File
    * @type {object}
    */
        var currentBuzzObject = null;
        
    /**
    * @function setSong
    * @desc  private function that stops currently playing song and loads new audio file * * as currentBuzzObject
    * @param {object} song
    */
        
     var setSong = function(song) {
    if (currentBuzzObject) {
        
       stopSong(SongPlayer.currentSong);
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
         
    SongPlayer.currentSong = song;
 };
        
        /**
        * @function playSong
        * @desc  private function plays song using the buzz library play method
        * @param {object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function stopSong 
        * @desc private function stops song play using the buzz library stop method
        * @param {object} song
        */
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }

        /**
        * @function getSongIndex
        * @desc public method function that tracks index of current song
        * @param {object} song
        */
        
         SongPlayer.getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
  /**
    * @desc object holds the current song
    * @type {object}
    */
    SongPlayer.currentSong = null; 
        
     /**
     * @function SongPlayer.play
     * @desc public method of SongPlayer that checks if there is a current song playing * * and then calls the setSong and playSong functions if not. also calls playSong if * * the current song is paused
     * @param {object} song
     */
    
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song){
                
            setSong(song);
            playSong(song);
           
            } else if (SongPlayer.currentSong === song) {
                if(currentBuzzObject.isPaused()) {
                    playSong(song);
                    
                }
            }
                
        };
        
        /**
        * @function SongPlayer.pause
        * @desc public method of SongPlayer that pauses a song 
        * @param {object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function SongPlayer.previous
        * @desc public method that sets the current song to the previous song
        */
        SongPlayer.previous = function() {
     var currentSongIndex = SongPlayer.getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
            
           if (currentSongIndex < 0) {
         
         stopSong(SongPlayer.currentSong);
    
           } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
            
            
        };
        
        /**
        * @function SongPlayer.next 
        * @desc public method that sets the current song to the next song
        */
        SongPlayer.next = function() {
            var currentSongIndex = SongPlayer.getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                currentSongIndex = 0;
            }
            
            var song = currentAlbum.songs[currentSongIndex];

            setSong(song);
            playSong(song);
            
        };
        
        return SongPlayer;
 
    }

angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);

})();