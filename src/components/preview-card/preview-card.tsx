import { Component, Host, h, Prop, State, EventEmitter, Event, Method } from '@stencil/core';

@Component({
  tag: 'url-preview-card',
  styleUrl: 'preview-card.css',
  shadow: true
})
export class PreviewCard {
  // props
  @Prop() url: string = "";
  @Prop() variant: 'small' | 'large' = 'small';
  @Prop() target: string = "_blank";
  @Prop() customProxy: boolean = false;
  @Prop() card: {
    title: string,
    description: string,
    img: string,
  } = {
    title: '',
    description: '',
    img: ''
  };

  // state
  @State() host: string;
  @State() isFetching: boolean = true;
  @State() error: boolean = false;

  @Event() fetchMeta: EventEmitter;

  componentWillLoad() {
    this._constructCard();
  }

  render() {
    let content: any;
    if (this.isFetching) {
      content = this._loaderContent();
    } else if (this.error) {
      content = this._error();
    } else if (!this.isFetching) {
      content = this._card();
    }

    return (
      <Host>
        <a href={this.url} class="card__link" target={this.target} rel="noreferrer">
          {content}
        </a>
      </Host>
    );
  }

  private async _constructCard() {
    let parsed = new URL(this.url);
    this.host = parsed.hostname;
    (this.customProxy) ? this.fetchMeta.emit(this.url) : this._fetchData();
  }

  // methods
  @Method()
  public updateCard(card: any) {
    this.card = {
      title: card.title,
      description: card.description,
      img: card.img
    };
    this.isFetching = false;
  }

  @Method()
  public fetchError() {
    this.isFetching = false;
    this.error = true;
  }

  private async _fetchData() {
    let proxyUrl = `http://localhost:9000/.netlify/functions/fetch-meta?url=${this.url}`;
      let {
        data
      } = await fetch(proxyUrl).then(response => response.json());
      console.log(data)
    // await fetch(`http://localhost:9000/.netlify/functions/fetch-meta?url=${this.url}`, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*'
    //   }
    // }).then(res => res.json())
  }

  // templates
  private _loaderContent() {
    return (
      <div class="card card--small">
        <div class="loader">
          <small class="muted">Fetching preview...</small>
        </div>
      </div>
    );
  }

  private _error() {
    return (
      <div class="card card--small">
        <div class="loader">
          <small class="muted error">Failed to load preview.</small>
          <p class="muted">
            <small>{this.url}</small>
          </p>
        </div>
      </div>
    );
  }

  private _card() {
    return (
      <div class={`card card--${this.variant}`}>
        <div class={`card__img card__img--${this.variant}`}>
          <img src={this.card.img} />
        </div>

        <div class="card__content">
          <div class="card__title">
            {this.card.title}
          </div>
          <div class="card__host">
            <small class="muted">{this.host}</small>
          </div>
          <div class="card__description muted">
            {this.card.description}
          </div>
        </div>
      </div>
    );
  }
}

