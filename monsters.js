App.ViewModels.Monster = function(monsterData) {
    var self = this;

    self.name = monsterData.name;

    self.level = monsterData.level;

    self.HP = monsterData.HP;
    self.HPMax = monsterData.HP;

    self.attack = monsterData.attack;
    self.specialAttack = monsterData.specialAttack;
    self.defense = monsterData.defense;
    self.specialDefense = monsterData.specialDefense;
    self.speed = monsterData.speed;

    self.moveset = monsterData.moveset || [];
    self.ailments = [];
    self.lootTable = monsterData.lootTable || [];

    App.ViewModels.Monsters.list.push(self);
};

App.ViewModels.Monsters = function() {
    var self = this;
    var Monster = App.ViewModels.Monster;

    self.list = [];

    self.rat = new Monster({
        name: "Rat",
        level: 1,
        HP: 25,
        attack: 10,
        specialAttack: 2,
        defense: 6,
        specialDefense: 2,
        speed: 8
    });

    self.lesserDryadArcher = new Monster({
        name: "Lesser Dryad Archer",
        level: 5,
        HP: 38,
        attack: 24,
        specialAttack: 18,
        defense: 12,
        specialDefense: 16,
        speed: 18
    });

    self.corruptedGnome = new Monster({
        name: "Corrupted Gnome",
        level: 10,
        HP: 60,
        attack: 20,
        specialAttack: 18,
        defense: 50,
        specialDefense: 28,
        speed: 22
    });

    self.corruptedCentaur = new Monster({
        name: "Corrupted Centaur",
        level: 20,
        HP: 90,
        attack: 60,
        specialAttack: 42,
        defense: 36,
        specialDefense: 42,
        speed: 60
    });
};