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
```
