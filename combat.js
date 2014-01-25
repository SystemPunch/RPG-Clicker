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

// Player selects monster to fight
function startCombat(mon) {
    if(inCombat) {
        printToCombatLog("You are already in combat!");
        return;
    }
    inCombat = true

    $("#fightMonster").attr("disabled", true);

    enemy = $.extend(true, {}, mon);
    calculateEnemyStats();
    enemy.HP = enemy.maxHP;

    enableCombatUI();

    printToCombatLog("You are attacked by "+ enemy.name +"!");
}

function continueCombat(move) {
    if(!inCombat) {
        printToCombatLog("You are not in combat!", "danger");
        endCombat();
    }

    var characterMove = move;
    var enemyMove = enemy.moveset[randomFromInterval(0, enemy.moveset.length-1)];
    var playerSpeed = calculateCombatSpeed(character);
    alert("Character's calculated speed is "+ playerSpeed);
    var enemySpeed = calculateCombatSpeed(enemy);
    alert("Enemy's calculated speed is "+ enemySpeed);
    var first = "";

    if(randomFromInterval(0,1)) first = "player";
    else first = "enemy";
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

    $("#fightMonster").attr("disabled", false);
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

    updateHealthBars();
    $("#healthBars").show();
}

function disableCombatUI() {
    $("#skillButtons").empty();
    $("#healthBars").hide();
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

function calculateEnemyStats() {
    enemy.maxHP = Math.round(randomFromInterval( enemy.maxHP * 0.8 , enemy.maxHP * 1.1 ));
    enemy.attack = Math.round(randomFromInterval( enemy.attack * 0.8 , enemy.attack * 1.1 ));
    enemy.spA = Math.round(randomFromInterval( enemy.spA * 0.8 , enemy.spA * 1.1 ));
    enemy.defense = Math.round(randomFromInterval( enemy.defense * 0.8 , enemy.defense * 1.1 ));
    enemy.spD = Math.round(randomFromInterval( enemy.spD * 0.8 , enemy.spD * 1.1 ));
    enemy.speed = Math.round(randomFromInterval( enemy.speed * 0.8 , enemy.speed * 1.1 ));
}

function updateHealthBars() {
    var playerHealth = ""+ Math.round((character.HP / character.maxHP) * 100);
    var enemyHealth = ""+ Math.round((enemy.HP / enemy.maxHP) * 100);

    $("#playerHealth").css("width", playerHealth +"%");
    $("#enemyHealth").css("width", enemyHealth +"%");

    $("#playerHealth").html(character.HP +" / "+ character.maxHP);
    $("#enemyHealth").html(enemy.HP +" / "+ enemy.maxHP);
}

function calculateCombatSpeed(mob) {
    var speed = mob.speed;

    if(mob.ailments.indexOf("paralyzed") !== -1) speed /= 4;

    return speed;
}