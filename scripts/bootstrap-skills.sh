#!/usr/bin/env bash
set -euo pipefail   # scripts/bootstrap-skills.sh: local-only skills; safe to re-run
AC_COMMIT=88d07530efac79fa65f287890769dfcf1d6c1e32; PY_PW=1.64.1      # reviewed 2026-10-26
FD_COMMIT=dbd4588f9e1033efb41dad4bef2f7947c8993d44                    # anthropics/skills; WITH_FD=1 only
FD_FILES="SKILL.md:a5333457c414d20d625f307df945842c0952ecc3 LICENSE.txt:f433b1a53f5b830a205fd2df78e2b34974656c7b"
AC="${AC_SRC:-$HOME/git/wt/awesome-copilot-main}"; die() { echo "bootstrap: $*" >&2; exit 1; }
top=$(git rev-parse --show-toplevel) || die "not in a git repo"; cd "$top"
case "$(git branch --show-current)" in master|gh-pages|"") die "run on a source branch";; esac
[[ "$(git -C "$AC" rev-parse HEAD)" == "$AC_COMMIT" && -z "$(git -C "$AC" status --porcelain -- skills)" ]] || die "awesome-copilot not clean at $AC_COMMIT"
grep -q '"@playwright/mcp@0.0.83"' .github/mcp.json || die ".github/mcp.json missing or unpinned"
for p in .github/skills/ .venv/; do grep -qxF "$p" .gitignore 2>/dev/null || printf '\n%s\n' "$p" >> .gitignore; done; mkdir -p .github/skills
for s in anti-ui-slop web-design-reviewer ui-screenshots; do
  diff -rq "$AC/skills/$s" ".github/skills/$s" >/dev/null 2>&1 && continue          # identical → skip
  rm -rf ".github/skills/$s" ".github/skills/$s.tmp"; cp -R "$AC/skills/$s" ".github/skills/$s.tmp"; mv ".github/skills/$s.tmp" ".github/skills/$s"
done
(cd .github/skills/anti-ui-slop && shasum -a 256 -c CHECKSUMS.sha256 >/dev/null) || die "anti-ui-slop checksum mismatch"
[[ -x .venv/bin/python ]] || python3 -m venv .venv
.venv/bin/pip show playwright 2>/dev/null | grep -x "Version: $PY_PW" >/dev/null \
  || .venv/bin/pip install -q "playwright==$PY_PW" "Pillow==10.1.0"
.venv/bin/python -m playwright install chromium                                      # no-op when present
if [[ "${WITH_FD:-0}" == 1 ]]; then d=.github/skills/frontend-design; mkdir -p "$d"
  for pair in $FD_FILES; do f=${pair%%:*}; want=${pair#*:}
    [[ -f "$d/$f" && "$(git hash-object "$d/$f")" == "$want" ]] && continue
    curl -fsSL -o "$d/$f" "https://raw.githubusercontent.com/anthropics/skills/$FD_COMMIT/skills/frontend-design/$f"
    [[ "$(git hash-object "$d/$f")" == "$want" ]] || { rm -f "$d/$f"; die "$f differs from reviewed blob"; }
  done; fi
copilot skill list | grep anti-ui-slop >/dev/null && copilot mcp list | grep playwright >/dev/null || die "skill/MCP not discovered"; echo "bootstrap OK"
