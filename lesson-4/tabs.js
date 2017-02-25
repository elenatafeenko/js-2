$(".tab-header").on("click", function() {
  $(".tab-header").removeClass("active");
  $(".tab").hide();
  var activeHeader = $(this);
  activeHeader.addClass("active");
  var tabId = activeHeader.data("tabId");
  $("#" + tabId).show();

  
});
