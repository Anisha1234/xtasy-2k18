$(document).ready(function () {

    if(window.location.search){
        var urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.has('action'));
        if(urlParams.has('action')){
            if(urlParams.get('action') === "1") alert("You have been successfully verified");
            if(urlParams.get('action') === "2") alert("You have not registered");
            if(urlParams.get('action') === "3") alert("You couldn't be verified");
            if(urlParams.get('action') === "4") alert("Session expired! You need to login");
            if(urlParams.get('action') === "5") alert("Successfully logged out");
            if(urlParams.get('action') === "6") alert("Your password has been successfully reset");
            if(urlParams.get('action') === "7") alert("A mail has been sent to you");

        }
    }

    $("#loginform").submit( function () {

        var loginForm = {
            emailid: $("#emailid").val(),
            password: $("#password").val()
        };

        console.log(loginForm);

        $.post('api/login', loginForm, function (data, status)
        {

            console.log(data);
            if (data.msg) {

                if (data.msg == "admin") {

                    location.href = "/admin";

                } else {

                    if (data.msg == "successful") {
                        location.href = "/dashboard";
                    } else {
                        alert(data.msg);
                    }

                }

            }

        });

        return false;

    });


    $('#regform').submit(function() {
        $(this).ajaxSubmit({
          error: function(xhr) {
            alert('Error: ' + xhr.status);
          },
         success: function(response) {
          console.log(response);

          alert(response.responseDesc || response.msg);
          location.reload();



         }
        });
        //Very important line, it disable the page refresh.
        return false;
      });

});
