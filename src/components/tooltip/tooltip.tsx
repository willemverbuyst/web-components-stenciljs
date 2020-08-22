import { h, Component } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class ToolTip {
  render() {
    return (
      <p>
        <slot />
        <span id="question">?</span>
      </p>
    );
  }
}
