<div align="center">

<img height="120" src="https://github.com/faceair/smart-commit/blob/main/images/logo.png?raw=true">

<h1>Smart Commit</h1>

AI-powered commit message generator for VS Code. Automatically generate conventional commit messages that meet standards using Azure/OpenAI API.

**English** · [简体中文](./README.zh_CN.md) · [Report Bug](https://github.com/faceair/smart-commit/issues) · [Request Feature](https://github.com/faceair/smart-commit/issues)

</div>

## ✨ Features

- 🤯 Generate meaningful commit messages using ChatGPT / Azure API
- 🗺️ Support for multiple languages
- 😜 Gitmoji integration
- 📝 Follow Conventional Commits specification

## 📦 Installation

1. Search for "Smart Commit" in VS Code and click the "Install" button.
2. Install it directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=faceair.smart-commit).

> **Note**\
> Make sure your node version >= 16

## 🤯 Usage

1. Ensure that you have installed and enabled the "Smart Commit" extension.
2. In VSCode settings, locate the "smart-commit" configuration options and configure them as needed.
3. Make changes in your project and add the changes to the staging area (git add).
4. Next to the commit message input box in the "Source Control" panel, click the "Smart Commit" icon button.
5. Review the generated commit message, and if you are satisfied, proceed to commit your changes.

### ⚙️ Configuration

| Configuration      |  Type   |         Default          | Required |                                        Notes                                        |
| :----------------- | :-----: | :----------------------: | :------: | :---------------------------------------------------------------------------------: |
| openai_api_key     | string  |           None           |   Yes    |            [OpenAI token](https://platform.openai.com/account/api-keys)             |
| openai_base_url    | string  | https://api.deepseek.com |    No    | If using Azure, use: https://{resource}.openai.azure.com/openai/deployments/{model} |
| openai_model       | string  |      deepseek-chat       |   Yes    |                                    OpenAI MODEL                                     |
| azure_api_version  | string  |           None           |    No    |                                  AZURE_API_VERSION                                  |
| ai_commit_language | string  |            en            |   Yes    |                                Supports 19 languages                                |
| emoji_enabled      | boolean |          false           |   Yes    |                               Enable or disable Emoji                               |

## ⌨️ Local Development

```bash
$ git clone https://github.com/faceair/smart-commit.git
$ cd smart-commit
$ npm install
```

Open the project folder in VSCode. Press F5 to run the project.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🔗 Credits

- **ai-commit** - <https://github.com/Sitoi/ai-commit>
- **auto-commit** - <https://github.com/lynxife/auto-commit>
- **opencommit** - <https://github.com/di-sukharev/opencommit>

## 📝 License

This project is [MIT](./LICENSE) licensed.
