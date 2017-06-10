<div id="pdf_warp">
  <div ng-controller="ProductCtrl as vm">
    <div id="pdf_container" style="height:800px">
      <div ng-repeat="product in vm.products">
        <h3 draggabilly>{{product.product.Title}}</h3>
        <img draggabilly style="width:100px" ng-src="{{product.product.Image.src}}">
        <span draggabilly>{{product.product.Price}}</span>
      </div>
    </div>
    <button ng-click="vm.toPDF()" id="toPDFButton">Generate PDF</button>
  </div>
</div>