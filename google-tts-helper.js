/**
 * Author: Shady Sharaf <shady@sharaf.me>
 * License: GPL
 */

jQuery(function($){
    
    var tts = {
	    lang: 'ar',
	    init: function(window) {
		window.tts = this;
		
		this.initPlayer();
		this.attach('[data-tts]');
	    },
	    read: function(text, lang) {
		this.play(this.getUrl(text, lang));
	    },
	    getUrl: function(text, lang) {
		if(!lang) lang = tts.lang;
		
		var template = 'http://translate.google.com/translate_tts?tl=%lang&q=%text';
		return template.replace('%lang', lang).replace('%text', text);
	    },
	    attach: function(selector, lang) {
		$(selector).unbind('.tts').bind('click.tts', function(e){
		    tts.read($.trim($(this).text()), lang ? lang : $(this).data('tts'));
		})
	    },
	    initPlayer: function() {
		this.playerDiv = $('body').append('<iframe id="tts-player"/>').find('#tts-player').css({visibility: 'hidden', position: 'fixed', top: 0, left: 0});
	    },
	    play: function(url) {
		console && console.log('playing: ' + url)
		this.playerDiv.attr('src', url);
	    }
    };
    
    tts.init(window);
})