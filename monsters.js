var Monster = function(args) {
    this.name = args.name;
    this.HP = args.HP;
    this.maxHP = args.HP;

    this.level = args.level;

    this.attack = args.attack;
    this.spA = args.spA;
    this.defense = args.defense;
    this.spD = args.spD;
    this.speed = args.speed;

    this.attackMod = 0;
    this.spAMod = 0;
    this.defenseMod = 0;
    this.spDMod = 0;
    this.speed = 0;

    this.moveset = [];

    this.ailments = [];

    this.lootTable = [];

    return this;
};

var monsters = {
    list: [],

    populateList: function() {
        $("#monsterList").empty();

        for(var i=0; i<this.list.length; i++) {
            var $mon = $(document.createElement("option"));

            $mon.attr("value", i);

            $mon.html(this.list[i].name +" - Lvl. "+ this.list[i].level);

            $("#monsterList").append($mon);
        }
    }
};

var monRat = new Monster({
    name: "Rat",
    HP: 25,
    level: 1,
    attack: 10,
    spA: 2,
    defense: 6,
    spD: 2,
    speed: 8
});
monRat.moveset.push(moveBite);
monRat.lootTable.push([potionHP1, 5]);
monRat.lootTable.push([potionAP1, 10]);
monsters.list.push(monRat);

var monGoblin = new Monster({
    name: "Goblin",
    HP: 40,
    level: 5,
    attack: 20,
    spA: 10,
    defense: 16,
    spD: 10,
    speed: 12
});
monGoblin.moveset.push(movePunch);
monGoblin.moveset.push(moveStab);
monGoblin.lootTable.push([potionHP1, 15]);
monGoblin.lootTable.push([potionAP1, 20]);
monGoblin.lootTable.push([weaponCrackedKnife, 5]);
monsters.list.push(monGoblin);

var monCorruptedGnome = new Monster({
    name: "Corrupted Gnome",
    HP: 60,
    level: 10,
    attack: 25,
    spA: 18,
    defense: 30,
    spD: 28,
    speed: 22
});
monCorruptedGnome.moveset.push(movePunch);
monCorruptedGnome.moveset.push(moveSweepKick);
monCorruptedGnome.lootTable.push([potionHP1, 30]);
monCorruptedGnome.lootTable.push([potionAP1, 35]);
monsters.list.push(monCorruptedGnome);