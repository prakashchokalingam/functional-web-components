import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'code-highlighter',
  styleUrl: 'highlighter.css',
  shadow: true
})
export class Highlighter {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
