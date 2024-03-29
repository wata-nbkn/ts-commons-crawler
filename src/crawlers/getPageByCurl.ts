import * as request from 'request';
import { LogUtil } from '@wata-nbkn/ts-commons/lib/utils';
import { INTERNAL_LOGDIR_PATH } from 'consts';

export async function getPageByCurl(url: string, options?: object): Promise<string | null> {
  const logger = LogUtil.getLogger(`${INTERNAL_LOGDIR_PATH}/getPageByCurl`);

  logger.info(`Access to ${url}`);
  return new Promise((resolve, reject) => {
    request({ uri: url, ...options }, (error, res, body: string) => {
      if (error) {
        logger.error(error);
        resolve(null);
      } else if (res?.statusCode !== 200) {
        logger.error(`The status code is ${res?.statusCode}`);
        resolve(null);
      } else {
        resolve(body);
      }
    });
  });
}
