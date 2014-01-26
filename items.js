// ITEMS

function Consumable(args) {
    this.quantity = 0;
    this.name = args.name;
    this.effect = args.effect;


}

var potionHP1 = new Consumable({
    name: "Vitality Tincture I",
    effect: function() {
        character.HP += 20;
        if(character.HP > character.maxHP) character.HP = character.maxHP;
    }
});

function updateInventory() {

}