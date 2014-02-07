App.ViewModels.Character = function() {
    var self = this;

    self.name = ko.observable("Grabnar");

    self.level = ko.observable(1);
    self.XP = ko.observable(0);
    self.XPNeeded = ko.computed(function() {
        return self.level() * 100;
    });
    self.XPPerClick = ko.observable(1);
    self.XPS = ko.observable(0);

    self.HP = ko.observable(30);
    self.HPMax = ko.observable(30);
    self.HPRegen = ko.observable(0.2);
    self.AP = ko.observable(100);
    self.APMax = ko.observable(100);

    self.attack = ko.observable(10);
    self.specialAttack = ko.observable(10);
    self.defense = ko.observable(10);
    self.specialDefense = ko.observable(10);
    self.speed = ko.observable(10);

    self.attackMod = ko.observable(0);
    self.specialAttackMod = ko.observable(0);
    self.defenseMod = ko.observable(0);
    self.specialDefenseMod = ko.observable(0);
    self.speedMod = ko.observable(0);

    self.unarmedProf = ko.observable(1);
    self.unarmedProfXP = 0;
    self.unarmedProfXPNeeded = ko.computed(function() {
        return 5 * Math.pow(1.1, self.unarmedProf());
    });
    self.bladeProf = ko.observable(1);
    self.bladeProfXP = 0;
    self.bladeProfXPNeeded = ko.computed(function() {
        return 5 * Math.pow(1.1, self.bladeProf());
    });
    self.bowProf = ko.observable(1);
    self.bowProfXP = 0;
    self.bowProfXPNeeded = ko.computed(function() {
        return 5 * Math.pow(1.1, self.bowProf());
    });
    self.shieldProf = ko.observable(1);
    self.shieldProfXP = 0;
    self.shieldProfXPNeeded = ko.computed(function() {
        return 5 * Math.pow(1.1, self.shieldProf());
    });
    self.magicProf = ko.observable(1);
    self.magicProfXP = 0;
    self.magicProfXPNeeded = ko.computed(function() {
        return 5 * Math.pow(1.1, self.magicProf());
    });

    self.gold = ko.observable(0);
    self.goldPerClick = ko.observable(1);
    self.GPS = ko.observable(0);

    self.enemiesKilled = ko.observable(0);
    self.timesDied = ko.observable(0);

    self.totalClicks = ko.observable(0);

    self.gainXP = function(amount) {
        self.XP(self.XP() + amount);
        if(self.XP() >= self.XPNeeded()) self.levelUp();
    };

    self.levelUp = function() {
        self.XP(self.XP() - self.XPNeeded());
        self.level(self.level() + 1);
    };

    self.gainGold = function(amount) {
        self.gold(self.gold() + amount);
    };
};