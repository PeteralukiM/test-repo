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
     table.setAttribute("id", "myTable");
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
               var tabCell;
     
        for (var i = 0; i < mesta.length; i++) {     

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                tabCell = tr.insertCell(-1);
                tabCell.innerHTML = mesta[i][col[j]];
                  
            }
        }

             
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
             //First location
       var table1=document.getElementById("myTable").rows[1].cells[1].innerHTML;
           console.log(table1);
       var  degrees=parseInt(table1.substr(1,2));
       var min=parseInt(table1.substr(4,1));
       var sec=parseFloat("0."+table1.substr(6,5))*60;      
       var deci1= degrees+(min/60)+sec/3600; console.log(deci1);
       
       var degrees=parseInt(table1.substr(13,2));
       var min=parseInt(table1.substr(17,2));
      var  sec=parseFloat("0."+table1.substr(20,4))*60;
        var deci2= degrees+(min/60)+sec/3600;  console.log(deci2);
       
          //second location
        var table1=document.getElementById("myTable").rows[3].cells[1].innerHTML;
           console.log(table1);
      var degrees=parseInt(table1.substr(1,2));
      var min=parseInt(table1.substr(4,2));
       var sec=parseFloat("0."+table1.substr(7,5))*60;
        var deci3= degrees+(min/60)+sec/3600; console.log(deci3.toFixed(4));
       
       
       var degrees=parseInt(table1.substr(14,2));
       var min=parseInt(table1.substr(17,2));
       var sec=parseFloat("0."+table1.substr(20,4))*60;
        var deci4= degrees+(min/60)+sec/3600;  console.log(deci4.toFixed(4));
         
        /////// 
         var table1=document.getElementById("myTable").rows[2].cells[1].innerHTML;
           console.log(table1);
      var degrees=parseInt(table1.substr(1,2));
      var min=parseInt(table1.substr(4,2));
       var sec=parseFloat("0."+table1.substr(7,5))*60;
        var deci5= degrees+(min/60)+sec/3600; console.log(deci5.toFixed(4));
       
       
       var degrees=parseInt(table1.substr(14,2));
       var min=parseInt(table1.substr(17,2));
       var sec=parseFloat("0."+table1.substr(20,4))*60;
        var deci6= degrees+(min/60)+sec/3600;  console.log(deci6.toFixed(4));
       
          var location=[
            [deci1.toFixed(5),deci2.toFixed(5)],
            [deci3.toFixed(5),deci4.toFixed(5)],
            [deci5.toFixed(5),deci6.toFixed(5)]
          ];
           initMap(location);
  
}
function initMap(location) {
        
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
           center: new google.maps.LatLng(49.8413,18,2902),
        });
        
       var marker, i;

    for (i = 0; i < location.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(location[i][0], location[i][1]),
        map: map
      });

        } 
        
        
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