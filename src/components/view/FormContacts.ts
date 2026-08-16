import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

export interface IFormContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container, events);

    this.emailElement = ensureElement<HTMLInputElement>(
      "input[name='email']",
      this.container
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      "input[name='phone']",
      this.container
    );
  }

  set eMail(value: string) {
    this.emailElement.value = value;
  }

  set phone(value: string) {
    this.phoneElement.value = value;
  }
}