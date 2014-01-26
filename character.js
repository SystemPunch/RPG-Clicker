var character = {
    name: "",

    level: 1,
    currentXP: 0,
    neededXP: 100,

    HP: 30,
    maxHP: 30,

    attack: 10,
    spA: 10,
    defense: 10,
    spD: 10,
    speed: 10,

    unarmedProf: 1,
    unarmedXP: 0,
    unarmedXPNeeded: 10,
    bladeProf: 1,
    bladeXP: 0,
    bladeXPNeeded: 10,
    bowProf: 1,
    bowXP: 0,
    bowXPNeeded: 10,
    shieldProf: 1,
    shieldXP: 0,
    shieldXPNeeded: 10,
    magicProf: 1,
    magicXP: 0,
    magicXPNeeded: 10,

    ailments: [],

    enemiesKilled: 0,
    timesDied: 0,

    XPS: 0,
    clickXP: 1,

    gold: 0,
    GPS: 0,
    clickGold: 1,

    totalClicks: 0,

    inventory: [],

    moveset: [],

    victory: function() {
        this.enemiesKilled++;
    },

    die: function() {
        this.timesDied++;
    },

    levelUp: function () {
        this.level++;
        this.neededXP = this.level * 100;
        this.currentXP = 0;

        var stats = ["attack", "spA", "defense", "spD", "speed"];

        var whichStats = [];

        while(whichStats.length < 3) {
            var which = randomFromInterval(0, stats.length-1);

            if(whichStats.indexOf(which) === -1) whichStats.push(which);
        }

        for(var i=0; i<whichStats.length; i++) {
            var k = whichStats[i];

            this[stats[k]] += randomFromInterval(2, 4);
        }

        this.maxHP += randomFromInterval(2, 4);

        this.HP = this.maxHP;

        updateCharacterPanel();
        bottomNotify("Level up! You are now level " + this.level, "success");
    },

    gainXP: function (num) {
        this.currentXP += num;
        if (this.currentXP >= this.neededXP) this.levelUp();
        else updateCharacterPanel();
    },

    gainGold: function (num) {
        this.gold += num;
        updateUpgrades();
        updateCharacterPanel();
    },

    clickXPButton: function() {
        this.gainXP(this.clickXP);
        this.totalClicks++;
    },

    clickGoldButton: function() {
        this.gainGold(this.clickGold);
        this.totalClicks++;
    },

    calculateGPS: function () {
        this.GPS =
            placeMine.goldBonus;
    },

    learnMove: function(move) {
        this.moveset.push(move);
    }
};

character.moveset.push(movePunch);

var defaultCharacter;