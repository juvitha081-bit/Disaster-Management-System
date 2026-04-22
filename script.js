function showPage(page){

var sections=document.querySelectorAll("section");

sections.forEach(s=>{
s.classList.remove("active");
});

document.getElementById(page).classList.add("active");

}

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(showPosition);

}else{
alert("Geolocation not supported");
}

}

function showPosition(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

fetch("http://127.0.0.1:5000/location-alert",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
latitude:lat,
longitude:lon
})

})

.then(res => res.json())

.then(data =>{

document.getElementById("alertBox").innerHTML =
"<div class='alert'>"+data.alert+"</div>";

});

}

function generateAlert(){

fetch("http://127.0.0.1:5000/get-alert")

.then(response => response.json())

.then(data => {

document.getElementById("alertBox").innerHTML =
"<div class='alert'>⚠ " + data.alert + "</div>";

});

}



function submitReport(){

let name = document.getElementById("name").value;
let type = document.getElementById("type").value;
let message = document.getElementById("message").value;

fetch("http://127.0.0.1:5000/report", {

method: "POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name:name,
type:type,
message:message
})

})

.then(res => res.json())

.then(data => {

document.getElementById("reportStatus").innerHTML =
data.message;

});

}


function showPage(page){

var sections=document.querySelectorAll("section");

sections.forEach(s=>{
s.classList.remove("active");
});

document.getElementById(page).classList.add("active");

}
var map;

function getLocation(){

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(showPosition);

}else{

alert("Geolocation not supported");

}

}

function loadReports() {
    fetch("/reports")
    .then(response => response.json())
    .then(data => {

        let output = "";

        if (data.length === 0) {
            output = "<p>No reports submitted yet</p>";
        } else {
            data.forEach(report => {
                output += `
                <p>
                <b>Name:</b> ${report.name}<br>
                <b>Type:</b> ${report.type}<br>
                <b>Message:</b> ${report.message}
                </p>
                <hr>
                `;
            });
        }

        document.getElementById("reportList").innerHTML = output;
    });
}

let contactsData = [];

// Fetch contacts from backend
fetch("/contacts")
  .then(res => res.json())
  .then(data => {
    contactsData = data;
    displayContacts(data);
  });

// Display contacts
function displayContacts(contacts) {
  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(c => {
    list.innerHTML += `
      <div class="contact">
        <strong>${c.name}</strong><br>
        📞 ${c.number}<br>
        📍 ${c.city}
      </div>
    `;
  });
}

// Filter contacts
function filterContacts() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = contactsData.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.city.toLowerCase().includes(search)
  );

  displayContacts(filtered);
}