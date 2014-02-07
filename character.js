Game.ViewModels.character = function() {
    var self = this;

    //noinspection JSUnusedGlobalSymbols
    self.character = {
        name: ko.observable("Grabnar"),

        level: ko.observable(1),
        XP: ko.observable(0),
        XPNeeded: ko.calculated(function() {
            return self.level() * 100;
        }),
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

        unarmedProf: ko.observable(1),
        unarmedProfXP: 0,
        unarmedProfXPNeeded: ko.calculated(function() {
            return Math.floor(5 * Math.pow(1.1, self.unarmedProf()));
        }),
        bladeProf: ko.observable(1),
        bladeProfXP: 0,
        bladeProfXPNeeded: ko.calculated(function() {
            return Math.floor(5 * Math.pow(1.1, self.bladeProf()));
        }),
        bowProf: ko.observable(1),
        bowProfXP: 0,
        bowProfXPNeeded: ko.calculated(function() {
            return Math.floor(5 * Math.pow(1.1, self.bowProf()));
        }),
        shieldProf: ko.observable(1),
        shieldProfXP: 0,
        shieldProfXPNeeded: ko.calculated(function() {
            return Math.floor(5 * Math.pow(1.1, self.shieldProf()));
        }),
        magicProf: ko.observable(1),
        magicProfXP: 0,
        magicProfXPNeeded: ko.calculated(function() {
            return Math.floor(5 * Math.pow(1.1, self.magicProf()));
        }),

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
        },

        gainGold: function(amount) {
            self.character.gold(self.character.gold() + amount);
        }
    };
};