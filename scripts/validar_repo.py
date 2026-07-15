#!/usr/bin/env python3
"""Validador de coherencia para optimizaci-n_int.

Recorre todos los .md del repositorio y comprueba:
  (a) toda referencia "Fase N (Nombre)" / "Fase N, Nombre" coincide con
      el roadmap de README.md;
  (b) todo valor de "FDI medio" citado fuera de fdi-registro.md coincide
      con la media real calculada desde su tabla, o está marcado como
      histórico;
  (c) el número de KPIs que enterprise-blueprint.md atribuye a kpis.md
      coincide con las filas reales de su tabla;
  (d) ningún riesgo (R*/L*) aparece como resuelto en un documento y
      como abierto/pendiente en otro (comprobación heurística: busca
      palabras clave de estado en la misma línea que menciona el
      identificador de riesgo);
  (e) todo enlace relativo "](./archivo.md)" apunta a un archivo que
      existe de verdad.

Sin dependencias externas — solo librería estándar. Uso:
    python scripts/validar_repo.py

Exit code 0 si todas las comprobaciones pasan, 1 si alguna falla.
"""

import re
import sys
import unicodedata
from collections import defaultdict
from pathlib import Path

# La consola de Windows suele usar cp1252 por defecto, que no puede
# codificar ni tildes ni los símbolos ✅/❌ — fuerza UTF-8 en la salida
# para que el script funcione igual en Windows, Linux o macOS.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO_ROOT = Path(__file__).resolve().parent.parent

STOPWORDS = {
    "de", "la", "el", "y", "en", "a", "con", "del", "al", "los", "las",
    "que", "no", "un", "una", "por", "para", "su", "es", "se",
}


def strip_accents(s):
    return "".join(
        c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn"
    )


def normalize(s):
    s = strip_accents(s.lower())
    return re.sub(r"[^a-z0-9 ]", " ", s)


def significant_words(s):
    # >= 2, no > 2: excluye conectores de una letra pero conserva
    # acronimos reales de dos letras como "IA".
    return {w for w in normalize(s).split() if w and w not in STOPWORDS and len(w) >= 2}


def load_markdown_files():
    return sorted(REPO_ROOT.glob("*.md"))


def read(path):
    return path.read_text(encoding="utf-8")


# ---------------------------------------------------------------------
# (a) Referencias "Fase N (Nombre)" contra el roadmap de README.md
# ---------------------------------------------------------------------

ROADMAP_LINE_RE = re.compile(r"Fase\s+(\d{1,2})\s*[—-]\s*([^*\]\n]+?)(?:\*\*|→|$)")
# Requiere que el nombre citado empiece en mayúscula: filtra falsos
# positivos como "Fase 1 (principio 9 de la constitución, heredado)",
# que no es una cita del nombre de la fase. El lookahead negativo evita
# que "Fase 9, Fase 12" (dos fases citadas como alternativas) se lea
# como si "Fase 12" fuera el nombre de la Fase 9.
CITATION_PAREN_RE = re.compile(r"Fase\s+(\d{1,2})\s*\((?!Fase\s+\d)([A-ZÁÉÍÓÚÑ][^)]{2,79})\)")
CITATION_COMMA_RE = re.compile(r"Fase\s+(\d{1,2})\s*,\s*(?!Fase\s+\d)([A-ZÁÉÍÓÚÑ][^,.\n]{2,59})")
# Las notas de corrección citan a propósito la referencia antigua entre
# comillas (ej. [corregido 2026-07-12: la numeración original decía
# "Fase 11 (Documentación)"...]) — son autorreferencias históricas, no
# citas activas, y no deben evaluarse contra el roadmap actual.
CORRECTION_NOTE_RE = re.compile(r"\[corregido[^\]]*\]")


def parse_roadmap(readme_text):
    mapping = {}
    for line in readme_text.splitlines():
        if not line.strip().startswith("- ["):
            continue
        m = ROADMAP_LINE_RE.search(line)
        if not m:
            continue
        num = int(m.group(1))
        name = re.sub(r"[\s*—-]+$", "", m.group(2)).strip()
        if name:
            mapping[num] = name
    return mapping


