(function () {
    var app = angular.module('Example', ['ngKnob']);

    app.controller('MainCtrl', function ($scope, $element) {

        var audioElement = $element.find('audio')[0];

        $scope.volume = 75;

        $scope.$watch('volume', function (newValue) {
            if (typeof newValue === 'undefined') return;
            audioElement.volume = parseFloat(newValue / 100, 10);
        });

    });

})();