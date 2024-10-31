import * as vscode from 'vscode';

import smartCommitController from './smart-commit-controller';

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.smart-commit', async (arg) => {
      await smartCommitController(arg);
    })
  );
}

export function deactivate() { }
