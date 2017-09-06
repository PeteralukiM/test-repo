window.onload = function() {
  console.log('+[window.onload]');
   
   
    
};
function loadXMLDoc() {

var client = new XMLHttpRequest();

console.log('Click');
  client.open("GET", "http://www.cybersoft.cz/data.json",true);
  client.setRequestHeader( 'Access-Control-Allow-Origin', 'http://www.cybersoft.cz/data.json');  
  client.onreadystatechange = function() {     
      if (client.readyState == 4) {
          if(client.status == 200) {  
            var input =client.responseText;
             //console.log(input);
             showResult(input);
             
             
          }
      }
  }
       client.send();

}
function showResult(xmlhttp) {

    // console.log(xmlhttp);
     
     var parse=JSON.parse(xmlhttp);
        mesta=parse.cities;
     var col = [];
        for (var i = 0; i < mesta.length; i++) {
            for (var key in mesta[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
       // console.log(col);
     var table = document.createElement("table");
    var tr = table.insertRow(-1);              

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");     
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

     
        for (var i = 0; i < mesta.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = mesta[i][col[j]];
            }
        }


        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    

}