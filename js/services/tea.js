app.service('Tea', ['$http', '$q', function($http, $q){
    stock = [];
    categories = [];
    cart = [];
    var that = this;
    var deferred = $q.defer();

    $http.get('../assets/tea.json').then(function(data) {
      stock=data.data;
      // this.stock=data;
      for (var i = 0; i < stock.length; i++) {
        stock[i]["quantity"]=0;
        stock[i].categories.forEach(function(element) {
          categories.push(element)
        })
      }
      categories = _.uniq(categories, function(element) {
        return element
      });
      // this.selectedCategory=categories[0]
      deferred.resolve(stock);
     })
    return {

    getCategories : function() {
      return categories
    },

    getTeas : function() {
      return deferred.promise
    },

    init : function() {
      cart = [];
    },

    addToCart : function(tea, quantity) {
      var index = cart.findIndex(cartTea => cartTea.name==tea.name)
      if (index==-1) {
        tea.quantity = quantity;
        cart.push(tea)
      }
      else
        cart[index].quantity+=quantity;
    },

    editCart: function(tea) {
      var index = cart.findIndex(cartTea => cartTea.name==tea.name)
      cart[index].quantity = tea.quantity;
    },

    removeFromCart : function(tea) {
      var index = cart.findIndex(cartTea => cartTea.name==tea.name)
      cart.splice(index, 1);
      // var index = stock.findIndex(stockTea => stockTea.name==tea.name)
      // stock[index].quantity=0;
    },

    getCart : function() {
      return cart
    },

    getTotalItems : function() {
      var count = 0;
      for (var i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
      }
      return count;
    },

    getTotalCost: function() {
      var cost = 0;
      for (var i = 0; i < cart.length; i++) {
        cost += cart[i].quantity * cart[i].price
      }
      return cost;
    }

  }

}])
