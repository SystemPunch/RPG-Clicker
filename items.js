App.ViewModels.Items = function() {
    var self = this;
    var consumable = App.ViewModels.Item.Consumable;
    var equipment = App.ViewModels.Item.Equipment;

    self.Consumables = {
        potionHP1: new consumable({
            name: "Vitality Tincture I",
            id: 0,
            effect: function() {

            },
            description: "Restores 20 HP",
            cost: 100
        }),

        potionAP1: new consumable({
            name: "Energy Tincture I",
            id: 1,
            effect: function() {

            },
            description: "Restores 20 AP",
            cost: 100
        })
    };

    self.Equipment = {
        weaponNothing: new equipment({
            name: "Nothing",
            id: 0,
            slot: "weapon",
            description: "You're unarmed!"
        }),

        bodyNothing: new equipment({
            name: "Nothing",
            id: 1,
            slot: "body",
            description: "You're naked!"
        }),

        handsNothing: new equipment({
            name: "Nothing",
            id: 2,
            slot: "hands",
            description: "Your bare hands!"
        }),

        feetNothing: new equipment({
            name: "Nothing",
            id: 3,
            slot: "feet",
            description: "You're barefoot!"
        }),

        crackedKnife: new equipment({
            name: "Cracked Knife",
            id: 4,
            slot: "weapon",
            weaponType: "blade",
            attackMod: 10,
            description: "A cracked knife"
        })
    };
};

App.ViewModels.Item = {};

App.ViewModels.Item.Consumable = function(itemData) {
    var self = this;

    self.type = "consumable";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.id = itemData.id;
    self.effect = itemData.effect;
    self.description = itemData.description || "";
    self.cost = itemData.cost || 0;
};

App.ViewModels.Item.Equipment = function(itemData) {
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

    self.equip = function(user) {
        if(self.equipped[self.slot] instanceof App.ViewModels.Items.Equipment) self.equipped[self.slot].unequip(user);

        user.equipped[self.slot] = self;
        user.removeItem(self, 1);
    };

    self.unequip = function(user) {
        user.equipped[self.slot] = App.ViewModels.Items.Equipment[self.slot + "Nothing"];
        if(self.name !== "Nothing") user.gainItem(self, 1);
    }
};