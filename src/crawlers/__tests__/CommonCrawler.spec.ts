import CommonCrawler from '../CommonCrawler';

describe('CommonCrawler', () => {
  let crawler: CommonCrawler;

  beforeAll(async () => {
    crawler = new CommonCrawler();
    await crawler.init();
  });

  afterAll(async () => {
    await crawler.exit();
  });

  it('should get page body', async () => {
    const body = await crawler.getPageBody('https://www.google.com/');
    expect(body).toBeTruthy();
    expect(body).toMatch(/^<body/);
  });

  it('should get page body with id', async () => {
    const body = await crawler.getPageBody('https://www.google.com/', '#main');
    expect(body).toBeTruthy();
    expect(body).toMatch(/^<div class="content" id="main">/);
  });

  it('should get page body with class nmae', async () => {
    const body = await crawler.getPageBody('https://www.google.com/', '.ctr-p');
    expect(body).toBeTruthy();
    expect(body).toMatch(/^<div class="ctr-p" id="viewport">/);
  });

  it('should get the outer html', async () => {
    const html = await crawler.getOuterHtml('#searchform');
    expect(html).toBeTruthy();
    expect(html).toMatch(/id="searchform"/);
  });

  it('should verify an element', async () => {
    const result = await crawler.hasElement('#searchform');
    expect(result).toBeTruthy();
  });

  it('should get cookie string', async () => {
    const cookie = await crawler.getCookieStr();
    expect(cookie).toBeTruthy();
    expect(cookie.length).toBeGreaterThan(1);
  });

  it('should return null with an invalid page', async () => {
    const result = await crawler.getPageBody('http://localhost:1111');
    expect(result).toBeNull();
  });
});
