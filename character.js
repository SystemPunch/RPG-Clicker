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

    // Combat
    self.moveset = [App.ViewModels.Moves.punch];
    self.ailments = [];

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

    // Stat mods
    self.attackMod = ko.computed(function() {
        return self.equipped.weapon().attackMod + self.equipped.body().attackMod + self.equipped.hands().attackMod + self.equipped.feet().attackMod;
    });
    self.specialAttackMod = ko.computed(function() {
        return self.equipped.weapon().specialAttackMod + self.equipped.body().specialAttackMod + self.equipped.hands().specialAttackMod + self.equipped.feet().specialAttackMod;
    });
    self.defenseMod = ko.computed(function() {
        return self.equipped.weapon().defenseMod + self.equipped.body().defenseMod + self.equipped.hands().defenseMod + self.equipped.feet().defenseMod;
    });
    self.specialDefenseMod = ko.computed(function() {
        return self.equipped.weapon().specialDefenseMod + self.equipped.body().specialDefenseMod + self.equipped.hands().specialDefenseMod + self.equipped.feet().specialDefenseMod;
    });
    self.speedMod = ko.computed(function() {
        return self.equipped.weapon().speedMod + self.equipped.body().speedMod + self.equipped.hands().speedMod + self.equipped.feet().speedMod;
    });

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
            which = stats[App.randomFromInterval(0, stats.length-1)];
            if(whichStats.indexOf(which) === -1) whichStats.push(which);
        }

        for(var i=0; i<whichStats.length; i++) {
            stat = whichStats[i];
            self[stat](self[stat]() + App.randomFromInterval(2, 4));
        }

        self.HPMax(self.HPMax() + App.randomFromInterval(2, 4));
        self.APMax(self.APMax() + App.randomFromInterval(2, 4));
        self.HP(self.HPMax());
        self.AP(self.APMax());

        Game.queueNotification("You have gained a level! You are now level " + self.level() + "!", "success");
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
    };

    self.learnMove = function(move) {

    };

    self.Init = function() {
        self.name("Grabnar");
        self.level(1);
        self.XP(0);
        self.XPPerClick(1);
        self.XPS(0);
        self.HP(30);
        self.HPMax(30);
        self.HPRegen(0.2);
        self.AP(100);
        self.APMax(100);
        self.attack(10);
        self.specialAttack(10);
        self.defense(10);
        self.specialDefense(10);
        self.speed(10);

    };
};