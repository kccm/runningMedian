var inputPath = './input04.txt';
var outputPath = './imachoiOutput04.txt';

//=======================================================================================
var q; //queue for all readed number
var nol; //number of line
var o = ""; //output string
var c = 0;
var start = new Date();
var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(inputPath),
	//output: process.stdout,
	console: false
});
lineReader.on('line', function (line) {
	if(!q || q.length < nol) { //only process the number of line as it told to 
		//line to number
		var n = parseFloat(line)
		if(!q){ 
			//first line of document
			q = [];
			nol = n //first line is the number of line we have to process
		} else {
			//create sorted list
			q = sortNumber(q, n)
			//get midien
			var m;
			if (q.length == 1) {
				m = q[0]
			} else if(q.length % 2){
				m = q[(q.length-1)/2]
			} else {
				m = (q[(q.length)/2] + q[(q.length)/2-1])/2
			}
			m = m.toFixed(1).toString(); //1dp
			//print to console
			console.log("data: ", line, " -- line: ", q && q.length || 0 , " --- midien: ", m)
			//prepare output string
			o = o + m + "\r\n";
		}
		//Save result when end of line
		if(q.length == nol){
			var diffMs = (new Date() - start);
			console.log("\r\n======== Completed in ", Math.floor(diffMs / 3600000), " H ", Math.floor((diffMs % 3600000) / 60000), " M ", Math.floor((diffMs % 60000) / 1000), " S")
			require('fs').writeFile(outputPath, o, function(err) {
				if (err) {
					console.log("Error saving output txt")
				} else {
					console.log("Saved output to ./funtest/imachoi04.txt")
				}
			});
		}
		//Check error
		if(c != q.length){
			console.log(q.toString())
			console.log("====== E R R O R ==========: incorrect queue length")
			process.exit();
		}
		c++;
	}
});

//For a list of 100000 number, only need to call itself miximum of 7 times to sort the list
var sortNumber = function(list, num){
	var a = list.slice(0, list.length/2)
	var b = list.slice(list.length/2, list.length)
	if(b.length == 0){
		return [num]
	} else if(num == b[0]){
		return a.concat([num]).concat(b); 
	} else if(num > b[0]){
		if(b.length == 1){
			return a.concat(b).concat([num]);
		} else {
			return a.concat(sortNumber(b, num)); 
		}
	} else if(num < b[0]){
		return sortNumber(a, num).concat(b); 
	} else {
		console.log("====== E R R O R ==========: all case should be handle by sortNumber()")
		process.exit();
	}
}
