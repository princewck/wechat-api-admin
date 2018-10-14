/**
 * https://help.aliyun.com/document_detail/31870.html?spm=5176.8466029.cors.1.2e8b1450x6nwL3
 */
import { getSTS } from '../service/oss';

/**
 * STS授权方式上传， 注意不能漏掉stsToken
 */
export default async function upload(key, file) {
  key = key || (+new Date() + '_' + Math.floor(Math.random() * 10000));
  const t = await getSTS();
  const { AccessKeySecret, AccessKeyId, SecurityToken } = t;
  const client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken, // 没有会报错 403 : aliyun-oss-sdk-6.0.1.min.js:4 Uncaught (in promise) Error: The OSS Access Key Id you provided does not exist in our records.
    bucket: 'wblogimages'
  });
  const res = await client.put(key, file);
  return res;
}
