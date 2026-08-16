import { IBuyer, IValidateData, TPayment } from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
  private payment: TPayment | null = null;
  private address: string = '';
  private email: string = '';
  private phone: string = '';
  protected events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  setData(data: Partial<IBuyer>): void {
    if(data.payment !== undefined) {
      this.payment = data.payment;
    }

    if(data.address !== undefined) {
      this.address = data.address;
    }

    if(data.email !== undefined) {
      this.email = data.email;
    }

    if(data.phone !== undefined) {
      this.phone = data.phone;
    }

    this.events.emit("buyer:changed");
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone
    }
  }

  clearData(): void {
    this.payment = null;
    this.address = '';
    this.email = '';
    this.phone = '';
    this.events.emit("buyer:changed");
  }

  validateData(): IValidateData {
    const errors: IValidateData = {};

    if(!this.payment) {
      errors.payment = 'Выберите способ оплаты';
    }

    if(!this.address) {
      errors.address = 'Укажите адрес доставки';
    }

    if(!this.email) {
      errors.email = 'Укажите E-mail адрес';
    }

    if(!this.phone) {
      errors.phone = 'Укажите номер телефона';
    }

    return errors;
  }
}