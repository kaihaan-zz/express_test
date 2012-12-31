
/*
 * GET home page.
 */

var gm = require('googlemaps')
  , fs = require('fs')
  , address = 'E16'; // default address

var file_path = __dirname.replace("routes","") + 'public/images/test_map.png';
console.log('File path: ' + file_path);

/* configure googlemaps */

/* gm.config({
//  "google-client-id" : "kaihaan@gmail.com",
  "google-private-key" : "AIzaSyDMk3fozqfEY2NXviv64v2V29D5gjRsBCc" 
});
*/

markers = [
    { 'location': 'N6 4RD',
        'color': 'red',
        'label': 'A',
        'shadow': 'false',
        'icon' : 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
    }
]


styles = [
    { 'feature': 'road', 'element': 'all', 'rules': 
        { 'hue': '0x00ff00' }
    }
]

paths = [
    { 'color': '0x0000ff', 'weight': '5', 'points': 
        [ '41.139817,-77.454439', '41.138621,-77.451596' ]
    }
]


exports.index = function(req, res){
	gm.config({ "google-private-key" : "AIzaSyDMk3fozqfEY2NXviv64v2V29D5gjRsBCc" });
	address = (req.body.q) ? req.body.q : address; 
	console.log('Search for : ' + address);

	gm.staticMap(address, 15, '500x400', function(err, data){
  	  	fs.writeFile(file_path, data, 'binary');
  	  	if (err) throw err;
  	  	res.render('index', function(){ var obj = { title: 'Express GoogleMap Experiment', address: '' }; obj.address = address; return obj;}() );
		    console.log('rendering');
  		}, false, 'roadmap', markers, styles, paths);
	
};