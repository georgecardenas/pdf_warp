<div id="pdf_warp" class="container">
  <div ng-controller="ProductCtrl as vm">
    <div class="pdf-toolbar">
      <form action="{{vm.path}}" ng-submit="vm.save()" method="post">
        <input type="hidden" name="content" ng-value="vm.template">
        <input class="form-submit views-ajax-processed-processed" type="submit" value="Guardar"/>
      </form>
    </div>
    <div class="pdf-container">
      <div class="pdf-template" id="pdf-template">
        <div ng-repeat="product in vm.products">
          <div
               class="draggable"
               id="pdf_product_title"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_title.left,
                  top: vm.initTemplate.edit_elements.pdf_product_title.top,
                  cursor: 'pointer'
               }"
          >
            {{product.product.Title}}
          </div>
          <div
               class="draggable"
               id="pdf_product_image"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_image.left,
                  top: vm.initTemplate.edit_elements.pdf_product_image.top,
                  cursor: 'pointer'
               }"
          >
            <img style="width:100px" ng-src="{{product.product.Image.src}}">
          </div>
          <div
               class="draggable"
               id="pdf_product_description"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_description.left,
                  top: vm.initTemplate.edit_elements.pdf_product_description.top,
                  cursor: 'pointer'
               }"
          >
            {{product.product.Description}}
          </div>
          <div
               class="draggable"
               id="pdf_product_price"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_price.left,
                  top: vm.initTemplate.edit_elements.pdf_product_price.top,
                  cursor: 'pointer'
               }"
          >
            Precio: {{product.product.Price}}
          </div>
          <div
               class="draggable"
               id="pdf_product_sku"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_sku.left,
                  top: vm.initTemplate.edit_elements.pdf_product_sku.top,
                  cursor: 'pointer'
               }"

               >SKU: {{product.product.SKU}}
          </div>
          <div
               class="draggable"
               id="pdf_product_length"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_length.left,
                  top: vm.initTemplate.edit_elements.pdf_product_length.top,
                  cursor: 'pointer'
               }"
          >
            Largo: {{product.product.Length}}
          </div>
          <div
               class="draggable"
               id="pdf_product_width"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_width.left,
                  top: vm.initTemplate.edit_elements.pdf_product_width.top,
                  cursor: 'pointer'
               }"
          >
            Ancho: {{product.product.Width}}
          </div>
          <div
               class="draggable"
               id="pdf_product_height"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_height.left,
                  top: vm.initTemplate.edit_elements.pdf_product_height.top,
                  cursor: 'pointer'
               }"
          >
            Alto: {{product.product.Height}}
          </div>
          <div
               class="draggable"
               id="pdf_product_weight"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_weight.left,
                  top: vm.initTemplate.edit_elements.pdf_product_weight.top,
                  cursor: 'pointer'
               }"
          >
            Peso: {{product.product.Weight}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>