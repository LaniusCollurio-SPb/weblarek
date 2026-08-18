import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICart {
  cartList: HTMLElement[];
  totalPrice: number;
  buttonDisabled: boolean;
}

export class Cart extends Component<ICart> {
  protected cartListElement: HTMLElement;
  protected totalPriceElement: HTMLElement;
  protected cartButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.cartListElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.totalPriceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.cartButtonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );

    this.cartButtonElement.addEventListener("click", () => {
      this.events.emit("cart:order");
    })
  }

  set cartList(items: HTMLElement[]) {
    this.cartListElement.replaceChildren(...items);
  }

  set totalPrice(value: number) {
    this.totalPriceElement.textContent = `${value} синапсов`;
  }

  set buttonDisabled(value: boolean) {
    this.cartButtonElement.disabled = value;
  }
}