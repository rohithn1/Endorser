// Get the modal
var join = document.getElementById("joinGroup");

// Get the button that opens the modal
var myBtn = document.getElementById("joinBtn");

// Get the <span> element that closes the modal
var close1 = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modal
joinBtn.onclick = function() {
	join.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close1.onclick = function() {
	join.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == join) {
    	join.style.display = "none";
	}
}
//------------------------------------------------------------------
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var createBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var close = document.getElementsByClassName("close")[0];

var randomize = document.getElementById("randomize");
var rID = document.getElementById("rID");

// When the user clicks on the button, open the modal
createBtn.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
    	modal.style.display = "none";
	}
}

randomize.onclick = function() {
	console.log('yo');
	rID.value = randomID();
}

function randomID () {
	return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

$(document).ready(function() {
  $(".endorseGroup").click(function(e) {
  	e.preventDefault();
  	$.ajax({
  		type: "GET",
        url: "/",
        data: {renderThis: JSON.stringify($(this).attr('id'))},
        success: function(d) {
            console.log("worked");                
        }, 
        error: function(d) {
            console.log("Error");
        }
    });
  })
});















































