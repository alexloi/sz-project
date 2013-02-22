// UI bind
$(document.body).on('click', '.product-single', function(event) {
    var productIndex = parseInt($(this).attr('tag'));
    console.log(productIndex);    
    $('.selected').each(function(i,el){
        $(el).removeClass('selected');
    });
    $(this).addClass('selected');
    loadOverview(0,productIndex);  
});

$(document).ready(function(){
    loadUIBinds();
    loadLeftBar();
});

function loadUIBinds(){ 
    $('#add-product').on('click', function(e){
        e.preventDefault();
        loadOverview(1);
    });
}

function loadLeftBar(){
    $('#product-list').html('');
    $(products).each(function(i, product){
        $.ajax({
                url: '/suppliers/templates/product-preview-tmpl',
                type: 'post',
                data: {product: product, index: i, _csrf: $('#csrf').val()},
                success: function(html) {
                    $('#product-list').append(html);
                    
                    if(product._id == selected){
                        $('.product-single:last').addClass('selected');
                        loadOverview(0,i);
                    }
                    
                    var shift = $('.selected');
                    $('.selected').remove();
                    $('#product-list').prepend(shift);
                },
                error: function(err){
                    console.log('WOOPS: ', err);
                }
            });
    });

    
}

function loadOverview(state, i){
    $('#product-overview').html('');

    /*
        state:
            0 = existing / edit form
            1 = add Form
        i:
            index id of product to show!

    */

    switch(state){
        case 0:
            $.ajax({
                url: '/suppliers/templates/product-edit-tmpl',
                type: 'post',
                data: {product: products[i], index: i, _csrf: $('#csrf').val()},
                success: function(html) {
                    $('#product-overview').html(html);
                },
                error: function(err){
                    console.log('WOOPS EDIT: ', err);
                }
            });

        break;

        case 1:
          $.ajax({
                url: '/suppliers/templates/product-add-tmpl',
                type: 'get',
                success: function(html) {
                    $('#product-overview').html(html);
                },
                error: function(err){
                    console.log('WOOPS ADD: ', err);
                }
            });
        break;

        default:
            console.log('alex you shithead!')
        break;
    }
}