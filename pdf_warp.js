var app = angular
  .module("pdf_warp", [])
  .controller("Product", function($scope, $http) {
    
  });

jQyery(document).ready(function () {
  angular.bootstrap(document.getElementById('pdf_warp'), ['pdf_warp']);
});