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
var enemyMaxHP = 0;

// Player selects monster to fight
function startCombat(enemy) {
    if(inCombat) return;
    inCombat = true;

    enemyMaxHP = enemy.maxHP;
    enemyHP = enemyMaxHP;

    enableCombatUI();
}

function continueCombat() {

}

function endCombat() {
    inCombat = false;
    disableCombatUI();
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

    $("#combatLogPanel").scrollTop($("#combatLogPanel")[0].scrollHeight);
}