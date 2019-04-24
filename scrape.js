var osmosis = require('osmosis');

osmosis
    .get('www.craigslist.org/about/sites')
    .find('h1 + div a')
    .set('location1')
    .follow('@href')
    .find('div h4 a span')
    .set('category')
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
    .log(console.log)
    .error(console.log)
    .debug(console.log);