def check_fase_references(files, roadmap):
    problems = []
    for f in files:
        if f.name == "README.md":
            continue
        text = CORRECTION_NOTE_RE.sub(" ", read(f))
        for regex in (CITATION_PAREN_RE, CITATION_COMMA_RE):
            for m in regex.finditer(text):
                num = int(m.group(1))
                cited = m.group(2).strip()
                if num not in roadmap:
                    continue
                canonical = roadmap[num]
                if not (significant_words(cited) & significant_words(canonical)):
                    line_no = text.count("\n", 0, m.start()) + 1
                    problems.append((f.name, line_no, num, cited, canonical))
    return problems


# ---------------------------------------------------------------------
# (b) "FDI medio" citado fuera de fdi-registro.md
# ---------------------------------------------------------------------

FDI_NUM_RE = re.compile(r"(\d,\d)\s*/\s*3")


def compute_fdi_average(fdi_text):
    scores = []
    for line in fdi_text.splitlines():
        if not line.strip().startswith("|") or line.strip().startswith("|---"):
            continue
        cols = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cols) < 3:
            continue
        try:
            scores.append(int(cols[2]))
        except ValueError:
            continue
    if not scores:
        return None, 0
    return sum(scores) / len(scores), len(scores)


def check_fdi_mentions(files, fdi_avg):
    problems = []
    avg_str = f"{fdi_avg:.1f}".replace(".", ",")
    for f in files:
        if f.name == "fdi-registro.md":
            continue
        text = read(f)
        for line in text.splitlines():
            if "fdi medio" not in normalize(line):
                continue
            m = FDI_NUM_RE.search(line)
            if not m:
                continue
            cited = m.group(1)
            if cited != avg_str and "historic" not in normalize(line):
                problems.append((f.name, cited, avg_str, line.strip()[:160]))
    return problems


# ---------------------------------------------------------------------
# (c) Número de KPIs que enterprise-blueprint.md atribuye a kpis.md
# ---------------------------------------------------------------------

def count_kpi_rows(kpis_text):
    in_table = False
    count = 0
    for line in kpis_text.splitlines():
        stripped = line.strip()
        if stripped.startswith("| KPI "):
            in_table = True
            continue
        if not in_table:
            continue
        if stripped.startswith("|---"):
            continue
        if stripped.startswith("|"):
            count += 1
        else:
            break
    return count


def check_kpi_count(blueprint_text, kpi_count):
    problems = []
    for m in re.finditer(r"(\d+)\s+indicadores registrados", blueprint_text):
        cited = int(m.group(1))
        if cited != kpi_count:
            problems.append((cited, kpi_count))
    return problems


# ---------------------------------------------------------------------
# (d) Riesgos (R*/L*) con estado contradictorio entre documentos
# ---------------------------------------------------------------------

RISK_ID_RE = re.compile(r"\b([RL]\d{1,2})\b")
RESOLVED_WORDS = ("resuelto", "resuelta", "cerrado el", "cerrada el")
OPEN_WORDS = (
    "pendiente", "abierto", "abierta", "sin resolver", "no resuelto",
    "sin cambio", "sin ejecutar", "no ejecutar", "sin ejecutarse",
)

