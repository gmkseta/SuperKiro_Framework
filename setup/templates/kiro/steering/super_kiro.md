---
inclusion: always
---

# SuperKiro Steering

Lightweight, always-included guides that you target by file path (and optional hashtag triggers).

This project organizes steering as:
- `.kiro/steering/super_kiro.md` (this overview)
- `.kiro/super_kiro/commands/*` (all command templates)

- Include all files in this folder in the system/context using the `inclusion: always` front matter.
- Primary usage: reference the steering file explicitly in your message.
  - Example: `Use .kiro/super_kiro/commands/sk_document.md src/api --type api --style detailed`
- Hashtag triggers: `#sk_<name>` or `#sk:<name>` at message start selects the corresponding steering file.
  - Example: `#sk_document src/api --type api --style detailed`
  - Mapping: `#sk_<name>` selects the corresponding command behavior
  - Tokenization: split on spaces; support quoted segments ("...") for paths with spaces.
  - Behavior: Treat the remainder of the message as arguments to the steering behavior.
  - Agents: use plain `#<agent_name>` (e.g., `#security_engineer`) to select persona files under `.kiro/steering/`.
- Flags announcement: If global flags are present (e.g., `--ultrathink`), announce them immediately after the consulted line, e.g., `Applied flags: --ultrathink`.

## Mandatory Output Header

To prove the steering file was actually consulted, every response that uses a `#sk_<name>` command MUST begin with:

1. `Consulted: .kiro/super_kiro/commands/sk_<name>.md`
2. If any flags were provided, the next line: `Applied flags: <flags>` (omit if none)

The `<name>` must match the invoked command (e.g., `document`, `analyze`, `implement`). Do not paraphrase or alter these two lines.

## Command Files

Command files live under `.kiro/super_kiro/commands/` and are named `sk_<name>.md`.
  - Mapping: `<name>` → `sk_<name>.md`
- Examples: `sk_document.md`, `sk_analyze.md`, `sk_explain.md`, `sk_improve.md`, etc.

## Global Flags & Rules

Use these flags with any command file. Apply definitions exactly as documented; do not infer unspecified behavior.

Analysis Depth
- `--think`: Structured analysis (~4K tokens).
- `--think-hard`: Deep analysis (~10K tokens).
- `--ultrathink`: Maximum depth (~32K tokens).

MCP Control
- `--all-mcp`: Enable all MCP servers.
- `--no-mcp`: Disable all MCP servers (overrides others).
- Individual servers: `--seq` (Sequential), `--c7` (Context7), `--magic` (UI/Magic), `--play` (Playwright), `--morph` (Morphllm), `--serena` (Memory/Symbols).

Safety & Execution
- `--safe-mode`: Maximum validation; auto-enables `--uc` and `--validate`.
- `--validate`: Pre-execution checks and risk assessment.
- `--loop`: Iterative improvement cycles; combine with `--iterations N`.
- `--concurrency N`: Parallel operations (1–15).

Output Optimization
- `--uc` / `--ultracompressed`: 30–50% token reduction with symbol-enhanced communication.

Flag Handling Protocol
- Detect global flags in the message args (e.g., `--think`, `--c7`).
- Announce application: print `Applied flags: <flags>` right after the consulted line.
- Apply behaviors exactly as documented (SuperClaude/Core/FLAGS.md, Docs/User-Guide/flags.md). Do not infer extra effects beyond explicit policy.

Flag Priority Rules
- Safety first: `--safe-mode` > `--validate` > optimization flags.
- Explicit override: User-provided flags take precedence over auto-activation.
- Depth hierarchy: `--ultrathink` > `--think-hard` > `--think`.
- MCP control: `--no-mcp` overrides all individual MCP flags.

Flag Interactions
- Compatible: `--think` + `--c7`; `--magic` + `--play`; `--serena` + `--morph`; `--safe-mode` + `--validate`; `--loop` + `--validate`.
- Conflicts: `--all-mcp` vs individual MCP flags (prefer one); `--no-mcp` vs any MCP flags (no-mcp wins); `--safe` vs `--aggressive`; `--quiet` vs `--verbose`.
- Auto-relationships: Use only those explicitly documented by the framework or command. Do not auto-enable MCP servers from depth flags. If policy states `--safe-mode` implies `--uc` (and/or `--validate`), announce and apply accordingly.

## Command Index

Quick links to command templates (paths are relative to workspace root):

- analyze → `.kiro/super_kiro/commands/sk_analyze.md`
- brainstorm → `.kiro/super_kiro/commands/sk_brainstorm.md`
- build → `.kiro/super_kiro/commands/sk_build.md`
- business_panel → `.kiro/super_kiro/commands/sk_business_panel.md`
- cleanup → `.kiro/super_kiro/commands/sk_cleanup.md`
- design → `.kiro/super_kiro/commands/sk_design.md`
- document → `.kiro/super_kiro/commands/sk_document.md`
- estimate → `.kiro/super_kiro/commands/sk_estimate.md`
- explain → `.kiro/super_kiro/commands/sk_explain.md`
- git → `.kiro/super_kiro/commands/sk_git.md`
- implement → `.kiro/super_kiro/commands/sk_implement.md`
- improve → `.kiro/super_kiro/commands/sk_improve.md`
- index → `.kiro/super_kiro/commands/sk_index.md`
- load → `.kiro/super_kiro/commands/sk_load.md`
- reflect → `.kiro/super_kiro/commands/sk_reflect.md`
- save → `.kiro/super_kiro/commands/sk_save.md`
- select_tool → `.kiro/super_kiro/commands/sk_select_tool.md`
- spawn → `.kiro/super_kiro/commands/sk_spawn.md`
- task → `.kiro/super_kiro/commands/sk_task.md`
- test → `.kiro/super_kiro/commands/sk_test.md`
- troubleshoot → `.kiro/super_kiro/commands/sk_troubleshoot.md`
- workflow → `.kiro/super_kiro/commands/sk_workflow.md`

## Agents Index (Manual `#<agent>` Triggers)

These persona templates live directly under `.kiro/steering/` and are triggered manually via `#<agent>` in Kiro chat. Responses MUST begin with `Consulted: <path>` and optional `Applied flags:` line.

- `#security_engineer` → `.kiro/steering/sk_security_engineer.md`
- `#backend_architect` → `.kiro/steering/sk_backend_architect.md`
- `#system_architect` → `.kiro/steering/sk_system_architect.md`
- `#frontend_architect` → `.kiro/steering/sk_frontend_architect.md`
- `#devops_architect` → `.kiro/steering/sk_devops_architect.md`
- `#quality_engineer` → `.kiro/steering/sk_quality_engineer.md`
- `#performance_engineer` → `.kiro/steering/sk_performance_engineer.md`
- `#python_expert` → `.kiro/steering/sk_python_expert.md`
- `#refactoring_expert` → `.kiro/steering/sk_refactoring_expert.md`
- `#requirements_analyst` → `.kiro/steering/sk_requirements_analyst.md`
- `#root_cause_analyst` → `.kiro/steering/sk_root_cause_analyst.md`
- `#technical_writer` → `.kiro/steering/sk_technical_writer.md`
- `#learning_guide` → `.kiro/steering/sk_learning_guide.md`
- `#socratic_mentor` → `.kiro/steering/sk_socratic_mentor.md`
