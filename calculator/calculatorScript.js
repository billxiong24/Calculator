	//display previous expression
	var answer = document.getElementById("answer");	
	//get last number for percentages
	function getLastNumber(str){

		var temp = "";
		a: for(var i = str.length-1; i >= 0; i--){
			if(/\d|\./.test(str[i]))		
				temp+= str[i];
			else
				break a;
		}

		return temp.split("").reverse().join("");
	}	

	function perc(){
		var num = getLastNumber(out.value);
		if(num.length > 0){
			out.value = out.value.slice(0, out.value.indexOf(num)) + Number(num)/100;
		}
		if(out.value.substring(out.value.length-3) === "Ans"){
			out.value = out.value.slice(0, out.value.length-3) + Ans/100;
		}
		decChecker = false;
	}
	//constants
	var e = Math.E;
	var pi = String.fromCharCode("960");
	function replaceAll(str, search, replacement){
		return str.split(search).join(replacement);
	}
	//for the shift key- if inverses == true, then do alternate computation
	var inverses = false;
	//operation to be performed
	var operation = "";
	//previous answer output, updates every character
	var previous = "";
	//previous answer, updates every equals 
	var Ans = "";
	//clears output if true, otherwise output remains as is. output clears after a number is pressed after equal sign
	var finished = true;
	var out = document.querySelector("#output");
	var nums = document.getElementsByClassName("number");
	var operators = document.getElementsByClassName("ops");
	var funcs = [];
	//onclick functions for numbers- preserve temp as a string so doesnt get lost
	for(var i = 0; i < nums.length-1; i++){
		var temp = nums[i].value;
		var f = new Function('event', "if(out.value === \"Error\" || finished){out.value = \"\";}out.value+="+temp+"; finished = false;");
		funcs.push(f);
	}

	function decimal(event){
			out.value += ".";
	}
	funcs.push(decimal);
	//add event listener
	for(var i = 0; i < nums.length; i++){
		nums[i].addEventListener("click", funcs[i]);
	}

	//onclick functions for operations + - / *
	operators[0].addEventListener("click", function(event){
		operation = "+";
		if(out.value === "Error"){out.value = "";}
		out.value += "+";
		finished = false;
		
	});

	//subtract
	operators[1].addEventListener("click", function(event){
		if(out.value === "Error"){out.value = "";}
		operation = "-";
		out.value += "-";
		finished = false;
	});

	//multiply
		operators[2].addEventListener("click", function(event){
		if(out.value === "Error"){out.value = "";}
		operation = "*";
		out.value += "*";
		finished = false;
	});
	//divide
	operators[4].addEventListener("click", function(event){
		if(out.value === "Error"){out.value = "";}
		operation = "/";
		out.value += "/";
		finished = false;
	});
	//onclick functions for = button
	operators[3].addEventListener("click", function(event){
		//subsitute pi
		out.value = replaceAll(out.value, pi, Math.PI);
		try{
			if(!isNaN(eval(out.value))){
				answer.value = out.value.split("Ans").join(Ans) + " =";
				out.value = eval(out.value);
				Ans = Number(out.value);
			}
			else{
				out.value = "Error";
			}

		}	
		catch(e){
			out.value = "Error";
		}
		finally{
			finished = true;
		}
	});


	//reset for C
	function res(){
		out.value = "";
		previous = "";
		Ans = "";
		answer.value = " =";
	}
	//for CE
	function flush(){
		if(finished == true)
			out.value = "";
		else
			out.value = out.value.slice(0,out.value.length-1);	
	}
	//for +/-
	function flip(){
		if(finished || out.value === "Error")
			out.value = "";
		if(out.value.charAt(out.value.length-1) === '-'){
			out.value +="(-";	
		}
		else
			out.value +="-";
		
		finished = false;
	}
	//for previous answer
	function retrieve(){
		if(finished || out.value === "Error")
			out.value = "";
		if(Ans!== ""){
			if(/\d|s|\)/.test(out.value.charAt(out.value.length-1)))
				out.value+="*Ans";
			else
				out.value+="Ans";
		}
			finished = false;
	}
	// for(
	function leftPara(){
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			out.value+="*(";
		else
			out.value+="(";
		finished = false;
	}
	//)
	function rightPara(){
		out.value+=")";
	}
	//sqrt
	function sqrt(a){
		return Math.sqrt(a);
	}
	function square(a){
		return Math.pow(a, 2);
	}
	function root(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			if(inverses){
				out.value+="*square(";
			}
			else
				out.value+="*sqrt(";
		else{
			if(inverses)
				out.value+="square(";
			else
				out.value += "sqrt(";	
		}
		finished = false;
	}
	//exponents
	function xp(a, b){
		return Math.pow(a, b);
	}
	function xpi(a, b){
		return Math.pow(a, 1/b);
	}
	function exponent(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*xpi(";
			else
				out.value+="xp("
		}
		else{
			if(inverses)
				out.value+="xpi(";
			else
				out.value+="xp(";
		}	
		
		finished = false;
	}	
	//taking natural log
	function ln(a){
		return Math.log(a);
	}
	function exp(a){
		return Math.pow(Math.E, a);
	}
	function natLog(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*exp(";
			else
				out.value+="*ln("
		}
		else{
			if(inverses)
				out.value += "exp(";	
			else
				out.value+="ln(";
		}
		finished = false;
	}
	//variable for tracking if to use radians or degrees
	var rads = true;
	var radians = document.getElementById("rad");
	var clicked = true;
	radians.addEventListener("click", function(event){
		if(clicked){
			radians.value = "Deg";
			rads = false;
		}
		else{
			radians.value = "Rad";
			rads = true;
		}
		clicked = !clicked;
	});
	function toRadians(angle) {
  		return angle * (Math.PI / 180);
	}
	//taking sin
	function sin(a){
		if(rads)
			return Math.sin(a);
		else{
			a = toRadians(a);
			return Math.sin(a);
		}
	}
	function arcsin(a){
		if(rads)
			return Math.asin(a);
		else{
			return Math.asin(a)*180/Math.PI;
		}
	}

	function si(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*arcsin(";
			else
				out.value+="*sin("
		}
		else{
			if(inverses)
				out.value+="arcsin(";
			else
				out.value+="sin(";
		}
		finished = false;
		decChecker = true;
	}

	//taking cos
	function cos(a){
		if(rads)
			return Math.cos(a);
		else{
			a = toRadians(a);
			return Math.cos(a);
		}
	}
	function arccos(a){
		if(rads)
			return Math.acos(a);
		else
			return Math.acos(a)*180/Math.PI;
	}
	function co(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*arccos(";
			else
				out.value+="*cos("
		}
		else{
			if(inverses)
				out.value+="arccos(";
			else
				out.value+="cos(";
		}
		finished = false;
		decChecker = true;
	}
	function arctan(a){
		if(rads)
			return Math.atan(a);
		else{
			return Math.atan(a)*180/Math.PI;
		}
	}
	function tan(a){
		if(rads)
			return Math.tan(a);
		else{
			a = toRadians(a);
			return Math.tan(a);
		}
	}

	function ta(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*arctan(";
			else
				out.value+="*tan("
		}
		else{
			if(inverses)
				out.value+="arctan(";
			else
				out.value+="tan(";
		}
		finished = false;
	}
	//taking log10
	function log(a){
		return Math.log10(a);
	}
	function l0xp(a){
		return Math.pow(10, a);
	}
	function lo(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1))){
			if(inverses)
				out.value+="*l0xp("
			else
				out.value+="*log(";
		}
		else{
			if(inverses)
				out.value+="l0xp("
			else
				out.value+="log(";
		}
		finished = false;
	}
	//E (x*10^y)
	function ex(){
		if(/\d/.test(out.value.charAt(out.value.length-1)))
			out.value+= "E";
		finished = false;
	}
	//euler's number
	function eu(){
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			out.value+="*e";
		else
			out.value+="e";
		finished = false;
	}
	function pie(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			out.value+="*"+pi;
		else
			out.value+=pi;
		finished = false;
	}

	//shift key
	var exprs = document.querySelectorAll(".expression");
	var shifted = true;
	var s = exprs[1];
	var olds = s.value;
	var c = exprs[4];
	var oldc = c.value;
	var t = exprs[8];
	var oldt = t.value;
	var rt = exprs[12];
	var oldrt = rt.value;
	var expo = exprs[13];
	var oldexpo = expo.value;
	var lg = exprs[16];
	var oldlg = lg.value;
	var nl = exprs[17];
	var oldnl = nl.value;
	var shift = document.querySelector("#shift");
	shift.addEventListener("click", function(event){
		
	if(shifted){	
		s.value = "sin-1";
		c.value = "cos-1";
		t.value = "tan-1";
		rt.value = "x^2";
		expo.value = "x^(1/y)";
		lg.value = "10^x";
		nl.value = "e^x";
		shift.style["background-color"] = "#71C671";
		shift.style.border = "none";
		inverses = true;
	}
	else{
		shift.style["background-color"] = "";
		shift.style.border = "";
		s.value = olds;
		c.value = oldc;
		t.value = oldt;
		rt.value = oldrt;
		expo.value = oldexpo;
		lg.value = oldlg;
		nl.value = oldnl;
		inverses = false;
	}
		shifted = !shifted;
	});

	function comma(){
		out.value+=",";
	}
	function factorial(n){
		if(n <= 1)
			return 1;

		return n*factorial(n-1);
	}
	function fact(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			out.value+="*factorial(";
		else
			out.value+="factorial(";
		finished = false;
	}
	function logX(a, b){
		return Math.log10(a)/Math.log10(b);
	}
	function baseLog(){
		if(finished || out.value === "Error")
			out.value = "";
		if(/\d|s|\)|e/.test(out.value.charAt(out.value.length-1)))
			out.value+="*logX(";
		else
			out.value+="logX(";
		finished = false;
	}
