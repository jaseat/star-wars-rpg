var Character = (function (){
    var i = -1;
    return function Character(name, attack, AttackPower, CounterAttack, hp, img){
        this.id = ++i;
        this.name = name;
        this.attack = attack;
        this.AttackPower = AttackPower;
        this.CounterAttack = CounterAttack;
        this.hp = hp;
        this.img = img;
        this.draw = () =>{
            var containerDiv = $("<div>");
            var imgDiv = $("<img>");
            var nameDiv = $("<div>");
            var healthDiv = $("<div>");
            containerDiv.addClass("character");
            nameDiv.addClass("name");
            healthDiv.addClass("health");
            containerDiv.attr("id", this.id);
            imgDiv.attr("src", this.img);
            nameDiv.html(this.name);
            healthDiv.html(this.hp);

            containerDiv.append(nameDiv);
            containerDiv.append(imgDiv);
            containerDiv.append(healthDiv);

            return containerDiv;
        }
}
})();

var state = "selectPlayer";
var player;
var charArray = [];

function update(selection){
    switch(state){
        case "selectPlayer": 
            if(!isNaN(parseInt(selection))){
            player = parseInt(selection);
            
            $("#selection").empty();
            $("#player").append(charArray[player].draw());
            charArray.forEach(element => {
                if(element.id != player)
                    $("#enemy").append(element.draw());
            });
            state = "selectEnemy";
            break;
        }
    }
}


$(document).ready(function(){
    // var ObiWan = new Character("Obi-Wan Kenobi", 10, 10, 10, 10, "assets/images/placeholder.jpg");
    // var Luke = new Character("Luke Skywalker", 10, 10, 10, 10, "assets/images/placeholder.jpg");
    // var Sidious = new Character("Darth Sidious", 10, 10, 10, 10, "assets/images/placeholder.jpg");
    // var Maul = new Character("Darth Maul", 10, 10, 10, 10, "assets/images/placeholder.jpg");


    charArray.push(new Character("Obi-Wan Kenobi", 10, 10, 10, 10, "assets/images/placeholder.jpg"));
    charArray.push(new Character("Luke Skywalker", 10, 10, 10, 10, "assets/images/placeholder.jpg"));
    charArray.push(new Character("Darth Sidious", 10, 10, 10, 10, "assets/images/placeholder.jpg"));
    charArray.push(new Character("Darth Maul", 10, 10, 10, 10, "assets/images/placeholder.jpg"));

    for(var i = 0; i < charArray.length; i++){
        $("#selection").append(charArray[i].draw());
    }



    $(".character").on("click", function(){
        update($(this).attr("id"));
    });

    

});    



