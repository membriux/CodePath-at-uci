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

    loadVids(6);

    function loadVids(i) {
        $.getJSON(URL, options, function (data) {

            items = data.items
            var item  = items[i]
            mainVid(item);
            resultsLoop(items);
        });
    }

    function mainVid(item) {
        var id = item.snippet.resourceId.videoId;
        var title = item.snippet.title;
        var desc = item.snippet.description.substring(0,450) + "...";
        var channel = item.snippet.channelTitle;


        $('#video').html(`
                    <h5><a href='https://www.youtube.com/channel/UCpXk1xmGVM_o4_UJ_SPHiDA'>${channel}</a></h5>
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <div id="main-details">
                        <h5>${title}</h5>
                        <p>${desc}</p>
				`);
    }


    function resultsLoop(items) {

        $('main').html(``)

        $.each(items, function (i, item) {
            var thumb = item.snippet.thumbnails.high.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;

            $('main').append(`

                    <a href="#main">
                        <article class="item" data-key="${i}"">

                            <img src="${thumb}" alt="" class="thumb">
                            <div class="details">
                                <h5>${title}</h5>
                                <p>${desc}</p>
                            </div>

                        </article>
                    </a>

						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var i = $(this).attr('data-key');
        loadVids(i);
    });


});
