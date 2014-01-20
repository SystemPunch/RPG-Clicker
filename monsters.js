var monster = {
    name: "",
    HP: 0,
    maxHP: 0,
    moveset: [],

    attack: function () {
        var move = this.moveset[Math.floor(Math.random() * this.moveset.length)];
    }
};
