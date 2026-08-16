import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Communication } from './components/Communication/Communication';
import { Buyer } from './components/Models/Buyer';
import { ProductsCatalog } from './components/Models/ProductsCatalog';
import { ShoppingCart } from './components/Models/ShoppingCart';
import { CardCatalog } from './components/view/CardCatalog';
import { CardInCart } from './components/view/CardInCart';
import { CardPreview } from './components/view/CardPreview';
import { Cart } from './components/view/Cart';
import { FormContacts } from './components/view/FormContacts';
import { FormOrder } from './components/view/FormOrder';
import { Gallery } from './components/view/Gallery';
import { Header } from './components/view/Header';
import { Modal } from './components/view/Modal';
import { Success } from './components/view/Success';
import './scss/styles.scss';
import { IOrder, IProduct, TPayment } from './types';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();

const productsCatalogModel = new ProductsCatalog(events);
const shoppingCartModel = new ShoppingCart(events);
const buyerModel = new Buyer(events);

const headerElement = ensureElement<HTMLElement>(".header");
const galleryElement = ensureElement<HTMLElement>(".gallery");
const modalElement = ensureElement<HTMLElement>("#modal-container");

const cartTemplate = cloneTemplate<HTMLElement>("#basket");
const formOrderTemplate = cloneTemplate<HTMLFormElement>("#order");
const formContactsTemplate = cloneTemplate<HTMLFormElement>("#contacts");
const successTemplate = cloneTemplate<HTMLElement>("#success");
const cardPreviewTemplate = cloneTemplate<HTMLElement>("#card-preview");

const header = new Header(headerElement, events);
const gallery = new Gallery(galleryElement);
const modal = new Modal(modalElement, events);

const cart = new Cart(cartTemplate, events);
const formOrder = new FormOrder(formOrderTemplate, events);
const formContacts = new FormContacts(formContactsTemplate, events);
const success = new Success(successTemplate, events);
const cardPreview = new CardPreview(cardPreviewTemplate, {
  onClick: () => {
    events.emit("preview:click-button");
  },
});

const api = new Api(API_URL);
const communication = new Communication(api);

events.on<IProduct>("products:changed", () => {
  const products: IProduct[] = productsCatalogModel.getProductsList();
  const productCards = products.map((product) => {
    const cardCatalogTemplate = cloneTemplate<HTMLElement>("#card-catalog");
    const card = new CardCatalog(cardCatalogTemplate, {
      onClick: () => events.emit("catalog:click-card", product),
    });
    const pngImageSrc = `${product.image.replace(/\.svg$/, ".png")}`;
    
    return card.render({
      title: product.title,
      price: product.price,
      category: product.category,
      image: pngImageSrc,
    })
  })

  gallery.render({catalog: productCards});
})

events.on<IProduct>('catalog:click-card', (product) => {
  productsCatalogModel.setSelectedProduct(product.id);
});

events.on<IProduct>('preview:changed', () => {
  const product = productsCatalogModel.getSelectedProduct();
  
  if (!product) return;
  const pngImageSrc = `${product.image.replace(/\.svg$/, ".png")}`;

  cardPreview.render({
    title: product.title,
    price: product.price,
    category: product.category,
    image: pngImageSrc,
    description: product.description
  });
  
  const checkInCart = shoppingCartModel.checkProduct(product.id);
  if (product.price !== null) {
    cardPreview.buttonText = checkInCart ? "Удалить из корзины" : "Купить";
    }

  modal.render({ content: cardPreview.render() });
  modal.open();
});

events.on<IProduct>("preview:click-button", () => {
  const product = productsCatalogModel.getSelectedProduct();
  if(!product) return;

  if(shoppingCartModel.checkProduct(product.id)) {
    shoppingCartModel.removeProduct(product.id);
    header.render({
      counter: shoppingCartModel.getNumberOfProducts(),
    })
    modal.close();
  } else {
    shoppingCartModel.addProduct(product);
    header.render({
      counter: shoppingCartModel.getNumberOfProducts(),
    })
    modal.close();
  }
})

events.on("cart:open", () => {
  if(shoppingCartModel.getNumberOfProducts() === 0) {
    cart.buttonDisabled = true;
  }
  
  modal.render({content: cart.render({})});
  modal.open();
})

events.on("cart:order", () => {
  modal.render({content: formOrder.render()});
})

events.on("cart:changed", () => {
  
  header.render({
    counter: shoppingCartModel.getNumberOfProducts(),
  })
  const cards = shoppingCartModel.getProductsList().map((product, index) => {
    const card = new CardInCart(cloneTemplate<HTMLElement>("#card-basket"), {
      onClick: () => {
        events.emit("cart:remove", product);
      }
    });
    card.itemIndex = index + 1;
    return card.render(product);
  });
  cart.cartList = cards;
  cart.totalPrice = shoppingCartModel.getTotalPrice();
  cart.buttonDisabled = shoppingCartModel.getNumberOfProducts() === 0;
})

events.on<IProduct>("cart:remove", (product) => {
  shoppingCartModel.removeProduct(product.id);
})

events.on("payment:change", (data: {payment: TPayment}) => {
  buyerModel.setData({payment: data.payment});
})

events.on("form:change", (value: {fieldName: string, fieldValue: string}) => {
  if(value.fieldName === "address") {
    buyerModel.setData({address: value.fieldValue});
  } else if(value.fieldName === "email") {
    buyerModel.setData({email: value.fieldValue});
  } else if(value.fieldName === "phone") {
    buyerModel.setData({phone: value.fieldValue});
  }
})

events.on("order:submit", () => {
  modal.render({
    content: formContacts.render({}),
  })
})

events.on("buyer:changed", () => {
  const buyer = buyerModel.getData();
  const errors = buyerModel.validateData();
  const formOrderErrors: string[] = [];

  if(errors.payment) {
    formOrderErrors.push(errors.payment);
  }

  if(errors.address) {
    formOrderErrors.push(errors.address);
  }

  formOrder.valid = formOrderErrors.length === 0;
  formOrder.error = formOrderErrors.join("; ");
  if(!buyer.payment) return;
  formOrder.render({
    address: buyer.address,
    payment: buyer.payment,
  })


  const formContactsErrors: string[] = [];

  if(errors.email) {
    formContactsErrors.push(errors.email);
  }

  if(errors.phone) {
    formContactsErrors.push(errors.phone);
  }

  formContacts.valid = formContactsErrors.length === 0;
  formContacts.error = formContactsErrors.join("; ");
  formContacts.render({
    email: buyer.email,
    phone: buyer.phone,
  })
})

events.on("contacts:submit", async () => {
  const buyer = buyerModel.getData();

  try { 
    const order: IOrder = {
      payment: buyer.payment,
      address: buyer.address,
      email: buyer.email,
      phone: buyer.phone,
      total: shoppingCartModel.getTotalPrice(),
      items: shoppingCartModel.getProductsList().map(product => product.id),
    }

    await communication.createOrder(order)
      .then((answer) => {
        modal.render({
          content: success.render({
            price: answer.total,
          })
        });
        shoppingCartModel.clearShoppingCart();
        buyerModel.clearData();
      })
      .catch((err) => {console.error(err)});
  } catch(err) {
    console.error("Ошибка при отправке заказа: ", err);
  }
})

events.on("success:close", () => {
  modal.close();
})

communication
  .getProducts()
  .then(data => {
    productsCatalogModel.setProductsList(data.items);
  })
  .catch(error => console.log('При загрузке товара произошла ошибка: ', error));