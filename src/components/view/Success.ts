import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccess {
  price: number;
}

export class Success extends Component<ISuccess> {
  protected successButtonElement: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.successButtonElement = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );

    this.successButtonElement.addEventListener("click", () => {
      this.events.emit("success:close");
    })
  }

  set price(value: number) {
    this.priceElement.textContent = `Списано ${value} синапсов`;
  }
}