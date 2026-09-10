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

## 2. Button-Zustände im Mobile-Modus

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

## 3. Fokuszustände im Mobile-Modus

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

## 5. Abstände und Größen im Mobile-Modus

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

## 6. Interaktionsindikator im Mobile-Modus

Der Pfeil rechts im Button wird ausschließlich über CSS erzeugt.

* Nicht aktiv: Pfeil zeigt nach unten.
* Aktiv / Expanded: Pfeil zeigt nach oben.
* Die Pfeilfarbe entspricht immer der aktuellen Textfarbe.
* Kantenlänge: `0.75rem`
* Abstand zum rechten Rand: `0.5rem`

Die Richtungsänderung des Pfeils wird über `transform` animiert und dient als visueller Indikator für den Öffnungszustand.

Ein geöffneter Service kann durch erneute Aktivierung des Buttons wieder geschlossen werden.

---

## 7. Animationen im Mobile-Modus

Die Zustandsänderungen werden dezent animiert, um einen ruhigen Übergang zwischen geöffnetem und geschlossenem Zustand zu ermöglichen.

* Hintergrundfarbe: `0.35s ease`
* Textfarbe: `0.35s ease`
* Pfeilrotation: `0.35s ease`

Die Border-Farbe des Service-Items wird nicht animiert. Die Border bleibt geometrisch konstant und wechselt lediglich zwischen transparent und der jeweiligen Zustandsfarbe. Dadurch werden unerwünschte visuelle Zwischenräume beim Schließen vermieden.

Für Nutzer, die reduzierte Bewegung bevorzugen, werden die Transitions über `prefers-reduced-motion: reduce` deaktiviert.

---

## 8. Technische Umsetzung des Zustands im Mobile-Modus

Der Öffnungszustand wird im Mobile-Modus über das Attribut `aria-expanded` am jeweiligen Button repräsentiert.

Die Darstellung des äußeren Service-Items wird abhängig vom Zustand des direkten Buttons über den CSS-Selektor `:has()` gesteuert:

```css
.service-item:has(> button[aria-expanded="true"])
```

Die Komponente verwendet im Mobile-Modus einen Accordion-Ansatz, bei dem maximal ein Service gleichzeitig geöffnet ist.

Der aktuell geöffnete Service kann durch erneute Aktivierung geschlossen werden. Dadurch ist auch ein Zustand möglich, in dem alle Services geschlossen sind.

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

---

## 10. DOM-Struktur und Styling im Responsive-Modus

Die Navigationsbuttons werden abhängig vom Darstellungsmodus in unterschiedliche Container verschoben.

### Mobile-Modus

Im Akkordeon-Modus befindet sich jeder Navigationsbutton innerhalb seines zugehörigen `.service-item`:

```html
<div class="service-item">
  <button>...</button>
  <div class="service-panel">...</div>
</div>
```

Dadurch können Accordion-spezifische CSS-Selektoren wie `.service-item > button` verwendet werden.

### Desktop-Modus

Im Tab-Modus werden die Navigationsbuttons in eine separate Tablist verschoben:

```html
<div role="tablist">
  <button>...</button>
  <button>...</button>
  <button>...</button>
</div>

<div class="service-item">
  <div class="service-panel">...</div>
</div>
```

Die Tablist wird im Desktop-Modus semantisch über `role="tablist"` gekennzeichnet. Eine zusätzliche CSS-Klasse für die Tablist wird nicht verwendet.

Das Desktop-Styling greift deshalb gezielt über den Attributselektor `div[role="tablist"]` auf die Tablist zu. Die Verwendung der Rolle dient damit sowohl der semantischen Auszeichnung als auch der eindeutigen Identifikation der Desktop-Navigation im Styling.

Die Buttons sind dadurch keine direkten Kinder von `.service-item` mehr. Selektoren wie `.service-item > button` greifen im Desktop-Modus daher nicht.

Das Desktop-Styling muss deshalb auf die veränderte DOM-Struktur abgestimmt werden und wird separat für den Tab-Modus definiert.

Diese Trennung ist beabsichtigt: Die Komponente verwendet dieselben Navigationsbuttons, verschiebt sie jedoch abhängig vom Darstellungsmodus in den jeweils semantisch passenden Container, anstatt die Navigation doppelt zu rendern.

Die responsive Darstellung verwendet unterschiedliche DOM-Strukturen für Accordion und Tabs. Das Styling wird entsprechend der jeweiligen Struktur getrennt und für den Desktop-Modus über eine `@media (min-width: 800px)`-Regel abgegrenzt.

