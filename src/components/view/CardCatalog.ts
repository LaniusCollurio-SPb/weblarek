import { ICardActions, ICardWithImg, TCategory } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type TCardCatalog = Omit<ICardWithImg, "description" | "buttonDisabled" | "buttonText">;

export class CardCatalog extends Card<TCardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if(actions?.onClick) {
      this.container.addEventListener(
        "click",
        actions.onClick
      );
    }
  }

  set category(value: TCategory) {
    this.categoryElement.textContent = value;

    const className = categoryMap[value];
    this.categoryElement.className = `card__category ${className}`;
  }

  set image(img: {src: string, alt: string}) {
    this.setImage(this.imageElement, CDN_URL + img.src, img.alt);
  }
}