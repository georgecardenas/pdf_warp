var app = angular
  .module('pdf_warp',['ngRoute','draggabilly'])
  .config(function ($locationProvider) 
  {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
   })
  .controller('ProductCtrl', function($http, $location) {
    var vm = this;
    vm.products = [];
    
    $http.get('http://localhost/warpdf/store/product/2/json')
    .then(function(result) {
      vm.products = result.data.products;
    });
    
    vm.toPDF = function() {
      var element = document.getElementById('pdf_container');
      html2pdf(element);
      /*var pdf = new jsPDF('p', 'mm', 'a4');
      
      /*var source = window.document.getElementById("pdf_warp");

      var elementHandler = {
      '#toPDFButton': function (element, renderer) {
        return true;
      }}

      doc.fromHTML(
          source,
          15,
          15,
          {
            'width': 595,
            'elementHandlers': elementHandler
          },
          function (dispose) {
            doc.output("dataurlnewwindow");
          }
      );
      
      var canvas = pdf.canvas;
      canvas.width = 595;
      html2canvas(window.document.getElementById("pdf_warp"), {
          canvas:canvas,
          onrendered: function(canvas) {
              pdf.output('dataurlnewwindow');
          }
      });*/
    }
  });

jQuery(document).ready(function () {
  angular.bootstrap(document.getElementById('pdf_warp'), ['pdf_warp']);
});