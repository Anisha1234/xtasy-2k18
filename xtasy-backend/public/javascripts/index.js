$(document).ready(function() {
    console.log("index.js linked");
    // var url = "https://script.googleusercontent.com/macros/echo?user_content_key=1TYmnk2m-3J5hKMwG4JmTsEeDvwk817as713BQLvYYMMLB-kv1wUtY07Lx5MIiOSTYJGXr_DM5UzZ4NAbr__SeebjyxAggTzm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHEE2NxzXZPvZvIrUJSD2_hEJFPjCaf_lPs6Q6CA2BxZHc6LL51zk4asr5W_IA5HKs9sD7FJi2xU&lib=MgWgbeJ8GYpePBmVPKMsTJDLsD0UwERrN";
    // var url = "https://script.google.com/macros/s/AKfycbyMa0SRgzCSkOnhC07UDpcunpTNELaKOc34xGQzRn8ChGmTb4km/exec" ;

    // action = "https://script.google.com/macros/s/AKfycbzIh0GOaJolDRD1RRlhJ33pK0vjANhFLanBTpEwaMNkb72TLkVh/exec" method="POST"

    //var url = "https://script.google.com/macros/s/AKfycbzIh0GOaJolDRD1RRlhJ33pK0vjANhFLanBTpEwaMNkb72TLkVh/exec";

    var url = "https://script.google.com/macros/s/AKfycbysZvy6QAFndBqvOPEJq64QwI_R4zdRI8pt2QaBmZeqFUt6Bmft/exec";

    $("#contact-form").submit(function(event) {
        event.preventDefault();
        // alert("submitted")
        console.log($("#contact-form").serializeObject());
        var form_data = $("#contact-form").serializeObject();
        //   form_data = {"name" : form_data.name , "email" : form_data.email , "subject" : form_data.subject , "message" : form_data.message}
        console.log(form_data);
        $("#wait").css("display", "block");
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: form_data,
            success: function(data) {
                console.log(data);
                alert(data.result);
                if (data.result === "success") {
                    $(".success").css("display", "block");
                    $(".mail-fail").css("display", "none");
                } else {
                    $(".success").css("display", "none");
                    $(".mail-fail").css("display", "block");
                }
                $('#contact-form')[0].reset();
                $("#wait").css("display", "none");
            },
            error: function(err) {
                console.log(err);
                $("#wait").css("display", "none");
            }
        });

        return false;
    });
});