var unarmed = [];
var blade = [];

var defaultUnarmed = [];
var defaultBlade = [];

function Move(args) {
    this.name = args["name"];
    this.type = args["type"];
    this.weapon = args["weapon"];
    this.power = args["power"];
    this.ailments = args["ailments"];
    this.priority = args["priority"] || 0;
    this.critRate = args["critRate"] || 0;
    this.AP = args["AP"] || 0;

    this.requiredProf = args.requiredProf || 0;

    if(this.requiredProf) eval(this.weapon).push(this);
}

// Ya'll motherfuckers know what this is
var moveStruggle = new Move({
    name: "STRUGGLE",
    type: "physical",
    weapon: "unarmed",
    power: 50,
    AP: 0,

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
    AP: 5,
});

var moveBite = new Move({
    name: "BITE",
    type: "physical",
    weapon: "unarmed",
    power: 30,
    AP: 5
});

var moveSweepKick = new Move({
    name: "SWEEP KICK",
    type: "physical",
    weapon: "unarmed",
    power: 40,
    AP: 7,
    requiredProf: 10
});

/*----
Blades
----*/

var moveStab = new Move({
    name: "STAB",
    type: "physical",
    weapon: "blade",
    power: 50,
    AP: 8,
    requiredProf: 5
});

function unlockMoves(prof) {
    var moveArray = eval(prof);

    for(var i=0; i<moveArray.length; i++) {
        var move = moveArray[i];

        if(move.requiredProf <= character[prof +"Prof"]) {
            moveArray.splice(i, 1);
            learnMove(move);
        }
    }
}

function learnMove(move) {
    if(character.moveset.length < 4) {
        character.moveset.push(move);
        bottomNotify("You have learned a new "+ move.weapon +" skill: "+ move.name, "success");
        enableCombatUI();
    }
}