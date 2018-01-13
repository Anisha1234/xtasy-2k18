$(document).ready(function() {
    $("form").submit(function() {
        var loginForm = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        $.post('/login', loginForm, function(data, status) {
            console.log(data);
            if(data.msg){
              alert(data.msg);
            }
        });
        return false;
    });
});
