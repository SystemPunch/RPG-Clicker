$(function () {
    $(window).keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            return false;
        }
    });

    $("a#changelogTabLink").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    // INITIALIZE DEFAULTS
    defaultCharacter = $.extend(true, {}, character);
    defaultPlaceMine = $.extend(true, {}, placeMine);
    defaultUpgrades = $.extend(true, [], upgrades);
    defaultUnarmed = $.extend(true, [], unarmed);
    defaultBlade = $.extend(true, [], blade);

    loadGame();
    window.setInterval(updateGame, 100);

    bottomNotify("This is a VERY early version of the game. It may be riddled with bugs, and saves might break. If you find that your game isn't working properly, try resetting your save. If that doesn't work, please send me a bug report. This message will disappear after 15 seconds.", "warning", 15000);
});

var VERSION = "0.3.0";

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

    var characterTable = $(document.createElement("table"));
    characterTable.attr({
        class: "table table-condensed"
    });
    characterTable.append("<thead><tr><th>"+ character.name +"</th><th></th></tr></thead>");
    characterTable.append("<tbody>" +
        "<tr><td>Level "+ character.level +"</td><td></td></tr>" +
        "<tr><td>"+ Math.floor(character.HP) +" / "+ character.maxHP +" HP</td><td></td></tr>" +
        "<tr><td>"+ character.AP +" / "+ character.maxAP +" AP</td><td></td></tr>" +
        "<tr><td>"+ character.currentXP +" / "+ character.neededXP +" XP</td><td></td></tr>" +
        "<tr><td>&nbsp;</td><td></td></tr>" +
        "<tr><td>Attack</td><td>"+ character.attack +"</td></tr>" +
        "<tr><td>Special Attack</td><td>"+ character.spA +"</td></tr>" +
        "<tr><td>Defense</td><td>"+ character.defense +"</td></tr>" +
        "<tr><td>Special Defense</td><td>"+ character.spD +"</td></tr>" +
        "<tr><td>Speed</td><td>"+ character.speed +"</td></tr>" +
        "<tr><td>&nbsp;</td><td></td></tr>" +
        "<tr><td>HP Regen/second</td><td>"+ character.autoheal +"</td></tr></tbody>");

    $("#characterStats").empty();
    $("#characterStats").append(characterTable);

    var proficienciesTable = $(document.createElement("table"));
    proficienciesTable.attr({
        class: "table table-condensed"
    });
    proficienciesTable.append("<thead><tr><th>Proficiencies</th><th></th></tr></thead>");
    proficienciesTable.append("<tbody>" +
        "<tr><td>Unarmed</td><td>"+ character.unarmedProf +"</td></tr>" +
        "<tr><td>Blades</td><td>"+ character.bladeProf +"</td></tr>" +
        "<tr><td>Bows</td><td>"+ character.bowProf +"</td></tr>" +
        "<tr><td>Shields</td><td>"+ character.shieldProf +"</td></tr>" +
        "<tr><td>Magic</td><td>"+ character.magicProf +"</td></tr></tbody>");

    $("#proficiencies").empty();
    $("#proficiencies").append(proficienciesTable);

    var gameStatsTable = $(document.createElement("table"));
    gameStatsTable.attr({
        class: "table table-condensed"
    });
    gameStatsTable.append("<thead><tr><th>Game Stats</th><th></th></tr></thead>");
    gameStatsTable.append("<tbody>" +
        "<tr><td>XP per Click</td><td>"+ character.clickXP +"</td></tr>" +
        "<tr><td>XP per Second</td><td>"+ character.XPS +"</td></tr>" +
        "<tr><td>&nbsp;</td><td></td></tr>" +
        "<tr><td>Gold per Click</td><td>"+ character.clickGold +"</td></tr>" +
        "<tr><td>Gold per Second</td><td>"+ character.GPS +"</td></tr>" +
        "<tr><td>&nbsp;</td><td></td></tr>" +
        "<tr><td>Enemies Killed</td><td>"+ character.enemiesKilled +"</td></tr>" +
        "<tr><td>Times Died</td><td>"+ character.timesDied +"</td></tr>" +
        "<tr><td>&nbsp;</td><td></td></tr>" +
        "<tr><td>Total Clicks</td><td>"+ character.totalClicks +"</td></tr></tbody>");

    $("#gameStats").empty();
    $("#gameStats").append(gameStatsTable);
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

    if(!inCombat && character.HP < character.maxHP) {
        character.HP += character.autoheal/10;
        if(character.HP > character.maxHP) character.HP = character.maxHP;
    }

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
    unarmed = defaultUnarmed;
    blade = defaultBlade;
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
    saveState.unarmed = unarmed;
    saveState.blade = blade;

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
        unarmed = loadState.unarmed;
        blade = loadState.blade;
        unlockedUpgradesCount = loadState.unlockedUpgradesCount;
        character.calculateGPS();
        settings = loadState.settings;

        updatePlaces();
        monsters.populateList();

        character.fixInventory();
        updateInventory();

        fixSaveFile();
    };

    if (loadState) {
        if(loadState.version !== VERSION) {
            if(confirm("We have detected that your save file is from a different (probably older, or possibly newer if you've been playing the dev version) version of RPG Clicker.\n\n\
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

function fixSaveFile() {
    if(character.equipped.weapon.weaponType === undefined) character.equipped.weapon = weaponFists;
    if(character.moveset[0].maxAP !== undefined) character.moveset = [movePunch];
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};