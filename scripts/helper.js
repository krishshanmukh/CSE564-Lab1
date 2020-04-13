
function freq(arr) {
    var a = [], b = [], prev, data = [];

    arr.sort();
    console.log(arr);
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    for ( var i = 0; i < a.length; i++ ) {
        data.push({"x": a[i], "y": b[i]});
    }

    return data;
}


function updateBarChart(data, nBin, title) {

    document.getElementById("my_dataviz").innerHTML = ""

    console.log(data)
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = 800 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    
    // set the parameters for the histogram
    // A function that builds the graph for a specific value of bin
    // X axis: scale and draw:
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.x; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("transform", "translate(0,5)")
        .style("text-anchor", "middle");

    // Y axis: initialization
    var y = d3.scaleLinear()
        .range([height, 0]);
    var yAxis = svg.append("g")

    // Y axis: update now that we know the domain
    y.domain([0, d3.max(data, function(d) { return d.y; })]);   
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y))
    
    // Add X axis label:
    svg.append("text")
        .attr('x', width / 2)
        .attr('y', height + margin.top/2)
        .attr('text-anchor', 'middle')
        .style("font-size", "20px")
        .text(col);

    // Y axis label:
    svg.append("text")
        .attr('x', -(height / 2))
        .attr('y', - margin.top / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .style("font-size", "20px")
        .text("Frequency")
    
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -30)
        .attr('text-anchor', 'middle')
        .style("font-size", "34px")
        .text(title)

    // Bars
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("width", x.bandwidth())
        .attr("fill", "orange")
        // no bar at the beginning thus:
        .attr("height", function(d) { return height - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) { return y(d.y); })
        .attr("height", function(d) { return height - y(d.y); })
        .delay(function(d,i){console.log(i) ; return(i*100)})
    
    var tool_tip = d3.tip()
                .attr("class", "d3-tip")
                .offset([-8, 0])
                .html(function(d) { return  d.y; });
                d3.selectAll("svg").call(tool_tip);
    
    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        d3.select(this).style("fill", "orangered")
        tool_tip.show(d)
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        tool_tip.hide(d)
        d3.select(this).style("fill", "orange")
    }

    // Manage the existing bars and eventually the new ones:
    svg.selectAll("rect")
        // Show tooltip on hover
        .on("mouseover", showTooltip )
        // .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip )

    console.log(data)
}