// Building a funtion

function buildMetadata(sample) {

    // Populating metadata for 1 sample
    d3.json("samples.json")
        .then((data) => {
            console.log(data);

            var metadata = data.metadata;
            console.log(metadata);

            //filter the metadata for single sample
            var sampleArray = metadata.filter(sampleMetaData => sampleMetaData.id == sample);
            console.log(sampleArray);

            var sample940 = sampleArray[0];
            console.log(sample940);

            var washFreq = sample940.wfreq;
            console.log(washFreq);

            // build gauge
            var gaugeData = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: washFreq,
                  title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
                  type: "indicator",
                  mode: "gauge+number",
                  gauge: { axis: { range: [null, 9] } }
                }
              ];
              
              var gaugeLayout = { width: 600, height: 400 };
              Plotly.newPlot('gauge', gaugeData, gaugeLayout);


            var panel = d3.select("#sample-metadata");

            // clear panel before loading the metadata
            panel.html("");

            //  use object entries to access key value pairs
            // use chain technique to add text to the h5 tag for each key value pair
            Object.entries(sample940).forEach(([key, value]) => {
                panel.append("h5").text(`${key.toUpperCase()}: ${value}`);

            });
        });
}

function buildCharts(sample) {
    d3.json("samples.json")
        .then((data) => {
            // console.log(data);

            var samples = data.samples;
            console.log(samples);

            var sampleArray = samples.filter(sampleMetaData => sampleMetaData.id == sample);
            console.log(sampleArray);

            var sample940 = sampleArray[0];
            console.log(sample940);

            // parse data out to variables
            /*
            * Use `sample_values` as the values for the bar chart.
            * Use `otu_ids` as the labels for the bar chart.
            * Use `otu_labels` as the hovertext for the chart.
            */

            var sample_values = sample940.sample_values;
            console.log(sample_values);

            var otu_ids = sample940.otu_ids;
            console.log(otu_ids);

            var otu_labels = sample940.otu_labels;
            console.log(otu_labels);

            // Build horizontal bar chart
            // Using slice to get the top 10 bacterias

            // use map function to iterate over each of the top 10 and create a string with OTUid.
            var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

            var barData = [{
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"

            }];

            var barLayout = {
                title: "Top 10 Bacteria Cultures Found",
                margin: {
                    t: 30,
                    r: 0,
                    b: 20,
                    l: 70
                }
            }


            Plotly.newPlot("bar", barData, barLayout);

            // Build bubble chart

            var bubbleData = [{
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }];

            var bubbleLayout = {
                title: "Bacteria Cultures per Sampls",
                margin: {
                    t: 30,
                    r: 10,
                    b: 40,
                    l: 60
                },
                hovermode: "closest",
                xaxis: { title: "OTU ID" }
            };

            Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        });  // This is the end of my data access
}

function init() {
    var pulldownMenu = d3.select("#selDataset");

    d3.json("samples.json")
        .then((data) => {

            var names = data.names;
            console.log(data.names);

            names.forEach((sample) => {
                pulldownMenu
                    .append("option")
                    .property("value", sample)
                    .text(sample);
            });
        });  // This is the end of my data access

    buildMetadata(940);
    buildCharts(940);
}

function optionChanged(nextSample){
    buildMetadata(nextSample);
    buildCharts(nextSample);
}

init();

