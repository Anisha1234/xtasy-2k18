$(document).ready(function() {
  $("form").submit(function() {
    var details = {
      emailid: $("#emailid").val()
    }

    $.post('api/forgot', details, function (data, status)
    {
      alert(data.msg)
    });
    console.log(details);
    return false;
  })
});
