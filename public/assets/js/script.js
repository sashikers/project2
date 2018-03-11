function card_list_html(items_array){
  var card_list_html='';
  items_array.forEach(function(item){
    var image_url = item.image_url || 'static/images/beer1.jpg';
    var card_html = 
        ` 
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image">
              <img src="`+image_url+`" id="` + item.id + `">
              <span class="card-title">`+item.title+`</span>
              <a href="#" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <p>`+item.description+`</p>
            </div>
          </div>
        </div>
        `

    card_list_html += card_html;
  });
  return card_list_html
};

function card_horizontal_list_html(items_array){
	var card_list_html='';
  items_array.forEach(function(item){
    var image_url = item.image_url || 'static/images/beer1.jpg';
    var card_html = 
        `<div class="col s12">
          <div class="card horizontal">
            <div class="card-image">
              <img src="`+image_url+`">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>Title: `+item.title+`</p>
                <p>Category: `+item.category+`</p>
                <p>Price: $`+item.price+`</p>
                <p>Inventory: `+item.inventory+`</p>
              </div>
              <div class="card-action">
                <a data-id="`+item.id+`" class="waves-effect waves-light edit"><i class="material-icons left">edit</i></a>
              </div>
            </div>
          </div>
        </div>`
  	card_list_html += card_html;
 	});
  return card_list_html
};

function load_products(card_type, callback_fn){

  var render = {
    card: card_list_html,
    card_horizontal: card_horizontal_list_html
  }

  $.ajax('/api/product/list',{
    type: 'get',
  }).done(function(items){
    var html = render[card_type](items);  
    if(callback_fn && typeof callback_fn === 'function'){
      callback_fn(html)
    };

  }).fail(function(err){
    alert(err);
  });
};