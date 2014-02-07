App.ViewModels.Character = function() {
    var self = this;

    self.name = ko.observable("Grabnar");

    self.level = ko.observable(1);
    self.XP = ko.observable(0);
    self.XPNeeded = ko.computed(function() {
        return self.level() * 100;
    });

    self.HP = ko.observable(30);
    self.HPMax = ko.observable(30);
};