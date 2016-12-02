var svg;
var width = 800;
var height = 600;
var topMargin = 40;
var bottomMargin = 50;
var leftMargin = 140;
var rightMargin = 40;
var title = "Time Lapse";
var xtitle = "X Title";
var ytitle = "Y Title";
var title = "New Time Lapse";
var xaxisscale = "Linear";
var yaxisscale = "Linear";
var xFormat = ",d";
var yFormat = ",d";

var xMax = 500;
var xMin = 300;
var yMax = 3;
var yMin = 0;
var sizeMin = 0;
var sizeMax = 5e8;
var yearMin = 1740;
var yearMax = 2010;


var radiusScale;
var colorScale;
var xAxis;
var yAxis;
var label;
var xScale;
var yScale;
var checkPath;
var checkDots;
var num = [];
var map = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","Z"]
var compareNum;

var check = -1;


// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.x; }
function y(d) { return d.y; }
function radius(d) { return d.size; }
function color(d) { return d.category; }
function key(d) { return d.name; }


function bars(data)
{

    // Load the data.
	console.log(data);
  // A bisector since some data is sparsely-defined.
  var bisect = d3.bisector(function(d) { return d[0]; });

	// Add a dot per nation. Initialize the data at 1800, and set the colors.
  var path1 = svg.append("g");
  var shadowD = svg.append("g")
				.attr("class", "dots")
				.selectAll(".dot")
				// Used to be 1800
				.data(interpolateData(0)).enter().append("g").attr("class", "node");
 /* var shadowD2 = svg.append("g")
				.attr("class", "dots")
				.selectAll(".dot")
				// Used to be 1800
				.data(interpolateData(0)).enter().append("g").attr("class", "node");*/
  var dot1 = svg.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
    // Used to be 1800
      .data(interpolateData(0)).enter().append("g").attr("class", "node");

  var dot = dot1.append("circle")
      .attr("class", "dot")
      //.style("fill", function(d) { return colorScale(color(d)); })
      .style("opacity", 1)
	  //.append("image")
       //.attr("xlink:href", "../style/whale.png")
      // .attr('width', 4)
      //              .attr('height', 4)
      //.style("fill", "url(../whale.png)")
	  .style("fill", "url(#image)")
	  //.style("fill", function (d) { return gradient(colorScale(color(d))) })
      .call(position)
      //.sort(order)
      .on("mouseover", function()
      {
    	  d3.select(this).style("stroke-width", "10");
    	  var el = d3.select(this)
          var xpos = Number(el.attr('cx'))
          var ypos = (el.attr('cy') - d.radius - 10)
      })
      .on("mouseout", function(){d3.select(this).style("stroke-width", "1");});
  var text = dot1.append("svg:text")
		.call(position_t)
		.attr("font-size","0px")
		.text(function(d){
			var testss = d.name;
			return d.name;
		});
		
  
//.on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
//.on("mouseout", function(){d3.select(this).style("fill", "white");})
  
  // Add a title.
  dot.append("title")
      .text(function(d) { return d.name + ":\n\n" + xtitle + "=" + d.x + "\n" + ytitle + "=" + d.y ;});

  // Start a transition that interpolates the data based on year.
  
  time = (yearMax - yearMin)*703;
  svg.transition()
      .duration(time)
      .ease("linear")
      .tween("year", tweenYear)
      .each("end", enableInteraction);
	
var map = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","Z"]
 
if (compareNum ==1){
 var ter = num[0];
  var map_t= map[num[0]];
  var lineData = tweenYear_p()[map[num[0]]];
  
  var lineData3 = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];
				  
 //This is the accessor function we talked about above
 //var lineFunction = d3.svg.line()
   //                       .x(function(d) { 
	//					  var teete = d.x;
		//				  
			//			  return xScale(d.x); })
              //            .y(function(d) { return yScale(d.y); })
                //         .interpolate("linear");



//The line SVG Path we draw
//var lineGraph = svg.append("path");
                           /* .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                           .attr("stroke-width", 2)
                            .attr("fill", "none");*/
if (checkDots)	{
	if (yearMin % 10 != 0) {
		var astchar = "*";
		var astText = "*Showing data from:" + yearMin.toString() + " to " + (Math.ceil(yearMin/10)*10).toString(); 
	}
	else {
		var astchar = "";
		var astText = "";
	}	
	if (yearMax % 10 !=  0) {
		var astchar2 = "*";
		var astText2 = "*Showing data from:" + ((Math.floor(yearMax/10))*10).toString() + " to " + yearMax.toString(); 
	}
	else {
		var astchar2 = ""; 
		var astText2 = ""; 
	}
for (j=0; j < (Math.ceil(yearMax/10)-Math.floor(yearMin/10)); j++) {
	if (j==0) {
		decText =  astchar + ((yearMin - (yearMin % 10)) + j*10).toString() + "s";}
	else if (j==(Math.ceil(yearMax/10)-Math.floor(yearMin/10) - 1)) {
		decText =  astchar2 + ((yearMax - (yearMax % 10))).toString() + "s";}
	else {
		decText = ((yearMin - (yearMin % 10)) + j*10).toString() + "s";
	}

	var AvgX = getAvg(lineData, j*10)[0];
	var AvgY = getAvg(lineData, j*10)[1];

	var shadow = shadowD.append("circle") 
				 .attr('class', 'dot')
				 .attr("cx",xScale(AvgX)+8)
                 .attr("cy", yScale(AvgY))
				 .attr('r', 4)
				 .style("fill", "../whale.png")
				//.style("fill", gradient(colorScale(col)));
	
	var decade = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x",xScale(AvgX)-38)
                 .attr("y", yScale(AvgY) + 5)
				 .text(decText);
	
	var astOutput = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x",0)
                 .attr("y", 632)
				 .text(astText);
	var astOutput2 = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x", 220)
                 .attr("y", 632)
				 .text(astText2);
				 
}}						
if(checkPath){
	//accessor function
	var line = d3.svg.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });
    
	
	var path = path1.append('path')
        .attr('class', 'line')
        .attr('d', line(lineData[0]))
		.attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .transition()
        .duration(time)
		.ease("linear")
		.delay(50)
        .attrTween('d', pathTween);

} else {
svg.selectAll("path")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                           .attr("stroke-width", 0)
                            .attr("fill", "none");
}

 } else if (compareNum ==2) {
 var ter = num[0];
  var map_t= map[num[0]];
  var lineData = tweenYear_p()[map[num[0]]];
  var lineData2 = tweenYear_p()[map[num[1]]];
  
  /*var lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                  { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                  { "x": 80,  "y": 5},  { "x": 100, "y": 60}];*/
				  
 
 //This is the accessor function we talked about above
 var lineFunction = d3.svg.line()
                          .x(function(d) { 
						  var teete = d.x;
						  
						  return xScale(d.x); })
                          .y(function(d) { return yScale(d.y); })
                         .interpolate("linear");



//The line SVG Path we draw
var lineGraph = path1.append("path").attr("id","p1");
var lineGraph2 = path1.append("path").attr("id","p2");
                           /* .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                           .attr("stroke-width", 2)
                            .attr("fill", "none");*/

if (checkDots)	{
var col = data[0].category;
var col2 = data[1].category;

	if (yearMin % 10 != 0) {
		var astchar = "*";
		var astText = "*Showing data from:" + yearMin.toString() + " to " + (Math.ceil(yearMin/10)*10).toString(); 
	}
	else {
		var astchar = "";
		var astText = "";
	}	
	
	if (yearMax % 10 !=  0) {
		var astchar2 = "*";
		var astText2 = "*Showing data from:" + ((Math.floor(yearMax/10))*10).toString() + " to " + yearMax.toString(); 
	}
	else {
		var astchar2 = ""; 
		var astText2 = ""; 
	}
for (j=0; j < (Math.ceil(yearMax/10)-Math.floor(yearMin/10)); j++) {
	if (j==0) {
		decText =  astchar + ((yearMin - (yearMin % 10)) + j*10).toString() + "s";}
	else if (j==(Math.ceil(yearMax/10)-Math.floor(yearMin/10) - 1)) {
		decText =  astchar2 + ((yearMax - (yearMax % 10))).toString() + "s";}
	else {
		decText = ((yearMin - (yearMin % 10)) + j*10).toString() + "s";
	}

	var AvgX = getAvg(lineData, j*10)[0];
	var AvgY = getAvg(lineData, j*10)[1];
	var AvgX2 = getAvg2(lineData2, j*10)[0];
	var AvgY2 = getAvg2(lineData2, j*10)[1];

	var shadow = shadowD.append("circle") 
				 .attr('class', 'dot')
				 .attr("cx",xScale(AvgX)+8)
                 .attr("cy", yScale(AvgY))
				 .attr('r', 4)
				 .style("fill", url("../whale.png"));
				//.style("fill", gradient(colorScale(col)));
	
	var decade = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x",xScale(AvgX)-38)
                 .attr("y", yScale(AvgY) + 5)
				 .text(decText);
	
	shadow = shadowD.append("circle") 
				 .attr('class', 'dot')
				 .attr("cx",xScale(AvgX2))
                 .attr("cy", yScale(AvgY2))
				 .attr('r', 4)
				 .style("fill", url("../whale.png"));
				 //.style("fill", gradient(colorScale(col2))); 
				 
	var decade2 = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x",xScale(AvgX2)-5)
                 .attr("y", yScale(AvgY2) + 5)
				 .text(decText);
				
	
 }
 
 	var astOutput = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x",0)
                 .attr("y", 632)
				 .text(astText);
	var astOutput2 = shadowD.append("svg:text")
				 .attr("font-size","2px")
				 .attr("x", 220)
                 .attr("y", 632)
				 .text(astText2);
	}
if(checkPath){
	
	var line = d3.svg.line()
		.x(function(d) { return xScale(d.x); })
		.y(function(d) { return yScale(d.y); });
		
	svg.selectAll("#p1")
							.attr('class', 'line')
                            .attr("stroke", "blue")
                            .attr("stroke-width", 2)
                            .attr("fill", "none")
							.attr('d', line(lineData[0]))
							.transition()
							.duration(time)
							.ease("linear")
							.delay(50)
							.attrTween('d', pathTween);
							
	svg.selectAll("#p2")
							.attr('class', 'line')
                            .attr("stroke", "red")
                            .attr("stroke-width", 2)
                            .attr("fill", "none")
							.attr('d', line(lineData2[0]))
							.transition()
							.duration(time)
							.ease("linear")
							.delay(50)
							.attrTween('d', pathTween2);

} else {
svg.selectAll("#p1")
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "blue")
                           .attr("stroke-width", 0)
                            .attr("fill", "none");
							
svg.selectAll("#p2")
                            .attr("d", lineFunction(lineData2))
                            .attr("stroke", "blue")
                           .attr("stroke-width", 0)
                            .attr("fill", "none");

}
 
 }
 
 var tres = "";
 
 

  // Positions the dots based on data.
  function position(dot)
  {
    dot .attr("cx", function(d) { 
	var ttt = xScale(x(d));
	return xScale(x(d)); })
        .attr("cy", function(d) { 
		var ttt = yScale(y(d));
		return yScale(y(d)); })
		.attr("r", function(d) { console.log(d);return (20); });
        //.attr("r", function(d) { return radiusScale(radius(d)); });
  }
  
  function position_t(text)
  {
    text.attr("dx", function(d) { 
	var ttt = xScale(x(d));
	return (xScale(x(d))-5); })
        .attr("dy", function(d) { 
		var ttt = yScale(y(d));
		return (yScale(y(d))+3); })
        //.attr("r", function(d) { return radiusScale(radius(d)); });
  }
  	//display path 1 one step at a time				
	function pathTween() {
        var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, lineData.length + 1));
        return function(t) {
            return line(lineData.slice(0, interpolate(t)));
        }
	}
	//display path 2 one step at a time 
	function pathTween2() {
        var interpolate = d3.scale.quantile()
                .domain([0,1])
                .range(d3.range(1, lineData2.length + 1));
        return function(t) {
            return line(lineData2.slice(0, interpolate(t)));
        }
	}
	
	function getAvg(lineData, start) {
		var endVal = Math.min((Math.floor(start/10)*10 +10), lineData.length);
		var total_x = 0;
		var total_y = 0;
		for (i = start; i < endVal; i++)
		{
			total_x += lineData[i].x;
			total_y += lineData[i].y; 
		}
		return [total_x/(endVal-start), total_y/(endVal-start)];
	}
	
	function getAvg2(lineData2, start) {
		var endVal = Math.min((Math.floor(start/10)*10 +10), lineData.length);
		var total_x = 0;
		var total_y = 0;
		for (q = start; q < endVal; q++)
		{
			total_x += lineData2[q].x;
			total_y += lineData2[q].y; 
		}
		return [total_x/(endVal-start), total_y/(endVal-start)];
	}

  // Defines a sort order so that the smallest dots are drawn on top.
  function order(a, b)
  {
    return radius(b) - radius(a);
  }

  // After the transition finishes, you can mouseover to change the year.
  function enableInteraction()
  {
    var box = label.node().getBBox();

    var yearScale = d3.scale.linear()
        .domain([yearMin, yearMax])
        .range([box.x + 10, box.x + box.width - 10])
        .clamp(true);

    svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove)
        .on("touchmove", mousemove);

		
    function mouseover()
    {
      label.classed("active", true);
    }

    function mouseout()
    {
      label.classed("active", false);
    }

    function mousemove()
    {
      displayYear(yearScale.invert(d3.mouse(this)[0]));
    }
  }

  // Tweens the entire chart by first tweening the year, and then the data.
  // For the interpolated data, the dots and label are redrawn.
  function tweenYear() {
    var year = d3.interpolateNumber(yearMin, yearMax);
    return function(t) { displayYear(year(t)); };
  }
  
  function tweenYear_p() {
	var res =[];
	var dic =[];
	
	for (var i = yearMin; i <= yearMax; i++) {
		var temp = interpolateData(i);
		for (j = 0; j<temp.length;j++){
			var name = temp[j].name;
			if(!(name in dic)){
				var xx = temp[j].x;
				var yx = temp[j].y;
				dic[name] = [];
				dic[name].push({
				"x" : xx,
				"y" : yx});
			} else {
				var xx = temp[j].x;
				var yx = temp[j].y;
				dic[name].push({
				"x" : xx,
				"y" : yx});
			
			}
			var fds ="";
		}
		//res.push(interpolateData(i));
	}
	
	
    
	return dic;
  }


  // Updates the display to show the specified year.
  function displayYear(year)
  {
	year = Math.floor(year);
    dot.data(interpolateData(year), key).call(position).sort(order);
	text.data(interpolateData(year), key).call(position_t).sort(order);
	dot.select("title")
      .text(function(d) { return d.name + ":\n\n" + xtitle + "=" + d.x + "\n" + ytitle + "=" + d.y });
    label.text(Math.round(year));
  }

  // Interpolates the dataset for the given (fractional) year.
  function interpolateData(year)
  {
    return data.map(function(d) {
	var test = d.size;
	var tests =""
      return {
        name: d.name,
        category: d.category,
        x: interpolateValues(d.x, year),
        size: interpolateValues(d.size, year),
        y: interpolateValues(d.y, year)
      };
    });
  }

  // Finds (and possibly interpolates) the value for the specified year.
  function interpolateValues(values, year) {
    var i = bisect.left(values, year, 0, values.length - 1),
        a = values[i];
    if (i > 0) {
      var b = values[i - 1],
          t = (year - a[0]) / (b[0] - a[0]);
      return a[1] * (1 - t) + b[1] * t;
    }
    return a[1];
  }


}

