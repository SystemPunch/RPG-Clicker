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

    if(self.requiredProf) App.ViewModels.Moves[self.requiredProf].push(self);
};

App.ViewModels.Moves = function() {
    var self = this;
    var Move = App.ViewModels.Move;

    self.unarmed = [];
    self.blade = [];
    self.bow = [];
    self.shield = [];
    self.magic = [];

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
};