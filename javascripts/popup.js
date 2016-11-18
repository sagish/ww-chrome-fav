document.addEventListener('DOMContentLoaded', function() {
  var $content = document.getElementById('content');

  getCities(function(cities) {
    var names = Object.keys(cities);
    if (names.length === 0) {
      var $div = document.createElement('div');
      $div.className = 'not-yet';
      $div.innerHTML = window.CONFIG.popup.notYet;
      $content.append($div);
    }
    else {
      var $ul = document.createElement('ul');
      for (var i=0; i<names.length; i++) {
        (function(k){
          var $li = document.createElement('li');
          var $a = document.createElement('a');
          var $remove = document.createElement('button');
          $li.className = 'city-btn';
          $a.href = cities[k];
          $a.target = '_blank';
          $a.innerHTML = k;
          $remove.addEventListener('click', function(e){
            // remove from list
            e.preventDefault();
            setFavorite(k, false, function(){
              $ul.removeChild($li);
            });
          }, false);
          $li.appendChild($a);
          $li.appendChild($remove);
          $ul.appendChild($li);
        })(names[i]);
      }
      $content.append($ul);
    }
  });
})();