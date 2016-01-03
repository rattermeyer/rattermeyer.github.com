/* Tags
------------------------------------------------------------------- */
function showTag(fragment) {
  $('#tags > li').hide();
  $(fragment).show();
}

if ($('#tags').length) {
  // check for url fragment
  var fragment = window.location.hash;

  // hide all categories
  $('#tags > li').hide();

  // create list of categories
  $('#tags').before('<ul id="tags-list" class="tags-list"/>');

  // fill list of categories
  $("#tags > li").each(function(index) {
    var tag = $(this).find('h3').first().text();
    var tag_replaced = tag.replace(' ', '_');
    $('#tags-list').append('<li><a href="#' + tag_replaced + '" onclick="showTag(\'#' + tag_replaced + '\')">' + tag + '</a></li>');
  });

  // display selected catgeory
  if (fragment) {
    showTag(fragment);
  }
}
