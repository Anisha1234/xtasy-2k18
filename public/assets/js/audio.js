jQuery(document).ready(function() {

play1 = function(){
 if(document.getElementById("Name").value!=false){
        if(document.getElementById("Email").value!=false){
            if(document.getElementById("Phone").value!=false){
                if(document.getElementById("Gender1").value!=false){
                    if(document.getElementById("College").value!=false){
                        if(document.getElementById("inputPws").value!=false){
                            if(document.getElementById("inputConfirmPws").value!=false){                 
                                document.getElementById('sound1').play();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});