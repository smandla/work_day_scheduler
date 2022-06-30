// console.log(data);
console.log("hello!");
var formattedDate = moment().format("dddd, MMMM DD, YYYY");
console.log(formattedDate);
var container = $(".container");
var currentDay = $("#currentDay");
var section = $("<section>");
var data;
var uData;
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
  if (JSON.parse(localStorage.getItem("work_day_scheduler"))) {
    data = JSON.parse(localStorage.getItem("work_day_scheduler"));
  } else {
    data = time_blocks;
  }
  // data = JSON.parse(localStorage.getItem("work_day_scheduler")) || time_blocks;
  // console.log(time_blocks[i].time, data);
  console.log(data);
  uData = data;
  console.log(uData);

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

    if (data) {
      if (data[i].note) {
        textarea.text(data[i].note);
      }
    }

    var button = $("<button>")
      .addClass("col-1 saveBtn")
      .appendTo(div)
      .attr("id", i)
      .on("click", function (e) {
        e.preventDefault();
        uData[i].note = $("#time_id_" + i).val();

        console.log($("#time_id_" + i).val());

        console.log(time_blocks);

        localStorage.setItem(
          time_blocks[i].time,
          JSON.stringify(time_blocks[i].note)
        );

        var newData = saveTask(i, uData[i].note);
        console.log(newData);
        localStorage.setItem("work_day_scheduler", JSON.stringify(newData));
      });
    var iEL = $("<i>").addClass("fas fa-save").appendTo(button);
  }

  section.appendTo(container);
}

const saveTask = (i, note) => {
  const updatedData = uData.map((obj, index) => {
    if (index === i) {
      console.log(i, index);
      return { ...obj, note: note };
    }

    return obj;
  });
  return updatedData;
};

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
// localStorage.removeItem("work_day_scheduler");
