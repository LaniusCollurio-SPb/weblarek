import { ICard, ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export type TCardInCart = ICard & {index: number};

export class CardInCart extends Card<TCardInCart> {
  protected productIndexElement: HTMLElement;
  protected deleteButtonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    
    this.productIndexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );

    this.deleteButtonElement = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );

    if(actions?.onClick) {
      this.deleteButtonElement.addEventListener(
        "click",
        actions.onClick
      );
    }
  }

  set index(value: number) {
    this.productIndexElement.textContent = String(value);
  }
}