$(function() {
    Game.newGame();
});

var gameViewModel = function() {
    var self = this;

    self.newGame = function() {
        self.character.name(prompt("What is your name?") || "Grabnar");
    };

    //noinspection JSUnusedGlobalSymbols
    self.character = {
        name: ko.observable("Grabnar"),

        level: ko.observable(1),
        XP: ko.observable(0),
        XPNeeded: ko.observable(10),
        XPS: ko.observable(0),
        XPPerClick: ko.observable(1),

        HP: ko.observable(30),
        HPMax: ko.observable(30),
        HPRegen: ko.observable(0.2),

        AP: ko.observable(100),
        APMax: ko.observable(100),

        attack: ko.observable(10),
        specialAttack: ko.observable(10),
        defense: ko.observable(10),
        specialDefense: ko.observable(10),
        speed: ko.observable(10),

        attackMod: ko.observable(0),
        specialAttackMod: ko.observable(0),
        defenseMod: ko.observable(0),
        specialDefenseMod: ko.observable(0),
        speedMod: ko.observable(0),

        moveset: ko.observableArray(),
        ailments: ko.observableArray(),

        unarmedProf: ko.observable(0),
        unarmedProfXP: ko.observable(0),
        unarmedProfXPNeeded: ko.observable(10),
        bladeProf: ko.observable(0),
        bladeProfXP: ko.observable(0),
        bladeProfXPNeeded: ko.observable(10),
        bowProf: ko.observable(0),
        bowProfXP: ko.observable(0),
        bowProfXPNeeded: ko.observable(10),
        shieldProf: ko.observable(0),
        shieldProfXP: ko.observable(0),
        shieldProfXPNeeded: ko.observable(10),
        magicProf: ko.observable(0),
        magicProfXP: ko.observable(0),
        magicProfXPNeeded: ko.observable(10),

        gold: ko.observable(0),
        GPS: ko.observable(0),
        goldPerClick: ko.observable(1),

        inventory: ko.observableArray(),

        gainXP: function(amount) {
            self.character.XP(self.character.XP() + amount);
            if(self.character.XP() >= self.character.XPNeeded()) self.character.levelUp();
        },

        levelUp: function() {
            self.character.XP(0);
            self.character.level(self.character.level() + 1);
        }
    };
};

var Game = new gameViewModel();
ko.applyBindings(Game);