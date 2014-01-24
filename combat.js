$(function() {
    $("#fightMonster").click(function(e) {
        var menu = document.getElementById("monsterList");
        var selectedMonster = menu.options[menu.selectedIndex].value;

        alert("You selected: "+ monsters.list[selectedMonster].name);
    });
});

/*

Player selects monster to fight
    show combat pane with skill selection

    while battle isn't over
        player selects skill
            select move for monster

            if one is paralyzed, make other go first

            otherwise compare priority, speed, etc. to determine order

            do damage, print messages, check for victory, etc.
                increase proficiency as needed

            do any other status stuff like poison, burn, etc.

    if battle is over
        show appropriate messages, give rewards

 */