var app = angular
  .module('pdf_warp',['ngRoute','draggabilly'])

  .config(function ($locationProvider) 
  {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
   })

  .controller('CatalogCtrl', function($http, $location) {
    var vm = this;
    vm.path = $location.path() + '/save';
    vm.template = '';
    var templateInfo = Drupal.settings.pdf_warp.template_content;
    vm.initTemplate = JSON.parse(templateInfo[0].content);
    vm.additionalData = {};
    vm.renderMode = vm.initTemplate.renderMode || 'text';
    vm.selectedNumber = vm.initTemplate.itemsPerPage;
    
    vm.save = function() {
      var elements = document.querySelectorAll('*[id^="pdf_product_"]');
      var containerBounds = document.getElementById("pdf-template").getBoundingClientRect();
      var template = {
        pdf_elements: {},
        edit_elements: {},
        renderMode: vm.renderMode,
        itemsPerPage: vm.selectedNumber
      }
      angular.forEach(elements, function(element, index){
        var elementBounds = element.getBoundingClientRect();
        template.pdf_elements[element.id] = {
          x: elementBounds.left - containerBounds.left,
          y: elementBounds.top - containerBounds.top,
          width: elementBounds.width,
          height: elementBounds.height,
        };
        template.edit_elements[element.id] = {
          left: element.style.left || '0px',
          top: element.style.top || '0px',
          width: element.style.width || null,
          height: element.style.height || null,
        };
      });
      
      vm.template = JSON.stringify(template);
    }
    
    vm.getProductsPerPage = function() {
      return new Array(parseInt(vm.selectedNumber));
    }
    
    vm.getStyle = function(index) {
      if (vm.initTemplate.edit_elements['pdf_product_' + index]) {
        return {
          left: vm.initTemplate.edit_elements['pdf_product_' + index].left || (index % 2 * 40 + 30) + 'px',
          top: vm.initTemplate.edit_elements['pdf_product_' + index].top || '30px',
          cursor: 'pointer'
        }
      }
      return {
          left: (index % 2 * 40 + 30) + 'px',
          top: '30px',
          cursor: 'pointer'
      }
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