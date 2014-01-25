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
var enemy;
var enemyHP = 0;
var enemyMaxHP = 0;

// Player selects monster to fight
function startCombat(mon) {
    if(inCombat) {
        printToCombatLog("You are already in combat!");
        return;
    }
    inCombat = true;

    enemy = $.extend(true, {}, mon);

    enableCombatUI();

    printToCombatLog("You are attacked by "+ enemy.name +"!");
}

function continueCombat(move) {
    if(!inCombat) {
        bottomNotify("You are not in combat!", "danger");
        endCombat();
    }

    var characterMove = move;
    var enemyMove = enemy.moveset[randomFromInterval(0, enemy.moveset.length-1)];


}

function checkCombatEnd() {
    if(character.HP <= 0) endCombat("lose");
    else if(enemy.HP <= 0) endCombat("win");
}

function endCombat(result) {
    inCombat = false;
    disableCombatUI();

    switch(result) {
        case "win":
            character.enemiesKilled++;
            break;
        case "lose":
            character.timesDied++;
            break;
        default:
            break;
    }
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

function printToCombatLog(text) {
    var $newLine = $(document.createElement("li"));
    $newLine.attr({
        class: "list-group-item"
    });

    $newLine.html(text);

    $("#combatLog").append($newLine);

    $("#combatLog").scrollTop($("#combatLog")[0].scrollHeight);
}