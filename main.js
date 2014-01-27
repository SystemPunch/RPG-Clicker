$(function () {
    //$(document).tooltip();

    $("span#changelogTab").click(function () {
        $(".menuTabs li").removeClass("selected");
        $("div.tabContent").fadeOut("fast", function () {
            $("div.page").css("display", "none");
            $(".page#changelogTab").css("display", "block");
        });
        $("div.tabContent").fadeIn("fast");
    });

    $(window).keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    defaultCharacter = $.extend(true, {}, character);
    defaultPlaceMine = $.extend(true, {}, placeMine);
    defaultUpgrades = [];
    for(var i=0; i<upgrades.length; i++) {
        var u = $.extend(true, {}, upgrades[i]);
        defaultUpgrades.push(u);
    }

    loadGame();
    window.setInterval(updateGame, 100);

    bottomNotify("This is a VERY early version of the game. It may be riddled with bugs, and saves might break. If you find that your game isn't working properly, try resetting your save. If that doesn't work, please send me a bug report. This message will disappear after 15 seconds.", "warning", 15000);
    bottomNotify("Version 0.1.11 made significant changes to the combat system, and as a result, old save files will almost definitely be broken. You will need to reset your savefile. I'm sorry for the inconvenience.", "danger", 30000);
});

var VERSION = "0.1.12";

var settings = {
    autoSave: "ON"
};

var defaultSettings = {
    autoSave: "ON"
};

function updateCharacterPanel() {
    $("#charName").html(character.name);
    $("#level").html("Level " + character.level);
    $("#XP").html(Math.round(character.currentXP) + " / " + character.neededXP + " XP");

    $("#gold").html(Math.floor(character.gold).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " gold");

    $("#characterStats").html("\
        <div style='font-size:1.3em;'>" + character.name + "</div>\
        <div>Level " + character.level + "</div>\
        <div>" + Math.round(character.HP) + "/" + character.maxHP + " HP</div>\
        <div>" + Math.round(character.AP) + "/" + character.maxAP + " AP</div>\
        <div>" + character.currentXP + " / " + character.neededXP + " XP</div><br />\
        <div>Attack</div>\
        <div>Special Attack</div>\
        <div>Defense</div>\
        <div>Special Defense</div>\
        <div>Speed</div><br />\
        <div>HP Regen/second</div>\
    ");

    $("#characterStatsValues").html("\
        <div style='font-size:1.3em;'>&nbsp;</div>\
        <br />\
        <br />\
        <br /><br />\
        <div>" + character.attack + "</div>\
        <div>" + character.spA + "</div>\
        <div>" + character.defense + "</div>\
        <div>" + character.spD + "</div>\
        <div>" + character.speed + "</div><br />\
        <div>" + character.autoheal.toFixed(2) + "</div>\
    ");

    $("#proficiencies").html("\
        <div style='font-size:1.3em'>Proficiencies</div>\
        <div>Unarmed</div>\
        <div>Blades</div>\
        <div>Bows</div>\
        <div>Shields</div>\
        <div>Magic</div>\
    ");

    $("#proficienciesValues").html("\
        <div style='font-size:1.3em;'>&nbsp;</div>\
        <div>" + character.unarmedProf + "</div>\
        <div>" + character.bladeProf + "</div>\
        <div>" + character.bowProf + "</div>\
        <div>" + character.shieldProf + "</div>\
        <div>" + character.magicProf + "</div>\
    ");

    $("#gameStats").html("\
        <div style='font-size:1.3em;'>Game Stats</div>\
        <div>XP per Click</div>\
        <div>XP per Second</div><br />\
        <div>Gold per Click</div>\
        <div>Gold per Second</div><br />\
        <div>Enemies Killed</div>\
        <div>Times Died</div><br />\
        <div>Total Clicks</div>\
    ");

    $("#gameStatsValues").html("\
        <div style='font-size:1.3em;'>&nbsp;</div>\
        <div>" + character.clickXP + "</div>\
        <div>" + character.XPS.toFixed(1) + "</div><br />\
        <div>" + character.clickGold + "</div>\
        <div>" + character.GPS.toFixed(1) + "</div><br />\
        <div>" + character.enemiesKilled + "</div>\
        <div>" + character.timesDied + "</div><br />\
        <div>" + character.totalClicks +"</div>\
    ");
}

