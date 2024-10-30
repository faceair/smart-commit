import { i18n, I18nLocals } from './i18n';

import { ConfigKeys, getConfig } from './config';
import { removeConventionalCommitWord } from './utils';

const language = getConfig<string>(ConfigKeys.AI_COMMIT_LANGUAGE);
const emoji_enabled = getConfig<boolean>(ConfigKeys.EMOJI_ENABLED);
const fullGitMojiSpec = getConfig<boolean>(ConfigKeys.FULL_GITMOJI_SPEC);

const translation = i18n[(language as I18nLocals) || 'en'];

export const IDENTITY = 'You are to act as the author of a commit message in git.';

const INIT_MAIN_PROMPT = (language: string) => ({
  role: 'system',
  content: `${IDENTITY}
Analyze all changes and write a Git commit message following these rules:

1. Summary line should describe the most impactful change:
   - Choose the change that has the biggest impact on functionality, usability, or developer experience
   - Scope should be specific (e.g., component name, file name) rather than general module names
   - Format: "${fullGitMojiSpec
      ? '[EMOJI] [TYPE](scope): [brief description]'
      : emoji_enabled
        ? '[EMOJI] [brief description]'
        : '[TYPE]: [brief description]'
    }" (max 74 characters)

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
"refactor(RootComponent): remove header and statusbar to simplify layout
- update component layout styles"

(Note: Comment fixes were omitted as minor changes)

Use ${language} for all text. ${emoji_enabled
      ? 'Common GitMoji: 🐛(fix), ✨(feat), 📝(docs), ♻️(refactor), ⬆️(deps), 🔧(config)'
      : 'Common types: fix, feat, docs, refactor, chore, style, test'
    }`
});

export const INIT_DIFF_PROMPT = {
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
};

const INIT_CONSISTENCY_PROMPT = (translation) => ({
  role: 'assistant',
  content: `${emoji_enabled
    ? `🐛 ${removeConventionalCommitWord(translation.commitFix)}`
    : translation.commitFix
    }
  ${emoji_enabled
      ? `✨ ${removeConventionalCommitWord(translation.commitFeat)}`
      : translation.commitFeat
    }
`
});

export const getMainCommitPrompt = async () => {
  return [
    INIT_MAIN_PROMPT(translation.localLanguage),
    INIT_DIFF_PROMPT,
    INIT_CONSISTENCY_PROMPT(translation)
  ];
};
