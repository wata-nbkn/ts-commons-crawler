# ts-commons-crawler

Utility modules for TypeScript Crawler/Scraper.

## How to use

1. Go to the project root you want to use this module
1. `$ echo @wata-nbkn:registry=https://npm.pkg.github.com >> .npmrc`
1. `$ npm install --save @wata-nbkn/ts-commons-crawler`

Then, you can import the modules in your ts files.
e.g.

```.js
import { getPageByCurl } from '@wata-nbkn/ts-commons-crawler/lib';
```

### For development

#### Commands

- test: `$ npm test`

  - You can run a single test by `$ npm test <path_to_test_file>`

- build: `$ npm run build`

  - The built files will be distributed to `libs` folder.

- publish: `$ npm publish`
