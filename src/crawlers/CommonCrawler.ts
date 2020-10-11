import * as puppeteer from 'puppeteer';
import { Logger } from 'log4js';
import { LogUtil } from '@wata-nbkn/ts-commons/lib/utils';
import { INTERNAL_LOGDIR_PATH } from 'consts';

export class CommonCrawler {
  protected logger: Logger;
  protected browser: puppeteer.Browser;
  protected page: puppeteer.Page;
  private headless: boolean;

  constructor(options?: { headless?: boolean; logDirPath?: string }) {
    const { headless = true, logDirPath } = options || {};
    this.logger = LogUtil.getLogger(logDirPath || `${INTERNAL_LOGDIR_PATH}/CommonCrawler`);
    this.headless = headless;
  }

  public async init() {
    this.logger.debug('Initialize');
    this.browser = await puppeteer.launch({ headless: this.headless });
    this.page = await this.browser.newPage();
  }

  public async exit() {
    await this.browser.close();
    this.logger.debug('Exit CommonCrawler');
  }

  public async getOuterHtml(selector: string) {
    try {
      return await this.page.evaluate(
        (selector) => {
          const elem = document.querySelector(selector);
          if (elem) {
            return elem.outerHTML;
          }
          return null;
        },
        [selector]
      );
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  public async hasElement(selector: string) {
    return this.getOuterHtml(selector) !== null;
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

    const body = await this.getOuterHtml(selector);
    if (body == null) {
      this.logger.warn(`selector "${selector}" is not found`);
    }

    this.logger.debug('Exit:: getPageBody');
    return body;
  }

  public async getCookieStr() {
    const cookies = await this.page.cookies();
    return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
  }
}

export default CommonCrawler;
