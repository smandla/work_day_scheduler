var data = JSON.parse(localStorage.getItem("work_dayschedule"));
// console.log(data);
console.log("hello!");
var formattedDate = moment().format("MMMM DD, YYYY");
console.log(formattedDate);
var container = $(".container");
var currentDay = $("#currentDay");
var section = $("<section>");

var hour = moment().hour();
//9 - 5 object
var time_blocks = [
  { time: "9:00", am: true, digit: 9, note: "" },
  { time: "10:00", am: true, digit: 10, note: "" },
  { time: "11:00", am: true, digit: 11, note: "" },
  { time: "12:00", am: false, digit: 12, note: "" },
  { time: "1:00", am: false, digit: 13, note: "" },
  { time: "2:00", am: false, digit: 14, note: "" },
  { time: "3:00", am: false, digit: 15, note: "" },
  { time: "4:00", am: false, digit: 16, note: "" },
  { time: "5:00", am: false, digit: 17, note: "" },
];

function init() {
  currentDay.text(formattedDate);

  //show one row of the time blocks with 3 columns
  /**
     *  <div class="row time-block">
          <span class="col-2 hour">12:00</span>
          <textarea class="col-8"></textarea>
          <button class="col-1 saveBtn"></button>
        </div>
     */
  displayTimeBlocks();
}

function displayTimeBlocks() {
  // console.log(time_blocks.length);
  for (let i = 0; i < time_blocks.length; i++) {
    // console.log(time_blocks[i].time);
    var digit = time_blocks[i].digit;
    var div = $("<div>")
      .addClass("row time-block")
      .attr("id", i)
      .appendTo(section);
    var span = $("<span>")
      .addClass("col-2 hour")
      .text(time_blocks[i].time)
      .appendTo(div);
    var textarea = $("<textarea>")
      .attr("id", "time_id_" + i)
      .addClass("col-8")
      .appendTo(div);
    changeBackgroundColor(textarea, digit);
    if (data[i].note) {
      textarea.text(data[i].note);
    }
    var button = $("<button>")
      .addClass("col-1 saveBtn")
      .appendTo(div)
      .attr("id", i)
      .on("click", function (e) {
        e.preventDefault();
        time_blocks[i].note = $("#time_id_" + i).val();
        // console.log(localStorage.getItem("wo"))
        console.log(time_blocks);
        localStorage.setItem("work_dayschedule", JSON.stringify(time_blocks));
      });
    var iEL = $("<i>").addClass("fas fa-save").appendTo(button);
  }
  section.appendTo(container);
}
// // const saveBlock = (i) => {
// //   // console.log("hello");?
// //   // console.log(textarea[0].id);
// //   let id = i;
// //   console.log(id);

// //   console.log($("#time_id_" + id));
// //   // time_blocks[i].note = $("#" + id).val();
// //   console.log(time_blocks);
// // };
const changeBackgroundColor = (textarea, digit) => {
  // console.log(hour, digit);
  if (hour === digit) {
    textarea.addClass("present");
  } else if (digit < hour) {
    textarea.addClass("past");
  } else {
    textarea.addClass("future");
  }
};
init();
// // localStorage.removeItem("work_dayschedule", 0);
