import { Producer } from "./producer";

export class Province {
  _name: string;
  _producers: any[];
  _totalProduction: number;
  _demand: any;
  _price: number;
  constructor(doc: any) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d: any) => this.addProducer(new Producer(this, d)));
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers;
  }
  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg: any) {
    this._totalProduction = arg;
  }
  get demand() {
    return this._demand;
  }
  set demand(arg: any) {
    this._demand = arg;
  }
  get price() {
    return this._price;
  }
  set price(arg: number) {
    this._price = arg;
  }

  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p: any) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });

    return result;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  addProducer(arg: any) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}
