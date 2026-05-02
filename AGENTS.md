<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Encoding hygiene

Always scan touched files for mojibake or broken encoding artifacts such as `РЈРІР°РіР°`, `Р’С–`, `РџРѕ`, `вЂ”`, or similar unreadable character sequences. If any are found, fix them immediately to proper UTF-8 text as part of the same change.
<!-- END:nextjs-agent-rules -->
