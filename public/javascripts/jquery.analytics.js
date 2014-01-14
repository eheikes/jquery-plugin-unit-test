(function($) {

	var isUrl = function(link) {
		return /^http(s)?:\/\//.test(link);
	};

	/**
	 * Static function that makes a call to ga() with the proper arguments
	 **/
	$.wgRecordEvent = function(eventType, eventData) {
		var data = {};
		data[isUrl(eventData) ? 'url' : 'file'] = eventData;
		if (isUrl(eventData)) {
			ga('send', 'event', 'Links', 'External link', data);
		} else {
			ga('send', 'event', 'Downloads', 'File download', data);
		}
	}

	/**
	 * Find each outgoing link and attach an eventhandler that triggers
	 * a Google Analytics "event"
	 **/
	$.fn.wgTrackOutgoing = function() {
		return this.find('a[href^="http"]').on('click', function() {
			$.wgRecordEvent('external', $(this).attr('href'));
		});
	}

	/**
	 * Find each link to a downloadable file and attach an eventhandler that
	 * triggers a Google Analytics "event"
	 **/
	$.fn.wgTrackDownload = function(options) {
		var opts = $.extend({}, $.fn.wgTrackDownload.defaults, options);
		return this.find('a:not([href^="http"])').on('click', function() {
			var href = $(this).attr('href');
			var ext = href.replace(/.+\.(.+)$/, '$1');
			if (opts.extensions.indexOf(ext) > -1) {
				$.wgRecordEvent('download', href);
			}
		});
	}

	/**
	 * This defines some default values for the wgTrackDownload function
	 */
	$.fn.wgTrackDownload.defaults = {
		extensions: [
			'pdf', 'swf', 'doc'
		]
	};

}(jQuery));