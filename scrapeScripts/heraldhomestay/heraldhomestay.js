var request = require("request");
var userDetails;
var osmosis = require('osmosis');


osmosis
    .get('https://heraldhomestay.com/')
    // .follow('#menu-main-menu>li[1]>a span')
    // .find('#menu-main-menu>li[1] li span')
    // .set('propertyName')
    // .find('#menu-main-menu>li[1] li a:first')
    .follow('#menu-main-menu>li[1] li a:first')
    .find('.tabbable>ul>li>a')
    .set('propertyType')
    // .follow('.tabbable>ul>li>a')
    .find('body')
    .set({
        facilities : ['.tabbable .circle-text-box:first .circle-headline~ul li'],
        nearby : ['.kl-iconbox__inner p'],
        propertyDescription: ['.grid-ibx__item'],
        images : ['.znSlickNav~ul:first li>a@href']
    })
    .data(function(listing) {
        console.log(listing)
    })
    .log(console.log)
    .error(console.log)
    // .debug(console.log)

