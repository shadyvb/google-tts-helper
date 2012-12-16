/**
 * Author: Shady Sharaf <shady@sharaf.me>
 * License: GPL
 */

jQuery(function($){
    
    var tts = {
	    lang: 'ar',
	    init: function(window) {
		window.tts = this;
		
		this.playerDiv = $('body').append('<div id="tts-player"/>').find('#tts-player');
		this.player = this.playerDiv.jPlayer({
		    swfPath: '/'
		});
		
		this.attach('[data-tts]');
	    },
	    read: function(text, lang) {
		this.play(this.getUrl(text, lang));
	    },
	    play: function(url) {
		console && console.log('playing: ' + url)
		return this.player.jPlayer("setMedia", {
		    mp3: url
		}).jPlayer('play');
	    },
	    getUrl: function(text, lang) {
		if(!lang) lang = tts.lang;
		
		var template = 'http://translate.google.com/translate_tts?tl=%lang&q=%text';
		return template.replace('%lang', lang).replace('%text', text);
	    },
	    attach: function(selector) {
		$(selector).click(function(e){
		    tts.read($.trim($(this).text()), $(this).data('tts'));
		})
	    }
    };
    
    tts.init(window);
})