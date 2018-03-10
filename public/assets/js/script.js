//After the page loads...
function admin_card_list_html(items_array){
	var card_list_html='';
  items_array.forEach(function(item){
    var card_html = 
        `<div class="col s12">
          <div class="card horizontal">
            <div class="card-image">
              <img src="`+item.image_url+`">
            </div>
            <div class="card-stacked">
              <div class="card-content">
                <p>Title: `+item.title+`</p>
                <p>Category: `+item.category+`</p>
                <p>Price: $`+item.price+`</p>
                <p>Inventory: `+item.inventory+`</p>
              </div>
              <div class="card-action">
                <a data-id="`+item.id+`" class="waves-effect waves-light"><i class="material-icons left">edit</i></a>
              </div>
            </div>
          </div>
        </div>`
  	card_list_html += card_html;
 	});
  return card_list_html
};

function load_items(target_element){
  $.ajax('/api/item/list',{
    type: 'get',
  }).done(function(items){
    var card_list_html = admin_card_list_html(items);
    $(target_element).html(card_list_html);
  }).fail(function(err){
    alert(err);
  });
};