import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IFormOrder {
  payment: TPayment | null;
  address: string;
}

export class FormOrder extends Form<IFormOrder> {
  protected cardPaymentElement: HTMLButtonElement;
  protected cashPaymentElement: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    this.cardPaymentElement = ensureElement<HTMLButtonElement>(
      "button[name='card']",
      this.container
    );
    this.cashPaymentElement = ensureElement<HTMLButtonElement>(
      "button[name='cash']",
      this.container
    );
    this.addressElement = ensureElement<HTMLInputElement>(
      "input[name='address']",
      this.container
    );
    
    this.cardPaymentElement.addEventListener("click", () => {
      this.events.emit("payment:change", {payment: "card"});
    })

    this.cashPaymentElement.addEventListener("click", () => {
      this.events.emit("payment:change", {payment: "cash"});
    })
  }

  set payment(value: TPayment | null) {
    if (value === null) {
      this.cardPaymentElement.classList.remove("button_alt-active");
      this.cashPaymentElement.classList.remove("button_alt-active");
    }
    this.cardPaymentElement.classList.toggle("button_alt-active", value === "card");
    this.cashPaymentElement.classList.toggle("button_alt-active", value === "cash");
  }

  set address(value: string) {
    this.addressElement.value = value;
  }
}