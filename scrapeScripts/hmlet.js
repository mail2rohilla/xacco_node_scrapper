var request = require("request");
var userDetails;
var osmosis = require('osmosis');
var links = [];
var resources = require('./../resources.js')
var counter = 0;
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
                        nearBy : ['.divMainIntro[1]>div[3]>div div'],
                        facilities : ['.desktop .divAmenities>div>div>div'],
                        roomTypesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[2]'],
                        roomImagesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[1]@style'],
                        roomDescritionArray : ['.desktop>.divRoomDetail:first>div>div[2] p'],
                        roomPriceArray : ['.desktop>.divRoomDetail:first>div>div[3]>div[2]'],
                        images : ['.divPicPanel>.row>div div@style']
                    })
                    .find('.desktop>.divRoomDetail:first>div>div[2]>div')
                    .set({
                        roomFacilities : ['div span']
                    })
                    .data(function(data) {
                        console.log(counter++);
                        let galleryImages = [];
                        for(let i =0; i< data.images; i++){
                            galleryImages.push(data.images[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0])
                        }

                        for(let i =0; i< data.roomTypesArray; i++){
                            let mongoObj = new resources.obj();
                            mongoObj
                                .add("propertyName", data.propertyName)
                                .add("propertyType", data.roomTypesArray[i])
                                .add("propertyDescription", data.description.join(''))
                                .add("price", data.roomPriceArray[i])
                                .add("bathrooms", "single non-sharing")
                                .add("address", data.address)
                                .add("noOfRooms", "1")
                                .add("sharingStatus", "non-sharing")
                                .add("roomFacilities", data.roomFacilities)
                                .add("nearby", data.nearby)
                                .add("images", data.imageSource)
                                .add("galleryImages", galleryImages)
                                .save();
                        }
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
                            nearby : ['.divMainIntro[1]>div[3]>div div'],
                            facilities : ['.desktop .divAmenities>div>div>div'],
                            roomTypesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[2]'],
                            roomImagesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[1]@style'],
                            roomDescritionArray : ['.desktop>.divRoomDetail:first>div>div[2] p'],
                            roomPriceArray : ['.desktop>.divRoomDetail:first>div>div[3]>div[2]'],
                            images : ['.divPicPanel>.row>div div@style']
                        })
                        .find('.desktop>.divRoomDetail:first>div>div[2]>div')
                        .set({
                            roomFacilities : ['div span']
                        })
                        .data(function(data) {
                            console.log(counter++);
                            let galleryImages = [];
                            for(let i =0; i< data.images.length; i++){
                                data.images[i].match(/(?<=background\-image\:url\().*(?=\)\;)/) ?
                                    galleryImages.push(data.images[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0])
                                                                                                : "";
                            }
                            for(let i =0; i< data.roomTypesArray.length; i++){
                                let mongoObj = new resources.obj();
                                mongoObj
                                    .add("propertyName", data.propertyName)
                                    .add("propertyType", data.roomTypesArray[i])
                                    .add("propertyDescription", data.description.join(''))
                                    .add("price", data.roomPriceArray[i])
                                    .add("bathrooms", "single non-sharing")
                                    .add("address", data.address)
                                    .add("noOfRooms", "1")
                                    .add("sharingStatus", "non-sharing")
                                    .add("roomFacilities", data.roomFacilities)
                                    .add("nearby", data.nearby)
                                    .add("images", data.roomImagesArray[i].match(/(?<=background\-image\:url\().*(?=\)\;)/))
                                    .add("galleryImages", galleryImages)
                                    .save();
                            }
                        })
                }
                catch(err){
                    console.log(err);
                }
        })
        .log(console.log)

}

getLinks();
