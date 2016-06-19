# postcss-pr

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
2. `{value}pe`. e.g. `24pe` which will produce `1.5em` if the font-size of the root element is 16px.

**Notes:** 
- If you don't set an explicit parent font-size, this plugin will use the font-size in the root element. `:root` by default.
- If there is no font-size declaration in the root element, then `16px` will be assumed.

## Options

### `rootSelector`

- Type: `string`
- Default: `:root`

The selector where the font-size is set. Used when the parent size of the element is omitted.

### `unit`

- Type: `string`
- Default: `pe`

The unit to be used in your CSS.

## License

MIT - James Kolce