function init()
{

}

function init2()
{
    //setup the svg
	//yearMin=1940;
	//yearMax=2008;
	xMin=0.0;
	//xMax=50;
	yMin=0;
	//yMax=50;
	sizeMin=0.0;
	sizeMax=1.324655E9;
	xtitle = 'temperature (°C)';
	ytitle = 'total whale deaths'
	width = 800;
	height = 600
	title = 'Royal Ontario Museum - Whale Deaths in the Last Century';
	xaxisscale = 'Linear';
	yaxisscale = 'Linear';
	topMargin = 40;
	bottomMargin = 40;
	leftMargin = 140;
	rightMargin = 40;
	xFormat = ',d';
	yFormat = ',d';


  document.title = title;
  document.getElementById('titletext').innerHTML = title;
  
  var colorNum = -1;
  var colorwheel =
	  [ "red", "green", "blue",
	    "cyan", "yellow", "darkOrange",
	    "pink", "purple",
	    "color1", "color2", "color3"
	    ];
		
		

  // Various scales. These domains make assumptions of data, naturally.


  if (xaxisscale == "Linear")
  {
    xScale = d3.scale.linear().domain([xMin, xMax]).range([0, width]);
  }
  else if (xaxisscale == "Square Root")
  {
    xScale = d3.scale.sqrt().domain([xMin, xMax]).range([0, width]);
  }
  else
  {
    //xScale = d3.scale.sqrt().domain([xMin, xMax]).range([0, width]);
    xScale = d3.scale.log().domain([xMin, xMax]).range([0, width]);
  }



  if (yaxisscale == "Linear")
  {
    yScale = d3.scale.linear().domain([yMin, yMax]).range([height, 0]);
  }
  else if (yaxisscale == "Square Root")
  {
    yScale = d3.scale.sqrt().domain([yMin, yMax]).range([height, 0]);
  }
  else
  {
    yScale = d3.scale.log().domain([yMin, yMax]).range([height, 0]);
  }

	radiusScale = d3.scale.sqrt().domain([sizeMin, sizeMax]).range([20, 80]);
	colorScale = d3.scale.category20c();

// The x & y axes.
	xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(10, d3.format(xFormat));
	yAxis = d3.svg.axis().orient("left").scale(yScale).ticks(10, d3.format(yFormat));

//xAxis.append("g").attr("transform", "rotate(-90)")

// Create the SVG container and set the origin.
	svg = d3.select("#chart svg")
    .attr("width", width + leftMargin + rightMargin)
    .attr("height", height + topMargin + bottomMargin)
	.append("g")
    .attr("transform", "translate(" + leftMargin + "," + topMargin + ")");

// Add the x-axis.
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

// Add the y-axis.
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

// Add an x-axis label.
	svg.append("text")
	.style("font-size", "24px")
		.attr("class", "x label")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("y", height - 6)
		.text(xtitle);

// Add a y-axis label.
	svg.append("text")
	.style("font-size", "24px")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("y", 10)
		.attr("dy", ".75em")
		.attr("transform", "rotate(-90)")
		.text(ytitle);

  // Add the year label; the value is set on transition.
	  label = svg.append("text")
		.attr("class", "year label")
		.attr("text-anchor", "end")
		.attr("y", height - 30)
		.attr("x", width);
	


  //var colorwheel = d3.select("radialGradient").id()
  
  //make the bars
  
	var testtest = document.getElementById("textfield");

	bars(jsonData)

	
    //setup our ui
 /*
    d3.select("#data2")
        .on("click", function(d,i) {
            bars(data2)
        })   
    d3.select("#random")
        .on("click", function(d,i) {
            num = document.getElementById("num").value
            bars(random(num))
        })   

*/


}

