interface IRecord {
  quantity: number;
  itemPrice: number;
}

class Order {
  private _data: IRecord;
  constructor(aRecord: IRecord) {
    this._data = aRecord;
  }

  get quantity() {
    return this._data.quantity;
  }

  get itemPrice() {
    return this._data.itemPrice;
  }

  // get price() {
  //   return (
  //     this.quantity * this.itemPrice -
  //     Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
  //     Math.min(this.quantity * this.itemPrice * 0.1, 100)
  //   );
  // }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get quantityDiscount() {
    return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
  }

  get shipping() {
    return Math.min(this.quantity * this.itemPrice * 0.1, 100);
  }

  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping;
  }
}
