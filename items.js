App.ViewModels.Item = {};

App.ViewModels.Item.Consumable = function(itemData) {
    var self = this;

    self.type = "consumable";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.id = itemData.id;
    self.effect = function(user) {
        if(itemData.effect(user)) user.removeItem(self);
    };
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
        if(user.equipped["" + self.slot]() instanceof App.ViewModels.Item.Equipment) user.equipped["" + self.slot]().unequip(user);

        user.equipped["" + self.slot](self);
        user.removeItem(self);
    };

    self.unequip = function(user) {
        user.equipped["" + self.slot](App.ViewModels.Items.Equipment[self.slot + "Nothing"]);
        if(self.name !== "Nothing") user.gainItem(self);
    }
};

App.ViewModels.Items = new function() {
    var self = this;
    var consumable = App.ViewModels.Item.Consumable;
    var equipment = App.ViewModels.Item.Equipment;

    self.Consumables = {
        potionHP1: new consumable({
            name: "Vitality Tincture I",
            id: 0,
            effect: function(user) {
                if(user.HP() >= user.HPMax()) return false;
                user.HP(user.HP() + 20);
                if(user.HP() > user.HPMax()) user.HP(user.HPMax());
                return true;
            },
            description: "Restores 20 HP",
            cost: 100
        }),

        potionAP1: new consumable({
            name: "Energy Tincture I",
            id: 1,
            effect: function(user) {
                if(user.HP() >= user.HPMax()) return false;
                user.AP(user.AP() + 20);
                if(user.AP() > user.APMax()) user.AP(user.APMax);
                return true;
            },
            description: "Restores 20 AP",
            cost: 100
        }),

        potionParalyzeHeal: new consumable({
            name: "Smelling Salts",
            id: 2,
            effect: function() {
            },
            description: "Cures paralysis",
            cost: 150
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
            description: "A cracked knife. Probably not all that effective."
        }),

        warpedBow: new equipment({
            name: "Warped Bow",
            id: 5,
            slot: "weapon",
            weaponType: "bow",
            attackMod: 10,
            speedMod: 5,
            description: "An old bow warped by time."
        })
    };
};