exports.productSingle = function(req,res){
    console.log('The product:',req.body.product);
    console.log('The body', req.body);

    res.render('suppliers/templates/product-single', { product: req.body.product, index: req.body.index });
    return;
}

exports.productEdit = function(req,res){
    console.log('The product:',req.body.product);
    console.log('productEdit: The body', req.body);

    res.render('suppliers/templates/product-edit', { product: req.body.product, productId: req.body.productId });
    return;
}

exports.productAdd = function(req,res){
    res.render('suppliers/templates/product-add');
    return;
}