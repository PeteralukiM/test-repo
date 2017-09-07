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
            if(col[i]=="name" || col[i]=="population"){
            // console.log(col[i]);
              var th = document.createElement("th");
            th.innerHTML = col[i]+'   <button id="but" onclick="sortTable('+i+')" ><i class="fa fa-sort-desc"></button>';
          
            tr.appendChild(th);  
           /* th.onclick = function () {
           console.log(i);   
     sortTable(i);
       }; */
            }
            else{
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
            
            }    
            
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
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("showData");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("tr");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}