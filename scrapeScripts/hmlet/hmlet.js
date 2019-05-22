var request = require("request");
var userDetails;
var osmosis = require('osmosis');
var links = [];
var resources = require('../../resources.js')
var counter = 0;
var counter1 = 0;
let getData = ()=>{
    osmosis
        .get('https://www.hmlet.com/rooms/singapore')
        .find(".divMainContentLocation > .divMainContentLocation>div>div>div[1]>div>.row>div>div>div>div[2]>div[style]")
        .set('propertyLinks')
        .data(function(listing) {
            console.log(listing.propertyLinks.toLowerCase().split(" ").join("-"))
            if(listing.propertyLinks && listing.propertyLinks.indexOf('•') == -1)
            {
                osmosis
                    .get('https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"))
                    .find("body")
                    .set({
                        propertyName : '.hmletBillboardTitle',
                        address : '.billboard-description',
                        description : ['.divMainIntro[1]:first>div>p'],
                        nearBy : ['.divMainIntro[1]:first>div[3]>div div'],
                        facilities : ['.desktop .divAmenities>div>div>div'],
                        roomTypesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[2]'],
                        roomImagesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[1]@style'],
                        roomDescritionArray : ['.desktop>.divRoomDetail:first>div>div[2] p'],
                        roomPriceArray : ['.desktop>.divRoomDetail:first>div>div[3]>div[2]'],
                        galleryImages : ['.divPicPanel div@style']
                    })
                    .find('.desktop>.divRoomDetail:first>div>div[2]>div')
                    .set({
                        roomFacilities : ['div span']
                    })
                    .data(function(data) {
                        console.log('https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"));
                        console.log(data);

                        let galleryImages = [];
                        for(let i =0; i< data.galleryImages.length; i++){
                            if(data.galleryImages[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)){
                                galleryImages.push(data.galleryImages[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0])
                            }
                        }

                            let mongoObj = new resources.obj();
                            mongoObj
                                .add('url', 'https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"))
                                .add("propertyName", data.propertyName)
                                .add("propertyType", data.roomTypesArray[counter])
                                .add("propertyDescription", data.description.join(''))
                                .add("price", data.roomPriceArray[counter])
                                .add("bathrooms", "single non-sharing")
                                .add("address", data.address)
                                .add("noOfRooms", "1")
                                .add("sharingStatus", "non-sharing")
                                .add("roomFacilities", data.roomFacilities)
                                .add("nearby", data.nearby)
                                .add("images", [data.roomImagesArray[counter].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0]])
                                .add("imagesDirectory", '/home/deepanshu/xacco/xacco_node_scrapper/images/hmlet/' + data.propertyName.split(" ")
                                        .map(item => item.toLowerCase()[0].toUpperCase() + item.toLowerCase().substring(1)).join()
                                    + '_' + data.roomPriceArray[counter] + '/roomImages')
                                .add("galleryImages", galleryImages)
                                .add("galleryImagesDirectory", '/home/deepanshu/xacco/xacco_node_scrapper/images/hmlet/' + data.propertyName.split(" ")
                                        .map(item => item.toLowerCase()[0].toUpperCase() + item.toLowerCase().substring(1)).join()
                                    + '_' + data.roomPriceArray[counter] + '/galleryImages' )
                                .save();

                        if (counter == data.roomTypesArray.length-1)
                            counter = 0;
                    })
                    }
                    // .log(console.log)
            }).log(console.log)
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
                            description : ['.divMainIntro[1]:first>div>p'],
                            nearBy : ['.divMainIntro[1]:first>div[3]>div div'],
                            facilities : ['.desktop .divAmenities>div>div>div'],
                            roomTypesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[2]'],
                            roomImagesArray : ['.desktop>.divRoomDetail:first>div>div[1]>div[1]@style'],
                            roomDescritionArray : ['.desktop>.divRoomDetail:first>div>div[2] p'],
                            roomPriceArray : ['.desktop>.divRoomDetail:first>div>div[3]>div[2]'],
                            galleryImages : ['.divPicPanel div@style']
                        })
                        .find('.desktop>.divRoomDetail:first>div>div[2]>div')
                        .set({
                            roomFacilities : ['div span']
                        })
                        .data(function(data) {
                            console.log('https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"));
                            console.log(data);

                            let galleryImages = [];
                            for(let i =0; i< data.galleryImages.length; i++){
                                if(data.galleryImages[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)){
                                    galleryImages.push(data.galleryImages[i].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0])
                                }
                            }

                            let mongoObj = new resources.obj();
                            mongoObj
                                .add('url', 'https://www.hmlet.com/rooms/' + listing.propertyLinks.toLowerCase().split(" ").join("-"))
                                .add("propertyName", data.propertyName)
                                .add("propertyType", data.roomTypesArray[counter1])
                                .add("propertyDescription", data.description.join(''))
                                .add("price", data.roomPriceArray[counter1])
                                .add("bathrooms", "single non-sharing")
                                .add("address", data.address)
                                .add("noOfRooms", "1")
                                .add("sharingStatus", "non-sharing")
                                .add("roomFacilities", data.roomFacilities)
                                .add("nearby", data.nearby)
                                .add("images", [data.roomImagesArray[counter1].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0]])
                                .add("images", [data.roomImagesArray[counter1].match(/(?<=background\-image\:url\().*(?=\)\;)/)[0]])
                                .add("galleryImages", galleryImages)
                                .add("imagesDirectory", '/home/deepanshu/xacco/xacco_node_scrapper/images/hmlet/' + data.propertyName.split(" ")
                                        .map(item => item.toLowerCase()[0].toUpperCase() + item.toLowerCase().substring(1)).join()
                                    + '_' + data.roomPriceArray[counter] + '/roomImages')

                                .add("galleryImagesDirectory", '/home/deepanshu/xacco/xacco_node_scrapper/images/hmlet/' + data.propertyName.split(" ")
                                        .map(item => item.toLowerCase()[0].toUpperCase() + item.toLowerCase().substring(1)).join()
                                    + '_' + data.roomPriceArray[counter1] + 'galleryImages')
                                .save();

                            if (counter1 == data.roomTypesArray.length-1)
                                counter1 = 0;
                        })
                }
                catch(err){
                    console.log(err);
                }
        })
        .log(console.log)
};

module.exports = getData;
