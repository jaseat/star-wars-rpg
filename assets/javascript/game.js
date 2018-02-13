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
var playerIndex;
var defenderIndex;
var Player, Defender;
var charArray = [];
var enemyLeft = 0;

var ObiWan = new Character("Obi-Wan Kenobi", 10, 10, 10, 100, "assets/images/placeholder.jpg");
var Luke = new Character("Luke Skywalker", 10, 10, 10, 10, "assets/images/placeholder.jpg");
var Sidious = new Character("Darth Sidious", 10, 10, 10, 10, "assets/images/placeholder.jpg");
var Maul = new Character("Darth Maul", 10, 10, 10, 10, "assets/images/placeholder.jpg");

function update(selection){

    switch(state){
        case "selectPlayer": 
            if(!isNaN(parseInt(selection))){
            playerIndex = parseInt(selection);
            Player = charArray[playerIndex];
            
            $("#selection").empty();
            $("#player").append(Player.draw());
            charArray.forEach(element => {
                if(element.id != playerIndex)
                {
                    enemyLeft++;
                    $("#enemy").append(element.draw());
                }

            });
            state = "selectEnemy";
            $(".character").on("click", function(){
                update($(this).attr("id"));
            });
        }
        break;

        case "selectEnemy":
            if(!isNaN(selection) && selection != playerIndex)
            {
                $("#"+selection).remove();
                defenderIndex = parseInt(selection);
                Defender = charArray[defenderIndex];
                $("#defender").html(Defender.draw());
                state = "attack";
            }
            break;

        case "attack":
            if(selection != "attack")
                break;
            $("#message").empty();
            Defender.hp -= Player.attack;
            $("#message").append(`<p>You attacked ${Defender.name} for ${Player.attack} damage.`)
            Player.attack += Player.AttackPower;
            if(Defender.hp <= 0){
                enemyLeft--;
                $("#defender").empty();
                $("#message").html(`You have defeated ${Defender.name}, you can choose to fight another enemy.`);
                state = "selectEnemy";
                if(enemyLeft == 0){
                    $("#message").html("You Won!!! GAME OVER!!!");
                    $("#restart").show();
                    state = "restart";
                }
            }
            else{
                Player.hp -= Defender.CounterAttack;
                $("#message").append(`<p>${Defender.name} attacked you back for ${Defender.CounterAttack} damage.`);
                if(Player.hp <= 0){
                    $("#message").html("You have been defeated... GAME OVER!!");
                    $("#restart").show();
                    state = "restart";
                }
    
                $("#player").html(Player.draw());
                $("#defender").html(Defender.draw());
            }
            break;

        case "restart":
            if(selection == "restart"){
                start();
            }
            break;
    }
}

function start(){
    enemyLeft = 0;
    Player = null;
    Defender = null;
 
    $("#restart").hide();
    //clear the DOM
    $("#player").empty();
    $("#enemy").empty();
    $("#defender").empty();
    $("#message").empty();
    //Clear our array of characters so that we can create a new array where the objects have initial values
    charArray = [];
    charArray.push(Object.assign({}, ObiWan));
    charArray.push(Object.assign({}, Luke));
    charArray.push(Object.assign({}, Sidious));
    charArray.push(Object.assign({}, Maul)); 
    //Draw our characters
    for(var i = 0; i < charArray.length; i++){
        $("#selection").append(charArray[i].draw());
    }
    //attatch a click event to the newly created DOM elements
    $(".character").on("click", function(){
        update($(this).attr("id"));
    });
    //set our game state to select player
    state = "selectPlayer";
}

$(document).ready(function(){
    $("#attack").on("click", function(){
        update("attack");
    });
    $("#restart").on("click", function(){
        update("restart");
        $("#message").empty();
    });

    start();
});    



