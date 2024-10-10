# Transliterate

Small transliteration library which solwing problem when you trying to create slug from accented languages like Slovak or Czech.

## Usage

Installation

```bash
# Hugo by default dont need NPM
npm init
npm i @themaymeow/transliterator
```
Use it in your own script

```javascript
const { slugify } = require('@themaymeow/transliterator/transliterator.js')
let slug = slugify("Your text");
// your-text
```

if you want to append random string suffix `v1.0.1+` you can do this as follows

```javascript
// ...
let slug = slugify("Your text", true);
// your-text-a1s223de
```
