# bellybutton_dashboard
https://nithiyasuresh.github.io/bellybutton_dashboard/

In this assignment, I was asked to create a webpage, and to display bar chart, bubble chart and the gauge based on the information we ask for from the demographic id we select.
1. I created the webpage, so all my development work starts publishing on the page, and updated the index.html with my webpage details to publish my data.
2. First step was to read the sample.json file, to read the data in the file.  Because we need to repeatedly read the data from the sample.json, i created a function to read the data, while also declaring variables to get the metadata, names and samples.
3. Next, i created another function for the charts, and declared variables in it to read the samples data - as the requirement was to use sample_values, otu_ids, otu_labels for the data displayed in the graph. 
      i. Finally we declared the data's x axis, y axis, text -using slice method, type and orientation.
      ii. We also declared the layout with the title and margin details.
      iii.  Finally we use plotly to display the graph.
4. Similarly, i created bubble chart, except this time i used the names to derive the chart.
5. Next step was to get the pull down menu working - for which i used the D3.select, as I declared the variable, I also used forEach - so each time an ID is selected, the charts are appended according to the relevant data.
6. Last step was to get the gauge chart appear on the webpage. I used the plotly reference page to get an example of the gauge I wanted to display and got the sample code from the page and amended as per my requirement.
7. I also created an empty panel.html(""), so then the page clears each time i try to load data.



