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
function sidebarCollapseRefresh(){
  var numCollapse = $('.panel-collapse').length;
  var numExpanded = $('.panel-collapse.in').length;
  if(numCollapse != 0){
    if(numExpanded == 0){
      $(".collapse-all").hide();
      $(".expand-all").show();
    }
    else if (numCollapse == numExpanded){
      $(".collapse-all").show();
      $(".expand-all").hide();
    }
    else{
      $(".collapse-all").show();
      $(".expand-all").show();
    }
  }
}

if(sidebar){
  sidebar.on('affixed.bs.affix', function () {
    sidebar.css("position", "");
  });
  
  $(document).ready(function() {
    sidebarCollapseRefresh();
    sidebarAffixRefresh();
    
    $('.panel-collapse').on('shown.bs.collapse', function () {
      sidebarCollapseRefresh();
      sidebarAffixRefresh();
    });
    $('.panel-collapse').on('hidden.bs.collapse', function () {
      sidebarCollapseRefresh();
      sidebarAffixRefresh();
    });
  });
}

$(".collapse-all").on('click', function(e) {
  e.preventDefault();
  $(".panel-collapse").collapse('hide');
});
$(".expand-all").on('click', function(e) {
  e.preventDefault();
  $(".panel-collapse").collapse('show');
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