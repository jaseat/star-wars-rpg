var Character = function (id, name, attack, AttackPower, CounterAttack, hp, img){
        this.id = id;
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
};

var state = "selectPlayer";
var playerIndex;
var defenderIndex;
var Player, Defender;
var charArray = [];
var enemyLeft = 0;


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
            $("#defender").html(Defender.draw());
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
                $("#player").html(Player.draw());
                $("#message").append(`<p>${Defender.name} attacked you back for ${Defender.CounterAttack} damage.`);
                if(Player.hp <= 0){
                    $("#message").html("You have been defeated... GAME OVER!!");
                    $("#restart").show();
                    state = "restart";
                }
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

    charArray = [];
    charArray.push(new Character(0, "Obi-Wan Kenobi", 8, 8, 10, 120, "assets/images/obi-wan.jpg"));
    charArray.push(new Character(1, "Luke Skywalker", 12, 12, 5, 100, "assets/images/luke.jpg"));
    charArray.push(new Character(2, "Darth Sidious", 6, 6, 20, 150, "assets/images/sidious.jpg"));
    charArray.push(new Character(3, "Darth Maul", 3, 3, 25, 180, "assets/images/maul.jpg")); 
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



