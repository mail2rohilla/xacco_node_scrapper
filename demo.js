x = 'background-image:url(https://hmlet.sg/media/buildings/Pocket_compressed_KK1Dt8i.jpg);background-position:center;background-size:cover;height:24rem;text-shadow:2px 2px 0px black;border-top:solid 0.5px white;border-bottom:solid 0.5px white'
var c = x.match(/(?<=background\-image\:url\().*(?=\)\;)/)
console.log(c[0]);