/* global H */
import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
var a=0;
var platform = new H.service.Platform({
  apikey: 'wKZKyIzo9mnLslo1d7BnmNoE7xCpt1bQG3d0'
});
var defaultLayers = platform.createDefaultLayers();

function App() {
  
  const [kraj, setKraj] = useState('');

  const [showLocations, setShowLocations] = useState([]);
function add()
{
 

  //document.getElementById("blabla").innerHTML = document.getElementById("blabla").innerHTML + "<br>" +  document.getElementById("myText").value ;
  if(a === 0)
  {
    var st =document.getElementById("myText").value ;
    var re = st.split(", ");
    console.log(re[1]);
    
  document.getElementById("k1").innerHTML =  re[0] ;
  document.getElementById("d1").innerHTML =  re[1] ;
  document.getElementById("l1").innerHTML =  re[2] ;
  document.getElementById("lo1").innerHTML =  re[3] ;
  a++;  
  }
  else if(a === 1)
  {
  
     st =document.getElementById("myText").value ;
     re = st.split(", ");
    console.log(re[1]);
    
  document.getElementById("k2").innerHTML =  re[0] ;
  document.getElementById("d2").innerHTML =  re[1] ;
  document.getElementById("l2").innerHTML =  re[2] ;
  document.getElementById("lo2").innerHTML =  re[3] ;
  a++;
  }
}

  
  const sendFunction = function(){
    axios({
      "method":"POST",
      "url":"http://localhost:4000",
      "headers":{
        "content-type":"application/api",
      },
      "params": {
       
        "lat1":document.getElementById("l1").innerHTML,
        "lon1": document.getElementById("lo1").innerHTML,
        "lat2":document.getElementById("l2").innerHTML,
        "lon2": document.getElementById("lo2").innerHTML
      }
      })
      .then((response)=>{
        
        if(response.data.data === "Error"){
          document.getElementById("lat").innerHTML =  "ERROR";
        } 
        else
        {
          var map = new H.Map(document.getElementById('map'),
          defaultLayers.vector.normal.map,{
          center: {lat:50, lng:5},
          zoom: 4,
          pixelRatio: window.devicePixelRatio || 1
        });

        window.addEventListener('resize', () => map.getViewPort().resize());

        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        
        
        var ui = H.ui.UI.createDefault(map, defaultLayers);
        
      
        
            var parisMarker = new H.map.Marker({lat:response.data.wearesult[0].lat, lng:response.data.wearesult[0].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[1].lat, lng:response.data.wearesult[1].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[2].lat, lng:response.data.wearesult[2].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[3].lat, lng:response.data.wearesult[3].lon});
            map.addObject(parisMarker);
        
             parisMarker = new H.map.Marker({lat:response.data.wearesult[4].lat, lng:response.data.wearesult[4].lon});
            map.addObject(parisMarker);


          document.getElementById("lat").innerHTML =  response.data.wearesult[0].lat;
          document.getElementById("lon").innerHTML =  response.data.wearesult[0].lon;
          document.getElementById("temp").innerHTML =  response.data.wearesult[0].temp;
          
          //hMap.addObject(marker);
          document.getElementById("lon2").innerHTML =  response.data.wearesult[1].lon;
          document.getElementById("lat2").innerHTML =  response.data.wearesult[1].lat;
          document.getElementById("temp2").innerHTML =  response.data.wearesult[1].temp;

          document.getElementById("lon3").innerHTML =  response.data.wearesult[2].lon;
          document.getElementById("lat3").innerHTML =  response.data.wearesult[2].lat;
          document.getElementById("temp3").innerHTML =  response.data.wearesult[2].temp;

          document.getElementById("lon4").innerHTML =  response.data.wearesult[3].lon;
          document.getElementById("lat4").innerHTML =  response.data.wearesult[3].lat;
          document.getElementById("temp4").innerHTML =  response.data.wearesult[3].temp;

          document.getElementById("lon5").innerHTML =  response.data.wearesult[4].lon;
          document.getElementById("lat5").innerHTML =  response.data.wearesult[4].lat;
          document.getElementById("temp5").innerHTML =  response.data.wearesult[4].temp;
          
          
        setShowLocations(response.data.data);
        showLocations.forEach(element => {
        //var marker = new H.map.Marker({lat: element.lat, lng: element.lon});
       // document.getElementById("lat").innerHTML =  element.lat;
       // document.getElementById("lon").innerHTML =  element.lon ;
        })
      }
      })
      .catch((error)=>{
        console.log(error)
    })
  }

    
   
  



  
  var unirest = require("unirest");

  var req = unirest("GET", "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php");
  
  req.query({
    "location": kraj
  });
  
  req.headers({
    "x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
    "x-rapidapi-key": "8ff52ea582msh5e8ce0a5497a535p1602eajsn83adbd057b2f"
  });
  
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
  console.log(res.body);
   
    if (res.body.Results === undefined ) {
      
 }
 else{
   if(res.body.Results[5] === undefined)
   {

   }
   else
   {
   document.getElementById("txt1").value = res.body.Results[0].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt2").value = res.body.Results[1].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt3").value = res.body.Results[2].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt4").value = res.body.Results[3].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
    document.getElementById("txt5").value = res.body.Results[4].name + ", " + res.body.Results[0].lat + ", " + res.body.Results[0].lon;
   }
}
    
  });
  

  
  
  return (
    
    <div className="App">
      
      <div >
      <h1 className="text-center"> Iskanje poti </h1><br/><br/>
         <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text bg-secondary text-white" id="inputGroup-sizing-lg">Lokacija</span>
        </div>
        <input onChange={(e) => setKraj(e.target.value)} list="browsers" name="browser" id="myText" type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
        <datalist id="browsers">
        <option  id="txt1" value=" "/>
        <option  id="txt2" value=" "/>
        <option  id="txt3" value=" "/>
        <option id="txt4" value=" "/>
        <option  id="txt5" value=" "/>
        </datalist>
        <div className="input-group-append">
    <button onClick={add} className="btn btn-outline-secondary" type="button" id="button-addon2">Dodaj</button>
  </div>
      </div>
      <br/>
     
      </div>
     <div id="blabla">

     </div>
     <div id="blabla2">

     </div>
     <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Kraj</th>
      <th scope="col">Drzava</th>
      <th scope="col">Lat</th>
      <th scope="col">Lon</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td id="k1"></td>
      <td  id="d1"></td>
      <td  id="l1"></td>
      <td  id="lo1"></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td  id="k2"></td>
      <td  id="d2"></td>
      <td  id="l2"></td>
      <td  id="lo2"></td>
    </tr>
    
  </tbody>
</table>
<table>
<thead>
    <tr>
      <th scope="col">Lat</th>
      <th scope="col">Lon</th>
      <th scope="col">Temp [°C]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="lat"></th>
      <td id="lon"></td>
      <td id="temp"></td>
    </tr>
    <tr>
      <th id="lat2"></th>
      <td  id="lon2"></td>
      <td id="temp2"></td>
    </tr>
    <tr>
      <th id="lat3"></th>
      <td  id="lon3"></td>
      <td id="temp3"></td>
    </tr>
    <tr>
      <th id="lat4"></th>
      <td  id="lon4"></td>
      <td id="temp4"></td>
    </tr>
    <tr>
      <th id="lat5"></th>
      <td  id="lon5"></td>
      <td id="temp5"></td>
    </tr>
    
  </tbody>
</table>
<button onClick={sendFunction} className="btn btn-outline-secondary" type="button" id="button-addon2">Pošlji</button>
<br/><br/>
<div id="map"></div>
    </div>
  );
}



export default App;
