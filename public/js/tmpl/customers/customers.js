$(document).ready(function(){
   loadMap();
   //loadStoreLatLong();
   $(document).on('click','.product-single', function(e){
      loadProductDetail(0);
   });

   $(document).on('click','.back', function(e){
      var store = $(this).attr('tag');
      $('#final-rightbar').hide();
      $('.rightbar').show();
   });

   
});

function loadMap(){
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    map.locate();
    
    // Binding
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // Callback functions
    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        console.log(e.latlng);
        L.marker(e.latlng).addTo(map).bindPopup("You are here!").openPopup();
    }

    function onLocationError(e) {
        alert(e.message);
    }

    loadStoreLatLong(L, map);
}

function loadProducts(storeId){
    $('#product-list').html('');

    $(products).each(function(index, product){
        if(product.store == storeId){
            $.ajax({
               url: '/customers/templates/product_single',
               type: 'post',
               data: { product: product, index: index, _csrf: csrf },
               success: function(data) {
                   $('#product-list').append(data);
               }
            }); 
        }
    });
}

function loadStoreLatLong(L, map){
    var StoreIcon = L.Icon.extend({
        options: {
            iconSize: [40,50],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }
    });

    $(stores).each(function(index, store){
        if(store.postCode){
            var icon = new StoreIcon({iconUrl: '/img/brand/icon.png'})
            $.ajax({
                url: '/customers/templates/store_coords',
                type: 'post',
                data: {postcode: "WC1H 9RW", _csrf: csrf},
                success: function(data){
                    console.log(data, data.lat, data.lng);
                    //var latlng = new L.LatLng(data.lat, data.lng);
                    L.marker([data.lat, data.lng], {icon:icon}).bindPopup('<a id="bla" href="#" onclick="loadStoreProducts(\''+store._id+'\')">'+ store.name +':<br/>'+ store.products.length+' products!</a>').addTo(map);
                    return;
                }
            });
        }else{
            console.log('Store has no postcode');
            return;
        }
    });
}

function loadStoreProducts(storeId){
    $('#map').addClass('small-map');
    $('#rightbar').show();
    loadProducts(storeId);
}

function loadProductDetail(index){
    var product = products[index];
    $('#rightbar').hide();
    $.ajax({
        url: '/customers/templates/product_detail',
        type: 'post',
        data: {product: product, _csrf: csrf },
        success: function(html){
            $('#final-rightbar').html(html);
        }
    });
    
    $('#final-rightbar').show();
    $('.back').attr('tag', product.store);
    console.log(product);
}