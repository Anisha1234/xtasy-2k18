$(document).ready(function () {
    $("#loginform").submit(function () {
        var loginForm = {
            username: $("#username").val(),
            password: $("#password").val()
        };
        console.log(loginForm)
        $.post('api/login', loginForm, function (data, status) {
            console.log(data);
            if (data.msg) {
                alert(data.msg);
            }
        });
        return false;
    });

    $("#regform").submit(function (event) {

        var userData = {
            "name": $("#name").val(),
            "username": $("#username2").val(),
            "password": $("#password2").val(),
            "college": $("#college").val()
        }

        console.log(userData);

        $.post("api/register", userData, function (data, status) {
            console.log("data stored");
            console.log(data)
        })

        return false;

    });
});

