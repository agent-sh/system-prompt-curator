# Contributing to system-prompt-curator

This is one of the foundational meta-skills in the agent-sh ecosystem.

## Guidelines

- The `skills/system-prompt-curator/SKILL.md` file is the product. All principles and anti-patterns live there.
- When adding new specialized templates, include at least one realistic full trajectory with error recovery.
- The 10 Core Principles are intentionally conservative. They are the result of extensive cross-agent research. Changes require strong evidence.
- Keep the distinction clear between what belongs in the prompt vs what should be enforced in the harness.

## Testing

Any change should be validated by:
- Using the updated curator to generate or improve at least two different agent prompts
- Testing those prompts in the target agent tools
- Running `agnix` on the skill file

See the main agentsys contributing guidelines for release process.
