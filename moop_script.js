function myFunction() {
    document.getElementById("xminHolder").innerHTML = "";
    document.getElementById("xmaxHolder").innerHTML = "";
    var n_value = document.getElementById("n").value;
    for (let i = 1; i <= n_value; i++) {
        document.getElementById("xminHolder").innerHTML += "<input type=\"number\" id=\"x_min_"+i+"\" name=\"x_min_"+i+"\" value=\"-10\" class=\"form-control inline\" required>";
        document.getElementById("xmaxHolder").innerHTML += "<input type=\"number\" id=\"x_max_"+i+"\" name=\"x_max_"+i+"\" value=\"10\" class=\"form-control inline\" required>";
    } 
}

function sendGoogleRequest() {

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      
        let a = document.getElementById("teste");
        a.innerHTML = "<span class=\"spinner-border spinner-border-sm text-light\" role=\"status\"></span>  Loading..."
        a.disabled = true;

        let form = document.getElementById("form");
        if(form.checkValidity() === false){
            a.innerHTML = "Complete inputs";
            document.getElementById("response_plot").innerHTML = "";
            return 0;
        }

        let resultElement = document.getElementById('response');
        let errorElement = document.getElementById('error');
        resultElement.innerHTML = null;
        errorElement.innerHTML = null;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://ii51sclb36.execute-api.us-east-1.amazonaws.com/default/Moop");
        xhr.setRequestHeader('Content-Type', 'application/json');
        try {
            const n_value = parseInt(document.getElementById('n').value);
            const n_samples = parseInt(document.getElementById('ns').value);
            const function_value1 = document.getElementById('func1').value;
            const function_value2 = document.getElementById('func2').value;
            const n_max_value = parseInt(document.getElementById('n_max').value);
            const eps_value = parseFloat(document.getElementById('eps').value);

            let x_min_value = [];
            let x_max_value = [];
            for (let i = 1; i <= n_value; i++) {
                if (document.getElementById('x_min_' + i).value) {
                    x_min_value.push(parseFloat(document.getElementById('x_min_' + i).value));
                }
                if (document.getElementById('x_max_' + i).value) {
                    x_max_value.push(parseFloat(document.getElementById('x_max_' + i).value));
                }
            }
            xhr.send(JSON.stringify({
                n: n_value,
                n_samples: n_samples,
                function_1: function_value1,
                function_2: function_value2,
                x_min: x_min_value,
                x_max: x_max_value,
                n_max: n_max_value,
                eps: eps_value
            }));
            xhr.onload = function() {
                console.log("Response")
                console.log(this.responseText);
                
                var data = JSON.parse(this.responseText);
                //console.log(data);
                var trace3 = {
                    x: data["fx"][0],
                    y: data["fx"][1],
                    mode: 'markers'
                };
                var layout = {
                    title:'Pareto front',
                    hAxis:{ title: 'f1(x)', minValue: 0, maxValue: 60},
                    vAxis:{ title: 'f2(x)', minValue: 0, maxValue: 60},
                }; 
            
                //console.log(data.fx[0]);
                //console.log(data.fx[1]);

                var dataNew = [['x', 'fx']];
                for(i=0; i<data.fx[0].length; i++){
                    dataNew.push([data.fx[0][i], data.fx[1][i]]);
                }
                console.log(dataNew);

                var dataTable = google.visualization.arrayToDataTable(dataNew);
                var chart = new google.visualization.ScatterChart(document.getElementById('response_plot'));
                chart.draw(dataTable, layout);  
                
                a.innerHTML = "Solved, Solve again";
                a.disabled = false;
            }
            xhr.onerror = function(e) {
                console.log("Ooops, não funcionou: ", e)
                errorElement.innerHTML = "Não funcionou";
                //Deu ruim
                a.innerHTML = "Erro!";
                a.disabled = false;
            }
        } catch (e) {
            console.log('Deu merda', e);
        }
    }
}

function sendRequest() {

    let a = document.getElementById("teste");
    a.innerHTML = "<span class=\"spinner-border spinner-border-sm text-light\" role=\"status\"></span>  Loading..."
    a.disabled = true;

    let form = document.getElementById("form");
    if(form.checkValidity() === false){
        a.innerHTML = "Complete inputs";
        document.getElementById("response_plot").innerHTML = "";
        return 0;
    }

    let resultElement = document.getElementById('response');
    let errorElement = document.getElementById('error');
    resultElement.innerHTML = null;
    errorElement.innerHTML = null;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://ii51sclb36.execute-api.us-east-1.amazonaws.com/default/Moop");
    xhr.setRequestHeader('Content-Type', 'application/json');
    try {
        const n_value = parseInt(document.getElementById('n').value);
        const n_samples = parseInt(document.getElementById('ns').value);
        const function_value1 = document.getElementById('func1').value;
        const function_value2 = document.getElementById('func2').value;
        const n_max_value = parseInt(document.getElementById('n_max').value);
        const eps_value = parseFloat(document.getElementById('eps').value);

        let x_min_value = [];
        let x_max_value = [];
        for (let i = 1; i <= n_value; i++) {
            if (document.getElementById('x_min_' + i).value) {
                x_min_value.push(parseFloat(document.getElementById('x_min_' + i).value));
            }
            if (document.getElementById('x_max_' + i).value) {
                x_max_value.push(parseFloat(document.getElementById('x_max_' + i).value));
            }
        }
        xhr.send(JSON.stringify({
            n: n_value,
            n_samples: n_samples,
            function_1: function_value1,
            function_2: function_value2,
            x_min: x_min_value,
            x_max: x_max_value,
            n_max: n_max_value,
            eps: eps_value
        }));
        console.log('oioioi');
        xhr.onload = function() {
            console.log("Response")
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            console.log(data);
            //resultElement.innerHTML = "Stop criterion: " + JSON.stringify(data["message"]) + "<br>" + "x* = " + JSON.stringify(data["x"])  + "<br>" + "f(x*) = " + JSON.stringify(data["fx"]) ;
            //resultElement.innerHTML = JSON.stringify(data["x"]);
            var trace3 = {
                x: data["fx"][0],
                y: data["fx"][1],
                mode: 'markers'
            };
            var layout = {
                title:'Pareto front',
                xaxis:{
                title: 'f'+'1'.sub()+'(x)'
                },
                yaxis:{
                title: 'f'+'2'.sub()+'(x)'
            },
        };
        var data_plot = [trace3];
        document.getElementById("response_plot").style.visibility = visible;
        Plotly.newPlot('response_plot', data_plot, layout);
        //Deu Bom
        a.innerHTML = "Solved, Solve again";
        a.disabled = false;
        }
        xhr.onerror = function(e) {
            console.log("Ooops, não funcionou: ", e)
            errorElement.innerHTML = "Não funcionou";
            //Deu ruim
            a.innerHTML = "Erro!";
            a.disabled = false;
        }
    } catch (e) {
        console.log('Deu merda', e);
    }
}

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener("click", function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();