### Desktop-Layout des Hauptbereichs

Ab einer Bildschirmbreite von `800px` wird der Hauptbereich (`main`) als vertikal zentrierter Flex-Container dargestellt.

* `width: 80%`
* `max-width: 1400px`
* `min-height: 100vh`
* `display: flex`
* `flex-direction: column`
* `justify-content: center`

Dadurch wird die Komponente innerhalb des Viewports vertikal zentriert, während die verfügbare Breite auf maximal `1400px` begrenzt wird.

Die Inhalte des Hauptbereichs bleiben dabei grundsätzlich linksbündig. Eine zusätzliche horizontale Zentrierung über `align-items: center` wird nicht verwendet.

---

## 11. Desktop-Tab-Navigation

Ab einer Bildschirmbreite von `800px` wechselt die Komponente vom Akkordeon in eine horizontale Tab-Navigation.

Die Tab-Navigation ist Bestandteil des zentrierten Hauptbereichs. Die verfügbare Breite beträgt dabei `80%` des Viewports und ist auf maximal `1400px` begrenzt.

### Tablist

Die Navigationsbuttons befinden sich im Desktop-Modus innerhalb eines gemeinsamen Elements mit `role="tablist"`.

Die Tablist verwendet:

* horizontale Anordnung der Tabs
* `5px` Abstand zwischen den Tabs
* volle verfügbare Breite
* abgerundete obere Ecken mit `4px`

Die einzelnen Tabs verwenden eine gleichmäßige Breitenverteilung. Dadurch erhält jeder Tab unabhängig von der Länge seines Textes denselben verfügbaren horizontalen Platz.

Die Tablist wird im CSS über `div[role="tablist"]` angesprochen. Eine zusätzliche Klasse wie `.tablist` ist nicht erforderlich, da die semantische Rolle die Desktop-Tablist eindeutig identifiziert.

### Tab-Größen

Die Größe der Tabs passt sich responsiv an die verfügbare Bildschirmgröße an.

**Padding:**

```css
clamp(1rem, 1.5vw, 1.5rem)
```

**Schriftgröße:**

```css
clamp(1rem, 1.2vw, 1.5rem)
```

Dadurch wachsen Abstände und Schrift auf größeren Bildschirmen mit, bleiben gleichzeitig aber innerhalb definierter Grenzen.

### Tab-Zustände

Ein nicht aktiver Tab verwendet:

* Hintergrund: `--color-primary`
* Text: `--color-white`

Beim Hover eines nicht aktiven Tabs:

* Hintergrund: `--color-secondary`
* Text: `--color-white`

Der aktive Tab verwendet:

* Hintergrund: `--color-accent`
* Text: `--color-dark`

Der aktive Zustand bleibt auch bei Hover erhalten.

### Aktiver Tab als visueller Indikator

Der aktive Tab erhält zusätzlich einen kleinen Punkt links neben dem Text.

* Größe: `0.5rem`
* Abstand zum Text: `0.6rem`
* Farbe: `--color-dark`

Bei nicht aktiven Tabs bleibt an derselben Position ein transparenter Punkt bestehen.

Dadurch bleibt die Textausrichtung zwischen aktiven und nicht aktiven Tabs konstant und der aktive Zustand wird zusätzlich visuell hervorgehoben.

### Panel

Das aktive Panel befindet sich direkt unterhalb der Tablist.

Im Desktop-Modus wird der umgebende `.service-item` nicht mehr für Abstände, Padding oder Border verwendet. Das Panel übernimmt stattdessen die visuelle Begrenzung.

Das Panel verwendet:

* Mindesthöhe: `clamp(220px, 25vh, 400px)`
* Padding: `clamp(1.5rem, 2.5vw, 3rem)`
* Schriftgröße: `clamp(1rem, 1.1vw, 1.35rem)`
* Border: `5px` stark in `--color-accent`
* untere Ecken: `4px`
* obere Ecken: `0`

Dadurch entsteht zwischen Tablist und Panel kein zusätzlicher Abstand und beide Bereiche bilden optisch eine zusammenhängende Navigationseinheit.

### Fokuszustände der Desktop-Tabs

Der Tastaturfokus wird bei den Desktop-Tabs über einen `5px` starken inneren Rahmen dargestellt.

Ein nicht aktiver, fokussierter Tab erhält:

