function card_list_html(items_array){
  var card_list_html='';
  items_array.forEach(function(item){
    var image_url = item.image_url || '/static/images/beer1.jpg';
    var card_html =
        `
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <a href="/item/` + item.id + `"><img class="z-depth-2" style="border-bottom: 1px solid grey;" src="`+image_url+`"></a>
              <a href="#" class="btn-floating halfway-fab waves-effect waves-light"><i class="material-icons add-to-cart"  id="` + item.id + `">add</i></a>

            </div>
            <div class="card-content cardBeer">
              <p class="cardBeer">`+item.title+`</p>
              <p class="cardBeer">Category: `+item.category+`</p>
              <p class="cardBeer">Six Pack: $`+item.price+`</p>
            </div>
          </div>
        </div>
        `

    card_list_html += card_html;
  });
  return card_list_html
};


function admin_card_horizontal_list_html(items_array){
  var card_list_html='';
  items_array.forEach(function(item){
    var image_url = item.image_url || '/static/images/beer1.jpg';
    var card_html =
      `
      <div class="card sticky-action">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="`+image_url +`">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">`+item.title+`<i class="material-icons right">more_vert</i></span>
          <span>$`+item.price+` | `+item.inventory+` remaining</span>
        </div>
        <div class="card-action center">
          <a title='product page' href="item/`+item.id+`" class="waves-effect waves-light" target="_blank"><i class="material-icons left">reply</i></a>
          <a title='edit' href="#" data-id="`+item.id+`" class="waves-effect waves-light action" target="_blank"  data-action="edit"><i class="material-icons left">edit</i></a>
          <a title='copy' href="#" data-id="`+item.id+`" class="waves-effect waves-light action copy" target="_blank" data-action="copy"><i class="material-icons left">content_copy</i></a>
          <a title='delete' href="#" data-id="`+item.id+`" class="waves-effect waves-light action delete" target="_blank" data-action="delete"><i class="material-icons left">delete</i></a>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">`+item.title+`<i class="material-icons right">close</i></span>
          <p>`+item.description+`</p>
        </div>
      </div>
      `
    card_list_html += card_html;
  });
  return card_list_html
};



function load_products(card_type, category, callback_fn){

  var render = {
    card: card_list_html,
    admin_card_horizontal: admin_card_horizontal_list_html
  }

  var category = category || '/';

  $.ajax('/api/product/list'+category, {
    type: 'get',
  }).done(function(items){
    var html = render[card_type](items);
    if(callback_fn && typeof callback_fn === 'function'){
      callback_fn(html)
    };

  }).fail(function(err){
    alert('ERROR: ', JSON.stringify(err));
  });
};

function showModal() {
  var modal = $("#myModal");
  $(document).ready(function() {
    console.log("hellooooo");
    ("#myModal").style.display = 'block';
  });
}
