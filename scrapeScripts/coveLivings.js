var request = require("request");
var userDetails;
var osmosis = require('osmosis');

function initialize() {
    var options = {
        url: 'https://www.coveliving.co/listings/?_per_page=100',
    };
    return new Promise(function(resolve, reject) {

        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

let afterHttpGetPromise = initialize().then(data => {
    let regexForLinks = /(?<=window.FWP_JSON = ).*(?=,"load_more":{"default_text":"Load more","loading_text":" Loading..."})/g;
    var links = JSON.parse(data.match(regexForLinks)[0] + "}").preload_data.settings.listify.listings.map(item => item.permalink);
    var housingData = [];

    console.log("fetched following Links", links);
    links.forEach((link, index) => {
        console.log("fetching data for " + index + "th link = " + link);
        osmosis
            .get(link)
            .find('body')
            .set({
                propertyName : 'main>div>div>div[3]>a',
                price : '#jmfe-custom-room_price',
                rooms : "#jmfe-custom-unit_type",
                availability : "#jmfe-custom-vailability",
                sharingStatus : ".content-single-job_listing-title-category a",
                propertyDescription : ["#jmfe_widget-9 > p"],
                nearBy : ["#jmfe-wrap-transport div+div"],
                flatMatesList : ['#author_avatars-6>div div span strong'],
                imageSource : ['#sow-simple-masonry-4>div>div>div a@href'],
                // imageSource : ['#listify_widget_panel_listing_gallery_slider-5 a@href']

            })
            .follow('#listify_widget_panel_listing_gallery_slider-5>h2>a')
            .find('main')
            .set({
                galleryImages : ['article img@src']
            })
            .data(function(listing) {
                console.log('afterHttpGetPromise.then() : fetched data for '+ link +'= \n ', listing)
                //TODO : make mongo save queries here
                housingData.push(listing);
            })
            // .log(console.log)```
            // .error(console.log)
            // .debug(console.log)
    })
}).catch(errr => console.log('coveLiving afterHttpGetPromise.catch() : couldNot fetch data from base url'));