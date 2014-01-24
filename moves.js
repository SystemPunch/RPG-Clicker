var Move = function() {
    this.name = arguments["name"];
    this.type = arguments["type"];
    this.weapon = arguments["weapon"];
    this.power = arguments["power"];
    this.ailments = arguments["ailments"];
    this.ailmentChances = arguments["ailmentChances"];
    this.priority = arguments["priority"] || 0;
};

/*-----
Unarmed
-----*/

var movePunch = new Move({
    name: "PUNCH",
    type: "physical",
    weapon: "unarmed",
    power: 30
});

var moveBite = new Move({
    name: "BITE",
    type: "physical",
    weapon: "unarmed",
    power: 30
});

/*----
Blades
----*/