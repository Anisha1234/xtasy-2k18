$(document).ready(function () {

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

    $("#regform").submit(function (event) {

        var userData = {
            "name": $("#name").val(),
            "emailid": $("#emailid2").val(),
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
