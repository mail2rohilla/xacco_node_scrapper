var request = require("request");
var userDetails;
var osmosis = require('osmosis');
var links = [];
var flag = true;
let getLinks = ()=>{
    osmosis
        .get('https://www.hmlet.com/rooms/singapore')
        .find(".divMainContentLocation > .divMainContentLocation>div>div>div[1]>div>.row>div>div>div>div[2]>div[style]")
        .set('propertyLinks')
        .data(function(listing) {
            // console.log(listing)
            if(listing.propertyLinks && listing.propertyLinks.indexOf('•••') == -1)
            {
                osmosis
                    .get('https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"))
                    .find("body")
                    .set({
                        propertyName : '.hmletBillboardTitle',
                        address : '.billboard-description',
                        description : ['.divMainIntro[1]>div>p'],
                        nearBy : '.divMainIntro[1]>div[3]>div div',
                        facilities : ['.desktop .divAmenities>div>div>div'],
                        roomTypesArray : ['.desktop>.divRoomDetail>div>div[1]>div[2]'],
                        roomImagesArray : ['.desktop>.divRoomDetail>div>div[1]>div[1]@style'],
                        roomDescritionArray : ['.desktop>.divRoomDetail>div>div[2] p'],
                        roomFacilitesArray : ['.desktop>.divRoomDetail>div>div[2]>div div span'],
                        roomPriceArray : ['.desktop>.divRoomDetail>div>div[3]>div[2]'],
                        images : ['.divPicPanel div@style']

                    })
                    .data(function(data) {
                        console.log(data)
                    })
            }
        })
        .log(console.log)

    osmosis
        .get('https://www.hmlet.com/rooms/singapore')
        .find(".divMainContentLocation > .divMainContentLocation>div>div>div[1]>div>.row>div>div>div>div[3]>div[style]")
        .set('propertyLinks')
        .data(function(listing) {
            // console.log(listing.propertyLinks.toLowerCase().split(" ").join("-"))
            // ignore special character
            if(listing.propertyLinks && listing.propertyLinks.indexOf('KēSa House') != -1)
            {
                listing.propertyLinks= 'kesa house'
            }
                try{
                    osmosis
                        .get('https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"))
                        .find("body")
                        .set({
                            propertyName : '.hmletBillboardTitle',
                            address : '.billboard-description',
                            description : ['.divMainIntro[1]>div>p'],
                            nearBy : '.divMainIntro[1]>div[3]>div div',
                            facilities : ['.desktop .divAmenities>div>div>div'],
                            roomTypesArray : ['.desktop>.divRoomDetail>div>div[1]>div[2]'],
                            roomImagesArray : ['.desktop>.divRoomDetail>div>div[1]>div[1]@style'],
                            roomDescritionArray : ['.desktop>.divRoomDetail>div>div[2] p'],
                            roomFacilitesArray : ['.desktop>.divRoomDetail>div>div[2]>div div span'],
                            roomPriceArray : ['.desktop>.divRoomDetail>div>div[3]>div[2]'],
                            images : ['.divPicPanel div@style']

                        })
                        .data(function(data) {
                            console.log(data)
                        })
                }
                catch(err){
                    console.log(err);
                }
        })
        .log(console.log)

}

getLinks();
