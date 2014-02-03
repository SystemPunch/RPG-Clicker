var world = {
    explore: function() {

    },

    forest1: {
        name: "The Forest",

        discovered: true,

        levelRange: "1-5",

        explore: function() {
            var result = randomFromInterval(1, 100);

            if(result <= 20) {
                // Fight Rat
            } else if(result <= 40) {
                // Fight Goblin
            } else if(result <= 50) {
                // Some random thing
            } else if(result <= 70) {
                // Another random thing
            } else {
                // Nothing significant
            }
        }
    }
};