App.ViewModels.Game = function() {
    var self = this;

    window.requestAnimationFrame = window.requestionAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    self.perf = window.performance;
    self.time = self.perf.now();
    self.FPS = 0.0;

    self.Character = new App.ViewModels.Character();
    //self.Items = App.ViewModels.Items;
    //self.Monsters = new App.ViewModels.Monsters();

    self.Loop = function() {
        var now = self.perf.now();
        var delta = now - self.time || 0;

        self.Character.gainXP(self.Character.XPS() * delta/1000);
        self.Character.gainGold(self.Character.GPS() * delta/1000);

        self.FPS = (1000/delta).toFixed(1);
        self.time = now;
        requestAnimationFrame(self.Loop);
    };

    self.notifications = ko.observableArray();
    self.queueNotification = function(text, type, time) {
        var notification = {
            text: text,
            type: type || "info",
            time: time || 3000
        };
        self.notifications.push(notification);
        if(self.notifications().length === 1) self.showNotification(self.notifications()[0]);
    };
    self.showNotification = function(notificationData) {
        var notificationBar = $(document.createElement("div"));
        notificationBar.attr({
            id: "notification",
            class: "alert alert-" + notificationData.type + " alert-dismissable col-md-5"
        });
        notificationBar.css("display", "none");
        notificationBar.append("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
        notificationBar.append(notificationData.text);
        notificationBar.append(" <span data-bind='if: notifications().length > 1'><br />(<span data-bind='text: notifications().length - 1'></span> more notification<span data-bind='if: notifications().length > 2'>s</span>. <a data-bind='click: function() { notifications.removeAll() }' style='cursor:pointer;'>Click here to dismiss all.</a>)</span>");
        notificationBar.bind("closed.bs.alert", function() {
            notificationBar.remove();
            self.notifications.shift();
            if(self.notifications().length) self.showNotification(self.notifications()[0]);
        });

        $("#notificationContainer").append(notificationBar);
        ko.applyBindings(Game, document.getElementById("notification"));
        notificationBar.fadeIn("fast");

        setTimeout(function() {
            notificationBar.fadeOut("slow", function() {
                notificationBar.alert("close");
            });
        }, notificationData.time);
    };
};