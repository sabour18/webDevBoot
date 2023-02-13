
    $(document).ready(function(){

        // add big-title class to h1
        $("h1").addClass("big-title")

        // change text in button elements
        $("button").html("<em>Please dont click me</em>");

        // if h1 has bif-title class, then remove it
        if($("h1").hasClass("big-title")){

            //$("h1").removeClass("big-title")

        }

        $("a").attr("href", "https://www.netflix.ca");

        // click event listener
        $("h1").click(function(){
            $("h1").css("color", "red");
        });

        $("button").click(function(){
            $("h1").css("color", "purple");
        });

        $(document).keypress(function(event){
            $("h1").text(event.key);
        });

        $("h1").on("mouseover", function(){
            $("h1").css("font-size", "5rem");
        });

        // create a button element fore the h1
        // before(), after(), prepend(), append()
        $("h1").before("<button>New</button>");

        // .remove() can remove elements

        // ANIMATIONS
        // .toggle() toggles if appears or not
        // .fadeOut() or .fadeToggle()
        //.slideToggle()

        $("button").click(function(){
            // must have a numeric attribute
            $("h1").slideUp().animate({opacity: 0.5}).slideDown();

        });
    });
