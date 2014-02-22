App.ViewModels.Item = {};

App.ViewModels.Item.Consumable = function(itemData) {
    var self = this;

    self.type = "consumable";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.description = itemData.description || "";
    self.id = itemData.id;
    self.effect = function(user) {
        if(itemData.effect(user)) user.removeItem(self);
    };
    self.cost = itemData.cost || 0;
};

App.ViewModels.Item.Equipment = function(itemData) {
    var self = this;

    self.type = "equipment";
    self.quantity = ko.observable(0);
    self.name = itemData.name;
    self.description = itemData.description || "";
    self.id = itemData.id;
    self.slot = itemData.slot;
    self.weaponType = itemData.weaponType || "unarmed";

    self.attackMod = itemData.attackMod || 0;
    self.specialAttackMod = itemData.specialAttackMod || 0;
    self.defenseMod = itemData.defenseMod || 0;
    self.specialDefenseMod = itemData.specialDefenseMod || 0;
    self.speedMod = itemData.speedMod || 0;

    self.equip = function(user) {
        if(user.equipped["" + self.slot]() instanceof App.ViewModels.Item.Equipment) user.equipped["" + self.slot]().unequip(user);

        user.equipped["" + self.slot](self);
        user.removeItem(self);

        Game.queueNotification("You have equipped " + self.name, "info");
    };

    self.unequip = function(user) {
        user.equipped["" + self.slot](App.ViewModels.Items.Equipment[self.slot + "Nothing"]);
        if(self.name !== "Nothing") {
            user.gainItem(self);
            Game.queueNotification("You have unequipped " + self.name, "info");
        }
    }
};

App.ViewModels.Items = new function() {
    var self = this;
    var consumable = App.ViewModels.Item.Consumable;
    var equipment = App.ViewModels.Item.Equipment;

    self.Consumables = {
        potionHP1: new consumable({
            name: "Vitality Tincture I",
            description: "Restores 20 HP",
            id: 0,
            effect: function(user) {
                if(user.HP() >= user.HPMax()) {
                    Game.queueNotification("You are already at full health!", "danger");
                    return false;
                }
                user.HP(user.HP() + 20);
                if(user.HP() > user.HPMax()) user.HP(user.HPMax());
                return true;
            },
            cost: 100
        }),

        potionAP1: new consumable({
            name: "Energy Tincture I",
            description: "Restores 20 AP",
            id: 1,
            effect: function(user) {
                if(user.AP() >= user.APMax()) {
                    Game.queueNotification("You are already at full AP!", "danger");
                    return false;
                }
                user.AP(user.AP() + 20);
                if(user.AP() > user.APMax()) user.AP(user.APMax());
                return true;
            },
            cost: 100
        }),

        potionParalyzeHeal: new consumable({
            name: "Smelling Salts",
            description: "Cures paralysis",
            id: 2,
            effect: function(user) {
                if(user.ailments.indexOf("paralyzed") >= 0) {
                    user.ailments.splice(user.ailments.indexOf("paralyzed"), 1);
                    Game.queueNotification("You have cured your paralysis!", "success");
                } else Game.queueNotification("You are not currently paralyzed!", "danger");
            },
            cost: 150
        })
    };

    self.Equipment = {
        weaponNothing: new equipment({
            name: "Nothing",
            description: "You're unarmed!",
            id: 0,
            slot: "weapon"
        }),

        bodyNothing: new equipment({
            name: "Nothing",
            description: "You're naked!",
            id: 1,
            slot: "body"
        }),

        handsNothing: new equipment({
            name: "Nothing",
            description: "Your bare hands!",
            id: 2,
            slot: "hands"
        }),

        feetNothing: new equipment({
            name: "Nothing",
            description: "You're barefoot!",
            id: 3,
            slot: "feet"
        }),

        crackedKnife: new equipment({
            name: "Cracked Knife",
            description: "A cracked knife. Probably not all that effective.",
            id: 4,
            slot: "weapon",
            weaponType: "blade",
            attackMod: 10
        }),

        warpedBow: new equipment({
            name: "Warped Bow",
            description: "An old bow warped by time.",
            id: 5,
            slot: "weapon",
            weaponType: "bow",
            attackMod: 10,
            speedMod: 5
        })
    };
};