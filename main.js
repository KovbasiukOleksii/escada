$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });
});

var tabsContainers = document.querySelectorAll('.tabs');

function clickByTab(li, tabItem) {
  return function(evt) {
    var controls = Object.values(li.parentElement.children),
        tabsItems = Object.values(tabItem.parentElement.querySelectorAll('.tab'));
    
    controls.forEach(function(liElem) {
      liElem.classList.remove('active');
    });
    
    li.classList.add('active');
    
    tabsItems.forEach(function(tabEl) {
      tabEl.classList.remove('tab--active');
    });
    
    tabItem.classList.add('tab--active');
  }
}


Object.values(tabsContainers)
  .forEach(function(tabContainer) {
    var tabs = tabContainer.querySelectorAll('.tabs__item'),
        tabsControls = document.createElement('ul'),
        headers = Object.values(tabs)
          .map(function(tabItem) {
            var header = tabItem.querySelector('.tab__title'),
                li = document.createElement('li');
                li.innerText = header.innerText.trim();
                if (tabItem.classList.contains('tab--active')) {
                  li.classList.add('active');
                }
                li.addEventListener('click', clickByTab(li, tabItem));
                tabsControls.append(li);
            return li;
          }),
          activeHeader = headers.filter(function(header) {
            return header.classList.contains('active');
          });
        if (activeHeader.length !== 1) {
          headers.forEach(function(header, idx) {
            header.classList.remove('active');
            tabs[idx].classList.remove('tab--active');
          });
          if (headers[0]) {
            headers[0].classList.add('active');
              tabs[0].classList.add('tab--active');
          }
        }
        tabContainer.prepend(tabsControls);
        tabsControls.classList.add('tabs__controls');
  });