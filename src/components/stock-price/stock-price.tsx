import { h, Component } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  onFetchStockPrice(event: Event) {
    event.preventDefault();
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${process.env.API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        console.log(parsedRes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol" />
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>,
    ];
  }
}
