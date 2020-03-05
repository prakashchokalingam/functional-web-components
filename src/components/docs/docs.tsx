import { Component, Host, h } from '@stencil/core';
import hljs from 'highlight.js/lib/highlight.js';
import xml  from 'highlight.js/lib/languages/xml.js';

const Languages = {
  'xml': xml
};

@Component({
  tag: 'component-docs',
  styleUrl: 'docs.css',
  shadow: true
})
export class Docs {
  render() {
    return (
      <Host>
        <div class="content">
          {/* sidebar */}
          <div class="sidebar">
            <ul class="menu-list">
              <li class="section-label">Components</li>
              <ul>
                <li>
                  <a href="#url-preview-card">url preview card</a>
                </li>
              </ul>
            </ul>
          </div>

          {/* docs */}
          <div class="content-section">
            <h2 id="url-preview-card">url preview card</h2>
            <p>Show beautiful preview card for your links</p>

            <h3>Usage</h3>
            <div class="card" id="preview-code">
              {this._compileCode('#preview-code', 'xml', '<url-preview-card url="https://stenciljs.com></url-preview-card>')}
            </div>
          </div>
        </div>
      </Host>
    );
  }

  private _compileCode(id: string, lang: string, code: string) {
    hljs.registerLanguage(lang, Languages[lang]);
    let highlight = hljs.highlight(lang, code).value;
    let fragment = window.document.createDocumentFragment();
    let document = window.document.createElement('div');
    document.id = "wrapper";
    document.innerHTML = highlight;


    // document.getElementById(id).innerHTML = highlight;
    return (
      <div>{document.innerHTML}</div>
    );
  }

}
