$(document).ready(function(){

    $("form").submit(function(event){

        var userData = {
            "name" : $("#name").val() ,
            "username" : $("#username").val() ,
            "password" : $("#password").val(),
            "college" : $("#college").val()
        }

        console.log(userData);

        $.post("/register" , userData , function(data , status){
            console.log("data stored");
            console.log(data)
        })

        return false ;
        
    });

})
