

function async( innerF ){
	var f = innerF.apply(this, [arguments[1], arguments[2]]);
	console.log(f);
	return f;
}


function combine(x, y){
	var z = x + y;
	return z;
}

var xx = async(combine, 1, 2);

