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
    var idEquivalence = {
      pdf_product_description: {id: 'Description', label: ''},
      pdf_product_height: {id: 'Height', label: 'Alto: '},
      pdf_product_image: {id: 'Image', label: ''},
      pdf_product_length: {id: 'Length', label: 'Largo: '},
      pdf_product_price: {id: 'Price', label: 'Precio: '},
      pdf_product_sku: {id: 'SKU', label: 'SKU: '},
      pdf_product_title: {id: 'Title', label: ''},
      pdf_product_weight: {id: 'Weight', label: 'Peso: '},
      pdf_product_width: {id: 'Width', label: 'Ancho: '}
    }
    var id = $location.path().substring($location.path().lastIndexOf('/') + 1);
    
    function addImageToPDF(doc, element, url, generate) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL("image/jpeg");
        doc.addImage(
          dataURL,
          'JPEG',
          element.x * 72 / 96,
          element.y * 72 / 96,
          element.width * 72 / 96,
          element.height * 72 / 96
        );
        if (generate) {
          doc.output('dataurlnewwindow');
        }
        canvas = null;
      };
      img.src = url;
    }
    
    $http.get('http://localhost/warpdf/store/product/' + id + '/json')
    .then(function(result) {
      vm.products = result.data.products;
      var templateInfo = Drupal.settings.pdf_warp.template_content;
      vm.initTemplate = JSON.parse(templateInfo[0].content);
      
      var doc = new jsPDF('portrait','pt','a4');
      var pdf_elements = vm.initTemplate.pdf_elements
      
      angular.forEach(Object.keys(pdf_elements), function(key, index){
        if (key != 'pdf_product_image'){
          doc.setFontSize(parseInt(pdf_elements[key].fontSize, 10) * 72 / 96);
          doc.text(pdf_elements[key].x * 72 / 96, pdf_elements[key].y * 72 / 96, idEquivalence[key].label + vm.products[0].product[idEquivalence[key].id]);
        } else {
          
        }
      });
      
      addImageToPDF(doc, pdf_elements.pdf_product_image, vm.products[0].product.Image.src, true);
      
      /*vm.toPDF = function() {
        var element = document.getElementById('pdf_container');
        html2pdf(element);
        var pdf = new jsPDF('p', 'mm', 'a4');

        var source = window.document.getElementById("pdf_warp");

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
        });
      }*/
    });
  });

jQuery(document).ready(function () {
  angular.bootstrap(document.getElementById('pdf_warp'), ['pdf_warp']);
});