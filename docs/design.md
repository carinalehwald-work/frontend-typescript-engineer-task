# Design

## 1. Farbpalette

Die Komponente verwendet eine zentrale Farbpalette über CSS Custom Properties. Dadurch bleiben die Farben über alle Zustände hinweg konsistent.

| Variable            | Wert                 | Verwendung                          |
| ------------------- | -------------------- | ----------------------------------- |
| `--color-dark`      | `hsl(0, 0%, 20%)`    | Dunkle Textfarbe und Fokuszustand   |
| `--color-primary`   | `hsl(210, 74%, 16%)` | Hintergrund nicht aktiver Buttons   |
| `--color-white`     | `hsl(0, 0%, 100%)`   | Text und Pfeil auf dunklem Button   |
| `--color-accent`    | `hsl(36, 100%, 50%)` | Aktiver Zustand und Hervorhebung    |
| `--color-secondary` | `hsl(210, 77%, 26%)` | Hover-Zustand nicht aktiver Buttons |

Die Farben werden ausschließlich über die definierten Variablen verwendet, um eine konsistente Darstellung zu gewährleisten.

---

## 2. Button-Zustände

### Nicht aktiv

Ein nicht aktiver Service-Button verwendet:

* Hintergrund: `--color-primary`
* Text: `--color-white`
* Pfeil: `--color-white`
* Border des Service-Items: `3px solid transparent`

Die transparente Border ist auch im geschlossenen Zustand vorhanden. Dadurch bleibt die Geometrie des Service-Items beim Öffnen unverändert und es entsteht kein Layout Shift.

### Nicht aktiv – Hover

Beim Überfahren mit der Maus:

* Hintergrund: `--color-secondary`
* Text: `--color-white`
* Pfeil: `--color-white`

Die Text- und Pfeilfarbe bleibt unverändert, um einen konsistenten Kontrast zu gewährleisten.

### Aktiv / Expanded

Der aktuell geöffnete Service verwendet:

* Hintergrund: `--color-accent`
* Text: `--color-dark`
* Pfeil: `--color-dark`
* Außenborder des Service-Items: `3px solid --color-accent`
* Border-Radius des Service-Items: `4px`
* Border-Radius des geöffneten Buttons: `0`

Button und zugehöriges Panel bilden dadurch visuell einen zusammenhängenden Block.

### Aktiv / Expanded – Hover

Der aktive Button behält seinen aktiven Zustand auch bei Hover:

* Hintergrund: `--color-accent`
* Text: `--color-dark`
* Pfeil: `--color-dark`

Der normale Hover-Zustand wird für einen aktiven Button nicht angewendet.

### Alle Services geschlossen

Im Mobile-Modus können alle Services geschlossen sein. Durch erneutes Klicken auf den aktuell geöffneten Service wird dieser geschlossen. In diesem Zustand ist kein Service aktiv und alle zugehörigen Panels sind ausgeblendet.

---

## 3. Fokuszustände

Die Komponente unterstützt sichtbare Tastaturfokussierung über `:focus-visible`.

### Nicht aktiv – Fokus

Ein fokussierter nicht aktiver Button erhält:

* Hintergrund: `--color-primary`
* Text: `--color-white`
* Pfeil: `--color-white`
* Fokusrahmen: `3px solid --color-accent`
* `outline-offset: -3px`

Der Fokusrahmen wird innerhalb des Buttons dargestellt, damit sich die äußere Geometrie beim Fokussieren nicht verändert.

Bei gleichzeitigem Hover kann der Hintergrund `--color-secondary` sein. Der Fokusrahmen bleibt davon unabhängig `--color-accent`.

### Aktiv / Expanded – Fokus

Wenn ein aktiver Button fokussiert ist, wird der sichtbare Fokus über den äußeren Rahmen des gesamten Service-Items dargestellt:

* Außenborder: `3px solid --color-dark`
* Button-Hintergrund: `--color-accent`
* Text: `--color-dark`
* Pfeil: `--color-dark`

Der Button erhält in diesem Zustand keinen zusätzlichen sichtbaren Fokusrahmen.

Dadurch bleibt sowohl der aktive Zustand als auch der Tastaturfokus eindeutig erkennbar.

---

## 4. Textfarben

Die Text- und Pfeilfarben sind an den jeweiligen Hintergrund gekoppelt.

