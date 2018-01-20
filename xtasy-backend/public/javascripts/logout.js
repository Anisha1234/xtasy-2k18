$(document).ready(function(){
  $("#logout").click(function() {
    $.get('api/logout', function(data, status) {
      console.log(data);
      location.href = "/login";
    });
  });
});
