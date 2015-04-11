/* Sidebar and tool-bar */

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
function sidebarRefreshActive(){
  var pathname = location.pathname;
  pathname = pathname.substring(0, pathname.lastIndexOf('/'));
  $(".sidebar .nav:not(.sidebar-extra) li").each(function(i) {
    var a = $(this).children("a");
    if(a){
      var apath = a[0].pathname;
      apath = apath.substring(0, apath.lastIndexOf('/'));
      if(pathname.indexOf(apath) == 0){
        $(this).addClass("active");
      }
      else if(a[0].hash){
        $(this).addClass("hidden");
      }
    }
  });
}

if(sidebar){
  sidebar.on('affixed.bs.affix', function () {
    sidebar.css("position", "");
  });
  sidebarRefreshActive();
  
  $(document).ready(function() {
    sidebarAffixRefresh();
    
    $('.panel-collapse').on('shown.bs.collapse', function () {
      sidebarAffixRefresh();
    });
    $('.panel-collapse').on('hidden.bs.collapse', function () {
      sidebarAffixRefresh();
    });
  });
}

/* General */

function collapseRefresh(){
  var numCollapse = $('.panel-collapse').length;
  var numExpanded = $('.panel-collapse.in').length;
  if(numCollapse != 0){
    $(".collapse-all").show(0);
    $(".expand-all").show(0);
    if(numExpanded == 0){
      $(".collapse-all").prop('disabled', true);
      $(".expand-all").prop('disabled', false);
    }
    else if (numCollapse == numExpanded){
      $(".collapse-all").prop('disabled', false);
      $(".expand-all").prop('disabled', true);
    }
    else{
      $(".collapse-all").prop('disabled', false);
      $(".expand-all").prop('disabled', false);
    }
  }
}

$(document).ready(function() {
  collapseRefresh();

  $('.panel-collapse').on('shown.bs.collapse', function () {
    collapseRefresh();
  });
  $('.panel-collapse').on('hidden.bs.collapse', function () {
    collapseRefresh();
  });
  
  $(".collapse-all").on('click', function(e) {
    e.preventDefault();
    $(".panel-collapse").collapse('hide');
  });
  $(".expand-all").on('click', function(e) {
    e.preventDefault();
    $(".panel-collapse").collapse('show');
  });
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