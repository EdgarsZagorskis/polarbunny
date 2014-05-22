"use strict";
(function(){
     var insertStyle = function(link){
         var e = document.createElement("link");
         e.setAttribute('rel', 'stylesheet');
         e.setAttribute('href', link);
         document.head.appendChild(e);
     }   ;
    insertStyle('//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css');
})();

var app = angular.module('app',[]);

app.controller('DrawController', ['$scope',function($scope){
              $scope.you=' me';

    $scope.canvas = {};
    for (var y=1;y<=25;y++){
        $scope.canvas[y]={};
        for (var x=1;x<=80;x++){
            $scope.canvas[y][x]={};
        }

    }



}]);
