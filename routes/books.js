
/*
 * GET users listing.
 */
var https = require('https'),
	books = {
		kind: 'books#volumes',
  		totalItems: 0,
  		items: []
	};

// https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: '/books/v1/volumes',
  method: 'GET'
};



exports.list = function(req, res){
  	// if we have arrived with a form query THEN ask google for it
	if (req.body.q) {
		var book_query = req.body.q;
		book_query = book_query.replace(/(^\s*)|(\s*$)/gi,""); //replace leading or trailing spaces
	    book_query = book_query.replace(/[ ]{2,}/gi," "); // replace 2 or more spaces with a single space
	    // book_query = book_query.replace(/\n /,"\n"); // remove spaces after newlines
		book_query = book_query.replace(/ /g, '+'); // replace spaces with '+'

		// add query from request body (the search form) 
		options.path = '/books/v1/volumes'.concat('?q=' + book_query + '&key=AIzaSyDMk3fozqfEY2NXviv64v2V29D5gjRsBCc');
		console.log('path : ' + options.path);

		var req = https.request(options, function(res_google) {
			var output = '';
			console.log("Searching for : " + book_query);	
		  	console.log("statusCode: ", res_google.statusCode);
		  	// console.log("headers: ", res.headers);

			res_google.on('data', function(chunk) {
		    	// process.stdout.write(d);
		    	output += chunk;
		    });

		    res_google.on('end', function() {
				// console.log('Data recieved');


				books = JSON.parse(output);
				console.log(books);
				// render page when JSON object ready;
				res.render('books', books );

	  		});

			
		});

		req.end();

		req.on('error', function(e) {
	 		console.error(e);
		});

	} else { 	
		// render page if browsed onto (no fresh search result)
		res.render('books', books );
		console.log('rendering');
	};	

};