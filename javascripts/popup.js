document.addEventListener('DOMContentLoaded', (() => {
  let $content = document.getElementById('content');

  City.findAll().then((cities) => {
    if (cities.length === 0) {
      let $div = document.createElement('div');
      $div.className = 'not-yet';
      $div.innerHTML = CONFIG.popup.notYet;
      $content.append($div);
    }
    else {
      let $ul = document.createElement('ul');
      for (let city of cities) {
        let $li = document.createElement('li');
        let $a = document.createElement('a');
        let $remove = document.createElement('button');
        $li.className = 'city-btn';
        $a.href = city.url;
        $a.target = '_blank';
        $a.innerHTML = city.title;
        $remove.addEventListener('click', ((e) => {
          e.preventDefault();
          city.remove().then(() => $ul.removeChild($li))
        }), false);

        $li.appendChild($a);
        $li.appendChild($remove);
        $ul.appendChild($li);
      }
      $content.append($ul);
    }
  })

}));
