var Move = function() {
    this.damage = arguments["damage"];
    this.status = arguments["status"] || 0;
    this.priority = arguments["priority"] || 0;
};