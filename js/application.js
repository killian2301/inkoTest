$(document).ready(function () {
    var video = document.querySelector("#videoElement");

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        // do something
    }

    var toSend;

// Elements for taking the snapshot
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

// Trigger photo take
    document.getElementById("snap").addEventListener("click", function () {
        context.drawImage(video, 0, 0, 300, 150);
        var dataUri = canvas.toDataURL();
        var array = dataUri.split(',', dataUri.length);
        toSend = array[1];
    });


    $('.check').on('click', function () {
        $.post('https://us-central1-inko-14223.cloudfunctions.net/scanImage', {img: toSend }).done(function(data) {
            $("#resultado").text(data);
         });
    });;
});
