import { h, Component } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
})
export class SideDrawer {
  render() {
    return (
      <side>
        <h1>The Side Drawer</h1>
      </side>
    );
  }
}
