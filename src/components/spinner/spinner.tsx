import { h, Component } from '@stencil/core';

@Component({
  tag: 'uc-spinner',
  styleUrl: './spinner.css',
  shadow: true,
})
export class Spinner {
  render() {
    return <p class="spinner">loading ...</p>;
  }
}
