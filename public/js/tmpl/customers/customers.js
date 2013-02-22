$(document).ready(function(){
   loadMap();
   loadProducts();  

});

function loadMap(){
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    map.locate({setView: true, maxZoom: 16});

    // Binding
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // Callback functions
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map).bindPopup("You are here!").openPopup();
    }

    function onLocationError(e) {
        alert(e.message);
    }
}


function loadProducts(){
    $(products).each(function(index, product){
        $.ajax({
           url: '/customers/templates/product_single',
           type: 'post',
           data: { product: product, index: index, _csrf: csrf },
           success: function(data) {
               $('#product-list').append(data);
           }
        }); 
    });
}