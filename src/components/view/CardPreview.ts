import { ICardActions, ICardWithImg, TCategory } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class CardPreview extends Card<ICardWithImg> {
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

  set image(img: {src: string, alt: string}) {
    this.setImage(this.imageElement, CDN_URL + img.src, img.alt);
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
  }
}