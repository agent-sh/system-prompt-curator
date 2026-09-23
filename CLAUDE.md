# CLAUDE.md — system-prompt-curator

Follow the Karpathy Guidelines strictly when working in this repository.

This skill encodes hard-won patterns for agent system prompts. Change the guidance when current model behavior or vendor documentation supports it, and say what the evidence is.

## Key Rules

- The skill body is the heart of the product. Changes here have wide impact.
- Keep role skeletons short; long demonstration trajectories get copied by the model.
- When improving prompts, be surgical — explain every change.
- The harness-level recommendations section is deliberately separate from the prompt template. Keep those items outside the prompt itself unless the user specifically asks for a pure-prompt solution.
