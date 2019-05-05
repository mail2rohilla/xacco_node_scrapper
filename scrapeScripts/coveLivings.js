var request = require("request");
var userDetails;
var osmosis = require('osmosis');
var resources = require('./../resources.js')
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
        // console.log("fetching data for " + index + "th link = " + link);
        osmosis
            .get(link)
            .find('body')
            .set({
                propertyName : 'main>div>div>div[3]>a',
                price : '#jmfe-custom-room_price',
                propertyType : "#siteorigin-panels-builder-20>div>div>div>div>div[2] div[id='jmfe-custom-unit_type']",
                availability : "#siteorigin-panels-builder-20>div>div>div>div>div[3] div[id='jmfe-custom-availability']",
                address : ['#main>div[1]>div[1]>div[3]>a'],
                rooms : "#jmfe-custom-unit_type",
                floorPlan : "#jmfe_widget-10 img@data-lazy-src",
                // availability : "#jmfe-custom-vailability",
                sharingStatus : ".content-single-job_listing-title-category a",
                propertyDescription : ["#jmfe_widget-9 > p"],
                nearby : ["#jmfe-wrap-transport div+div"],
                flatMatesList : ['#author_avatars-6>div div span strong'],
                imageSource : ['#sow-simple-masonry-4>div>div>div a@href'],
                buildingFacilities : ['#siteorigin-panels-builder-17>div>div>div>div[1] p span'],
                roomFacilities : ['#siteorigin-panels-builder-17>div>div>div>div[2] p span'],
                // imageSource : ['#listify_widget_panel_listing_gallery_slider-5 a@href']

            })
            .follow('#listify_widget_panel_listing_gallery_slider-5>h2>a')
            .find('main')
            .set({
                galleryImages : ['article img@src']
            })
            .data(function(listing) {
                // console.log('afterHttpGetPromise.then() : fetched data for '+ link +'= \n ', listing)
                //TODO : make mongo save queries here

                let galleryImages = [];
                for(let i = 1; i< listing.galleryImages.length; i+=2){
                    galleryImages.push(listing.galleryImages[i])
                }

                let mongoObj = new resources.obj();
                mongoObj
                    .add("propertyName", listing.propertyName)
                    .add("propertyType", listing.rooms)
                    .add("propertyDescription", listing.propertyDescription)
                    .add("price", listing.price)
                    .add("bathrooms", listing.propertyName)
                    .add("address", listing.address)
                    .add("noOfRooms", listing.rooms)
                    .add("sharingStatus", listing.sharingStatus)
                    .add("roomFacilities", listing.roomFacilities)
                    .add("nearby", listing.nearby)
                    .add("images", listing.imageSource)
                    .add("galleryImages", galleryImages)
                    .save();
            })
            // .log(console.log)```
            // .error(console.log)
            // .debug(console.log)
    })
}).catch(errr => console.log('coveLiving afterHttpGetPromise.catch() : couldNot fetch data from base url'));