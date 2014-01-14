module('Testing wgRecordEvent static plugin', {
	setup: function() {
		this.oldga = ga;
		ga = sinon.spy(ga);
	},
	teardown: function() {
		ga = this.oldga;
	}
});

test('wgRecordEvent exists', function(){
	ok(jQuery.wgRecordEvent);
});

test('Test that ga() is called with proper parameters for downloads', function() {
	var expectedArgs = [
			'send', 
			'event', 
			'Downloads', 
			'File download', 
			{'file': 'file1.pdf'}
		];
	
	jQuery.wgRecordEvent('download', 'file1.pdf');
	
	ok(ga.called);
	deepEqual(ga.args[0], expectedArgs);
});

test('Test that ga() is called with proper parameters for outgoing links', function() {
	var expectedArgs = [
			'send', 
			'event', 
			'Links', 
			'External link', 
			{'url': 'http://www.dsmwebgeeks.com/'}
		];

	jQuery.wgRecordEvent('external', 'http://www.dsmwebgeeks.com/');

	ok(ga.called);
	deepEqual(ga.args[0], expectedArgs);
});


module('Testing wgTrack Outgoing plugin', {
	setup: function() {
		this.oldga = ga;
		ga = sinon.spy(ga);
	},
	teardown: function() {
		ga = this.oldga;
	}
});

test('wgTrackOutgoing exists', function() {
	ok( jQuery('#testDiv').wgTrackOutgoing);
});

test('wgTrackOutgoing returns one link', function() {
	equal(jQuery('#testDiv').wgTrackOutgoing().length, 1);
});

test('wgTrackOutgoing calls ga()', function() {
	jQuery('#testDiv').wgTrackOutgoing();
	jQuery('a#external').click();
	ok(ga.called);
});


module('Testing wgTrack Downloads plugin', {
	setup: function() {
		this.oldga = ga;
		ga = sinon.spy(ga);
	},
	teardown: function() {
		ga = this.oldga;
	}
});

test('wgTrackDownload exists', function() {
	ok( jQuery('#testDiv').wgTrackDownload);
});

test('wgTrackDownload options exists', function() {
	// THIS TEST IS NOT ENOUGH TO VERIFY THIS BEHAVIOR!
	// Need more tests...
	ok( jQuery.fn.wgTrackDownload.defaults );
})

test('wgTrackDownload returns 3 links', function() {
	equal(jQuery('#testDiv').wgTrackDownload().length, 3);
});

test('wgTrackDownload calls ga()', function() {
	jQuery('#testDiv').wgTrackDownload();
	ok(!ga.called);
	jQuery('a#internal').click();
	ok(ga.called);
});

test('wgTrackDownload has default file extensions', function() {
	ok(jQuery('#testDiv').wgTrackDownload.defaults.extensions);
});

test('wgTrackDownload only tracks whitelisted file extension', function() {
	jQuery('#testDiv').wgTrackDownload();
	jQuery('a#internal').click();
	ok(ga.called);
});

test('wgTrackDownload does not track non-whitelisted file extension', function() {
	var count = ga.callCount;
	jQuery('#testDiv').wgTrackDownload();
	jQuery('a#internal-bad').click();
	equal(ga.callCount, count);
});
