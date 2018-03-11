function get_product(id, callback_fn){
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


function delete_product(id, callback_fn){
  $.ajax('/admin/api/editor/'+id,{
    type: 'delete',
  }).done(function(product){
    if(callback_fn && typeof callback_fn === 'function'){
      callback_fn(product);
    }
  }).fail(function(err){
    alert(err);
  });
};