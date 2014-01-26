function Move(args) {
    this.name = args["name"];
    this.type = args["type"];
    this.weapon = args["weapon"];
    this.power = args["power"];
    this.ailments = args["ailments"];
    this.ailmentChances = args["ailmentChances"];
    this.priority = args["priority"] || 0;
    this.critRate = args["critRate"] || 0;
    this.AP = args["AP"] || 10;
};

/*-----
Unarmed
-----*/

var movePunch = new Move({
    name: "PUNCH",
    type: "physical",
    weapon: "unarmed",
    power: 30,
    AP: 35
});

var moveBite = new Move({
    name: "BITE",
    type: "physical",
    weapon: "unarmed",
    power: 30,
    AP: 35
});

/*----
Blades
----*/