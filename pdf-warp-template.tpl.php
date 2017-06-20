<div id="pdf_warp" class="container">
  <div ng-controller="ProductCtrl as vm">
    <div class="pdf-toolbar">
      <form class="textCenter" action="{vm.path}" ng-submit="vm.save()" method="post">
        <input type="hidden" name="content" ng-value="vm.template">
        <div class="options-container">
          <label for="renderModeSelect">Renderizado: </label>
          <select name="renderModeSelect" class="inline" ng-model="vm.renderMode">
            <option value="text">Texto</option>
            <option value="image">Imagen</option>
          </select>
        </div>
        <input class="form-submit views-ajax-processed-processed center" type="submit" value="Guardar"/>
      </form>
      <div class="aditional-options" ng-class="{'none': !vm.idSelected}">
        <div class="options-container">
          <label for="fontSizeSelect" class="inline">Tamaño fuente: </label>
          <select name="fontSizeSelect" class="inline" ng-change="vm.fontChange()" ng-model="vm.fontSelected">
            <option ng-repeat="value in [12,13,14,15,16,17,18,19,20,21,22]" value="{{value + 'px'}}">{{value}}</option>
          </select>
        </div>
        <div class="options-container">
          <label>Alto:
            <input class="pdf-option-input" type="number" name="height" pattern="[0-9]*" ng-model="vm.height" ng-change="vm.heightChange()"></input>
          </label>
        </div>
        <div class="options-container">
          <label>Ancho:
            <input class="pdf-option-input" type="number" name="width" pattern="[0-9]*" ng-model="vm.width" ng-change="vm.widthChange()"></input>
          </label>
        </div>
      </div>
    </div>
    <div class="pdf-container">
      <div class="pdf-template" id="pdf-template" ng-click="vm.select(undefined)">
        <div ng-repeat="product in vm.products">
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_title'}"
               id="pdf_product_title"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_title.left,
                  top: vm.initTemplate.edit_elements.pdf_product_title.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_title.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_title.width,
                  height: vm.initTemplate.edit_elements.pdf_product_title.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_title'); $event.stopPropagation();"
          >
            {{product.product.Title}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_image'}"
               id="pdf_product_image"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_image.left,
                  top: vm.initTemplate.edit_elements.pdf_product_image.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_image.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_image.width,
                  height: vm.initTemplate.edit_elements.pdf_product_image.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_image'); $event.stopPropagation();"
          >
            <img ng-src="{{product.product.Image.src}}">
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_description'}"
               id="pdf_product_description"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_description.left,
                  top: vm.initTemplate.edit_elements.pdf_product_description.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_description.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_description.width,
                  height: vm.initTemplate.edit_elements.pdf_product_description.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_description'); $event.stopPropagation();"
          >
            {{product.product.Description}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_price'}"
               id="pdf_product_price"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_price.left,
                  top: vm.initTemplate.edit_elements.pdf_product_price.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_price.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_price.width,
                  height: vm.initTemplate.edit_elements.pdf_product_price.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_price'); $event.stopPropagation();"
          >
            Precio: {{product.product.Price}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_sku'}"
               id="pdf_product_sku"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_sku.left,
                  top: vm.initTemplate.edit_elements.pdf_product_sku.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_sku.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_sku.width,
                  height: vm.initTemplate.edit_elements.pdf_product_sku.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_sku'); $event.stopPropagation();"
          >
            SKU: {{product.product.SKU}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_length'}"
               id="pdf_product_length"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_length.left,
                  top: vm.initTemplate.edit_elements.pdf_product_length.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_length.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_length.width,
                  height: vm.initTemplate.edit_elements.pdf_product_length.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_length'); $event.stopPropagation();"
          >
            Largo: {{product.product.Length}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_width'}"
               id="pdf_product_width"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_width.left,
                  top: vm.initTemplate.edit_elements.pdf_product_width.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_width.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_width.width,
                  height: vm.initTemplate.edit_elements.pdf_product_width.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_width'); $event.stopPropagation();"
          >
            Ancho: {{product.product.Width}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_height'}"
               id="pdf_product_height"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_height.left,
                  top: vm.initTemplate.edit_elements.pdf_product_height.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_height.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_height.width,
                  height: vm.initTemplate.edit_elements.pdf_product_height.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_height'); $event.stopPropagation();"
          >
            Alto: {{product.product.Height}}
          </div>
          <div
               class="draggable"
               ng-class="{'selected': vm.idSelected === 'pdf_product_weight'}"
               id="pdf_product_weight"
               draggabilly
               draggie-containment="'#pdf-template'"
               ng-style="{
                  left: vm.initTemplate.edit_elements.pdf_product_weight.left,
                  top: vm.initTemplate.edit_elements.pdf_product_weight.top,
                  fontSize: vm.initTemplate.edit_elements.pdf_product_weight.fontSize,
                  width: vm.initTemplate.edit_elements.pdf_product_weight.width,
                  height: vm.initTemplate.edit_elements.pdf_product_weight.height,
                  cursor: 'pointer'
               }"
               ng-click="vm.select('pdf_product_weight'); $event.stopPropagation();"
          >
            Peso: {{product.product.Weight}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>