import { h, Component, State, Prop } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class ToolTip {
  @State() showTooltipText = false;
  @Prop() text: string;

  onToggleTooltip() {
    this.showTooltipText = !this.showTooltipText;
  }

  render() {
    let tooltip = null;
    if (this.showTooltipText) {
      tooltip = <div id="tooltip-text">{this.text}</div>;
    }

    return [
      <slot />,
      <span id="question" onClick={this.onToggleTooltip.bind(this)}>
        ?
      </span>,
      tooltip,
    ];
  }
}
