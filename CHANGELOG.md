# Changelog

## 2.1.0

- Rewrote the guidance for current models. The skill now teaches context the model lacks, the goal and done criteria, constraints with reasons, stop paths for unattended runs, and harness enforcement.
- Removed dated doctrine: mandatory Explore/Plan/Implement/Verify/Deliver phases, a required full demonstration trajectory, think-tool and think-before-act instructions, "IMPORTANT and MUST are fine", tool manuals in the prompt, "Every section is mandatory", retry-on-malformed-output advice, and quotes attributed to other agents' prompts.
- Moved detail into `references/audit.md` (dated patterns and replacements), `references/anatomy.md` (role skeletons) and `references/harness.md` (what to enforce in code).
- The command reports the same four things (issue summary, token estimate, orchestrator suitability, harness recommendations), asks only for facts it cannot find, and writes files only when asked.

## 2.0.1

- Marked the skill as manual-only for Claude-style auto-invocation because its generated prompt templates include commit, push, and pull-request behavior.
- Kept the cross-version CI and contract tests as part of the published source release.

## 2.0.0

- Promoted to official agent-sh plugin under the agentsys umbrella.
- Skill is now the canonical, cross-tool reference for system prompt design.
- Added proper plugin structure (commands, packaging, docs).
- Maintains full backward compatibility with previous versions.
