# Auditing a prompt for dated patterns

Read this when improving an existing prompt. Each row is text written for weaker models that now makes strong ones worse, and what replaces it. A line counts as a finding only when it matches a row and you can say why it hurts on the target model. Context the model cannot get elsewhere is never a finding, however long it is.

| Pattern | Why it hurts now | Replace with |
|---|---|---|
| `CRITICAL:`, `IMPORTANT:`, `You MUST`, `NEVER` stacks, threats ("failure is unacceptable") | Current models follow the system prompt closely; shouting makes them over-apply the rule, turn cautious, and treat every marked line as equally top priority | The one or two real constraints, at normal volume, each with its reason |
| "Think step by step", scratchpad or `<thinking>` tag instructions, "plan before acting", "use the think tool" | Reasoning is native; depth is set by the harness (effort, thinking settings). Prose adds nothing or causes over-planning, and asking a model to print its reasoning can conflict with how reasoning is returned | Delete. Tune effort in the harness if needed |
| Fixed phase scripts (Explore, Plan, Implement, Verify, Deliver) for judgment work | The model's own plan fits the task better than a template; a script makes it walk steps that do not apply | The goal, done criteria and constraints. Keep numbered steps only where order is load-bearing (a release, a migration) |
| "Verify after every step", progress reports every N tool calls | Verification and narration are default behavior; cadences waste turns and bury the real check | One done criterion that names the evidence (tests pass, diff non-empty) |
| Long worked trajectories or a single gold example | Models copy an example's length, structure and tone, and old examples freeze old behavior | Nothing, or a short labeled example only where an output format must match exactly |
| Lists of "do not" lines with no reason | A prohibition against a mistake the model was not going to make can anchor it toward that mistake; bare rules generalize badly | Keep prohibitions that encode real constraints, with the reason; state the rest as what to do |
| The same rule restated in several sections | The model spends effort reconciling wordings and treats repetition as extra priority | Say it once, where it applies |
| "You will be graded on", "your work is measured by" | Describes the grader instead of the requirement | State the requirement |
| Hard word or line caps on output | Starves hard answers; tuned to an older model's verbosity | Describe the reader and what they need ("scannable, answers only what was asked"); keep format rules a parser needs |
| "Return JSON only", regex extraction, retry-on-parse loops | Structured outputs guarantee the schema | Structured outputs or a tool with a strict schema |
| Tool manuals in the system prompt, or tools the agent does not have | Duplicates the tool definitions and goes stale when tools change | Tool descriptions carry the contract; the prompt says when a tool matters for this job |
| Identity stubs ("You are a helpful AI agent") as the only context | A role line is fine; the defect is having no environment, audience or quality bar | One role sentence plus real context |
| Incident history, dates, "now works differently", model-version workarounds | The model never saw the old prompt; relative phrasing invents alternatives, and workarounds for retired models are dead weight | The current rule, stated as if it were always the rule |
| Hedges on real requirements ("try to", "if possible") | Read literally as permission to skip | State the requirement plainly |

## What stays

- Audience, environment, conventions, the quality bar and reasons: context is never cruft.
- Exact commands where only one sequence is safe.
- Safety constraints that reflect real failures on the target model (destructive git operations, publishing, spending money), with the reason.
- Output formats that code parses, and tool contracts.
- A single short recap of the key constraints at the end, if the prompt is long.

## How to report

For each finding: where it is, the text, the row it matches, why it hurts on the target model, and the fix. Order by impact. An audit that finds nothing should change nothing. If a removal is risky, suggest testing it on a few real tasks before and after.
