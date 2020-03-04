/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface UrlPreviewCard {
    'proxyUrl': string;
    'target': string;
    'url': string;
    'variant': string;
  }
}

declare global {


  interface HTMLUrlPreviewCardElement extends Components.UrlPreviewCard, HTMLStencilElement {}
  var HTMLUrlPreviewCardElement: {
    prototype: HTMLUrlPreviewCardElement;
    new (): HTMLUrlPreviewCardElement;
  };
  interface HTMLElementTagNameMap {
    'url-preview-card': HTMLUrlPreviewCardElement;
  }
}

declare namespace LocalJSX {
  interface UrlPreviewCard {
    'proxyUrl'?: string;
    'target'?: string;
    'url'?: string;
    'variant'?: string;
  }

  interface IntrinsicElements {
    'url-preview-card': UrlPreviewCard;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'url-preview-card': LocalJSX.UrlPreviewCard & JSXBase.HTMLAttributes<HTMLUrlPreviewCardElement>;
    }
  }
}


