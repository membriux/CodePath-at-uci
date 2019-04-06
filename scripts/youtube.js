// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
//
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg


$(document).ready(function () {

    var key = "AIzaSyAn4jIgvUgLzyO5JS_4yMCXi1ZfSW-U-Nk";
    var playlistId = 'PLxngEA2kBJ2DWmzCObDPS4stRuy32_PeJ';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 25,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var array = data.items

            // console.log("REVERSED DATA:", array.reverse())
            mainVid(data);
            resultsLoop(data);
        });
    }

    function mainVid(data) {
        var item = data.items[0]
        var id = item.snippet.resourceId.videoId;
        var title = item.snippet.title;
        var desc = item.snippet.description;
        var channel = item.snippet.channelTitle;

        $('#video').html(`
                    <h5><a href='https://www.youtube.com/channel/UCpXk1xmGVM_o4_UJ_SPHiDA'>${channel}</a></h5>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <div id="main-details">
                        <h5>${title}</h5>
                        <p>${desc}</p>
				`);
    }


    function resultsLoop(data) {


        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.high.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h5>${title}</h5>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});
