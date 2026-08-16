import { ICardActions, IProduct, TCategory } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type TCardCatalog = Pick<IProduct, 'image' | 'category' | 'title' | 'price'>;

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

  set image(value: string) {
    this.setImage(this.imageElement, CDN_URL + value, this.title);
  }
}