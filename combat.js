$(function() {
    $("#fightMonster").click(function(e) {
        var menu = document.getElementById("monsterList");
        var selectedMonster = menu.options[menu.selectedIndex].value;

        combat(monsters.list[selectedMonster]);
    });

    disableCombatUI();
});

// Player selects monster to fight
function combat(mon) {
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

    // if battle is over
        // show appropriate messages, give rewards
}

function enableCombatUI() {
    $(".skillButton").each(function(index) {
        $(this).show();
    });
}

function disableCombatUI() {
    $(".skillButton").each(function(index) {
        $(this).hide();
    });
}