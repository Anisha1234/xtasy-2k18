$(document).ready(function() {
    window.onload = function() {
        document.getElementById('preloader').style.display = 'none';
    }

    if (window.location.search) {
        var urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.has('action'));
        if (urlParams.has('action')) {
            var new_url = location.protocol + "//" + location.host + location.pathname;
            if (urlParams.get('action') === "1") alert("You have been successfully verified");
            if (urlParams.get('action') === "2") alert("You have not registered");
            if (urlParams.get('action') === "3") alert("You couldn't be verified");
            if (urlParams.get('action') === "4") alert("You need to login");
            if (urlParams.get('action') === "5") alert("Successfully logged out");
            if (urlParams.get('action') === "6") alert("Your password has been successfully reset");
            if (urlParams.get('action') === "7") alert("A mail has been sent to you. Check spams too.");
            if (urlParams.get('action') === "8") alert("Wrong url entered");
            window.history.replaceState({}, document.title, new_url);
        } 
    }

    $("#loginform").submit(function() {

        var loginForm = {
            emailid: $("#emailid").val(),
            password: $("#password").val()
        };

        console.log(loginForm);

        $("#wait").css("display", "block");

        $.post('api/login', loginForm, function(data, status) {

            console.log(data);
            if (data.msg) {

                if (data.msg == "admin") {

                    location.href = "/admin";

                } else {

                    if (data.msg == "successful") {
                        location.href = "/profile";
                    } else {
                        $("#wait").css("display", "none");
                        alert(data.msg);
                    }

                }

            }


        });

        return false;

    });


    $('#regform').submit(function() {
        $("#wait").css("display", "block");
        $(this).ajaxSubmit({
            error: function(xhr) {
                $("#wait").css("display", "none");
                alert('Error: ' + xhr.status);
            },
            success: function(response) {
                console.log(response);
                //$("#sound1").get(0).play();
                document.getElementById('sound1').play();

                alert(response.responseDesc || response.msg);
                $("#wait").css("display", "none");
                location.reload();


            }
        });
        //Very important line, it disable the page refresh.
        return false;
    });

});