function click1(){
		checkDots = false;
		checkPath = false;
		compareNum = 2;
		var x = document.getElementById("info");
	    var map = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","Z"];

		//select the sequence
		num = [];
	  
		
		var num1 = map.indexOf(x.elements[0].value);
		var num2 = map.indexOf(x.elements[1].value);
		checkPath = x.elements[2].checked;
		checkDots = x.elements[3].checked;
		num.push(num1);
		num.push(num2);
		var loadjson = seriesSelecton(jsonData, num);
		svg.selectAll("g.dots").remove();

			
        bars(loadjson)

}

function click4(){
		num = [];
		checkPath = false;
		checkDots = false;
		compareNum = 1;
		var x = document.getElementById("info2");

		//select the sequence

	 
		num.push(map.indexOf(x.elements[0].value));
		
		checkPath = x.elements[1].checked;
		checkDots = x.elements[2].checked;

		var loadjson = seriesSelecton(jsonData, num);

		
		svg.selectAll("g.dots").remove();
			
        bars(loadjson)

}





function click3(){

var x = document.getElementById("year");
if(x.elements[0].value !="" & x.elements[1].value !=""){
yearMin = parseInt(x.elements[0].value);
yearMax = parseInt(x.elements[1].value);
}

if(x.elements[2].value !="" & x.elements[3].value !=""){
xMax=parseInt(x.elements[2].value);
yMax=parseInt(x.elements[3].value);
}

document.getElementById("outputYear").innerHTML = "<p>Start Year: " + yearMin +"</br> <p> End Year: " +yearMax + "</br>Max X: " + xMax + "Max Y: " + yMax + " <br/><p>Leave Blank if you want to show all years,</br>refresh the page to select the year again.</br>The default value of max x and y is 50</br>You can leave Max X and Max Y for blank</p>";
	 init2();
}

