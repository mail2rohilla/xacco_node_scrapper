var request = require("request");
var userDetails;
var osmosis = require('osmosis');
var links = [];
var flag = true;

osmosis
    .get('https://www.hmlet.com/rooms/liberte')
    .find("body")
    .set({
        'propertyName' : '.hmletBillboardTitle',
        "address" : '.billboard-description',
        "description" : ['.divMainIntro[1]>div>p'],
        "nearBy" : '.divMainIntro[1]>div[3]>div div',
        "facilities" : ['.desktop .divAmenities>div>div>div'],
        "images" : ['.divPicPanel div@style']

    })
        .find("#__next .desktop>.divMainContentRiverWalk>div[2]>div[2]>.desktop>.divRoomDetail>div")
    .set({
        "roomType" : "div[1]>div[2]",
        roomImage : "div[1]>div[1]@style",
        roomDescription : ["div[2] p"],
        roomFacilities : ["div[2] span"],
    })
    .data(function(data) {
        console.log(data)
    })
    .log(console.log);
