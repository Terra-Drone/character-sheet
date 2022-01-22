$("#imgInp").change(function readURL(img) {
  if (img.files && img.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) { $('#thumb').attr('src', e.target.result); }
    reader.readAsDataURL(img.files[0]);
  }
  readURL(this);
});

//STAT DISTRIBUTION
//>>STR
$("#str").change(function() {
  console.log("STR="+this.value);
  //update chart
  myChart.config.data.datasets[0].data[0] = this.value;
  myChart.update();
  //calculate
  var mod = parseFloat(Math.floor(((this.value-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modStr').html("+"+mod); }
  else { $('.modStr').html(mod); }

});
//>>DEX
$("#dex").change(function() {
  console.log("DEX="+this.value);
  //chart
  myChart.config.data.datasets[0].data[1] = this.value;
  myChart.update();
  //calculate
  var mod = parseFloat(Math.floor(((this.value-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modDex').html("+"+mod); }
  else { $('.modDex').html(mod); }
});
//>>STA
$("#sta").change(function() {
  console.log("STA="+this.value);
  myChart.config.data.datasets[0].data[2] = this.value;
  myChart.update();
});
//>>INT
$("#int").change(function() {
  console.log("INT="+this.value);
  //chart
  myChart.config.data.datasets[0].data[3] = this.value;
  myChart.update();
  //calculate
  var mod = parseFloat(Math.floor(((this.value-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modInt').html("+"+mod); }
  else { $('.modInt').html(mod); }
});
//>>WIS
$("#wis").change(function () {
  console.log("WIS="+this.value);
  //chart
  myChart.config.data.datasets[0].data[4] = this.value;
  myChart.update();
  //calculate
  var mod = parseFloat(Math.floor(((this.value-10)/2)*100)/100).toFixed(0)
  if (mod > 0){ $('.modWis').html("+"+mod); }
  else { $('.modWis').html(mod); }
});
//>>CHA
$("#cha").change(function () {
  console.log("CHA="+this.value);
  //chart
  myChart.config.data.datasets[0].data[5] = this.value;
  myChart.update();
  //calculate
  var mod = parseFloat(Math.floor(((this.value-10)/2)*100)/100).toFixed(0)
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

  //base flaw selection settings
  $('.flaws').select2({
    dropdownAutoWidth: true,
    width: '100%',
    height: '20px',
    multiple: true,
    maximumSelectionLength: 4,
    allowClear: true,
    templateResult: formatOption,
  });
  $('.bonds').select2({
    dropdownAutoWidth: true,
  });

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
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      maintainAspectRatio: true,
      plugins: {
        legend: {display: false}
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