function seriesSelecton(jsonData,num) {
		  var res = [];
		  if (num.length == 0){
			res = jsonData;
		  } else if (num.length == 1){
			res.push(jsonData[num[0]]);
		  } else{
			res.push(jsonData[num[0]]);
			res.push(jsonData[num[1]])
		  }
			return res;
		}

	
	function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16)
    var G = parseInt(color.substring(3,5),16)
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

	function gradient(baseColor)
	{
	  var gradientId = "gradient" + baseColor.substring(1)
	  console.log("COLOR: " + gradientId);

	  //var lightColor = shadeColor(baseColor, -10)
	  var darkColor = shadeColor(baseColor, -20) 
	  
	  var grad = d3.select("#gradients").selectAll("#" + gradientId)
		.data([ gradientId ])
		.enter()
		.append("radialGradient")
		.attr("id", gradientId)
		.attr("gradientUnits", "objectBoundingBox")
		.attr("fx", "30%")
		.attr("fy", "30%")

	  grad.append("stop")
		.attr("offset", "0%")
		.attr("style", "stop-color:#FFFFFF")
	  
	  // Middle
	  grad.append("stop")
		.attr("offset", "40%")
		.attr("style", "stop-color:" + baseColor)

	  // Outer Edges
	  grad.append("stop")
		.attr("offset", "100%")
		.attr("style", "stop-color:" + darkColor)
	  
	  console.log("url(#" + gradientId + ")")
	  return "url(#" + gradientId + ")";
	}

