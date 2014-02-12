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
    var consumable = App.ViewModels.Consumable;
    var equipment = App.ViewModels.Equipment;

    self.potionHP1 = new consumable({
        name: "Vitality Tincture I",
        id: 0,
        effect: function() {

        },
        description: "Restores 20 HP",
        cost: 100
    });

    self.crackedKnife = new equipment({
        name: "Cracked Knife",
        id: 0,
        slot: "weapon",
        weaponType: "blade",
        attackMod: 10,
        description: "A cracked knife"
    });
};