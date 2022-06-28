var container = $(".container");
var currentDay = $("#currentDay");
var section = $("<section>");
var formattedDate = moment().format("MMMM DD, YYYY");

//9 - 5 object
var time_blocks = [
  { time: "9:00", am: true, digit: 9, note: "" },
  { time: "10:00", am: true, digit: 10, note: "" },
  { time: "11:00", am: true, digit: 11, note: "" },
  { time: "12:00", am: false, digit: 12, note: "" },
  { time: "1:00", am: false, digit: 1, note: "" },
  { time: "2:00", am: false, digit: 2, note: "" },
  { time: "3:00", am: false, digit: 3, note: "" },
  { time: "4:00", am: false, digit: 4, note: "" },
  { time: "5:00", am: false, digit: 5, note: "" },
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
  console.log(time_blocks.length);
  for (let i = 0; i < time_blocks.length; i++) {
    console.log(time_blocks[i].time);
    var div = $("<div>")
      .addClass("row time-block")
      .attr("id", i)
      .appendTo(section);
    var span = $("<span>")
      .addClass("col-2 hour")
      .text(time_blocks[i].time)
      .appendTo(div);
    var textarea = $("<textarea>").addClass("col-8").appendTo(div);
    var button = $("<button>").addClass("col-1 saveBtn").appendTo(div);
  }
  section.appendTo(container);
}
init();
