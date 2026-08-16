import { ICardActions, IProduct, TCategory } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type TCardPreview = Omit<IProduct, "id">;

export class CardPreview<T> extends Card<TCardPreview & T> {
  protected descriptionElement: HTMLElement;
  protected toCartButtonElement: HTMLButtonElement;
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );

    this.toCartButtonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if(actions?.onClick) {
      this.toCartButtonElement.addEventListener(
        "click",
        actions.onClick
      );
    }
  }

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }

  set category(value: TCategory) {
    this.categoryElement.textContent = value;

    const className = categoryMap[value];
    this.categoryElement.className = `card__category ${className}`;
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.toCartButtonElement.textContent = value;
  }

  set buttonDisabled(value: boolean) {
    this.toCartButtonElement.disabled = value;
  }

  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this.buttonText = "Недоступно";
      this.buttonDisabled = true;
    } else {
      this.buttonText = "Купить";
      this.buttonDisabled = false;
    }
  }
}