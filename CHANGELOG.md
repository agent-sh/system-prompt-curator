# Changelog

## 2.0.1

- Marked the skill as manual-only for Claude-style auto-invocation because its generated prompt templates include commit, push, and pull-request behavior.
- Kept the cross-version CI and contract tests as part of the published source release.

## 2.0.0

- Promoted to official agent-sh plugin under the agentsys umbrella.
- Skill is now the canonical, cross-tool reference for system prompt design.
- Added proper plugin structure (commands, packaging, docs).
- Maintains full backward compatibility with previous versions.
