import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface IForm {
  valid: boolean;
  error: string;
}

export abstract class Form<T> extends Component<IForm & T> {
  protected buttonSubmit: HTMLButtonElement;
  protected errorElement: HTMLElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container);

    this.buttonSubmit = ensureElement<HTMLButtonElement>(
      "button[type='submit']",
      this.container
    );

    this.errorElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container
    );

    this.container.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      this.events.emit(`${container.name}:submit`);
    })

    this.container.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLInputElement;

      const fieldName = target.name;
      const fieldValue = target.value;

      this.events.emit("form:change", {
        fieldName,
        fieldValue
      });
    })
  }

  set valid(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }

  set error(value: string) {
    this.errorElement.textContent = value;
  }
}