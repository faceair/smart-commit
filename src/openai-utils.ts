import OpenAI from 'openai';
import { ConfigKeys, getConfig } from './config';

const apiKey = getConfig<string>(ConfigKeys.openai_api_key);
const baseURL = getConfig<string>(ConfigKeys.openai_base_url);
const model = getConfig<string>(ConfigKeys.openai_model);
const apiVersion = getConfig<string>(ConfigKeys.azure_api_version);

const openaiConfig: {
  apiKey: string;
  baseURL?: string;
  defaultQuery?: { 'api-version': string };
  defaultHeaders?: { 'api-key': string };
} = {
  apiKey
};
if (apiVersion) {
  openaiConfig.defaultQuery = { 'api-version': apiVersion };
  openaiConfig.defaultHeaders = { 'api-key': apiKey };
}
if (baseURL) {
  openaiConfig.baseURL = baseURL;
}
console.log('openaiConfig: ', openaiConfig);
const openai = new OpenAI(openaiConfig);

export async function ChatGPTAPI(messages) {
  const result = await openai.chat.completions.create({
    model,
    messages
  });
  return result.choices[0]!.message?.content;
}
