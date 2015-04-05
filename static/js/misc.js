/* Sidebar */

var sidebar = $("#sidebar");
var main = $("#main");

function sidebarAffixRefresh(){
  if(sidebar && main && (main.innerHeight() + 50 > sidebar.innerHeight())){
    sidebar.affix({
      offset: {
        top: 50,
        bottom: function () {
          return (this.bottom = $('.footer').outerHeight(true) + 20)
        }
      }
    });
  }
}

if(sidebar){
  sidebar.on('affixed.bs.affix', function () {
    sidebar.css("position", "");
  });
  
  $(document).ready(function() {
    sidebarAffixRefresh();
    
    $('.collapse').on('shown.bs.collapse', function () {
      sidebarAffixRefresh();
    });
    $('.collapse').on('hidden.bs.collapse', function () {
      sidebarAffixRefresh();
    });
  });
}

$(".collapse-all").on('click', function(e) {
  e.preventDefault();
  $(".collapse").collapse('hide');
});
  
/* Anchors */

$("a").on('click', function(e) {
  if(this.hash){
    var hash = this.hash.replace("body-", "");
    if(hash){
      if(this.pathname == location.pathname){
        e.preventDefault();
        var top = $(hash).offset().top - 5;
        var collapse = $("#body-" + hash.substring(1));
        if(!$(this).attr("data-toggle") || !collapse || !collapse.hasClass("collapse") || (collapse.hasClass("collapse") && !collapse.hasClass("in"))){
          collapse.collapse('show');
          $('html, body').animate({
            scrollTop: top
          }, 500, function(){
            window.location.hash = hash;
          });
        }
      }
    }
  }
});

$(document).ready(function() {
  if (location.hash){
    var hash = location.hash;
    var top = $(hash).offset().top - 5;
    var collapse = $("#body-" + hash.substring(1));
    if (collapse){
      collapse.collapse('show');
    }
    $('html, body').animate({
      scrollTop: top
    }, 500);
  }
});