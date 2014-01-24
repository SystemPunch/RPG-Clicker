var Monster = function(name, maxHP) {
    this.name = name;
    this.HP = maxHP;
    this.maxHP = maxHP;
    this.moveset = [];

    return this;
};

var monsters = {
    list: [],

    populateList: function() {
        for(var i=0; i<this.list.length; i++) {
            var $mon = $(document.createElement("option"));

            $mon.attr("value", i);

            $mon.html(this.list[i].name);

            $("#monsterList").append($mon);
        }
    }
};

var monRat = new Monster("Rat", 10);
var monGoblin = new Monster("Goblin", 20);

monsters.list.push(monRat);
monsters.list.push(monGoblin);

