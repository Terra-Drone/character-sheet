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
  //Select2 setting
  $('select').select2({
    dropdownAutoWidth: false,
    templateResult: formatOption
  });

  $('.ideals, .flaws').select2({
    height: 'auto',
    multiple: true,
    maximumSelectionLength: 3,
    allowClear: true,
  });

  //repeat bond options for bond selects
  $.each(bonds, function(i, bondOpt){
    $('.bonds').append($('<option>', {
      text: bondOpt.text
    }));
  });

});

//LEVEL & PROFICIENCY SCORE
$("#level").change(function() {
  var level = parseInt(this.value);

  console.log("level="+ level);
  if (level > 20 || level < 1) {
    alert("Limit exceeded.");
    level = 1;
    $("#level").val(level);
    console.log("level="+ level);
  }
  if (level < 5) { $("#profMod").val(2); }
  else if (level >= 5 && level < 9) { $("#profMod").val(3);}
  else if (level >= 9 && level < 13) { $("#profMod").val(4);}
  else if (level >= 13 && level < 17) { $("#profMod").val(5);}
  else { $("#profMod").val(6); }
})


//stats
$("#str").change(function() {
  var val = parseInt(this.value);
  console.log("STR="+val);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#str").val(val);
    console.log("STR="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modStr').html("+"+mod); }
  else { $('.modStr').html(mod); }

  //update chart
  myChart.config.data.datasets[0].data[0] = val;
  myChart.update();
});
$("#dex").change(function() {
  var val = parseInt(this.value);
  console.log("DEX="+val);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#dex").val(val);
    console.log("DEX="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modDex').html("+"+mod); }
  else { $('.modDex').html(mod); }

  //update chart
  myChart.config.data.datasets[0].data[1] = val;
  myChart.update();
});
$("#con").change(function() {
  var val = parseInt(this.value);

  console.log("CON="+val);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#con").val(val);
    console.log("CON="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modCon').html("+"+mod); }
  else { $('.modCon').html(mod); }

  //update chart
  myChart.config.data.datasets[0].data[2] = val;
  myChart.update();
});
$("#int").change(function() {
  var val = parseInt(this.value);
  console.log("INT="+val);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#int").val(val);
    console.log("INT="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modInt').html("+"+mod); }
  else { $('.modInt').html(mod); }

  //update chart
  myChart.config.data.datasets[0].data[3] = val;
  myChart.update();
});
$("#wis").change(function() {
  var val = parseInt(this.value);
  console.log("WIS="+val);
  console.log("Passive Percept="+passpercept);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#wis").val(val);
    console.log("WIS="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modWis').html("+"+mod); }
  else { $('.modWis').html(mod); }
  //update chart
  myChart.config.data.datasets[0].data[4] = val;
  myChart.update();
});
$("#cha").change(function() {
  var val = parseInt(this.value);
  console.log("CHA="+val);
  //LIMIT
  if (val > 20 || val < 3) {
    alert("Limit exceeded.");
    val = 8 ;
    $("#cha").val(val);
    console.log("CHA="+val);
  }
  //calculate Modifier
  var mod = parseFloat(Math.floor(((val-10)/2)*100)/100).toFixed(0);
  if (mod > 0){ $('.modCha').html("+"+mod); }
  else { $('.modCha').html(mod); }
  //update chart
  myChart.config.data.datasets[0].data[5] = val;
  myChart.update();
});

//RADAR Chart
var ctx = $("#myChart")[0].getContext('2d');
var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
        datasets: [{
            data: [8, 8, 8, 8, 8, 8],
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            pointRadius: 5,
            pointBackgroundColor: [
                '#ED1C24',
                '#0071BC',
                '#8CC63F',
                '#F7931E',
                '#93278F',
                '#ED1E79'
            ],
            pointHoverRadius: 8,
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
        legend: {display: false},
        dragData: {
          round: 0,
          showTooltip: true,
          onDragStart: function(e, element) {

          },
          onDrag: function(e, datasetIndex, index, value) {
            if (value < 3) { return false };
            if (value > 20) { return false };

            switch (index) {
              case 0: $('#str').val(value); break;
              case 1: $('#dex').val(value); break;
              case 2: $('#con').val(value); break;
              case 3: $('#int').val(value); break;
              case 4: $('#wis').val(value); break;
              case 5: $('#cha').val(value); break;
              default: break;
            };
          },
          onDragEnd: function(e, datasetIndex, index, value) {
            switch (index) {
              case 0:
                console.log("STR: " + value);
                //calculate modifier
                var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
                if (mod > 0){ $('.modStr').html("+"+mod); }
                  else { $('.modStr').html(mod); }
                console.log("modifier: " + mod);
                break;
              case 1:
              console.log("DEX: " + value);
              //calculate modifier
              var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
              if (mod > 0){ $('.modDex').html("+"+mod); }
                else { $('.modDex').html(mod); }
              console.log("modifier: " + mod);
                break;
              case 2:
              console.log("CON: " + value);
              //calculate modifier
              var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
              if (mod > 0){ $('.modCon').html("+"+mod); }
                else { $('.modCon').html(mod); }
              console.log("modifier: " + mod);
                break;
              case 3:
              console.log("INT: " + value);
              //calculate modifier
              var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
              if (mod > 0){ $('.modInt').html("+"+mod); }
                else { $('.modInt').html(mod); }
              console.log("modifier: " + mod);
                break;
              case 4:
              console.log("WIS: " + value);
              //calculate modifier
              var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
              if (mod > 0){ $('.modWis').html("+"+mod); }
                else { $('.modWis').html(mod); }
              console.log("modifier: " + mod);
                break;
              case 5:
              console.log("CHA: " + value);
              console.log("modifier: " + mod);
              //calculate modifier
              var mod = parseFloat(Math.floor(((value-10)/2)*100)/100).toFixed(0)
              if (mod > 0){ $('.modCha').html("+"+mod); }
                else { $('.modCha').html(mod); }
                break;
              default: break;
          }
        },
        }
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
            display: true, maxTicksLimit: 5
          }
        }
      }
    }
});

//Image Thumb
var dropArea = $(".drag-image"),
    dragText = $("#dragText"),
    browseBtn = $(".browseBtn"),
    thumbnail = $(".thumb");

let file;

browseBtn.click(function(){
  event.preventDefault();
  thumbnail.click();
}); //replace input button w styled button

thumbnail.change(function() {
  file = this.files[0];
  viewfile();
  $(dropArea).css("border", "none");
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
  $(dropArea).css("border", "none");
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
