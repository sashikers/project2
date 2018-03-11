function get_product_info(id, callback_fn){
  $.ajax('/admin/api/product/'+id,{
    type: 'get',
  }).done(function(product){
    if(callback_fn && typeof callback_fn === 'function'){
      callback_fn(product);
    }
  }).fail(function(err){
    alert(err);
  });
};