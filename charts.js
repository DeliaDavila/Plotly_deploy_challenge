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

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    
    // console.log("in build charts....result: ")
    // console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    // otu_ids = result.otu_ids;
    // otu_labels = result.otu_labels;
    // sample_values = result.sample_values;

    //changing to JS case
    otuIds = result.otu_ids;
    otuLabels = result.otu_labels;
    sampleValues = result.sample_values;


    //ADJUSTED VALUES
    //Use slice(), map(), reverse() to retrieve the top 10 otu_ids and sort them in descending order.

    //1.IDs / y axis:

    //var Chart_otu_ids = otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse();
    var topTenIds = otuIds.slice(0, 10).map(x => `OTU ${x}`).reverse();
    // console.log(topTen_otu_ids);

    //hover text:

    //var Chart_otu_labels = otu_labels.slice(0,10).reverse();
    var topTenLabels = otuLabels.slice(0,10).reverse();
    // console.log(topTen_otu_labels);

    //var Chart_sample_values = sample_values.slice(0,10).reverse(); 
    var topTenSampleValues = sampleValues.slice(0,10).reverse();
    // console.log(Chart_sample_values);


    // 7. Create the yticks for the bar chart.
    // Hint: map top 10 otu_ids in descending order: otu_ids with the most bacteria are last. 

    // var yticks = otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse();
    //Why necessary? It's the same as topTen otu ids.
    var yticks = topTenIds;

    // 8. Create the trace for the bar chart. 

    var barTrace = {
      x: topTenSampleValues,
      y: topTenIds,
      yticks: yticks,
      type: "bar",
      orientation: 'h',
      hovertext: topTenLabels,
    };

    var barData = [barTrace];

    // console.log("bar data")
    // console.log(barData)

//sample_values:  values, the otu_ids: labels, otu_labels: hover text for the bars on the chart.
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: 'Top Ten Bacteria Cultures Found',
    };
    // 10. Use Plotly to plot the data with the layout. 
    
    Plotly.newPlot("bar", barData, barLayout);




//bubble chart
    // To create the trace object for the bubble chart in Step 1, 
    // assign the otu_ids, sample_values, and otu_labels to the x, y, and text properties, respectively.
    //  For the mode and marker properties, the mode is "markers" and the 
    //  marker property is a dictionary that defines the size, color, and colorscale of the markers.

        //variables
        // otuIds = result.otu_ids;
        // otuLabels = result.otu_labels;
        // sampleValues = result.sample_values;

    // HINT: trace object for bubble chart 
    // Using d3.select(), select the element that has changed and 
    // retrieve the property and HTML id that have changed

    // 1. Create the trace for the bubble chart. Trying [{}] to skip step of trace then data=trace
    var bubbleTrace = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        //colors don't match the example
        color: otuIds,
        colorscale: otuIds,
             //top ten makes them all gray
             // color: topTenIds,
             // colorscale: topTenIds,
        //color: otuIds.reverse(),
        //colorscale: ,
      },
    };

    var bubbleData = [bubbleTrace];

    // Sets the otu_ids as the x-axis values
    // Sets the sample_values as the y-axis values
    // Sets the otu_labels as the hover-text values
    // Sets the sample_values as the marker size
    // Sets the otu_ids as the marker colors





    // To create the layout for the bubble chart in Step 2, add a title, a label for the x-axis, margins, 
    // and the hovermode property. 
    // The hovermode should show the text of the bubble on the chart when you hover near that bubble.

    // Creates a title
    // Creates a label for the x-axis
    // The text for a bubble is shown when hovered over

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      // xaxis.title: "IDs", //broke the page
      //xaxis: "IDs", //didn't load bublle
      xaxis: otuIds,
          // x axis formatting? Ah. They appear on hover

      hoverlabel: otuLabels,
      
    };

    // 3. Use Plotly to plot the data with the layout.
 
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    

})};