# Excepciones conocidas y documentadas para la comprobación (d), revisadas
# a mano el 2026-07-15. Cada una es un falso positivo real de la
# comprobación heurística (no una incoherencia del repositorio) — se
# exime aquí para que el validador pase limpio y cualquier aviso NUEVO
# en (d) sea señal real, no ruido conocido.
#
# Cómo añadir una excepción nueva: solo después de revisar a mano cada
# línea que el script señale para ese identificador de riesgo (ejecutar
# el script, leer cada archivo:línea reportado) y confirmar que NINGUNA
# de las líneas describe una incoherencia real entre documentos — si
# aunque sea una lo es, corregir el documento en vez de eximir el
# identificador. Añadir la clave (ej. "R5") a RISK_EXCEPTIONS con una
# frase que explique la causa heurística concreta (negación no
# detectada, notación de rango, ambigüedad ya documentada en otro
# sitio) — nunca un motivo genérico tipo "falso positivo" sin más.
RISK_EXCEPTIONS = {
    "L1": "Negación no detectada por la comprobación por palabra clave: frases como "
          "\"nunca declara resuelto L1/L2/L4/L5/L8/L9\" (07-customer-journey.md) o "
          "\"bloquea que R9 se pueda dar por resuelto\" (priorizacion.md) contienen la "
          "palabra 'resuelto' pero afirman justo lo contrario.",
    "L2": "Misma causa que L1 — comparten las mismas frases con negación.",
    "L4": "Misma causa que L1 — comparten las mismas frases con negación.",
    "L5": "Misma causa que L1 (07-customer-journey.md:371, \"nunca declara resuelto ... L5 ...\").",
    "L8": "Mezcla de dos temas en la misma línea: \"redactar un contrato mínimo\" se marca "
          "resuelto en el mismo texto que cita \"(L8)\" como campo todavía pendiente — el "
          "estado 'resuelto' es de la tarea del contrato, no de L8.",
    "L9": "Misma causa que L5 (07-customer-journey.md:371).",
    "L11": "Notación de rango \"L1-L11\" leída como mención individual de L11, en la misma "
           "línea (06-legal-cumplimiento.md:198) que cita entre comillas la palabra "
           "\"Resuelto\" al explicar por qué esa palabra es ambigua para R9 — no es una "
           "afirmación de que L11 esté resuelto.",
    "R13": "Una única línea residual (03-modelo-negocio.md, changelog de versiones: \"la v6 "
           "añadió R13 ... la v3 ... trasladó R9\") describe qué hizo cada versión "
           "históricamente, no el estado actual — el resto de menciones (10 de 11) ya "
           "describen correctamente R13 como resuelto.",
    "R9": "Ambigüedad ya documentada y decidida explícitamente en 06-legal-cumplimiento.md "
          "(sección \"Auditoría adversarial\", hallazgo 3): \"R9 — Resuelto\" en "
          "03-modelo-negocio.md se refiere a la asignación de una fase, no al estado del "
          "riesgo. Decisión ya tomada de no reescribir esa fase cerrada por ser un cambio "
          "cosmético, no sustantivo.",
}


def check_risk_consistency(files):
    mentions = defaultdict(list)
    for f in files:
        text = read(f)
        for line_no, line in enumerate(text.splitlines(), 1):
            ids_in_line = set(RISK_ID_RE.findall(line))
            if not ids_in_line:
                continue
            norm_line = normalize(line)
            is_strike = line.strip().startswith("~~") or "~~" in line
            status = None
            if is_strike or any(w in norm_line for w in RESOLVED_WORDS):
                status = "resuelto"
            elif any(w in norm_line for w in OPEN_WORDS):
                status = "abierto"
            if status:
                for risk_id in ids_in_line:
                    mentions[risk_id].append((f.name, line_no, status))
    problems = []
    exempted = []
    for risk_id, occurrences in sorted(mentions.items()):
        statuses = {s for _, _, s in occurrences}
        if len(statuses) <= 1:
            continue
        if risk_id in RISK_EXCEPTIONS:
            exempted.append((risk_id, RISK_EXCEPTIONS[risk_id]))
        else:
            problems.append((risk_id, occurrences))
    return problems, exempted


# ---------------------------------------------------------------------
# (e) Enlaces relativos "](./archivo.md)"
# ---------------------------------------------------------------------

LINK_RE = re.compile(r"\]\(\./([^)]+)\)")


def check_relative_links(files):
    problems = []
    for f in files:
        text = read(f)
        for m in LINK_RE.finditer(text):
            target = m.group(1).split("#")[0].strip()
            if not target:
                continue
            if not (REPO_ROOT / target).exists():
                problems.append((f.name, target))
    return problems


# ---------------------------------------------------------------------


