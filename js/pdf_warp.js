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
    var base_url = Drupal.settings.pdf_warp.base_url;
    vm.products = [];
    vm.path = $location.path() + '/save';
    vm.template = '';
    vm.initTemplate = '';
    vm.idSelected;
    vm.fontSelected;
    vm.width;
    vm.height;
    vm.additionalData = {};
    vm.selectProducts = Drupal.settings.pdf_warp.products.map(item => item.nid);
    vm.selectedProduct = vm.selectProducts[0];
    
    $http.get(base_url + '/store/product/'+ vm.selectedProduct + '/json')
    .then(function(result) {
      vm.products = result.data.products;
      var templateInfo = Drupal.settings.pdf_warp.template_content;
      vm.initTemplate = JSON.parse(templateInfo[0].content);
      vm.renderMode = vm.initTemplate.renderMode || 'text';
    });
    
    vm.select = function(id) {
      vm.idSelected = id;
      if (id) {
        var element = document.getElementById(id);
        vm.fontSelected = element.style.fontSize || '12px';
        vm.width = parseInt(element.style.width, 10) || null;
        vm.height = parseInt(element.style.height, 10) || null;
      }
    }
    
    vm.fontChange = function() {
      if (vm.additionalData[vm.idSelected]) {
        vm.additionalData[vm.idSelected].fontSize = vm.fontSelected;
      } else {
        vm.additionalData[vm.idSelected] = {};
        vm.additionalData[vm.idSelected].fontSize = vm.fontSelected;
      }
      
      document.getElementById(vm.idSelected).style.fontSize = vm.fontSelected;
    }
    
    vm.productChange = function() {
      $http.get(base_url + '/store/product/'+ vm.selectedProduct + '/json')
      .then(function(result) {
        vm.products = result.data.products;
      });
    }
    
    vm.heightChange = function() {
      if (vm.additionalData[vm.idSelected]) {
        vm.additionalData[vm.idSelected].height = vm.height + "px";
      } else {
        vm.additionalData[vm.idSelected] = {};
        vm.additionalData[vm.idSelected].height = vm.height + "px";
      }
      
      document.getElementById(vm.idSelected).style.height = vm.height !== null ? vm.height + "px" : null;
    }
    
    vm.widthChange = function() {
      if (vm.additionalData[vm.idSelected]) {
        vm.additionalData[vm.idSelected].width = vm.width + "px";
      } else {
        vm.additionalData[vm.idSelected] = {};
        vm.additionalData[vm.idSelected].width = vm.width + "px";
      }
      
      document.getElementById(vm.idSelected).style.width = vm.width !== null ? vm.width + "px" : null;
    }
    
    vm.save = function() {
      var elements = document.querySelectorAll('*[id^="pdf_product_"]');
      var containerBounds = document.getElementById("pdf-template").getBoundingClientRect();
      var template = {
        pdf_elements: {},
        edit_elements: {},
        renderMode: vm.renderMode
      }
      angular.forEach(elements, function(element, index){
        var elementBounds = element.getBoundingClientRect();
        template.pdf_elements[element.id] = {
          x: elementBounds.left - containerBounds.left,
          y: elementBounds.top - containerBounds.top,
          width: elementBounds.width,
          height: elementBounds.height,
          fontSize: element.style.fontSize || '14px'
        };
        template.edit_elements[element.id] = {
          left: element.style.left || '0px',
          top: element.style.top || '0px',
          width: element.style.width || null,
          height: element.style.height || null,
          fontSize: element.style.fontSize || '14px',
        };
      });
      
      vm.template = JSON.stringify(template);
    }
  });

jQuery(document).ready(function () {
  var form = jQuery("#form");
  var action = form.attr('action');
  if (action.indexOf('?') !== -1) {
    form.attr('action', action.substring(0, action.lastIndexOf('?')));
  }
  angular.bootstrap(document.getElementById('pdf_warp'), ['pdf_warp']);
});