* innerer linker Rahmen: `5px` in `--color-accent`
* innerer rechter Rahmen: `5px` in `--color-accent`
* innerer oberer Rahmen: `5px` in `--color-accent`

Der aktive, fokussierte Tab verwendet stattdessen `--color-dark` für diesen Fokusrahmen.

Das Panel erhält ebenfalls einen dunklen Rahmen, wenn der aktive Tab fokussiert ist.

Dadurch bleiben aktiver Zustand und Tastaturfokus auch innerhalb der Desktop-Tab-Navigation eindeutig unterscheidbar.

### Responsive Größenanpassung

Die Desktop-Darstellung verwendet `clamp()` für zentrale Größen wie Padding, Schriftgröße und Panelhöhe.

Damit kann die Komponente auf unterschiedlichen Bildschirmgrößen proportional mitwachsen, ohne unbegrenzt groß oder klein zu werden.

Die Desktop-Gestaltung wird ausschließlich innerhalb von:

```css
@media (min-width: 800px)
```

definiert.

---

## 12. Gestaltung der Inhaltstypen

Neben der Navigation wurden auch die drei Inhaltstypen gestaltet. Die Gestaltung folgt dabei denselben Prinzipien wie die Navigation: zentrale Farbpalette, Mobile First und `min-width`-Media-Queries für größere Bildschirme.

Jeder Inhaltstyp bringt sein eigenes Stylesheet mit, das gemeinsam mit der jeweiligen Komponente geladen wird. Dadurch bleibt die Gestaltung der Inhalte von der Gestaltung der Navigation getrennt.

### Mobile First

Die Basis-Styles beschreiben jeweils die mobile Darstellung. Größere Bildschirme werden anschließend über zusätzliche Media Queries ergänzt:

* `@media (min-width: 800px)` – Desktop
* `@media (min-width: 1100px)` – großer Desktop

Auf kleinen Bildschirmen werden die Inhalte durchgehend einspaltig dargestellt. Interaktive Elemente erhalten ausreichend große Touch-Ziele.

### Steuercheck (`tax-form`)

Das Formular wird als mehrstufiger Prozess dargestellt. Sichtbar ist immer genau ein Schritt.

* Der Fortschritt wird über die Komponente `form-stepper` dargestellt. Auf Mobile erscheint er als Textangabe („Schritt 2 von 5"), ab 800px als visuelle Schrittanzeige.
* Eingabefelder verwenden dauerhaft sichtbare Labels oberhalb des Feldrahmens.
* Auf Mobile stehen alle Felder untereinander, ab 800px werden zusammengehörige Felder nebeneinander angeordnet.
* Die Navigationsbuttons stehen auf Mobile untereinander über die volle Breite, ab 800px nebeneinander.
* Für die Zusammenfassung existieren eigene Print-Styles, damit der Ausdruck wie ein Dokument und nicht wie die Anwendung wirkt.

### Ansprechpartner (`contact-person`)

Die Kontaktinformationen werden über ein Grid-Layout dargestellt, das sich in drei Stufen anpasst:

* unter 800px: einspaltig, Portrait zentriert
* 800px–1099px: Portrait und Intro nebeneinander, Kontaktdaten zweispaltig darunter
* ab 1100px: Portrait und Intro oben, Standort und Kontaktdaten darunter nebeneinander

Kontaktdaten werden jeweils durch ein Icon und eine farbige Markierung am linken Rand hervorgehoben.

### Unterlagen (`document-upload`)

Der Upload-Bereich besteht aus einer großflächigen Dropzone, den ausgewählten Dateien und den bereits hinzugefügten Dateien.

* Die Dropzone wird während eines Drag-Vorgangs farblich hervorgehoben.
* Ausgewählte Dateien werden farblich von bereits hinzugefügten Dateien unterschieden.
* Auf Mobile steht der Entfernen-Button eines Eintrags in einer eigenen Zeile, ab 800px rechts neben den Dateiangaben.
* Die Vorschaugröße wächst mit der Bildschirmgröße mit.
* Die Dateivorschau wird als Dialog dargestellt, dessen Breite und Höhe an den Viewport gebunden sind.

### Bereiche ohne Inhalt

Bereiche, die aktuell keine Einträge enthalten, werden über das `hidden`-Attribut vollständig ausgeblendet. Da die betroffenen Bereiche im Stylesheet ein eigenes `display` setzen, wird `hidden` dort zusätzlich explizit berücksichtigt.
