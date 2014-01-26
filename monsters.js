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

    this.moveset = [];

    this.ailments = [];

    return this;
};

var monsters = {
    list: [],

    populateList: function() {
        $("#monsterList").empty();

        for(var i=0; i<this.list.length; i++) {
            var $mon = $(document.createElement("option"));

            $mon.attr("value", i);

            $mon.html(this.list[i].name);

            $("#monsterList").append($mon);
        }
    }
};

var monRat = new Monster({
    name: "Rat",
    HP: 20,
    level: 1,
    attack: 8,
    spA: 2,
    defense: 4,
    spD: 2,
    speed: 8
});
monRat.moveset.push(moveBite);

var monGoblin = new Monster({
    name: "Goblin",
    HP: 35,
    level: 5,
    attack: 14,
    spA: 8,
    defense: 10,
    spD: 10,
    speed: 10
});
monGoblin.moveset.push(movePunch);

monsters.list.push(monRat);
monsters.list.push(monGoblin);

