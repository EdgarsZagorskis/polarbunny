"use strict";
(function () {
    var insertStyle = function (link) {
        var e = document.createElement("link");
        e.setAttribute('rel', 'stylesheet');
        e.setAttribute('href', link);
        document.head.appendChild(e);
    };
    insertStyle('//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css');
})();

var client = new ZeroClipboard(document.getElementById("copy-button"));
client.on("copy", function (event) {
    console.log(event);
    var clipboard = event.clipboardData;
    clipboard.setData("text/plain", document.getElementById('canvas').innerText);
    console.log(clipboard);
});
client.on("ready", function (readyEvent) {
    client.on("aftercopy", function (event) {
        event.target.style.display = "none";
    });
});


var app = angular.module('app', []);

app.controller('DrawController', ['$scope', function ($scope) {

    $scope.toolbar = {
        actives: {
            showGrid: true,
            char: 'X',
            fgColor: '#3969ff',
            bgColor: 'white'
        }
    };

    $scope.toggleGrid = function () {
        $scope.toolbar.actives.showGrid = !$scope.toolbar.actives.showGrid;
    }

    var getNewCell = function (x, y) {
        return {x: x, y: y, fgColor: 'white', bgColor: 'white', char: '_'}
    }

    var initCanvasCell = function (cell) {
        var newCell = {};
        if (typeof(cell) == 'object') {
            newCell.char = cell.char;
            newCell.fgColor = cell.fgColor;
            newCell.bgColor = cell.bgColor;
        }
        return newCell;

    }

    var initCanvas = function (importedCanvas) {
        var newCanvas = {};
        for (var y = 1; y <= 25; y++) {
            newCanvas[y] = {};
            for (var x = 1; x <= 80; x++) {
                newCanvas[y][x] = (typeof(importedCanvas) != 'undefined' && typeof(importedCanvas[y]) != 'undefined' && typeof(importedCanvas[y][x]) != 'undefined') ? initCanvasCell(importedCanvas[y][x]) : getNewCell();
            }
        }
        return newCanvas;
    };

    $scope.paintCell = function (x, y) {
        $scope.canvas[x][y].char = $scope.toolbar.actives.char;
        $scope.canvas[x][y].fgColor = $scope.toolbar.actives.fgColor;
        $scope.canvas[x][y].bgColor = $scope.toolbar.actives.bgColor;
        localStorage['pbCanvas'] = JSON.stringify($scope.canvas);
    };

    $scope.canvas = (typeof(localStorage['pbCanvas']) != 'undefined') ? initCanvas(JSON.parse(localStorage['pbCanvas'])) : initCanvas();


}]);
