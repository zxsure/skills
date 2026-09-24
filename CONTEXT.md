# Domain Context & Glossary

This document establishes the ubiquitous language used throughout this repository.

## Terminology

### Skill
A self-contained folder under `skills/<name>/` containing a `SKILL.md` file. It teaches an LLM agent a specialized protocol, role, or workflow.

### Socratic Loop
The pedagogical method used by `wtf`: presenting one bite-sized concept (~150 words), showing a visual diagram, and asking a micro-check question before pausing for user input.

### Micro-Check (The Gate)
A single, lightweight thought experiment or puzzle at the end of each learning piece. The agent must stop and wait for the user to answer before continuing to the next piece.

### Audience Calibration
The ability of a skill (inspired by ELI5) to adjust its depth, vocabulary, and analogies based on the user's role (Beginner/Kid, Engineer, Architect, Manager).

### Visual Graph
An inline Mermaid diagram (`flowchart`, `sequenceDiagram`, `gitGraph`) or ASCII box art that visually maps data flows, state changes, or physical layouts.
