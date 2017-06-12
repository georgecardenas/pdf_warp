var app = angular
  .module('pdf_warp',['ngRoute','draggabilly'])

  .config(function ($locationProvider) 
  {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
   })

  .controller('ProductCtrl', function($http, $location, $rootScope) {
    var vm = this;
    vm.products = [];
    vm.path = $location.path() + '/save';
    vm.template = "";
    vm.initTemplate = "";
    
    $http.get('http://localhost/warpdf/store/product/2/json')
    .then(function(result) {
      vm.products = result.data.products;
      var templateInfo = Drupal.settings.pdf_warp.template_content;
      vm.initTemplate = JSON.parse(templateInfo[0].content);
    });
    
    vm.save = function() {
      var elements = document.querySelectorAll('*[id^="pdf_product_"]');
      var containerBounds = document.getElementById("pdf-template").getBoundingClientRect();
      var template = {
        pdf_elements: {},
        edit_elements: {}
      }
      angular.forEach(elements, function(element, index){
        var elementBounds = element.getBoundingClientRect();
        template.pdf_elements[element.id] = {
          x: elementBounds.left - containerBounds.left,
          y: elementBounds.top - containerBounds.top
        };
        template.edit_elements[element.id] = {
          left: element.style.left || '0px',
          top: element.style.top || '0px'
        };
      });
      
      vm.template = JSON.stringify(template);
    }
    
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