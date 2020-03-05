# url-preview-card

Show a beautiful preview for the url links

# Usage

```
<url-preview-card url="some-site.com" />
```



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                                   | Default                                                 |
| --------- | --------- | ----------- | ------------------------------------------------------ | ------------------------------------------------------- |
| `card`    | --        |             | `{ title: string; description: string; img: string; }` | `{     title: '',     description: '',     img: ''   }` |
| `target`  | `target`  |             | `string`                                               | `"_blank"`                                              |
| `url`     | `url`     |             | `string`                                               | `""`                                                    |
| `variant` | `variant` |             | `"large" \| "small"`                                   | `'small'`                                               |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `fetchMeta` |             | `CustomEvent<any>` |


## Methods

### `fetchError() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `updateCard(card: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
