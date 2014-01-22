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

    critChance: 10 / 512,
    critPower: 7 / 6,

    lightBladeProf: 1,
    heavyBladeProf: 1,
    bowProf: 1,
    staffProf: 1,
    shieldProf: 1,

    enemiesKilled: 0,
    timesDied: 0,

    XPS: 0,
    clickXP: 1,

    gold: 0,
    GPS: 0,
    clickGold: 1,

    totalClicks: 0,

    inventory: [],

    levelUp: function () {
        this.level++;
        this.neededXP = this.level * 100;
        this.currentXP = 0;

        var stats = ["attack", "spA", "defense", "spD", "speed", "maxHP"];
        var statPoints = randomFromInterval(16, 24);

        while(statPoints) {
            var whichStat = stats[Math.floor(Math.random()*stats.length)];

            console.log("Now have "+ statPoints +" stat points.");
            console.log("Putting point into "+ whichStat +".");

            if(whichStat === "maxHP") this.maxHP += 2;
            else this[whichStat]++;

            statPoints--;
        }

        this.HP = this.maxHP;
        this.critChance = this.speed / 512;
        this.critPower = (2*this.level + 5) / (this.level + 5);

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
        updateCharacterPanel();
    },

    clickXPButton: function() {
        this.gainXP(this.clickXP);
    },

    clickGoldButton: function() {
        this.gainGold(this.clickGold);
    },

    calculateGPS: function () {
        this.GPS =
            placeMine.goldBonus;
    }
};

var defaultCharacter;