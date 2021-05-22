function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;

  //why line 61 when I get results printed to the console below here?

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    
    //console.log("in build charts....result: ")
    //console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    //BASIC VALUES

    otu_ids = result.otu_ids;
    otu_labels = result.otu_labels;
    sample_values = result.sample_values;

    // console.log(sample_values)

    //ADJUSTED VALUES
    //Use slice(), map(), reverse() to retrieve the top 10 otu_ids and sort them in descending order.

    var Chart_otu_ids = otu_ids.slice(0,10).map(x => "OTU " + x).reverse();
    // var Chart_otu_ids = otu_ids.reverse().slice(0,10).map(x => "OTU " + x);

    // console.log(Chart_otu_ids);

    var Chart_otu_labels = otu_labels.slice(0,10).reverse();
    // var Chart_otu_labels = otu_labels.reverse().slice(0,10);
    
    // console.log(Chart_otu_labels);

    var Chart_sample_values = sample_values.slice(0,10).reverse();
    //var Chart_sample_values = sample_values.reverse().slice(0,10);
    //var Chart_sample_values = sample_values.slice(0,10);
    //console.log(Chart_sample_values);


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 


    // var yticks = otu_ids.slice(0,10).reverse.map(otu_ids);
    //var yticks = otu_ids.slice(0,10).reverse();
    //var yticks = Chart_otu_ids;
    
    //console.log(yticks);


    // 8. Create the trace for the bar chart. 

    var barData = {
      x: Chart_sample_values, 
      y: Chart_otu_ids,
      // yticks: yticks,
      type: "bar",
      hovertext: Chart_otu_labels,
    };

    console.log("bar data")
    console.log(barData)

//sample_values:  values, the otu_ids: labels, otu_labels: hover text for the bars on the chart.
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top Ten Bacteria Cultures Found',
      barmode: 'stack',
      orientation: 'h',
    };
    // 10. Use Plotly to plot the data with the layout. 
    
    Plotly.newPlot('bar', barData, barLayout);
    //Plotly.restyle('bar', barData, barLayout);

    // Ploty.restyle will update traces objects.
    // Plotly.relayout will update layout objects.

    //Plotly.redraw?

    //example: Plotly.newPlot(graphDiv, data, layout, config)
    //example: (defaults to {data: [], layout: {}, config: {}, frames: []})

})};