def main():
    readme_path = REPO_ROOT / "README.md"
    fdi_path = REPO_ROOT / "fdi-registro.md"
    kpis_path = REPO_ROOT / "kpis.md"
    blueprint_path = REPO_ROOT / "enterprise-blueprint.md"

    for required in (readme_path, fdi_path, kpis_path, blueprint_path):
        if not required.exists():
            print(f"❌ Falta un archivo base indispensable para validar: {required.name}")
            return 1

    files = load_markdown_files()
    exit_code = 0

    print("=== Validación de coherencia — optimizaci-n_int ===\n")

    # (a)
    roadmap = parse_roadmap(read(readme_path))
    fase_problems = check_fase_references(files, roadmap)
    if fase_problems:
        exit_code = 1
        print(f"❌ (a) Referencias de fase desincronizadas: {len(fase_problems)}")
        for fname, line_no, num, cited, canonical in fase_problems:
            print(f"   - {fname}:{line_no} cita 'Fase {num} ({cited})' — el roadmap dice 'Fase {num} — {canonical}'")
    else:
        print("✅ (a) Todas las referencias 'Fase N (Nombre)' coinciden con el roadmap de README.md.")

    # (b)
    fdi_avg, fdi_n = compute_fdi_average(read(fdi_path))
    fdi_problems = check_fdi_mentions(files, fdi_avg) if fdi_avg is not None else []
    if fdi_avg is None:
        exit_code = 1
        print("\n❌ (b) No se pudo calcular el FDI medio desde fdi-registro.md (tabla no encontrada o vacía).")
    elif fdi_problems:
        exit_code = 1
        print(f"\n❌ (b) Menciones de FDI medio desincronizadas (valor real: {fdi_avg:.1f}/3, {fdi_n} procesos):")
        for fname, cited, avg_str, line in fdi_problems:
            print(f"   - {fname}: cita {cited}/3 (real {avg_str}/3) — \"{line}\"")
    else:
        print(f"\n✅ (b) Todas las menciones de FDI medio coinciden con fdi-registro.md ({fdi_avg:.1f}/3, {fdi_n} procesos) o están marcadas como históricas.")

    # (c)
    kpi_count = count_kpi_rows(read(kpis_path))
    kpi_problems = check_kpi_count(read(blueprint_path), kpi_count)
    if kpi_problems:
        exit_code = 1
        for cited, real in kpi_problems:
            print(f"\n❌ (c) enterprise-blueprint.md cita {cited} indicadores — kpis.md tiene {real} filas reales.")
    else:
        print(f"\n✅ (c) enterprise-blueprint.md coincide con el número real de filas de kpis.md ({kpi_count}).")

    # (d)
    risk_problems, risk_exempted = check_risk_consistency(files)
    if risk_problems:
        exit_code = 1
        print(f"\n❌ (d) Riesgos con estado aparentemente contradictorio entre documentos: {len(risk_problems)}")
        print("   (comprobación heurística por palabra clave — revisar manualmente antes de dar por buena la corrección)")
        for risk_id, occurrences in risk_problems:
            print(f"   - {risk_id}:")
            for fname, line_no, status in occurrences:
                print(f"       {fname}:{line_no} -> {status}")
    else:
        print("\n✅ (d) Ningún riesgo (R*/L*) con estado contradictorio sin explicar entre documentos (comprobación heurística).")
    if risk_exempted:
        print(f"   (info, no falla: {len(risk_exempted)} exceptuados como falsos positivos conocidos — ver RISK_EXCEPTIONS en este script)")
        for risk_id, reason in risk_exempted:
            print(f"   - {risk_id}: {reason}")

    # (e)
    link_problems = check_relative_links(files)
    if link_problems:
        exit_code = 1
        print(f"\n❌ (e) Enlaces relativos rotos: {len(link_problems)}")
        for fname, target in link_problems:
            print(f"   - {fname} -> ./{target}")
    else:
        print("\n✅ (e) Todos los enlaces relativos './archivo.md' apuntan a archivos existentes.")

    print()
    print("❌ Validación completada con fallos." if exit_code else "✅ Validación completada sin fallos.")
    return exit_code


if __name__ == "__main__":
    sys.exit(main())
