App.ViewModels.Move = function(moveData) {
    var self = this;

    self.name = moveData.name;
    self.description = moveData.description;
    self.APCost = moveData.APCost || 0;

    self.type = moveData.type;
    self.weapon = moveData.weapon || "unarmed";

    self.power = moveData.power;
    self.ailments = moveData.ailments;
    self.priority = moveData.priority || 0;
    self.critRate = moveData.critRate || 0;

    self.requiredProf = moveData.requiredProf || 0;
};

App.ViewModels.Moves = new function() {
    var self = this;
    var Move = App.ViewModels.Move;

    self.unarmed = [];
    self.blade = [];
    self.bow = [];
    self.shield = [];
    self.magic = [];

    //////////////////
    // Dat Struggle //
    //////////////////
    self.struggle = new Move({
        name: "STRUGGLE",
        type: "physical",
        weapon: "unarmed",
        APCost: 0,
        power: 50,

        ailments: {
            recoil: 100
        }
    });

    /////////////
    // Unarmed //
    /////////////
    self.punch = new Move({
        name: "PUNCH",
        description: "A simple punch.",
        APCost: 5,
        type: "physical",
        weapon: "unarmed",
        power: 30
    });
    self.bite = new Move({
        name: "BITE",
        description: "A fierce bite.",
        APCost: 5,
        type: "physical",
        weapon: "unarmed",
        power: 30
    });
    self.sweepKick = new Move({
        name: "SWEEP KICK",
        description: "The user sweeps their opponent's leg, catching them off guard.",
        APCost: 7,
        type: "physical",
        weapon: "unarmed",
        power: 40,
        requiredProf: 10
    });
    self.unarmed.push(self.sweepKick);
    self.uppercut = new Move({
        name: "UPPERCUT",
        description: "An uppercut to the opponent's chin, potentially stunning them.",
        APCost: 10,
        type: "physical",
        weapon: "unarmed",
        power: 50,
        requiredProf: 15,
        ailments: {paralyze: 20}
    });
    self.unarmed.push(self.uppercut);
    self.trample = new Move({
        name: "TRAMPLE",
        description: "The user tramples over their enemy, beating battering them.",
        APCost: 10,
        type: "physical",
        weapon: "unarmed",
        power: 50,
        ailments: {paralyze: 20}
    });

    ///////////
    // Blade //
    ///////////
    self.stab = new Move({
        name: "STAB",
        description: "A painful stab.",
        APCost: 8,
        type: "physical",
        weapon: "blade",
        power: 50,
        requiredProf: 5
    });
    self.blade.push(self.stab);

    /////////
    // Bow //
    /////////
    self.quickDraw = new Move({
        name: "QUICK DRAW",
        description: "The user's range and agility allow them to strike more quickly than usual.",
        APCost: 8,
        type: "physical",
        weapon: "bow",
        power: 45,
        requiredProf: 5,
        priority: 1
    });
    self.bow.push(self.quickDraw);

    ///////////
    // Magic //
    ///////////
    self.energyBlast1 = new Move({
        name: "ENERGY BLAST I",
        description: "The user releases a blast of energy from their palms, knocking their opponents back.",
        APCost: 10,
        type: "special",
        weapon: "magic",
        power: 50,
        requiredProf: 5
    });
    self.magic.push(self.energyBlast1);
};