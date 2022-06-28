var container = $(".container");
var currentDay = $("#currentDay");
var section = $("<section>");
var formattedDate = moment().format("MMMM DD, YYYY");
function init() {
  currentDay.text("Today's Date: " + formattedDate);

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
  for (let i = 0; i < 3; i++) {
    var div = $("<div>")
      .addClass("row time-block")
      .attr("id", i)
      .appendTo(section);
    var span = $("<span>").addClass("col-2 hour").text("time").appendTo(div);
    var textarea = $("<textarea>").addClass("col-8").appendTo(div);
    var button = $("<button>").addClass("col-1 saveBtn").appendTo(div);
  }
  section.appendTo(container);
}
init();
