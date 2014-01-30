// ITEMS

$(function() {
    $("#consumableList").on("click", "button", function(e) {
        var index = this.name;

        character.inventory[index].effect();

        if(character.inventory[index].quantity <= 0) {
            character.inventory.splice(index, 1);
        }

        updateInventory();
    });

    $("#consumableShopList").on("click", "button", function(e) {
        var index = this.name;

        buyItem(consumableShop[index]);
    });

    $("#consumableShopList").on("click", "button", function(e) {
        var index = this.name;

        buyItem(equipmentShop[index]);
    });

    updateShop();
});

var consumableList = [];
var consumableShop = [];
var equipmentList = [];
var equipmentShop = [];

function Consumable(args) {
    this.type = "consumable";
    this.quantity = 0;
    this.name = args.name;
    this.id = args.id;
    this.effect = args.effect;

    this.description = args.description;

    this.cost = args.cost || 0;

    consumableList.push(this);

    if(args.inShop) consumableShop.push(this);
}

function Equipment(args) {
    this.type = "equipment";
    this.quantity = 0;
    this.name = args.name;
    this.id = args.id;

    this.slot = args.slot;
    this.weaponType = args.weaponType;

    this.attackMod = args.attackMod || 0;
    this.spAMod = args.spAMo || 0;
    this.defenseMod = args.defenseMod || 0;
    this.spDMod = args.spDMod || 0;
    this.speedMod = args.speedMod || 0;

    this.equipped = args.equipped || false;

    this.description = args.description;

    equipmentList.push(this);
}
/////////////////
// CONSUMABLES //
/////////////////
var potionHP1 = new Consumable({
    name: "Vitality Tincture I",
    id: 0,
    effect: function() {
        if(character.HP < character.maxHP) {
            character.HP += 20;
            if(character.HP > character.maxHP) character.HP = character.maxHP;
            this.quantity--;
            bottomNotify("You have used a Vitality Tincture I", "info");
        } else bottomNotify("You are already at full HP!", "warning");
    },

    description: "Restores 20 HP",

    cost: 100,

    inShop: true
});
var potionAP1 = new Consumable({
    name: "Energy Tincture I",
    id: 1,
    effect: function() {
        if(character.AP < character.maxAP) {
            character.AP += 20;
            if(character.AP > character.maxAP) character.AP = character.maxAP;
            this.quantity--;
            updateSkillButtons();
            bottomNotify("You have used an Energy Tincture I", "info");
        } else bottomNotify("You are already at full AP!", "warning");
    },

    description: "Restores 20 AP",

    cost: 100,

    inShop: true
});

// EQUIPMENT
var weaponFists = new Equipment({
    name: "Fists",
    id: 0,
    slot: "weapon",
    weaponType: "unarmed",
    equipped: true,

    description: "Your fists."
});

////////////
// BLADES //
////////////
var weaponCrackedKnife = new Equipment({
    name: "Cracked Knife",
    id: 1,
    slot: "weapon",
    weaponType: "blade",
    equipped: false,

    attackMod: 10,

    description: "A cracked knife."
});

function updateInventory() {
    $("#equipmentList").empty();
    $("#consumableList").empty();

    for(var i=0; i<character.inventory.length; i++) {
        var item = character.inventory[i];

        if(item.type === "consumable") {
            var itemRow = $(document.createElement("tr"));
            itemRow.append("<td>"+ item.name +"</td>");
            itemRow.append("<td>"+ item.quantity +"</td>");

            var useButton = $(document.createElement("button"));
            useButton.attr({
                type: "button",
                class: "btn btn-default btn-xs",
                name: i
            });
            useButton.html("Use");

            itemRow.append($(document.createElement("td")).append(useButton));

            $(itemRow).tooltip({
                placement: "auto",
                title: item.description
            });

            $("#consumableList").append(itemRow);
        } else if(item.type === "equipment" && !item.equipped) {
            var itemRow = $(document.createElement("tr"));
            itemRow.append("<td>"+ item.name +"</td>");
            itemRow.append("<td>"+ item.quantity +"</td>");

            var equipButton = $(document.createElement("button"));
            equipButton.attr({
                type: "button",
                class: "btn btn-default btn-xs",
                name: i
            });
            equipButton.html("Equip");

            itemRow.append($(document.createElement("td")).append(equipButton));

            $(itemRow).tooltip({
                placement: "auto",
                title: item.description
            });

            $("#equipmentList").append(itemRow);
        }
    }
}

function updateShop() {
    for(var i=0; i<consumableShop.length; i++) {
        var item = consumableShop[i];

        var itemRow = $(document.createElement("tr"));
        itemRow.append("<td>"+ item.name +"</td>");
        itemRow.append("<td>"+ item.cost +"</td>");

        var buyButton = $(document.createElement("button"));
        buyButton.attr({
            type: "button",
            class: "btn btn-default btn-xs",
            name: i
        });
        buyButton.html("Buy");

        itemRow.append($(document.createElement("td")).append(buyButton));

        $(itemRow).tooltip({
            placement: "auto",
            title: item.description
        });

        $("#consumableShopList").append(itemRow);
    }

    for(var i=0; i<equipmentShop.length; i++) {
        var item = equipmentShop[i];

        var itemRow = $(document.createElement("tr"));
        itemRow.append("<td>"+ item.name +"</td>");
        itemRow.append("<td>"+ item.cost +"</td>");

        var buyButton = $(document.createElement("button"));
        buyButton.attr({
            type: "button",
            class: "btn btn-default btn-xs",
            name: i
        });
        buyButton.html("Buy");

        itemRow.append($(document.createElement("td")).append(buyButton));

        $(itemRow).tooltip({
            placement: "auto",
            title: item.description
        });

        $("#equipmentShopList").append(itemRow);
    }
}

function buyItem(item) {
    if(item.cost <= character.gold) {
        character.gold -= item.cost;
        character.gainItem(item);
        bottomNotify("You have bought "+ item.name, "info");
    } else bottomNotify("You don't have enough gold!", "warning");
}

function searchInventory(item) {
    for(var i=0; i<character.inventory.length; i++) {
        if(character.inventory[i].id === item.id && character.inventory[i].type === item.type) return i;
    }

    return -1;
}

function unequipItem(item) {

}

function equipItem(item) {

}