/*Create the base chart*/
var canvas_width, canvas_height 
var round = Math.round()

function returnRound(num){

	num = Math.round(num)

	return num
}

/*Function to draw the canvas*/
function createCanvas(width, height){
	canvas_width = width
	canvas_height = height

	var canvas = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("class", "canvas")

	canvas.append("text")
			.attr("x", canvas_width / 5)
			.attr("y", 40)
			.text("Expected Contribution for this month VS Actual")
	
}

var dropDownDiv = d3.select("body").append("div")
						.attr("class", "dropDownDiv")
						.classed("dropDownDiv", true)

var select = dropDownDiv.append("select")
						.attr("class", "select")
						


var buttonDiv = d3.select("body").append("div")
				.attr("class", "buttonGroup")


var colourScale = d3.scaleLinear()

function sortAscending(arr, val){
	arr.sort(function(x, y){
		return (d3.ascending(x.val, y.val))
	})
}

function createLegends(){

	var legendContainer = d3.select(".canvas").selectAll(".legend")
				.append("g")
				.attr("class", "expected_legend")

	var legend_expected = legendContainer.data(data_arr)
					.enter()

					colourScale.domain(d3.max(data_arr, function(d){return d.value}))
								.range(["#fee0d2","#de2d26"])

	var legend_actual = legendContainer.data(data_arr)
					.enter()

		
	legend_expected.append("rect")
		.attr("class", "legendrect")
		.attr("x", function(d, i){return i * 25})
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill", function(d){return colourScale(d.value)})
		.attr("transform", "translate(600, 80)")

		colourScale.domain(d3.max(data_arr, function(d){return d.value}))
								.range(["#edf8b1","#2c7fb8"])

	legend_actual.append("rect")
		.attr("class", "legendrect_acc")
		.attr("x", function(d, i){return i * 25})
		.attr("width", 20)
		.attr("height", 15)
		.attr("fill", function(d){return colourScale(d.value)})
		.attr("transform", "translate(600, 140)")

	console.log("test")


}

var selected_val; 
var month;
var new_arr  = [];

function drawUpdatedPlots(){

	data_arr = [20, 50, 455, 654, 45]

	/*Getting the max and minimum values of domain*/
	var maxDomain = d3.max(data_arr, function(d){return d})
	var minDomain = d3.min(data_arr, function(d){return d})

	/*Colour Scale*/
							colourScale.domain([minDomain, maxDomain])
							.range(["#edf8b1","#2c7fb8"])

	var circle = d3.select(".canvas").selectAll(".circleGroup2")

			.data(data_arr)
			.enter()
				.append("g")
				.attr("class", "circleGroup2")

				circle.append("circle")
				.transition().duration(1200)
				.attr("cx", function(d, i){return (i+1.5) * 80})
				.attr("cy", function(d){return yScale(d)})
				.attr("fill", function(d){return colourScale(d)})
				.attr("r", 30)


					circle.append("text").text(function(d){return d})
					.transition().duration(1200)
			.attr("x", function(d, i){return ((i+1.5)  * 80) - 20})
			.attr("y", function(d){return yScale(d)})

}


function createButtons(){

	dropDownDiv.append("div").text("Enter Contribution (\u00a3): ")

	var options = select.selectAll("option")
							.data(data_arr)
							.enter()
								.append("option")
								.property("selected", function(d){ return "hello" })
								.text(function(d){return d.family_member;})


	//Below is how you get the value of what option is selected
	console.log(d3.select('select').property('value'))
	console.log(data_arr)


	buttonDiv.append("input")
				.attr("type", "text")
				.attr("id", "valueInput")


	buttonDiv.append("button")
				.attr("width", 50)
				.attr("height", 50)
				.attr("id", "btn")
				.text("Submit")
				

}

function onClick(){
	d3.select('#btn').on("click", function(d){
		alert("Value Updated!")
	})
}




