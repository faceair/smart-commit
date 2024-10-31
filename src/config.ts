import * as vscode from 'vscode';

export const ConfigKeys = {
  openai_api_key: 'openai_api_key',
  openai_base_url: 'openai_base_url',
  openai_model: 'openai_model',
  azure_api_version: 'azure_api_version',
  ai_commit_language: 'ai_commit_language',
  emoji_enabled: 'emoji_enabled',
  full_gitmoji_spec: 'full_gitmoji_spec'
};

export function getConfig<T>(key: string): T {
  const config = vscode.workspace.getConfiguration('smart-commit');
  return config.get<T>(key, null as unknown as T);
}
