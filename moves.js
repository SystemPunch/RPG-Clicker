var Move = function() {
    this.type = arguments["type"];
    this.weapon = arguments["weapon"];
    this.power = arguments["power"];
    this.ailments = arguments["ailments"];
    this.ailmentChances = arguments["ailmentChances"];
    this.priority = arguments["priority"] || 0;

    this.flavor = arguments["flavor"];
};

/*-----
Unarmed
-----*/
