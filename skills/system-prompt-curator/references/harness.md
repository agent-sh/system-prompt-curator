# Enforce in the harness

Read this when writing the harness-level recommendations. Prose asks; code guarantees. Recommend these where they apply.

- **Check completion.** Reject a "done" result when the diff is empty, tests were not run, or a required artifact (PR URL) is missing, and tell the agent what is missing.
- **Separate stop path.** A `blocked` or `request_help` tool distinct from the completion tool, so giving up honestly is cheaper than faking success.
- **Structured outputs.** Use the API's structured output or a strict tool schema for anything code parses, instead of "return only JSON" and retry-on-parse loops.
- **Say when output is empty.** Report "command succeeded with no output" rather than an empty observation, which models misread.
- **Truncate large output** with a note on how to get the rest (line ranges, grep).
- **Non-interactive environment.** `PAGER=cat`, `GIT_PAGER=cat`, CI-style flags, no prompts that wait for input.
- **Permissions and allowlists.** Destructive or shared actions (force-push, deleting branches, publishing, spending) gated by the harness, not only by a sentence in the prompt.
- **Context management.** Keep recent tool results in full and summarize older ones, or let the platform's compaction do it; do not render remaining-token countdowns into the prompt, which cause early wrap-up.
- **Stable prompt prefix.** Keep timestamps, IDs and per-task content after the stable system prompt so prompt caching works.
