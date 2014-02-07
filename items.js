App.ViewModels.Consumable = function(itemData) {
    var self = this;

    self.type = "consumable";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.id = itemData.id;
    self.effect = itemData.effect;
    self.description = itemData.description || "";
    self.cost = itemData.cost || 0;
};

App.ViewModels.Equipment = function(itemData) {
    var self = this;

    self.type = "equipment";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.id = itemData.id;
    self.slot = itemData.slot;
    self.weaponType = itemData.weaponType || "unarmed";

    self.attackMod = itemData.attackMod || 0;
    self.specialAttackMod = itemData.specialAttackMod || 0;
    self.defenseMod = itemData.defenseMod || 0;
    self.specialDefenseMod = itemData.specialDefenseMod || 0;
    self.speedMod = itemData.speedMod || 0;

    self.description = itemData.description || "";
};

App.ViewModels.Items = function() {
    var self = this;
};