import { loadFileAsCheerio } from '../loadFileAsCheerio';

describe('loadFileAsCheerio', () => {
  it('should make cheerio object from the file path', () => {
    const path = __dirname + '/test.html';
    const $ = loadFileAsCheerio(path);
    expect($).toBeTruthy();
    if ($) {
      expect($('h1').text()).toEqual('TEST');
      expect($('h2').html()).toEqual('テスト');
    }
  });

  it('should return null if invalid file path', () => {
    const $ = loadFileAsCheerio('hoge.txt');
    expect($).toBeNull();
  });
});
