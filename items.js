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
});

var consumableList = [];
var equipmentList = [];

function Consumable(args) {
    this.type = "consumable";
    this.quantity = 0;
    this.name = args.name;
    this.id = args.id;
    this.effect = args.effect;

    this.description = args.description;

    consumableList.push(this);
}

// CONSUMABLES
var potionHP1 = new Consumable({
    name: "Vitality Tincture I",
    id: 0,
    effect: function() {
        if(character.HP < character.maxHP) {
            character.HP += 20;
            if(character.HP > character.maxHP) character.HP = character.maxHP;
            this.quantity--;
            bottomNotify("You have used a Vitality Tincture I", "info");
        } else bottomNotify("You are already at full health!", "warning");
    },

    description: "Restores 20 HP"
});

var potionAP1 = new Consumable({
    name: "Energy Tincture I",
    id: 1,
    effect: function() {
        var isFull = true;
        var move;

        var i;

        for(i=0; i<character.moveset.length; i++) {
            move = character.moveset[i];
            if(move.AP < move.maxAP) isFull = false;
        }

        if(!isFull) {
            for(i=0; i<character.moveset.length; i++) {
                move = character.moveset[i];
                move.AP += 5;
                if(move.AP > move.maxAP) move.AP = move.maxAP;
            }
            updateSkillButtons();
            this.quantity--;
            bottomNotify("You have used an Energy Tincture I", "info");
        } else bottomNotify("All of your moves already have full AP!", "warning");
    },

    description: "Restores AP of all skills by 5"
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
        } else if(item.type === "equipment") {

        }
    }
}

function searchInventory(item) {
    for(var i=0; i<character.inventory.length; i++) {
        if(character.inventory[i].id === item.id && character.inventory[i].type === item.type) return i;
    }

    return -1;
}