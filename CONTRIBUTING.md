# Contributing to system-prompt-curator

This is one of the foundational meta-skills in the agent-sh ecosystem.

## Guidelines

- `skills/system-prompt-curator/SKILL.md` and its `references/` are the product.
- New role skeletons list the facts to fill in; they are not worked trajectories.
- Claims about how models respond to prompts need a current source (vendor prompting docs, a measured eval). Prompts are per-model artifacts and the guidance is re-checked when models change.
- Keep the distinction clear between what belongs in the prompt vs what should be enforced in the harness.

## Testing

Any change should be validated by:
- Using the updated curator to generate or improve at least two different agent prompts
- Testing those prompts in the target agent tools
- Running `agnix` on the skill file

See the main agentsys contributing guidelines for release process.
