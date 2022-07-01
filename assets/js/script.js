//formatted date using moment
console.log(moment());
var formattedDate = moment().format("dddd, MMMM DD, YYYY");
var hour = moment().hour();
console.log(hour);
//grab tags from html
var container = $(".container");
var currentDay = $("#currentDay");
var section = $("<section>");

var data;
var uData;

//an array of objects that holds the info and time for each time block
var time_blocks = [
  { time: "9:00", digit: 9, note: "" },
  { time: "10:00", digit: 10, note: "" },
  { time: "11:00", digit: 11, note: "" },
  { time: "12:00", digit: 12, note: "" },
  { time: "1:00", digit: 13, note: "" },
  { time: "2:00", digit: 14, note: "" },
  { time: "3:00", digit: 15, note: "" },
  { time: "4:00", digit: 16, note: "" },
  { time: "5:00", digit: 17, note: "" },
];

/**
 * Function that runs when the page is loaded.
 */
function init() {
  //display current date
  currentDay.text(formattedDate);
  //grab data from local storage or create an empty dataset
  if (JSON.parse(localStorage.getItem("work_day_scheduler"))) {
    data = JSON.parse(localStorage.getItem("work_day_scheduler"));
  } else {
    data = time_blocks;
  }

  //copy data to uData
  uData = data;

  //call the function to display time blocks
  displayTimeBlocks();
}

/**
 * Function to display time blocks
 */
function displayTimeBlocks() {
  //loop through for loop to create the time blocks
  for (let i = 0; i < time_blocks.length; i++) {
    //grab the digit version of the time for bg
    var digit = time_blocks[i].digit;
    //create a div tag with a class and id
    var div = $("<div>")
      .addClass("row time-block")
      .attr("id", i)
      .appendTo(section);

    //create a span tag with a class and text of time
    var span = $("<span>")
      .addClass("col-2 hour")
      .text(time_blocks[i].time)
      .appendTo(div);
    //create a text area for user input with a class and unique id
    var textarea = $("<textarea>")
      .attr("id", "time_id_" + i)
      .addClass("col-8")
      .appendTo(div);

    //call function to change background color
    changeBackgroundColor(textarea, digit);

    //if there is data in local storage, data will stay on page on refresh
    if (data) {
      //if the data at this current index doesn't have an empty string for a note
      if (data[i].note) {
        textarea.text(data[i].note);
      }
    }

    //create a button with a class and unique id
    var button = $("<button>")
      .addClass("col-1 saveBtn")
      .appendTo(div)
      .attr("id", i)
      //when the button is clicked, data inside the textarea is saved inside local storage
      .on("click", function (e) {
        e.preventDefault();
        //adds textarea val to data object for local storage
        uData[i].note = $("#time_id_" + i).val();

        //only updates the the specific note at the specific index, so previous data doesn't get erased
        var newData = saveTask(i, uData[i].note);

        //sets local storage with the new data stringified
        localStorage.setItem("work_day_scheduler", JSON.stringify(newData));
      });
    //create that save icon for the button
    var iEL = $("<i>").addClass("fas fa-save").appendTo(button);
  }
  //add each time block section to the entire container
  section.appendTo(container);
}

/**
 * Function that takes in two arguments (i, note)
 * to update the data only by its id and not the entire object
 */
const saveTask = (i, note) => {
  // map() loops through the data
  const updatedData = uData.map((obj, index) => {
    //compare the current index with the i index from the onclick
    if (index === i) {
      //update the note at that obj[i]
      return { ...obj, note: note };
    }
    //return the updated obj[i]
    return obj;
  });
  //return the updated data
  return updatedData;
};

/**
 * Function that changes the backround color to all the text area blocks
 */
const changeBackgroundColor = (textarea, digit) => {
  if (hour === digit) {
    textarea.addClass("present");
  } else if (digit < hour) {
    textarea.addClass("past");
  } else {
    textarea.addClass("future");
  }
};
//calls the init function that starts off the script
init();
