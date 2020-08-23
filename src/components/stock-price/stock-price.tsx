import { h, Component } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  render() {
    return <p>Hello world</p>;
  }
}
