import { Component, Host, h, Prop, State } from '@stencil/core';

interface Card {
  title?: string;
  description?: string;
  img?: string;
  host?: string;
};

@Component({
  tag: 'url-preview-card',
  styleUrl: 'preview-card.css',
  shadow: true
})
export class PreviewCard {
  // props
  @Prop() url: string = "";
  @Prop() variant: string = "small";
  @Prop() target: string = "_blank";
  @Prop() proxyUrl: string = 'http://localhost:9000/.netlify/functions/proxy';

  // state
  @State() card: Card = {};

  componentWillLoad() {
    this._constructCard();
  }

  render() {
    return (
      <Host>
        <a href={this.url} class="card__link" target={this.target} rel="noreferrer">
          <div class="card">
            <div class="card__img">
              <img src={this.card.img} />
            </div>
            <div class="card__title">
              {this.card.title}
            </div>
            <div class="card__description">
              {this.card.description}
            </div>
          </div>
        </a>
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

  private _parseData(data: string) {
    let $fragment = document.createDocumentFragment();
    let $wrapper = document.createElement('div');
    $wrapper.innerHTML = data;
    $fragment.appendChild($wrapper);

    // title: meta-title | og:title
    let title: string;
    if ($fragment.querySelector('titles')) {
      title = $fragment.querySelector('title').innerText;
    } else if ($fragment.querySelector('meta[property="og:title"]')) {
      title = $fragment.querySelector('meta[property="og:title"]').getAttribute('content');
    }

    // description: meta-description | og:description
    let description: string;
    let $content = $fragment.querySelector('meta[name="description"]');
    if ($content && $content.getAttribute('content')) {
      description = $content.getAttribute('content');
    } else if($fragment.querySelector('meta[property="og:description"]')) {
      description = $fragment.querySelector('meta[property="og:description"]').getAttribute('content')
    }

    // image: og:image | first-image | favicon
    let img: string;
    let $img = $fragment.querySelector('meta[property="og:image"]');
    if ($img && $img.getAttribute('content')) {
      img = $img.getAttribute('content');
    } else if ($fragment.querySelector('img')) {
      img = $fragment.querySelector('img').getAttribute('src');
    } else {
      img = $fragment.querySelector('[rel="icon"]').getAttribute('href');
    }

    this.card = {
      title,
      description,
      img
    };
  }
}

