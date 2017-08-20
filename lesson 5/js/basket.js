function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function() {
  return this.htmlCode;
}

function Basket() {
  Container.call(this);

  // Инициализация свойств корзины
  this.id = "basket";
  this.countGoods = 0;
  this.amount = 0;
  this.basketItems = [];

  // Загрузка корзины с сервера
  this.getBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

// Отрисовка корзины
Basket.prototype.render = function(wrapper) {
  var basketDiv = $('<div/>', {
    id: this.id,
    text: 'Корзина'
  });
  var itemsDiv = $('<div/>', {
    id: this.id + '_item'
  });
  itemsDiv.appendTo(basketDiv);
  basketDiv.appendTo(wrapper);
}

// Получение корзины с сервера
Basket.prototype.getBasketItems = function() {
  $.get({
    url: 'basket.content.json',
    // свойство для изменения this внутри метода success
    context: this,
    dataType: 'json',
    success: function(answer) {
      // создание html-объекта для хранения характеристик
      var basketData = $('<div/>', {
        id: 'basket_data'
      });

      // Инициализация свойств корзины значениями с сервера
      this.countGoods = answer.basket.length;
      this.amount = answer.amount;
      this.basketItems = answer.basket;

      // Отрисовка характеристик
      basketData.append($('<p>').text('Товаров в корзине: ' + this.countGoods));
      basketData.append($('<p>').text('Общая стоимость: ' + this.amount));

      $('#' + this.id).append(basketData);


    }
  })
}

// Метод добавления товара в корзину
Basket.prototype.add = function(id, quantity, price) {
  // TODO: Написать добавление с помощью ajax (см спецификацию в методичке)
  var basket_item = {
    price: price,
    id_product: id
  };

  // this.countGoods += quantity;
  // this.basketItems.push(basket_item);
  // this.refresh();

 $.ajax({
    type: "POST",
    url: "/lesson5/basket.php",
    data: JSON.stringify({ basket_item }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      alert(data);
    },
    failure: function(errMsg) {
        alert(errMsg);
    }
  });

}

// Перерисовка корзины после добавления
Basket.prototype.refresh = function() {
  // TODO: Переписать перерисовку с помощью ajax
  var basketData = $('#basket_data');
  basketData.empty();


  $.get({
      url: 'basket.content.json',
      // свойство для изменения this внутри метода success
      context: this,
      dataType: 'json',
      success: function(answer) {
        // создание html-объекта для хранения характеристик
        var basketData = $('#basket_data');

        // Инициализация свойств корзины значениями с сервера
        this.countGoods = answer.basket.length;
        this.amount = answer.amount;
        this.basketItems = answer.basket;

        // Отрисовка характеристик
        basketData.append($('<p>').text('Товаров в корзине: ' + this.countGoods));
        basketData.append($('<p>').text('Общая стоимость: ' + this.amount));

        $('#' + this.id).append(basketData);


      }
    })
}
