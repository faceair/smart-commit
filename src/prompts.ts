import { ConfigKeys, getConfig } from './config';

const language = getConfig<string>(ConfigKeys.ai_commit_language);
const emoji_enabled = getConfig<boolean>(ConfigKeys.emoji_enabled);


const INIT_MAIN_PROMPT = (language: string) => ({
  role: 'system',
  content: `Analyze all changes and write a Git commit message following these rules:

1. Summary line should describe the most impactful change:
   - Choose the change that has the biggest impact on functionality, usability, or developer experience
   - Scope should be specific (e.g., component name, file name) rather than general module names
   - Format: "${emoji_enabled
      ? '[EMOJI] [TYPE](scope): [brief description]'
      : '[TYPE](scope): [brief description]'
    }" (max 74 characters)
   - ${emoji_enabled
      ? `Most used commit types:
       🐛 fix     Bug fixes
       ✨ feat    New features
       ♻️ refactor Code changes
       📝 docs    Documentation
       🔧 config  Configuration`
      : `Most used commit types:
       fix     Bug fixes
       feat    New features
       refactor Code changes
       docs    Documentation
       config  Configuration`
    }
    - Use ${language} for all text.


2. Other notable changes as bullet points:
   - Start each line with "- " using lowercase
   - Only include changes different from the summary line
   - Skip trivial details and implementation specifics
   - If all remaining changes are minor, omit the details section

Example:
For changes like:
- Moving Header and StatusBar out of RootComponent
- Updating layout styles
- Fixing some comments

Write:
${emoji_enabled
      ? '🔧 refactor(RootComponent.ts): remove header and statusbar to simplify layout'
      : 'refactor(RootComponent.ts): remove header and statusbar to simplify layout'
    }
- update component layout styles"

(Note: Comment fixes were omitted as minor changes);`
});


export const getMainCommitPrompt = async () => {
  return [
    INIT_MAIN_PROMPT(language || 'en'),
    {
      role: 'user',
      content: `diff --git a/src/server.ts b/src/server.ts
          index ad4db42..f3b18a9 100644
          --- a/src/server.ts
          +++ b/src/server.ts
          @@ -10,7 +10,7 @@
          import {
              initWinstonLogger();

              const app = express();
              -const port = 7799;
              +const PORT = 7799;

              app.use(express.json());

              @@ -34,6 +34,6 @@
              app.use((_, res, next) => {
                  // ROUTES
                  app.use(PROTECTED_ROUTER_URL, protectedRouter);

                  -app.listen(port, () => {
                      -  console.log(\`Server listening on port \${port}\`);
                      +app.listen(process.env.PORT || PORT, () => {
                          +  console.log(\`Server listening on port \${PORT}\`);
                      });`
    },
    {
      role: 'assistant',
      content: `${emoji_enabled
        ? '♻️ refactor(server): add environment variable support for port'
        : 'refactor(server): add environment variable support for port'
        }
- rename hardcoded port variable to PORT constant
- add process.env.PORT as configurable option`
    }
  ];
};
