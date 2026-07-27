import { Api } from './components/base/Api';
import { Communication } from './components/Communication/Communication';
import { Buyer } from './components/Models/Buyer';
import { ProductsCatalog } from './components/Models/ProductsCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productsCatalog = new ProductsCatalog;

// Сохраняем массив товаров items из apiProducts
productsCatalog.setProductsList(apiProducts.items);
console.log('Массив товаров из каталога: ', productsCatalog.getProductsList());

console.log('Возвращаем карточку товара по его id: ', productsCatalog.getProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7'));

// Сохраняем карточку товара с id 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9' для подробного просмотра
productsCatalog.setSelectedProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
console.log('Возвращаем выбранную карточку товара : ', productsCatalog.getSelectedProduct());

const shopingCart = new ShoppingCart;

// Добавляем в корзину два товара items[0] и items[3] из apiProducts
shopingCart.addProduct(apiProducts.items[0]);
shopingCart.addProduct(apiProducts.items[3]);

console.log('Массив товаров в корзине: ', shopingCart.getProductsList());

console.log('Количество товаров в корзине: ', shopingCart.getNumberOfProducts());

console.log('Стоимость всех товаров в корзине: ', shopingCart.getTotalPrice());

console.log(
  'Проверяем наличие товара в корзине по id "412bcf81-7e75-4e70-bdb9-d3c73c9803b7": ',
  shopingCart.checkProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')
);
console.log(
  'Проверяем наличие товара в корзине по id "c101ab44-ed99-4a54-990d-47aa2bb4e7d9": ',
  shopingCart.checkProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9')
);

// Удаляем товар с id '412bcf81-7e75-4e70-bdb9-d3c73c9803b7' из массива корзины
shopingCart.removeProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7');
console.log(
  'Проверяем наличие товара в корзине по id "412bcf81-7e75-4e70-bdb9-d3c73c9803b7" ПОСЛЕ УДАЛЕНИЯ: ',
  shopingCart.checkProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7')
);

// Очищаем корзину
shopingCart.clearShoppingCart();
console.log('ТОВАРЫ ИЗ КОРЗИНЫ БЫЛИ УДАЛЕНЫ');
console.log('Массив товаров в корзине: ', shopingCart.getProductsList());

const buyer = new Buyer;

console.log('Данные пользователя до заполнения формы: ', buyer.getData());

// Заполняем данные пользователя
buyer.setData({
  payment: null,
  address: '',
  email: 'tester@email.net',
  phone: '8-800-555-35-35'
});
console.log('Данные пользователя после неполного заполнения формы: ', buyer.getData());

console.log('Проверка данных на валидность после неполного заполнения: ', buyer.validateData());

// Дополняем данные пользователя
buyer.setData({
  payment: 'card',
  address: 'ул. Пушкина, д. Колотушкина'
})
console.log('Данные пользователя после полного заполнения формы: ', buyer.getData())
console.log('Проверка данных на валидность после полного заполнения: ', buyer.validateData());

// Очищаем данные пользователя
buyer.clearData();
console.log('Данные пользователя после очистки: ', buyer.getData())
console.log('Проверка данных на валидность после очистки: ', buyer.validateData());

const api = new Api(API_URL);
const communication = new Communication(api);
const productsFromApi = new ProductsCatalog;

communication.getProducts()
  .then(data => {
    console.log('Данные, полученные с сервера: ', data);
    productsFromApi.setProductsList(data.items);
    console.log('Все товары в модели: ', productsFromApi.getProductsList());
  })
  .catch(error => console.log('При загрузке товара произошла ошибка: ', error));