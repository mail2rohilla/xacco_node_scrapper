var osmosis = require('osmosis');

osmosis

.get('https://www.coveliving.co/listing/standard-room-mera-springs/')
    .find('body')
    .set({
        propertyName : 'main>div>div>div[3]>a',
        price : '#jmfe-custom-room_price',
        rooms : "#jmfe-custom-unit_type",
        availability : "#jmfe-custom-vailability",
        sharingStatus : ".content-single-job_listing-title-category a",
        propertyDescription : ["#jmfe_widget-9 > p"],
        nearBy : ["#jmfe-wrap-transport div+div"],
        flatMatesList : ['#author_avatars-6>div div span strong']
    })
    // .set('location')
    // .follow('@href')
    // .find('header + div + div li > a')
    // .set('category')
    // .follow('@href')
    // .paginate('.totallink + a.button.next:first')
    // .find('p > a')
    // .follow('@href')
    // .set({
    //     'title':        'section > h2',
    //     'description':  '#postingbody',
    //     'subcategory':  'div.breadbox > span[4]',
    //     'date':         'time@datetime',
    //     'latitude':     '#map@data-latitude',
    //     'longitude':    '#map@data-longitude',
    //     'images':       ['img@src']
    // })
    .data(function(listing) {
        console.log(listing)
    })
    // .log(console.log)
    // .error(console.log)
    // .debug(console.log)
