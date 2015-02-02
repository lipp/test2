$(function() {

var sortBy = 'date';
var categories = {};

$('.form-categories input[type=checkbox]').each(function(index, e) {
  categories[e.value] = e.checked;
});

$('.form-categories input[type=checkbox]').change(function(e) {
  categories[e.delegateTarget.value] = e.delegateTarget.checked;
  sortShows();
});


var sortShows = function() {
  var shows = $('.shows');
  var showsLi = shows.children('li');
  var sortedShowsLi = showsLi.sort(function(a, b) {
    if (sortBy === 'date') {
      var da = new Date(a.getAttribute('data-date').replace(/-/g, "/"));
      var db = new Date(b.getAttribute('data-date').replace(/-/g, "/"));
      return da > db ? 1 : -1;
    } else {
      var da = parseFloat(a.getAttribute('data-distance'));
      var db = parseFloat(b.getAttribute('data-distance'));
      console.log(da,db);
      return da > db ? 1 : -1;
    }
  });
  sortedShowsLi.hide();
  var filteredShowsLi = showsLi.filter(function(index, el) {
    var category = $(el).data('category');
    console.log(category, categories[category]);
    return categories[category];
  }).show();

  showsLi.detach();
  sortedShowsLi.appendTo(shows);
};

var distInit = false;

$('.form-sort input[type=radio]').change(function(e) {
  sortBy = this.value;
  if (sortBy === 'distance' && distInit === false) {
    initDistances();
    distInit = true;
  } else {
    sortShows();
  }
});

$('.shows li').each(function(index, el) {
  var da = new Date(el.getAttribute('data-date').replace(/-/g, "/"));
  if (da < new Date()) {
    $(el).remove();
  }
});

sortShows();

function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

var nextShow = $('.next-show').filter(function(index, el) {
  var da = new Date(el.getAttribute('data-date').replace(/-/g, "/"));
  return da > new Date();
}).sort(function(a,b) {
  var da = new Date(a.getAttribute('data-date').replace(/-/g, "/"));
  var db = new Date(b.getAttribute('data-date').replace(/-/g, "/"));
  return da > db;
})[0];

$(nextShow).removeClass('hidden');

var initDistances = function() {
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log('location',position);

    var geocoder = new google.maps.Geocoder();

    $('.shows li').each(function(index, el) {
      var city = $(el).data('city');
      if ($(el).data('category') === 'tv') {
        $(el).attr('data-distance', 0);
        sortShows();
      } else {
        geocoder.geocode( {address: city + ', Germany'}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK) {
            var loc = results[0].geometry.location;
            //  console.log(city, results[0].geometry.location);//center the map over the result
            var dist = distance(position.coords.longitude, position.coords.latitude, loc.D, loc.k);
            console.log('Distance ' + city, dist);
            $(el).attr('data-distance', dist);
            sortShows();
          }
        });
      }
    });
  });
}
};
});
