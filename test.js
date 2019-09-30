var mic = require('mic');
var fs = require('fs');
 
var micInstance = mic({
    rate: '16000',
    channels: '1',
    debug: true,
    exitOnSilence: 100
});
var micInputStream = micInstance.getAudioStream();
 
 
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

	console.log("rms", rms);
	console.log("total", total);
});
 

micInputStream.on('catch signal', function() {
    console.log("I hear you");
});

micInstance.start();
// micInputStream.on('error', function(err) {
//     cosole.log("Error in Input Stream: " + err);
// });
 
// micInputStream.on('startComplete', function() {
//     console.log("Got SIGNAL startComplete");
//     setTimeout(function() {
//             micInstance.pause();
//     }, 5000);
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
