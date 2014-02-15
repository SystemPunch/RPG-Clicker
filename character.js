App.ViewModels.Character = function() {
    var self = this;

    self.name = ko.observable("Grabnar");

    // Level/XP
    self.level = ko.observable(1);
    self.XP = ko.observable(0);
    self.XPNeeded = ko.computed(function() {
        return self.level() * 100;
    });
    self.XPPerClick = ko.observable(1);
    self.XPS = ko.observable(0);

    // HP/AP
    self.HP = ko.observable(30);
    self.HPMax = ko.observable(30);
    self.HPRegen = ko.observable(0.2);
    self.AP = ko.observable(100);
    self.APMax = ko.observable(100);

    // Stats
    self.attack = ko.observable(10);
    self.specialAttack = ko.observable(10);
    self.defense = ko.observable(10);
    self.specialDefense = ko.observable(10);
    self.speed = ko.observable(10);

    // Stat mods
    self.attackMod = ko.observable(0);
    self.specialAttackMod = ko.observable(0);
    self.defenseMod = ko.observable(0);
    self.specialDefenseMod = ko.observable(0);
    self.speedMod = ko.observable(0);

    // Proficiencies
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

    // Gold/Inventory
    self.gold = ko.observable(0);
    self.goldPerClick = ko.observable(1);
    self.GPS = ko.observable(0);
    self.inventory = ko.observableArray();
    self.equipped = {
        weapon: ko.observable(App.ViewModels.Items.Equipment.weaponNothing),
        body: ko.observable(App.ViewModels.Items.Equipment.bodyNothing),
        hands: ko.observable(App.ViewModels.Items.Equipment.handsNothing),
        feet: ko.observable(App.ViewModels.Items.Equipment.feetNothing)
    };

    // Misc.
    self.enemiesKilled = ko.observable(0);
    self.timesDied = ko.observable(0);
    self.totalClicks = ko.observable(0);

    // Methods
    self.gainXP = function(amount) {
        self.XP(self.XP() + amount);
        if(self.XP() >= self.XPNeeded()) self.levelUp();
    };

    self.levelUp = function() {
        self.XP(self.XP() - self.XPNeeded());
        self.level(self.level() + 1);

        var stats = ["attack", "specialAttack", "defense", "specialDefense", "speed"];
        var whichStats = [];
        var which = "";
        var stat = "";

        while(whichStats.length < 3) {
            which = stats[randomFromInterval(0, stats.length-1)];
            if(whichStats.indexOf(which) === -1) whichStats.push(which);
        }

        for(var i=0; i<whichStats.length; i++) {
            stat = whichStats[i];
            self[stat](self[stat]() + randomFromInterval(2, 4));
        }

        self.HPMax(self.HPMax() + randomFromInterval(2, 4));
        self.APMax(self.APMax() + randomFromInterval(2, 4));
        self.HP(self.HPMax());
        self.AP(self.APMax());
    };

    self.gainGold = function(amount) {
        self.gold(self.gold() + amount);
    };

    self.gainItem = function(item, amount) {
        if(_(self.inventory()).find(function(i) {
            return i.type === item.type && i.id === item.id;
        }) === undefined) self.inventory.push(item);
        item.quantity(item.quantity() + (amount || 1));
    };

    self.removeItem = function(item, amount) {
        if(_(self.inventory()).find(function(i) {
            return i.type === item.type && i.id === item.id;
        })) item.quantity(item.quantity() - (amount || 1));
        if(item.quantity() <= 0) self.inventory.remove(function(i) {
            return i.type === item.type && i.id === item.id;
        });
    }
};