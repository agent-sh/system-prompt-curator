# CLAUDE.md — system-prompt-curator

Follow the Karpathy Guidelines strictly when working in this repository.

This skill encodes hard-won patterns for agent system prompts. Preserve the principles and anti-patterns unless a change has strong justification and evidence from multiple agent implementations.

## Key Rules

- The 10 Core Principles section is the heart of the skill. Changes here have wide impact.
- Always keep at least one strong demonstration trajectory with error recovery in the examples.
- When improving prompts, be surgical — explain every change.
- The harness-level recommendations section is deliberately separate from the prompt template. Keep those items outside the prompt itself unless the user specifically asks for a pure-prompt solution.
