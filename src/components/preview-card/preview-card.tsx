import { Component, Host, h, Prop, State } from '@stencil/core';

interface card {
  title?: string;
  description?: String;
  img?: string;
  host?: string;
};

enum type {
  small = 'small',
  large = 'large'
}

@Component({
  tag: 'url-preview-card',
  styleUrl: 'preview-card.css',
  shadow: true
})
export class PreviewCard {
  // props
  @Prop() url: string;
  @Prop() type: type;
  @Prop() proxyUrl: string = 'http://localhost:9000/.netlify/functions/proxy';

  // state
  @State() card: card = {};

  componentWillLoad() {
    this._constructCard();
  }

  render() {
    return (
      <Host>
        <div class="card">
          <div class="card__title">
            {this.card.title}
          </div>
          Hello world
        </div>
      </Host>
    );
  }

  private async _constructCard() {
    let data = await this._fetchUrlData();
    this._parseData(data);
  }

  private async _fetchUrlData() {
    try {
      let { data } = await fetch(`${this.proxyUrl}?url=${this.url}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(function (response) {
        return response.json();
      });
      return data;
    } catch(e) {
      console.log('Show Error')
    }
  }

  private _parseData(data) {
    let fragment = document.createDocumentFragment();
    let wrapper = document.createElement('div');
    wrapper.innerHTML = data;
    fragment.appendChild(wrapper);

    // title
    let title: string;
    if (fragment.querySelector('titles')) {
      title = fragment.querySelector('title').innerText;
    } else if (fragment.querySelector('meta[property="og:title"]')) {
      title = fragment.querySelector('meta[property="og:title"]').content;
    }
    this.card = {
      title
    };

    console.log(this.card.title)
  }
}

