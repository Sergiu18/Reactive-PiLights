var mic = require('mic');
var fs = require('fs');
 
var micInstance = mic({
    rate: '8000',
    channels: '1'
});
var micInputStream = micInstance.getAudioStream();

var blockValues = [];
 
micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);

 	var input = data;
	var len = input.length  ; 
	var total = i = 0;
	var rms;

	while ( i < len ) {
		total += Math.abs( input[i++] )
	} 

	rms = Math.sqrt( total / len );

	if(blockValues.length < 5) {
		blockValues.push(rms);
		average = 0;
	} 
	else {
		var blockValuesTotal = blockValues.reduce((accum, reducer) => accum+reducer, 0);
		var average = blockValuesTotal / blockValues.length;
		blockValues = [];
	}

	console.log("rms", rms);
	console.log("total", total);
	if(average) {
		console.log(Math.ceil(average * 1000));
	}
});


micInputStream.on('catch signal', function() {
    console.log("I hear you");
});

micInputStream.on('stopComplete', function() {
    console.log("Got SIGNAL stopComplete");
    setTimeout(function() {
            console.log(m);
    }, 5000);
});

micInstance.start();
// micInputStream.on('error', function(err) {
//     cosole.log("Error in Input Stream: " + err);
// });
 

    
// micInputStream.on('stopComplete', function() {
//     console.log("Got SIGNAL stopComplete");
// });
    
// micInputStream.on('pauseComplete', function() {
//     console.log("Got SIGNAL pauseComplete");
//     setTimeout(function() {
//         micInstance.resume();
//     }, 5000);
// });
 
// micInputStream.on('resumeComplete', function() {
//     console.log("Got SIGNAL resumeComplete");
//     setTimeout(function() {
//         micInstance.stop();
//     }, 5000);
// });
 
// micInputStream.on('silence', function() {
//     console.log("Got SIGNAL silence");
// });
 
// micInputStream.on('processExitComplete', function() {
//     console.log("Got SIGNAL processExitComplete");
// });
