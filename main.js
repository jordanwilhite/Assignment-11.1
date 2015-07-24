var url = 'https://api.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=whiskey&includes=Images,Shop';

$.ajax(url, {
  dataType: 'jsonp',
    method: "GET",
  error: function(error){

  },
  success: function (data, textStatus, xhr){
    buildAllListings(data.results);
  }
});

var buildAllListings = function(listings){
  var html = listings.map(buildListing);
  html.reduce(function(html, item){
    return html + item;
  });

  $('.main').html(html);
};

var buildListing = function(listing){
  var url = listing.url;
  var title = listing.title;
  var shop = listing.Shop.shop_name;
  var shopUrl = listing.Shop.url;
  var price = listing.price;
  var currency_code = listing.currency_code;

  var image = _.first(listing.Images);
      image = image.url_170x135;

  var templateHtml = $('#listingTemplate').html();
  var template = _.template(templateHtml);
  var html = template({
    shop: shop,
    shopUrl: shopUrl,
    title: title,
    image: image,
    currency_code: currency_code,
    price: price,
    url: url
  });

  return html;
};
