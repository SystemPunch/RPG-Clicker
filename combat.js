var Move = function() {
    this.type = arguments["type"];
    this.weapon = arguments["weapon"];
    this.power = arguments["power"];
    this.status = arguments["status"] || 0;
    this.priority = arguments["priority"] || 0;

    this.flavor = arguments["flavor"];
};