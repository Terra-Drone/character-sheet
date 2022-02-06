//STAT DISTRIBUTION

//>>STR
$("#str").change(function() {
  //LIMIT
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#str").val(val);
  }
  console.log("STR="+val);

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modStr').html("+"+mod); }
  else { $('.modStr').html(mod); }
});

//>>DEX
$("#dex").change(function() {
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#dex").val(val);
  }
  console.log("DEX="+val);

  //update chart
  myChart.config.data.datasets[0].data[1] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modDex').html("+"+mod); }
  else { $('.modDex').html(mod); }
});

//>>STA
$("#sta").change(function() {
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#sta").val(val);
  }
  console.log("STA="+val);

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modSta').html("+"+mod); }
  else { $('.modSta').html(mod); }
});

//>>INT
$("#int").change(function() {
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#int").val(val);
  }
  console.log("INT="+val);

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modInt').html("+"+mod); }
  else { $('.modInt').html(mod); }
});

//>>WIS
$("#wis").change(function () {
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#wis").val(val);
  }
  console.log("WIS="+val);

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modWis').html("+"+mod); }
  else { $('.modWis').html(mod); }
});

//>>CHA
$("#cha").change(function () {
  var val = parseInt(this.value)
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#cha").val(val);
  }
  console.log("CHA="+val);

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();

  //calculate modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modCha').html("+"+mod); }
  else { $('.modCha').html(mod); }
});


//format options for Flaws
function formatOption(option){
  var $option = $(
    "<div><strong>"+option.text+"</strong></div><div>"+option.title+"</div>"
  );
  return $option;
}

//bond options
var bonds={
  option1: {text: 'Parent'},
  option2: {text: 'Sibling'},
  option3: {text: 'Relative'},
  option4: {text: 'Partner'},
  option5: {text: 'Friend'},
  option6: {text: 'Rival'},
  option7: {text: 'Enemy'},
  option8: {text: 'Superior'},
  option9: {text: 'Understudy'}
}

//onload
$(document).ready(function() {
  //calc stats-get all elements
  $(".statNum").each(function(){
    $(this).change(function(){
      calcpoints();
    });
  });

  //Select2 setting
  $('select').select2({
    dropdownAutoWidth: true });

  $('.flaws').select2({
    dropdownAutoWidth: true,
    height: 'auto',
    multiple: true,
    maximumSelectionLength: 4,
    allowClear: true,
    templateResult: formatOption,
  });
  //repeat bond options for bond selects
  $.each(bonds, function(i, bondOpt){
    $('.bonds').append($('<option>', {
      text: bondOpt.text
    }));
  });

})

//calc stat

function calcpoints(){
  var points = 75;
  $(".statNum").each(function(){
    points -= parseInt(this.value);
    if (points < 0){
      $("#alert").show();
    } else { $("#alert").hide();}
  });
  console.log("Remaining: "+points);
  $("#points").html(points);
}

//RADAR Chart
var ctx = $("#myChart")[0].getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ["STR", "DEX", "STA", "INT", "WIS", "CHA"],
        datasets: [{
            data: [str.value, dex.value, sta.value, int.value, wis.value, cha.value],
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            pointBackgroundColor: [
                '#ED1C24',
                '#0071BC',
                '#8CC63F',
                '#F7931E',
                '#93278F',
                '#ED1E79'
            ],
            pointHoverBackgroundColor : '#fff',
            pointHoverBorderColor: [
              '#ED1C24',
              '#0071BC',
              '#8CC63F',
              '#F7931E',
              '#93278F',
              '#ED1E79'
            ],
            borderWidth: 1
        }],
    },
    options: {
      maintainAspectRatio: true,
      plugins: {
        legend: {display: false}
      },
      line: {
        borderWidth: 3
      },
      scales: {
        r: {
          angleLines: { display: true },
          min: 0,
          max: 20,
          ticks: {
            display: false, maxTicksLimit: 5
          }
        }
      }
    }
});

//Image Thumb
var dropArea = $(".drag-image"),
    dragText = $("#dragText"),
    browseBtn = $("#browseBtn"),
    thumbnail = $("#thumb");

let file;

browseBtn.click(function(){ thumbnail.click(); }); //replace input button w styled button

thumbnail.change(function() {
  file = this.files[0];
  viewfile();
});

dropArea.on("dragenter", function(){
  console.log("Item in area.")
});

dropArea.bind("dragover", function(event) {
  event.preventDefault();
  event.stopPropagation();
  dragText.text("Release to Upload File");
});

dropArea.bind("dragleave", function() {
  dragText.text("Drag & Drop to Upload File");
});

dropArea.bind("drop", function(event) {
  event.preventDefault();
  event.stopPropagation();
  file = event.target.files[0];
  viewfile();
});

function viewfile(){
  if (window.FileReader) {
    var fileReader = new FileReader();

    if(file && file.type.match('image.*')){
      fileReader.readAsDataURL(file);
      fileReader.onload = function(){
        let fileURL = fileReader.result;
        let imgTag = `<img src="${fileURL}" alt="image">`;
        dropArea.html(imgTag);
      };

    }else{
      alert("This is not an Image File!");
      dragText.text("Drag & Drop to Upload File");
    }
  }
}
