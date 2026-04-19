---
name: implementation-prompt-hardener
description: Use this skill when the implementation scope is already defined for the Jacquie Zarate Real Estate website and the goal is to harden the prompt before sending it to Cursor. Focus on repo-specific blind spots, routing, i18n, visual system consistency, runtime safety, and MVP-safe implementation constraints. Do not redesign the product scope unless necessary.
---

# Implementation Prompt Hardener — Jacquie Real Estate

## Goal
Take an already-defined implementation task and improve it so execution in the real repo is safer, more complete, and less likely to create hidden breakage, UI inconsistency, or product drift.

This project is a **premium real estate site in Miami** for **Jacquie Zarate**, built to generate **trust and direct contact (mainly WhatsApp)**, not to behave like a property marketplace.

## Product truths you must preserve
- The website does **not** sell properties directly. It sells **trust, clarity, and conversation**.
- Main conversion path: **WhatsApp first**, contact form second.
- Business priority:
  1. Property Management
  2. Listings
  3. Pre-construction
- Home is **not** a neutral hub and **not** a portal. It is a **trust-led landing with secondary exploration**.
- Jacquie’s positioning is:
  > "Your trusted person in Miami"
- Tone must stay:
  - personal
  - clear
  - premium
  - non-corporate
  - non-generic

## Tech / repo context
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- i18n: ES / EN / FR-CA
- Token-based color system (`primary`, `accent`, `surface`, etc.)
- Routes under `/[locale]/...`
- Cursor is the default execution layer

## Use this skill when
- the feature scope is already defined,
- the task is multi-file or non-trivial,
- the prompt is already fairly detailed,
- the main risk is incomplete implementation, not unclear product direction,
- there is risk of inconsistent use of tokens, i18n logic, or route structure.

## Do not use this skill when
- the product requirement itself is still unclear,
- the user needs a structural rethink of the page,
- the task is mainly strategic UX/branding review,
- the task is a tiny visual tweak,
- the user wants direct implementation instead of prompt hardening.

## Required process
1. Read the implementation prompt and preserve intended scope.
2. Inspect the real file paths and actual component/page usage.
3. Identify hidden technical gaps such as:
   - wrong route assumptions
   - locale handling drift (`es` / `en` / `fr`)
   - token misuse (`primary`, `accent`, etc.)
   - duplicated content logic
   - hardcoded labels inconsistent with i18n
   - misplaced layout wrappers affecting Hero/sections
   - broken hierarchy between Home sections
   - CTA destinations inconsistent with conversion intent
   - metadata / schema / page-level SEO omissions
4. Add only the missing constraints needed to make the implementation safe and coherent.
5. Keep the task V1-scoped.
6. Do not let Cursor invent product decisions.
7. Return an improved prompt ready to hand to Cursor.

## What to look for
- route changes that also require navbar/footer/home CTA updates
- new pages that should be linked from existing sections
- text changes that must remain in first person
- label changes that must be translated per locale
- cards or sections that must follow the current visual system
- whether a section should use `bg-primary` cards vs light cards based on current site logic
- whether a “new feature” actually creates message dilution in Home
- token consistency after palette changes
- whether a section is being treated as a separate business when it should be integrated into an existing one
- whether the change introduces catalog behavior where trust/conversation should dominate
- whether the implementation should stay inline or move to a small focused component/helper

## Jacquie-specific constraints
- Do not turn the site into a property portal.
- Do not make listings/project exploration more dominant than trust-building without explicit approval.
- Do not let pre-construction compete visually or strategically with Property Management.
- Avoid generic corporate real-estate language if Jacquie’s real differentiator is human follow-up and care.
- Prefer clear, premium, human conversion paths over feature-heavy layouts.
- Keep “About” and “Property Management” aligned with what Jacquie actually said, not placeholder realtor copy.

## Output format
Return:
1. brief verdict on the original prompt
2. missing or risky points
3. improved prompt
4. what to review after implementation

## Rules
- do not broaden the product scope
- do not redesign the page unless necessary
- do not turn V1 into V2
- do not add speculative future-proofing
- do not let Cursor choose copy direction on its own
- prefer precise additions over rewriting everything
- avoid `any`
- if suggesting extraction to a new component/helper, keep it small and justified by clarity or reuse
- if the task affects Home, explicitly verify section order and narrative hierarchy