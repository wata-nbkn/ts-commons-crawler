import * as puppeteer from 'puppeteer';
import { Logger } from 'log4js';
import { CommonUtil } from '@wata-nbkn/ts-commons/lib/utils';

export class CommonCrawler {
  protected logger: Logger;
  protected browser: puppeteer.Browser;
  protected page: puppeteer.Page;
  private headless: boolean;

  constructor(headless = true) {
    this.logger = CommonUtil.getLogger(__filename);
    this.headless = headless;
  }

  public async init() {
    this.logger.debug('Initialize');
    this.browser = await puppeteer.launch({ headless: this.headless });
    this.page = await this.browser.newPage();
  }

  public async exit() {
    await this.browser.close();
    this.logger.debug('Exit');
  }

  public async getPageBody(url: string, selector = 'body') {
    this.logger.debug('Enter:: getPageBody');

    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      await this.page.waitFor(2000);
    } catch (e) {
      this.logger.error(e);
      return null;
    }

    let body = null;
    try {
      body = await this.page.evaluate(
        (selector) => {
          const calender = document.querySelectorAll(selector);
          if (calender && calender[0]) {
            return calender[0].outerHTML;
          }
          return null;
        },
        [selector]
      );
    } catch (e) {
      this.logger.error(e);
    }

    if (body == null) {
      this.logger.warn(`selector "${selector}" is not found`);
    }

    this.logger.debug('Exit:: getPageBody');
    return body;
  }
}

export default CommonCrawler;
