var character = {
    name: "",

    HP: 100,
    maxHP: 100,

    attack: 10,
    defense: 10,
    evasion: 0.05,

    critChance: 0.05,
    critPower: 1.25,

    lightBladeProf: 1,
    heavyBladeProf: 1,
    bowProf: 1,
    staffProf: 1,
    shieldProf: 1,

    enemiesKilled: 0,
    timesDied: 0,

    level: 1,
    currentXP: 0,
    neededXP: 100,
    XPS: 0,
    clickXP: 1,

    gold: 0,
    GPS: 0,
    clickGold: 1,

    inventory: [],

    levelUp: function () {
        this.level++;
        this.neededXP = this.level * 100;
        this.currentXP = 0;
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

    calculateGPS: function () {
        this.GPS =
            placeMine.goldBonus;
    }
};

var defaultCharacter = {
    name: "",

    HP: 100,
    maxHP: 100,

    attack: 10,
    defense: 10,
    evasion: 0.05,

    critChance: 0.05,
    critPower: 1.25,

    lightBladeProf: 1,
    heavyBladeProf: 1,
    bowProf: 1,
    staffProf: 1,
    shieldProf: 1,

    enemiesKilled: 0,
    timesDied: 0,

    level: 1,
    currentXP: 0,
    neededXP: 100,
    XPS: 0,
    clickXP: 1,

    gold: 0,
    GPS: 0,
    clickGold: 1,

    inventory: [],

    levelUp: function () {
        this.level++;
        this.neededXP = this.level * 100;
        this.currentXP = 0;
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

    calculateGPS: function () {
        this.GPS =
            placeMine.goldBonus;
    }
};
