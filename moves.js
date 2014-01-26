function Move(args) {
    this.name = args["name"];
    this.type = args["type"];
    this.weapon = args["weapon"];
    this.power = args["power"];
    this.ailments = args["ailments"];
    this.priority = args["priority"] || 0;
    this.critRate = args["critRate"] || 0;
    this.AP = args["AP"] || 10;
    this.maxAP = this.AP;
}

// Ya'll motherfuckers know what this is
var moveStruggle = new Move({
    name: "STRUGGLE",
    type: "physical",
    weapon: "unarmed",
    power: 50,
    AP: 1,

    ailments: {
        recoil: 100
    }
});

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

var moveSweepKick = new Move({
    name: "SWEEP KICK",
    type: "physical",
    weapon: "unarmed",
    power: 40,
    AP: 30
});

/*----
Blades
----*/