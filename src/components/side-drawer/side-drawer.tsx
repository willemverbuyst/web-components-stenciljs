import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  onContentChangeHandler(content: string) {
    console.log(content);
  }

  render() {
    let mainContent = <slot />;
    mainContent = (
      <div id="contact-information">
        <h2>Content Information</h2>
        <p>You can reach us via phone or email</p>
        <ul>
          <li>Phone: 245743637</li>
          <li>
            Email: <a href="mailto: something@somthing.com">something@something.com</a>
          </li>
        </ul>
      </div>
    );

    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button class="active" onClick={this.onContentChangeHandler.bind(this, 'nav')}>
            Navigation
          </button>
          <button onClick={this.onContentChangeHandler.bind(this, 'content')}>Content</button>
        </section>
        <main>{mainContent}</main>
      </aside>
    );
  }
}
