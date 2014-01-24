$(function() {
    $("#fightMonster").click(function(e) {
        var menu = document.getElementById("monsterList");
        var selectedMonster = menu.options[menu.selectedIndex].value;

        startCombat(monsters.list[selectedMonster]);
    });

    $("#skillButtons").on("click", "button", function(e) {
        alert(character.moveset[this.name].name);
    });

    disableCombatUI();
});

var inCombat = false;
var enemyHP = 0;

// Player selects monster to fight
function startCombat(enemy) {
    if(inCombat) return;
    inCombat = true;

    // show combat pane with skill selection
    enableCombatUI();

    alert("You selected: "+ mon.name);

    // while battle isn't over
        // player selects skill
            // select move for monster

            // if one is paralyzed, make other go first

            // otherwise compare priority, speed, etc. to determine order

            // do damage, print messages, check for victory, etc.
                // increase proficiency as needed

            // do any other status stuff like poison, burn, etc.

    // show appropriate messages, give rewards, hide UI

    //disableCombatUI();
}

function continueCombat() {

}

function endCombat() {
    inCombat = false;
}

function enableCombatUI() {
    $("#skillButtons").empty();

    for(var i=0; i<character.moveset.length; i++) {
        var $skillButtonDiv = $(document.createElement("div"));
        $skillButtonDiv.attr({
            class: "col-md-6 skillButton"
        });

        var $skillButton = $(document.createElement("button"));
        $skillButton.attr({
            type: "button",
            class: "btn btn-danger btn-lg btn-block",
            name: i
        });
        $skillButton.html(character.moveset[i].name);

        $skillButtonDiv.append($skillButton);

        $("#skillButtons").append($skillButtonDiv);
    }
}

function disableCombatUI() {
    $("#skillButtons").empty();
}