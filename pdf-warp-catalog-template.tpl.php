<div id="pdf_warp" class="container">
  <div ng-controller="CatalogCtrl as vm">
    <div class="pdf-toolbar">
      <div class="options-container">
        <label for="renderProductsSelect" class="inline">Prods. por página: </label>
        <select name="renderProductsSelect" class="inline" ng-model="vm.selectedNumber">
          <option ng-repeat="value in [1,2,3,4,5,6]" value="{{value}}">{{value}}</option>
        </select>
      </div>
      <form class="textCenter" action="{{vm.path}}" ng-submit="vm.save()" method="post" id="form">
        <input type="hidden" name="content" ng-value="vm.template">
        <input class="form-submit views-ajax-processed-processed center" type="submit" value="Guardar"/>
      </form>
    </div>
    <div class="pdf-container">
      <div class="pdf-template" id="pdf-template">
        <div
             ng-repeat="product in vm.getProductsPerPage() track by $index"
             class="draggable catalog_item"
             id="{{'pdf_product_' + $index}}"
             draggabilly
             draggie-containment="'#pdf-template'"
             ng-style="vm.getStyle($index)"
        >
          {{product.product.Title}}
        </div>
      </div>
    </div>
  </div>
</div>