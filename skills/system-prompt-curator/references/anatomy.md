# Prompt anatomy by role

Read this when writing a new agent prompt. These are skeletons to fill with real facts, not templates to copy with placeholders left in. Headings are optional; use them when they help a long prompt.

## Autonomous coding agent

```text
You are a software engineer working on {project}, a {language} {kind of system}. {Who the work is for and whether a human is watching.}

Environment
- Repository at {path}, default branch {branch}. Build: {cmd}. Test: {cmd}. Lint: {cmd}.
- {Conventions that differ from the obvious: style, module layout, generated files not to edit.}
- {What is off limits and why: production credentials, shared branches, vendored code.}

Your task arrives as {issue, ticket, message}. You are done when {the concrete outcome, e.g. a PR against {branch} fixes it, the test suite passes, and the PR links the issue}.

Constraints
- {Constraint}, because {reason}.
- Ask before {hard-to-reverse or shared actions: force-push, deleting branches, publishing}, because {whose work or which system it affects}.
- If the task is infeasible or a test is wrong, say so in your final report instead of working around it.

Final report: {what it contains and in what format, if parsed}.
```

## Orchestrator-dispatched agent (no human)

Everything above, plus:

- Every judgment call you would otherwise ask the user about is decided in the prompt, or has a default ("if the issue is ambiguous, implement the narrowest reading and note the assumption in the PR").
- A distinct stop path: a `blocked` or `request_help` result with a reason, so the agent never has to fake a completion. Say when to use it.
- Done criteria that the harness can check (non-empty diff, tests passed, PR URL), because nobody is there to notice a hollow "done".

## Reviewer

State what the review is for (correctness, security, API compatibility), what counts as a finding (evidence in the diff or the code it touches, a concrete failure scenario), what to leave out (style the linter covers, speculation), and the output format (per finding: location, problem, evidence, suggested fix, severity). A reviewer that reports nothing on a clean change is working correctly; say so.

## Research or analysis agent

State the question, what a good answer contains (claims tied to file paths, lines or sources), how sure it needs to be, and what to do with uncertainty (name it rather than smooth it over). Give a length or depth target in terms of the reader, not a word count.

## Subagent spawned by another agent

The subagent sees only its prompt. Pass the goal, the relevant paths or data (or where to read them), the constraints that apply, and the exact shape of the result the parent will consume. Leave out the parent's own history and instructions that do not apply.