var chart_height
/*Function to draw the chart*/
function drawChart(){

	chart_height = returnRound(canvas_height - 200)
	var chart_width = returnRound(canvas_width - 150)

	
	var chart = d3.select(".canvas").append("g")
					.attr("class", "chart")
					.attr("height", chart_height)
					.attr("width", chart_width)


			d3.select(".canvas").attr("transform", "translate(130, 100)")

						var chart_title = d3.select(".chart")
						.append("title")
							.text("fdsfdfds")
							.attr("fill", "black")
							.attr("transform", "translate(50, 50)")

	chart.attr("transform, translate(50, 50)")

	var yLabel = d3.select(".canvas").append("text")
		.attr("class", "yLabel")
		.attr("text-anchor", "end")
		.attr("y", canvas_width / 50)
		.attr("dy", ".5em")
		.attr("transform", "rotate(-90)")
		.text("Contribution to bills")

}
var xScale = d3.scaleLinear()
var yScale = d3.scaleLinear()
/*Maximum and mininum domains depend on the highest/lowest contributions*/
function drawAxis(max_domain, min_domain){
	
	var widthScale = d3.scaleLinear()
					.domain([0, 200])
					.range([0, canvas_width]);

	
					xScale.domain(0, 900)
					.range([0, canvas_width / 2])

	
				yScale.domain([1000, 0])
				.range([50, canvas_height / 2.31]);


	var yAxis = d3.axisLeft().scale(yScale);

	var xAxis = d3.axisBottom()
				.scale(xScale)

	var xAxis = d3.axisBottom().scale(xScale).ticks(7);


	d3.select(".canvas").append("g")
		.call(yAxis)
		.attr("transform", "translate(50, 0)");

	d3.select(".canvas").append("g")
		.call(xAxis)
		.attr("transform", "translate(50, " +  canvas_height / 2.31  + ")");

}

createCanvas(1000, 900)
drawChart(250, 250)
drawAxis()

console.log(canvas_height)

var data_arr = []

function loadData(data){

	d3.csv(data, function(d){
		d.forEach(function (g){
			data_arr.push(g)
			month = g.month;
		})

		drawBubbles();

		createButtons()
		createLegends()
		onClick()
	})
}


loadData("bills.csv");

console.log(data_arr)

function maxContribution(arr){
	var temp = 0;
	var max = 0;

	for(var i = 0; i < arr.length; i++){
		if(arr[i] < arr[i+1]){
			max = arr[i + 1]
		}
	}

	console.log(max)

	return max

	/*Loop through array of contributions*/

	/*Subtract the largest bill from*/

	/*Return the maximum number in the array*/

	/**/
}

function minContribution(){
	/*Same as maxContribution*/
}

function deficit(){
	/*Obtain the total value of bills required to pay off this month*/

	/*If monthly bills is lower than expected value return false*/

	/*Draw a red chart to empthasise in negative*/

	/*return boolean value*/
}

/*Obtain crucialness*/

function inputContribution(){
	/*This function will contain logic that will allow family members to enter how much they have contributed this month*/

	/*1. Allow them to select which member to add contribution (thresholds)
		- Senna 900
		- PJ 550
		- MAE 700ish
		- MUM 200
		- MOET 0 
		- ASIYAS 0

		Text box with a button to subit will be helpful
			- if family member submits types amount below threshhold
					- highlight text red

			- if family member submits > threshold
					- highlight text green*/

	/*2. 

		updateChart with contribution updated

	*/
}

/**/


function drawBubbles(){

	/*Getting the max and minimum values of domain*/
	var maxDomain = d3.max(data_arr, function(d){return d.value})
	var minDomain = d3.min(data_arr, function(d){return d.value})

	/*Colour Scale*/
							colourScale.domain([minDomain, maxDomain])
							.range(["#fee0d2","#de2d26"])

	var circle = d3.select(".canvas").selectAll("circle")

			.data(data_arr)
			.enter()
				.append("g")
				.attr("class", "circleGroup")

				circle.append("circle")
				.transition().duration(1200)
				.attr("cx", function(d, i){return (i+1.5) * 80})
				.attr("cy", function(d){return yScale(d.value)})
				.attr("fill", function(d){return colourScale(d.value)})
				.attr("r", 30)


					circle.append("text").text(function(d){return d.family_member})
					.transition().duration(1200)
			.attr("x", function(d, i){return ((i+1.5)  * 80) - 20})
			.attr("y", function(d){return yScale(d.value)})



}

drawBubbles()

function onChange(){
	

	selected_val = d3.select("select").property('value')
	val_input = d3.select("#valueInput").property("value")
	console.log(val_input)
	var test = (Number(val_input))


	if(val_input == "" || isNaN(val_input)){
		console.log(val_input)
		alert("Please enter a number!")
	}else{
		/*Before pushing check if family member has already added their progress, if so update their value*/
		console.log(selected_val)
		new_arr.forEach(function(d){
			console.log(d)

		/*	if(d.family_member == selected_val){
				console.log("TRUEUEUEUEUEUEU")
			}*/
		})
		new_arr.push({"family_member": selected_val, "value": Number(val_input), "month": month})
		new_arr.forEach(function(d){
			console.log(d.family_member)
		})

		alert("Value updated")
		/*new_arr.forEach(function(d){

			console.log(d)
			if(d.family_member == selected_val){
				d.value = Number(val_input)
			}else{
				new_arr.push({"family_member": selected_val, "value": Number(val_input), "month": month})
			}
		})*/
		
	}

	console.log(new_arr)

	/*push results to array*/
	
	

}