var saveInterval = 120000;
var saveTimer = 0;
var timeSinceLastSave = saveTimer / 1000;

function toggleAutoSaving() {
    if (settings.autoSave === "ON") settings.autoSave = "OFF";
    else settings.autoSave = "ON";
}

function updateGame() {
    character.gainXP(character.XPS / 10.0);
    character.gainGold(character.GPS / 10.0);

    updateCharacterPanel();

    checkVersion();

    if (settings.autoSave === "ON") {
        if (saveTimer >= saveInterval) {
            saveGame();
        }
    }

    saveTimer += 100;

    $("#autoSaveStatus").html(settings.autoSave);

    timeSinceLastSave = saveTimer / 1000;
    $("#timeSinceLastSave").html(timeSinceLastSave.toFixed(1));

    if(!inCombat && character.HP < character.maxHP) character.HP += character.autoheal/10;

    updateHealthBars();
}

function bottomNotify(text, type, time) {
    var t = time || 3000;
    var notificationBar = $(document.createElement("div"));

    notificationBar.attr({
        class: "alert alert-"+ type +" alert-dismissable col-md-8 col-md-offset-2"
    });
    notificationBar.append("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
    notificationBar.append(text);

    $(".noteContainer").append(notificationBar);
    var n = $(".alert:last");

    window.setTimeout(function () {
        n.fadeOut("slow", function () {
            n.remove();
        });
    }, t);
}

function newGame() {
    window.localStorage.removeItem("saveState");

    settings = defaultSettings;
    character = defaultCharacter;
    placeMine = defaultPlaceMine;
    upgrades = defaultUpgrades;
    $("div#upgradesTab").html('<div id="upgradeCounter"></div>');
    unlockedUpgradesCount = 0;

    character.name = prompt("What is your name?") || "Grabnar";

    updatePlaces();
    monsters.populateList();

    updateInventory();

    saveGame();
}

function checkVersion() {
    $("#version").html(VERSION);

    var currentVersion = $.ajax({
        url: "version.txt",
        cache: false
    })
        .done(function(d) {
            if(VERSION !== d) {
                $("#versionBar").show();
            }
        });

    var devVersion = $.ajax({
        url: "/rpg-clicker/dev/devversion.txt",
        cache: false,
    })
        .done(function(d) {
            $("#devVersion").html(d);
        });
}

function saveGame() {
    var saveState = {};

    saveState.version = VERSION;

    saveState.character = character;
    saveState.placeMine = placeMine;
    saveState.settings = settings;
    saveState.upgrades = upgrades;
    saveState.unlockedUpgradesCount = unlockedUpgradesCount;

    window.localStorage.setItem("saveState", JSON.stringify(saveState));

    bottomNotify("Game saved!", "info");

    saveTimer = 0;

    return saveState;
}

function loadGame() {
    var loadState = JSON.parse(window.localStorage.getItem("saveState"));
    var loadEverything = function() {
        for (var prop in loadState.character) {
            character[prop] = loadState.character[prop];
        }
        for (var prop in loadState.placeMine) {
            placeMine[prop] = loadState.placeMine[prop];
        }
        for (var i = 0; i < loadState.upgrades.length; i++) {
            for (var prop in loadState.upgrades[i]) {
                upgrades[i][prop] = loadState.upgrades[i][prop];
            }
            upgrades[i].inList = false;
        }
        unlockedUpgradesCount = loadState.unlockedUpgradesCount;
        character.calculateGPS();
        settings = loadState.settings;

        updatePlaces();
        monsters.populateList();

        character.fixInventory();
        updateInventory();
    };

    if (loadState) {
        if(loadState.version !== VERSION) {
            if(confirm("We have detected that your save file is from a different (probably older) version of RPG Clicker.\n\n\
Attempting to load this save file could result in unwanted side-effects, including breaking the game, which would require a game reset.\n\n\
Do you want to attempt to load this save file? (Press OK to load, Cancel to start a new game)")) {
                loadEverything();
            } else newGame();
        } else loadEverything();
    } else newGame();

    updatePlaces();

    bottomNotify("Game loaded!", "info");

    return loadState;
}

function randomFromInterval(from, to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}