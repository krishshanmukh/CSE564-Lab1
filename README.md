# CSE564-Lab1
Play around with d3 js - part of cse 564 visualization

## Requirements
Make a d3 visualization that supports the following
1. present a menu to allow users to select a variable and update chart
2. draw a bar chart if a categorical variable is selected
3. draw a histogram if a numerical variable is selected (bin it into a
fixed range (equi-width) of your choice)
4. on mouse-over display the value of the bar on top of the bar
5. on mouse-over also make the bar wider and higher to focus on it
6. mouse (with left mouse button down) move left (right) should
decrease (increase) bin width/size (for numerical variables only)

## To run
```
python -m http.server
```

## Data
[IBM HR Employee Attrition](https://www.kaggle.com/pavansubhasht/ibm-hr-analytics-attrition-dataset)