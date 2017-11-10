# postcss-pe

PostCSS plugin that defines a `pe` unit that transforms a value in px to output its equivalent in em.

**Write this:**

```css
:root {
  font: 16px / 1.5 "Helvetica", "Arial", sans-serif;
}

section {
  margin-bottom: 24pe;
  padding-top: 32pe;
}

.othersection {
  font-size: 48pe;
}

/* Note the slash character to set the parent font-size */
.othersection article {
  margin-top: 96/48pe;
}
```

**And get this:**

```css
:root {
  font: 16px / 1.5 "Helvetica", "Arial", sans-serif;
}

section {
  margin-bottom: 1.5em;
  padding-top: 2em;
}

.othersection {
  font-size: 3em;
}

.othersection article {
  margin-top: 2em;
}
```

## Installation

`$ npm install postcss-pe`

## Usage

### Add the plugin

```JS
postcss([ require('postcss-pe') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.

### Write your css

You can write sizes in two different forms:

1. `{value}/[parentSize]pe`. e.g. `24/16pe` which will produce `1.5em` 
2. `{value}pe`. e.g. `24pe` which will produce `1.5em` if `divider` is 16px.

### Looking for divider

Plugin tries to find a divider by next steps:

1. Explicit option `rootFontSize`, e.g. `rootFontSize: 16`.
2. If no `rootFontSize`, the plugin will use the font-size in the root element. `:root` by default.
3. If no root element, then `16px` will be assumed.

## Options

### `rootSelector`

- Type: `string`
- Default: `:root`

The selector where the font-size is set. Used when the parent size of the element is omitted.

### `unit`

- Type: `string`
- Default: `pe`

The unit to be used in your CSS.

### `rootFontSize`

- Type: `number`
- Default: `null`

The default root font size.

### `followRuleFontSize`

- Type: `boolean`
- Default: `false`

Plugin retrieves `font-size` value declared in each css **rule** and use it as a divider for this **rule**. If there is no `font-size`, it defines in [default way](#looking-for-divider).
`followRuleFontSize` works only for `pe` units.

`followRuleFontSize: true`

```css
/* From */
p {
	font-size: 24pe; /* 24/16 */
	margin: 24pe; /* 24/24 */
}

/* To */
p {
	font-size: 1.5em;
	margin: 1em;
}
```

`followRuleFontSize: false`

```css
/* From */
p {
	font-size: 24pe; /* 24/16 */
	margin: 24pe; /* 24/16 */
}

/* To */
p {
	font-size: 1.5em;
	margin: 1.5em;
}
```


## License

MIT - James Kolce
