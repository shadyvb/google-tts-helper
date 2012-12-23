/**
 * Author: Shady Sharaf <shady@sharaf.me>
 * License: GPL
 */

function array_chunk(e,t,n){var r,i="",s=0,o=-1,u=e.length||0,a=[];if(t<1){return null}if(Object.prototype.toString.call(e)==="[object Array]"){if(n){while(s<u){(r=s%t)?a[o][s]=e[s]:a[++o]={},a[o][s]=e[s];s++}}else{while(s<u){(r=s%t)?a[o][r]=e[s]:a[++o]=[e[s]];s++}}}else{if(n){for(i in e){if(e.hasOwnProperty(i)){(r=s%t)?a[o][i]=e[i]:a[++o]={},a[o][i]=e[i];s++}}}else{for(i in e){if(e.hasOwnProperty(i)){(r=s%t)?a[o][r]=e[i]:a[++o]=[e[i]];s++}}}}return a}

jQuery(function($){
    
    var tts = {
	    lang: 'ar',
	    maxWords: 15,
	    keys: [110, 1609],
	    init: function() {
		this.initPlayer();
		this.attach('[data-tts]');
		this.attachOnClick('[data-tts-click]');
	    },
	    read: function(text, lang) {
		var self = this;
		self.text = array_chunk(text.split(' '), self.maxWords);
		self.readIdx = 0;
		self.readTotal = self.text.length;
		self.readLang = lang;
		
		self.listenToKey(self.keys, self.readInc, true);
	    },
	    readInc: function(){
		var self = tts;
		if(!self.readTotal)
		    return;
		if(self.readIdx < self.readTotal) {
		    self.play(self.getUrl(self.text[self.readIdx].join(' '), self.readLang))
		    self.readIdx++;
		}
		if(self.readIdx >= self.readTotal) {
		    self.readIdx = null;
		    self.readTotal = null;
		    self.readLang = null;
		}
	    },
	    listenToKey: function(keys, fn, now) {
		if(now)
		    fn();
		$(window).unbind('keypress.tts').bind('keypress.tts', function(e){
		    var ev = e || window.event;
		    var key = ev.keyCode || ev.which;
		    if($.inArray(key, keys))
			return;
		    else
			fn();
		});
	    },
	    getUrl: function(text, lang) {
		if(!lang) lang = tts.lang;
		
		var template = 'http://translate.google.com/translate_tts?tl=%lang&q=%text';
		return template.replace('%lang', lang).replace('%text', encodeURI(text));
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
		this.playerFrame = $('body').append('<iframe id="tts-player"/>').find('#tts-player').css({visibility: 'hidden', position: 'fixed', top: 0, left: 0});
	    },
	    play: function(url) {
		this.playerFrame.attr('src', url);
	    }
    };
    tts.init(); 
    window.tts = tts;
})