| Zustand             | Hintergrund         | Text / Pfeil    |
| ------------------- | ------------------- | --------------- |
| Nicht aktiv         | `--color-primary`   | `--color-white` |
| Nicht aktiv – Hover | `--color-secondary` | `--color-white` |
| Nicht aktiv – Fokus | `--color-primary`   | `--color-white` |
| Aktiv               | `--color-accent`    | `--color-dark`  |
| Aktiv – Hover       | `--color-accent`    | `--color-dark`  |
| Aktiv – Fokus       | `--color-accent`    | `--color-dark`  |

Button-Text und Pfeil bleiben innerhalb eines Zustands immer farblich synchron.

---

## 5. Abstände und Größen

* Margin zwischen den Service-Items: `10px`
* Button-Padding: `1.25rem 1rem`
* Panel-Padding: `1.25rem 1rem`
* Border-Radius des Service-Items: `4px`
* Border des Service-Items: `3px`
* Fokusrahmen: `3px`
* Pfeil-Kantenlänge: `0.75rem`
* Pfeil-Abstand zum rechten Rand: `0.5rem`
* `box-sizing: border-box`

Die `3px` Border des Service-Items ist auch im geschlossenen Zustand vorhanden, allerdings transparent. Dadurch bleibt die äußere Geometrie konstant und beim Öffnen entsteht kein Layout Shift.

Der geöffnete Button erhält `border-radius: 0`, damit Button und Panel als zusammenhängender Block erscheinen.

Die `10px` Margin beschreibt den Abstand zwischen den Service-Items. Die transparente Border ist Bestandteil des jeweiligen Items und wird daher nicht als zusätzlicher Margin-Abstand betrachtet.

---

## 6. Interaktionsindikator

Der Pfeil rechts im Button wird ausschließlich über CSS erzeugt.

* Nicht aktiv: Pfeil zeigt nach unten.
* Aktiv / Expanded: Pfeil zeigt nach oben.
* Die Pfeilfarbe entspricht immer der aktuellen Textfarbe.
* Kantenlänge: `0.75rem`
* Abstand zum rechten Rand: `0.5rem`

Die Richtungsänderung des Pfeils wird über `transform` animiert und dient als visueller Indikator für den Öffnungszustand.

Ein geöffneter Service kann durch erneuten Klick wieder geschlossen werden.

---

## 7. Animationen

Die Zustandsänderungen werden dezent animiert, um einen ruhigen Übergang zwischen geöffnetem und geschlossenem Zustand zu ermöglichen.

* Hintergrundfarbe: `0.35s ease`
* Textfarbe: `0.35s ease`
* Pfeilrotation: `0.35s ease`

Die Border-Farbe des Service-Items wird nicht animiert. Die Border bleibt geometrisch konstant und wechselt lediglich zwischen transparent und der jeweiligen Zustandsfarbe. Dadurch werden unerwünschte visuelle Zwischenräume beim Schließen vermieden.

Für Nutzer, die reduzierte Bewegung bevorzugen, werden die Transitions über `prefers-reduced-motion: reduce` deaktiviert.

---

## 8. Technische Umsetzung des Zustands

Der Öffnungszustand wird im Mobile-Modus über das Attribut `aria-expanded` am jeweiligen Button repräsentiert.

Die Darstellung des äußeren Service-Items wird abhängig vom Zustand des direkten Buttons über den CSS-Selektor `:has()` gesteuert:

```css
.service-item:has(> button[aria-expanded="true"])
```

Die Komponente verwendet im Mobile-Modus einen Accordion-Ansatz, bei dem maximal ein Service gleichzeitig geöffnet ist.

Der aktuell geöffnete Service kann durch erneuten Klick geschlossen werden. Dadurch ist auch ein Zustand möglich, in dem alle Services geschlossen sind.

Die zugehörigen Panels werden über `hidden` ein- bzw. ausgeblendet.

---

## 9. Gestaltungsprinzipien

Die Zustände folgen einem einheitlichen visuellen Prinzip:

**Nicht aktiv**
→ dunkler Hintergrund + weißer Inhalt

**Aktiv**
→ Akzentfarbe als Hintergrund + dunkler Inhalt

**Fokus**
→ sichtbare Kontur abhängig vom aktuellen Zustand

Die aktive Farbgebung bleibt bei Hover erhalten und wird nicht durch die normale Hover-Farbe überschrieben.

Die Gestaltung konzentriert sich auf:

* klare visuelle Zustände
* konsistente Farben
* sichtbare Tastaturbedienung
* stabile Layout-Geometrie
* ruhige Übergänge
* verständliche Interaktionsindikatoren
* Wiederverwendbarkeit der Komponente
