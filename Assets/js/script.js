var container = $(".container");
var currentDay = $("#currentDay");
var formattedDate = moment().format("MMMM DD, YYYY");
function init() {
  currentDay.text("Today's Date: " + formattedDate);
}
init();
