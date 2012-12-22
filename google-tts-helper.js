/**
 * Author: Shady Sharaf <shady@sharaf.me>
 * License: GPL
 */

jQuery(function($){
    
    var tts = {
	    lang: 'ar',
	    init: function() {
		this.initPlayer();
		this.attach('[data-tts]');
		this.attachOnClick('[data-tts-click]');
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
		$(selector).unbind('.tts').bind('mouseover.tts', function(e){
		    tts.read($.trim($(this).text()), lang ? lang : $(this).data('tts'));
		})
	    },
	    attachOnClick: function(selector) {
		this.clicker(selector)
	    },
	    clicker: function(target, selector, lang) {
		$target = $(target);
		$(target).unbind('.tts').bind('click.tts', tts._clickerEvent);
		if(!$target.data('tts-click'))
		    $target.data('tts-click', selector+'|'+lang);
	    },
	    autoClicker: function(html, selector, lang) {
		$target = $(html);
		$target.unbind('.tts').bind('click.tts', function(e) {
		    tts.read($.trim($(this).prev().text()), lang ? lang : $(this))
		    e.preventDefault();
		});
		$selector = $(selector);
		$selector.after($target);
	    },
	    _clickerEvent: function(e) {
		var ttsData = $(this).data('tts-click').split('|');
		var selector = ttsData[0];
		var lang = ttsData[1];
		tts.read($.trim($(selector).text()), lang ? lang : $(this))
		e.preventDefault();
	    },
	    initPlayer: function() {
		this.playerDiv = $('body').append('<iframe id="tts-player"/>').find('#tts-player').css({visibility: 'hidden', position: 'fixed', top: 0, left: 0});
	    },
	    play: function(url) {
		console && console.log('playing: ' + url)
		this.playerDiv.attr('src', url);
	    }
    };
    
    window.tts = tts;
})