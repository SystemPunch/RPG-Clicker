$(function() {
    window.Game = new App.ViewModels.Game();

    ko.applyBindings(Game);
});

function randomFromInterval(from, to) {
    return Math.floor(Math.random()*(to-from+1) + from);
}