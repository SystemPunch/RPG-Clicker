$(function() {
    window.Game = new App.ViewModels.Game();
    Game.Loop();

    ko.applyBindings(Game);
});

App.randomFromInterval = function(from, to) {
    return Math.floor(Math.random()*(to-from+1) + from);
};