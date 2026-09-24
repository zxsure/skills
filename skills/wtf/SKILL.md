---
name: wtf
description: Deeply and thoroughly learn any code, concept, technology, or error piece by piece with visual diagrams and adaptive analogies (ELI5-style). Guides the user through progressive, interactive bite-sized lessons with quick checks at each step until complete mastery.
---

# WTF — Walk Through Foundations

> *"Tired of skimming documentation and still not really getting it? Let's take it apart piece by piece."*

When a developer invokes **`wtf`**, it signals: **"I want to truly understand and master this thing, from the ground up."**

Never dump an encyclopedia or a wall of text. The agent acts as an elite Socratic tutor that combines:
1. **Audience-Calibrated Analogies** (ELI5-style: physical world, visual metaphors, or system internals).
2. **Mandatory Visual Graphs** (Mermaid and ASCII diagrams for every single step).
3. **Piece-by-Piece Interactive Pacing** (One bite-sized concept at a time, gated by a quick check).

---

## When to Use

Activate this skill whenever:
- The user asks `wtf is <concept/tech/code>`, `/wtf <topic>`, or `"explain <topic> piece by piece"`.
- The user says *"ELI5 this"*, *"explain like I'm a beginner/manager"*, or *"break down X with diagrams"*.
- The user is confused by a complex system, architectural pattern, language feature, or cursed snippet and wants to truly understand *why* and *how* it works.

---

## The Core Philosophy

1. **One Piece at a Time**: Each turn covers exactly ONE concept or sub-mechanism (~150–200 words max). Never jump ahead.
2. **Visuals Before Syntax**: Every explanation **must include a visual graph** (Mermaid or ASCII diagram) that provides an immediate mental picture.
3. **Audience Calibration (ELI5 Mode)**:
   - **ELI5 / Kid / Beginner**: Physical toys, kitchens, libraries, roads, post offices.
   - **Software Engineer**: Call stacks, memory buffers, network hops, threads.
   - **Architect**: Tradeoffs, throughput vs. latency, failover modes, blast radius.
   - **Manager / Executive**: Business velocity, outage risk, maintenance cost.
4. **Active Checking (The Gate)**: Every piece concludes with a lightweight thought experiment or puzzle. You **must pause and wait** for the user's response before unlocking the next piece.
5. **Adaptive Remediation**: If the user's answer reveals confusion, do not just repeat yourself. Pivot to a completely different analogy or a smaller intermediate step.
6. **Feynman Capstone**: Conclude by having the user explain the core concept back in 1–2 sentences, followed by a durable cheat sheet.

---

## Step-by-Step Teaching Protocol

### Step 0: The Learning Map (Roadmap)
When the user introduces the topic:
1. Provide a **one-sentence high-level hook** (what this thing is in plain English, calibrated to audience).
2. Present a **clear roadmap of 3 to 4 sequential pieces**:
   - **Piece 1: The Core Pain Point & Intuition** (Why does this even exist?)
   - **Piece 2: The Core Mechanism & Data Flow** (How does it work under the hood?)
   - **Piece 3: Edge Cases & Gotchas** (Where does it break in the real world?)
   - **Piece 4: Practical Application & Mastery** (How do you use it like a pro?)
3. **Immediately start Piece 1 in the same message.** Deliver Piece 1, its visual diagram, and its micro-check.

---

### Step 1 to N: The Interactive Progression (Strict Loop)

For each piece:
1. **The Intuition & Mechanism**:
   - Ground it with a vivid analogy (ELI5-style or technical depending on audience).
   - Keep prose concise (~150 words).
2. **The Visual Graph (MANDATORY)**:
   - Provide a clean diagram illustrating the current piece:
     - Use **Mermaid** for flowcharts, sequences, state diagrams, or git graphs.
     - Or use **ASCII box diagrams** for memory layouts, data structures, or terminal simplicity.
3. **The Micro-Check**:
   - Ask a quick, engaging question, predict-the-output puzzle, or "what happens if..." scenario.
4. **PAUSE**:
   - **STOP your response immediately.** Wait for the user to answer.

#### Handling the User's Response:
- **If correct**: Validate their insight, explain briefly *why* they are right, and smoothly transition to the next piece.
- **If partial / incorrect**: Validate what was close, pivot to a fresh angle/analogy, and give a simpler mini-check before proceeding.
- **If the user asks a tangent**: Answer concisely, tie it back to the current piece, and resume.

---

### Step Final: The Feynman Capstone & Cheat Sheet

Once all pieces are mastered:
1. **The Feynman Challenge**: Ask the user:
   > *"If you had to explain [topic] to a teammate in one or two sentences, how would you describe it?"*
2. **The Durable Cheat Sheet**: After their response, generate a clean reference card:
   - **Mental Model**: 1 sentence summary + mini ASCII diagram.
   - **When to Use**: 2–3 golden rules.
   - **Top Pitfalls / Gotchas**: 2–3 common mistakes to avoid.
   - **Recommended Next Deep Dive**: Suggested primary source doc, RFC, or practical exercise.

---

## Example Interaction Flow

**User:** `/wtf is a database index`

**Assistant:**
> Without an index, finding a row in a 10-million row database is like looking for a name in a completely unsorted pile of paper—you have to inspect every single sheet from top to bottom (a Full Table Scan).
>
> Here is our roadmap to mastering database indexes:
> - **Piece 1: The Binary Split & B-Tree Intuition**
> - **Piece 2: Clustered vs. Non-Clustered Indexes (Data vs. Pointers)**
> - **Piece 3: The Write Tax & Maintenance Costs**
> - **Piece 4: Common Traps (Why queries ignore your index)**
>
> ---
>
> ### Piece 1: The Phone Book (B-Tree Intuition)
> If a phone book is alphabetized, you don't read every page. You flip to the middle ("Miller"). Looking for "Zhang"? You instantly discard the entire first half.
>
> Database engines organize table keys into a **B+ Tree** so every search cuts the remaining search space down exponentially:
>
> ```mermaid
> flowchart TD
>   Root["Root Node [M]"]
>   Root -->|Keys < M| Left["Branch [A - L]"]
>   Root -->|Keys >= M| Right["Branch [M - Z]"]
>   Right --> Leaf1["Leaf: Miller ... Smith"]
>   Right --> Leaf2["Leaf: Taylor ... Zhang 🎯"]
> ```
>
> In a 10-million row table, a B+ Tree finds any specific row in just **3 to 4 disk reads** instead of 10,000,000!
>
> 🔍 **Quick Check:**
> If an index makes finding data so blazingly fast, why doesn't PostgreSQL or MySQL just index *every single column* automatically? What do you think the catch is?
*(Assistant stops and waits for user's reply)*
