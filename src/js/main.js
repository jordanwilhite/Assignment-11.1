var url = 'https://api.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=whiskey&includes=Images,Shop';

$.ajax(url, {
  dataType: 'jsonp',
  method: 'Get',
  error: function(error) {
  },

  success: function(data, textStatus, xhr) {
    buildAllListings(data.results);
  }
});

var buildAllListings = function(listings) {
  var html = listings.map(buildListing);
  html.reduce(function(html, item) {
    return html + item;
  });

  $('.content').html(html);
};

var buildListing = function(listing) {
  var url = listing.url;
  var title = listing.title;
  var subtitle = function() {
    if (title.length > 24) {
      return title.substring(0, 24) + '...';
    } else {
      return title;
    }
  };

  //jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  var shop = listing.Shop.shop_name;

  //jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var shopUrl = listing.Shop.url;
  var price = listing.price;

  //jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  var currency_code = listing.currency_code;

  //jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var image = _.first(listing.Images);

  //jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  image = image.url_170x135;

  //jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var templateHtml = $('#listingTemplate').html();
  var template = _.template(templateHtml);
  var html = template({
    subtitle: subtitle,
    shop: shop,
    shopUrl: shopUrl,
    title: title,
    image: image,

    //jscs:disable requireCamelCaseOrUpperCaseIdentifiers

    currency_code: currency_code,

    //jscs:disable requireCamelCaseOrUpperCaseIdentifiers

    price: price,
    url: url
  });

  return html;
};
