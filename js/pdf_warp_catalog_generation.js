var app = angular
  .module('pdf_warp',['ngRoute','draggabilly'])

  .config(function ($locationProvider) 
  {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
   })

  .controller('GenerationCtrl', function($http, $location, $timeout) {
    var vm = this;
    var id = $location.path().substring($location.path().lastIndexOf('/') + 1);
    var app = $location.path().split('/')[1];
    var nImages = 0;
    var imagesLoaded = 0;
    
    function addImagesToPDF(doc, src, element, page) {
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
        doc.setPage(page);
        doc.addImage(
          dataURL,
          'JPEG',
          element.x * 72 / 96 + 40 * 72 / 96,
          element.y * 72 / 96 + 70 * 72 / 96,
          200 * 72 / 96,
          200 * 72 / 96
        );
        imagesLoaded ++;
        if (imagesLoaded === nImages) {
          doc.save('catálogo.pdf');
          history.go(-1);
        }
        canvas = null;
      };
      img.src = src;
    }
    
    function splitArr(arr, n) {
      var iterations = arr.length / n;
      var result = [];
      for (var i=0; i<iterations; i++){
        result.push(arr.splice(0,n));
      }
      return result;
    }
    
    $http.get('http://' + $location.host() + '/' + app + '/store/catalog/' + id + '/json')
    .then(function(result) {
      vm.products = result.data.products;
      nImages = vm.products.length;
      var templateInfo = Drupal.settings.pdf_warp.template_content;
      vm.initTemplate = JSON.parse(templateInfo[0].content);

      var splitProducts = splitArr(vm.products, vm.initTemplate.itemsPerPage);
      
      var doc = new jsPDF('portrait','pt','a4');
      var pdf_elements = vm.initTemplate.pdf_elements
        
      angular.forEach(splitProducts, function(product, productIndex) {
        if (productIndex > 0){
          doc.addPage();
        }
        angular.forEach(Object.keys(pdf_elements), function(key, index) {
          if (product[index]) {
            doc.setFontSize(16 * 72 / 96);
            doc.text(pdf_elements[key].x * 72 / 96 + 40 * 72 / 96, pdf_elements[key].y * 72 / 96 + 40 * 72 / 96, product[index].product.Title);
            doc.setFontSize(10 * 72 / 96);
            doc.text(pdf_elements[key].x * 72 / 96 + 40 * 72 / 96, pdf_elements[key].y * 72 / 96 + 60 * 72 / 96, 'SKU:' + product[index].product.SKU);
            doc.setFontSize(22 * 72 / 96);
            doc.text(pdf_elements[key].x * 72 / 96 + 100 * 72 / 96, pdf_elements[key].y * 72 / 96 + 300 * 72 / 96, product[index].product.Price);
          }
        });             
      });
      
      angular.forEach(splitProducts, function(product, productIndex) {
        angular.forEach(Object.keys(pdf_elements), function(key, index) {
          if (product[index]) {
            addImagesToPDF(doc, product[index].product.entity_id.src, pdf_elements[key], productIndex + 1);
          }
        });             
      });
    });
  });

jQuery(document).ready(function () {
  angular.bootstrap(document.getElementById('pdf_warp'), ['pdf_warp']);
});