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

    var items = [];

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
            console.log("REVERSED DATA:", array.reverse())

            items = array;
            console.log("ITEMS:", items);
            var item  = data.items[0]
            mainVid(item);
            resultsLoop(data);
        });
    }

    function mainVid(item) {
        var id = item.snippet.resourceId.videoId;
        var title = item.snippet.title;
        var desc = item.snippet.description;
        var channel = item.snippet.channelTitle;

        $('.iframe-container').html(`

					<iframe width="360" height="210" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

				`);
        $('.details').html(`
            <div id="main-details">
                <h5>${title}</h5>
                <p>${desc}</p>

            `)
    }


    function resultsLoop(data) {


        $.each(data.items, function (i, item) {
            var thumb = item.snippet.thumbnails.high.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('main').append(`
							<article class="item" data-key="${i}"">

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
        var item = $(this).attr('data-key');
        mainVid(items[item]);
    });


});
