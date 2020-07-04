import * as cheerio from 'cheerio';
import { getCheerioStatic } from '../getCheerioStatic';

describe('getCheerioStatic', () => {
  const body = `
    <body>
      <div>
        <h1>TEST</h1>
      </div>
    </body>
`;

  it('should return cheerio object from body', () => {
    const $ = cheerio.load(body);
    const div = $('body');
    const $2 = getCheerioStatic(div);
    expect($2('h1').text()).toEqual('TEST');
  });

  it('should return cheerio object from div', () => {
    const $ = cheerio.load(body);
    const div = $('div');
    const $2 = getCheerioStatic(div);
    expect($2('h1').text()).toEqual('TEST');
  });
});
