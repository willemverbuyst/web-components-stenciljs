import { h, Component, State, Element, Prop, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading: boolean = false;

  @Prop({ mutable: true, reflectToAttr: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolchanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== '') {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    this.loading = true;
    event.preventDefault();
    this.stockSymbol = this.stockInput.value;
  }

  componentWillLoad() {
    // console.log('Component will load');
    // console.log(this.stockSymbol);
  }

  componentDidLoad() {
    // console.log('Component did load');
    if (this.stockSymbol) {
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    // console.log('Component will upate');
  }

  componentDidUpdate() {
    // console.log('Component did upate');
  }

  componentDidUnload() {
    // console.log('Component did unload');
  }

  @Listen('ucSymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (!parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid symbol');
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        this.loading = false;
      })
      .catch(err => {
        this.error = err.message;
        this.fetchedPrice = null;
        this.loading = false;
      });
  }

  // not working
  // hostData() {
  //   return { class: this.error ? 'error' : '' };
  // }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }

    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }

    if (this.loading) {
      dataContent = <p>loading ...</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
