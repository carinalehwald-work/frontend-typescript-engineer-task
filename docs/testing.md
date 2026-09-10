# Testing

## 1. Ziel

Die Komponente wurde schrittweise getestet, um sicherzustellen, dass Funktionalität, responsives Verhalten und Accessibility zuverlässig funktionieren.

Die Prüfung erfolgte **manuell im Browser**, ergänzt um die TypeScript-Prüfung über `tsc`.

Automatisierte Tests mit Vitest waren als weiterer Entwicklungsschritt vorgesehen, konnten innerhalb des zeitlichen Rahmens der Aufgabe jedoch **nicht mehr umgesetzt werden** (siehe Abschnitt 9).

Dieses Dokument beschreibt den tatsächlichen finalen Teststand. Alle mit `[x]` markierten Punkte wurden manuell geprüft.

---

## 2. Funktionale Tests

### Akkordeon-Navigation auf mobilen Bildschirmgrößen

* [x] Der erste Bereich ist initial geöffnet.
* [x] Beim Klick auf einen anderen Bereich wird dieser geöffnet.
* [x] Der zuvor geöffnete Bereich wird geschlossen.
* [x] Es ist immer nur ein Bereich gleichzeitig geöffnet.
* [x] Der aktive Zustand wird über `aria-expanded` dargestellt.
* [x] Die Navigation funktioniert mit der Tastatur.
* [x] `ArrowDown` bewegt den Fokus zum nächsten Bereich.
* [x] `ArrowUp` bewegt den Fokus zum vorherigen Bereich.
* [x] Pfeiltasten öffnen oder schließen den fokussierten Bereich nicht automatisch.
* [x] `Enter` aktiviert den fokussierten Bereich.
* [x] `Space` aktiviert den fokussierten Bereich.
* [x] Die Navigation ist nicht zyklisch.
* [x] Am ersten bzw. letzten Element wird nicht über die Grenzen hinaus navigiert.
* [x] `Tab` und `Shift + Tab` behalten das normale Browser-Fokusverhalten bei.
* [x] Ein geöffneter Bereich kann durch erneute Aktivierung wieder geschlossen werden.
* [x] Es können alle Bereiche gleichzeitig geschlossen sein.

### Tab-Navigation auf Desktop-Bildschirmgrößen

* [x] Ab 800px wird die Desktop-Darstellung aktiviert.
* [x] Der erste Bereich ist initial aktiv.
* [x] Beim Klick auf einen Tab wird der entsprechende Bereich aktiviert.
* [x] Nur der aktive Bereich wird angezeigt.
* [x] Der aktive Tab wird über `aria-selected="true"` dargestellt.
* [x] Zu jedem Zeitpunkt befindet sich genau ein Tab mit `tabindex="0"` in der Tab-Navigation.
* [x] Alle übrigen Tabs haben `tabindex="-1"`.
* [x] `ArrowRight` bewegt den Fokus zum nächsten Tab.
* [x] `ArrowLeft` bewegt den Fokus zum vorherigen Tab.
* [x] Die Pfeiltasten aktivieren den fokussierten Tab nicht automatisch.
* [x] Nach einer Pfeilnavigation können fokussierter und aktiver Tab vorübergehend voneinander abweichen.
* [x] `Enter` aktiviert den fokussierten Tab.
* [x] `Space` aktiviert den fokussierten Tab.
* [x] Nach der Aktivierung stimmen fokussierter und aktiver Tab wieder überein.
* [x] Die Aktivierung aktualisiert `activeIndex` und den angezeigten Inhaltsbereich.
* [x] Die Navigation ist nicht zyklisch.
* [x] Am ersten bzw. letzten Tab wird nicht über die Grenzen hinaus navigiert.
* [x] `Tab` und `Shift + Tab` behalten das normale Browser-Fokusverhalten bei.

---

## 3. Responsive Tests

### Navigation

* [x] Unter 800px wird die Akkordeon-Darstellung verwendet.
* [x] Ab 800px wird die Tab-Darstellung verwendet.
* [x] Beim Verkleinern des Browserfensters wird die Darstellung angepasst.
* [x] Beim Vergrößern des Browserfensters wird die Darstellung angepasst.
* [x] Der aktuell aktive Bereich bleibt beim Wechsel der Bildschirmgröße erhalten, sofern ein Bereich aktiv ist.
* [x] Beim Wechsel aus einem vollständig geschlossenen Mobile-Accordion wird im Desktop-Modus der erste Tab aktiv.
* [x] Beim Wechsel zwischen Mobile- und Desktop-Modus befinden sich die Navigationsbuttons jeweils im vorgesehenen Container.
* [x] Beim Wechsel über die 800px-Grenze bleibt der Fokus auf dem zuvor fokussierten Button erhalten.

---

## 4. Accessibility Tests

### Semantik und ARIA

* [x] Die Navigation verwendet native `button`-Elemente.
* [x] Desktop-Tabs erhalten `role="tab"`.
* [x] Die Tab-Navigation erhält `role="tablist"`.
* [x] Die Inhaltsbereiche erhalten auf Desktop `role="tabpanel"`.
* [x] `aria-selected` wird auf Desktop verwendet.
* [x] `aria-expanded` wird auf Mobile verwendet.
* [x] `aria-controls` verbindet Navigation und Inhaltsbereich.
* [x] `aria-labelledby` verbindet Inhaltsbereich und zugehörigen Button.
* [x] Nicht aktive Desktop-Tabs erhalten `aria-selected="false"`.
* [x] Nur der aktive Desktop-Tab ist sichtbar mit `aria-selected="true"` gekennzeichnet.

### Tastaturbedienung

* [x] Die Navigation kann mit der Tastatur bedient werden.
* [x] Die Pfeiltasten werden abhängig vom Darstellungsmodus unterstützt.
* [x] Im Akkordeon bewegen `ArrowUp` und `ArrowDown` nur den Fokus.
* [x] Im Akkordeon aktivieren `Enter` und `Space` den fokussierten Bereich.
* [x] In der Tab-Navigation bewegen `ArrowLeft` und `ArrowRight` nur den Fokus.
* [x] In der Tab-Navigation aktivieren `Enter` und `Space` den fokussierten Tab.
* [x] Die Pfeiltastennavigation aktiviert keinen neuen Inhaltsbereich automatisch.
* [x] Aktiver und fokussierter Tab können während der Desktop-Navigation vorübergehend voneinander abweichen.
* [x] Nach der Aktivierung werden Fokus und aktiver Zustand wieder synchronisiert.
* [x] Die Navigation ist nicht zyklisch.
* [x] `Home` und `End` werden nicht als zusätzliche Navigationsbefehle verwendet.

### Roving `tabindex`

* [x] Im Desktop-Modus besitzt genau ein Tab `tabindex="0"`.
* [x] Die übrigen Desktop-Tabs besitzen `tabindex="-1"`.
* [x] Beim Wechsel des Fokus mit `ArrowLeft` oder `ArrowRight` wird `tabindex="0"` auf den fokussierten Tab verschoben.
* [x] Der bisher fokussierbare Tab erhält dabei `tabindex="-1"`.
* [x] Die Änderung des `tabindex` verändert den aktiven Inhaltsbereich nicht.
* [x] Nach einer Aktivierung stimmen fokussierter Tab und aktiver Tab wieder überein.
* [x] Im Mobile-Modus wird kein expliziter `tabindex` für die Accordion-Buttons gesetzt.
* [x] Die Accordion-Buttons behalten dadurch ihre normale Browser-Tab-Reihenfolge.

### DOM-Struktur und Fokusverhalten

* [x] Im Desktop-Modus befinden sich die Navigationsbuttons innerhalb der `tablist`.
* [x] Im Mobile-Modus befindet sich jeder Navigationsbutton innerhalb seines zugehörigen `.service-item`.
* [x] Bereits korrekt positionierte Navigationsbuttons werden bei einer erneuten Zustandsaktualisierung nicht unnötig verschoben.
* [x] Beim Klick auf einen bereits korrekt positionierten Tab bleibt der Fokus auf dem geklickten Button erhalten.
* [x] Beim Klick auf einen bereits korrekt positionierten Accordion-Button bleibt der Fokus auf dem geklickten Button erhalten.
* [x] Beim Verschieben eines Buttons zwischen den Modi bleibt die Zuordnung zwischen Button und Panel erhalten.
* [x] Jeder Button besitzt eine eindeutige ID.
* [x] Jedes Panel besitzt eine eindeutige ID.
* [x] `aria-controls` verweist auf das zugehörige Panel.
* [x] `aria-labelledby` verweist auf den zugehörigen Button.

### Sichtbare Fokuszustände

* [x] Im Mobile-Modus ist der Fokus auf einem nicht aktiven Button durch einen sichtbaren Akzentrahmen erkennbar.
* [x] Im Mobile-Modus ist der Fokus auf einem aktiven Button durch den dunklen äußeren Rahmen des Service-Items erkennbar.
* [x] Im Desktop-Modus ist der Fokus auf einem nicht aktiven Tab durch einen sichtbaren Akzentrahmen erkennbar.
* [x] Im Desktop-Modus ist der Fokus auf dem aktiven Tab durch einen sichtbaren dunklen Rahmen erkennbar.
* [x] Beim Fokus auf den aktiven Desktop-Tab wird zusätzlich der Panel-Rahmen dunkel dargestellt.

---

## 5. Visuelle Tests

### Desktop-Tab-Navigation

* [x] Die Desktop-Komponente ist horizontal als Tab-Navigation angeordnet.
* [x] Die Tablist nimmt die verfügbare Breite der Komponente ein.
* [x] Die Tabs besitzen eine gleichmäßige Breitenverteilung.
* [x] Zwischen den Tabs besteht ein Abstand von `5px`.
* [x] Nicht aktive Tabs verwenden `--color-primary` als Hintergrund und `--color-white` als Textfarbe.
* [x] Nicht aktive Tabs wechseln bei Hover zu `--color-secondary`.
* [x] Der aktive Tab verwendet `--color-accent` als Hintergrund und `--color-dark` als Textfarbe.
* [x] Der aktive Tab behält seinen aktiven Zustand bei Hover.
* [x] Der aktive Tab besitzt einen dunklen Punkt links neben dem Text.
* [x] Nicht aktive Tabs besitzen an derselben Stelle einen transparenten Punkt.
* [x] Die Textausrichtung bleibt dadurch zwischen aktiven und nicht aktiven Tabs erhalten.
* [x] Das Panel befindet sich direkt unterhalb der Tablist.
* [x] Zwischen Tablist und Panel entsteht kein zusätzlicher Abstand.
* [x] Das Panel besitzt eine `5px` starke Akzent-Border.
* [x] Das Panel besitzt abgerundete untere Ecken.
* [x] Die zentrale Größenanpassung über `clamp()` funktioniert bei unterschiedlichen Desktop-Breiten.
* [x] Die Schriftgröße der Tabs passt sich innerhalb der definierten `clamp()`-Grenzen an.
* [x] Die Panelhöhe passt sich innerhalb der definierten `clamp()`-Grenzen an.

### Mobile-Akkordeon

* [x] Nicht aktive Buttons verwenden `--color-primary` als Hintergrund.
* [x] Nicht aktive Buttons wechseln bei Hover zu `--color-secondary`.
* [x] Aktive Buttons verwenden `--color-accent` als Hintergrund.
* [x] Aktive Buttons behalten ihren aktiven Zustand bei Hover.
* [x] Der Pfeil zeigt im geschlossenen Zustand nach unten.
* [x] Der Pfeil zeigt im geöffneten Zustand nach oben.
* [x] Die äußere Border des aktiven Service-Items verwendet `--color-accent`.
* [x] Die äußere Border bleibt im geschlossenen Zustand transparent.
* [x] Beim Öffnen entsteht kein sichtbarer Layout Shift durch die Border.
* [x] Die Button- und Panel-Flächen bilden im geöffneten Zustand einen zusammenhängenden Block.

---

## 6. Inhaltstypen

Die drei Inhaltstypen wurden manuell im Browser geprüft.

### Steuercheck / steuerliches Formular (`tax-form`)

* [x] Das Formular wird innerhalb des Steuer-Check-Bereichs geladen.
* [x] Es ist immer genau ein Schritt sichtbar.
* [x] Der Stepper zeigt den aktuellen Schritt an.
* [x] `Weiter` wechselt zum nächsten Schritt.
* [x] `Zurück` wechselt zum vorherigen Schritt.
* [x] Im ersten Schritt wird kein `Zurück`-Button angezeigt.
* [x] Die Beschriftung des Weiter-Buttons wechselt je nach Schritt.
* [x] Pflichtfelder verhindern den Wechsel zum nächsten Schritt.
* [x] Der Browser zeigt bei ungültigen Feldern eine Validierungsmeldung an.
* [x] Der Slider für den Arbeitsweg aktualisiert die Kilometerangabe.
* [x] Kostenpositionen können erfasst werden.
* [x] Erfasste Kostenpositionen können wieder entfernt werden.
* [x] Die Summen werden nach dem Hinzufügen und Entfernen aktualisiert.
* [x] Die Zusammenfassung im letzten Schritt übernimmt die zuvor erfassten Angaben.
* [x] Der Fokus wird beim Schrittwechsel auf die Überschrift des neuen Schritts gesetzt.

### Ansprechpartner (`contact-person`)

* [x] Die Inhalte werden geladen und dargestellt.
* [x] Telefonnummer und E-Mail-Adresse sind als Links nutzbar.
* [x] Die Kontaktdaten sind mit der Tastatur erreichbar.
* [x] Die Karte wird eingebunden dargestellt.
* [x] Die Darstellung passt sich Mobile, kleinem und großem Desktop an.

### Unterlagen (`document-upload`)

* [x] Der Upload-Bereich wird geladen und dargestellt.
* [x] Dateien können über das Dateifeld ausgewählt werden.
* [x] Dateien können per Drag & Drop abgelegt werden.
* [x] Die Dropzone wird während des Ziehens visuell hervorgehoben.
* [x] Eine neben der Dropzone losgelassene Datei ersetzt nicht die Seite.
* [x] Die Bereiche für ausgewählte und hochgeladene Dateien sind nur sichtbar, wenn sie Einträge enthalten.

#### Validierung

* [x] Nur PDF, JPG und PNG werden akzeptiert.
* [x] Nicht unterstützte Dateitypen werden mit einer Meldung abgelehnt.
* [x] Dateien über 10 MB werden mit einer Meldung abgelehnt.
* [x] Bereits ausgewählte Dateien werden nicht doppelt übernommen.
* [x] Bereits hinzugefügte Dateien werden nicht doppelt übernommen.
* [x] Eine bestehende Auswahl bleibt erhalten, wenn ein Auswahlvorgang nur ungültige Dateien enthält.
* [x] Dieselbe Datei kann nach dem Entfernen erneut ausgewählt werden.

#### Entfernen von Dateien

* [x] Einzelne Dateien können aus der Auswahl entfernt werden.
* [x] Einzelne Dateien können aus der Liste der hochgeladenen Dateien entfernt werden.
* [x] Nach dem Entfernen wird der Fokus auf einen sinnvollen Eintrag gesetzt.
* [x] Ist die Liste anschließend leer, übernimmt das Dateifeld den Fokus.
* [x] Die Anzahlangabe wird nach dem Entfernen aktualisiert.

#### Datei-Vorschau

* [x] Bilder werden in einer vergrößerten Vorschau geöffnet.
* [x] PDF-Dateien werden in der Vorschau geöffnet.
* [x] Für PDF-Dateien steht zusätzlich ein Link zum Öffnen in einem neuen Tab bereit.
* [x] Die Vorschau kann über den Schließen-Button geschlossen werden.
* [x] Die Vorschau kann über `Escape` geschlossen werden.
* [x] Ein Klick auf den Hintergrund schließt die Vorschau.
* [x] Der Fokus bleibt bei geöffneter Vorschau innerhalb des Dialogs.

---

## 7. TypeScript-Prüfung

Die TypeScript-Implementierung wurde mit folgendem Befehl auf Typfehler geprüft:

```bash
npx tsc --noEmit
```

Zusätzlich wurde der Build geprüft:

```bash
npm run build
```

* [x] `npm run typecheck` läuft ohne Fehler durch.
* [x] `npm run build` läuft ohne Fehler durch.

Die Konfiguration verwendet `strict` und `noUncheckedIndexedAccess`. Über `noEmitOnError` wird bei Typfehlern kein Build erzeugt.

---

## 8. Testumgebung

Die Tests wurden manuell in einem aktuellen Desktop-Browser durchgeführt. Die mobile Darstellung wurde über die responsive Ansicht der Browser-Entwicklerwerkzeuge geprüft.

Geprüft wurden insbesondere:

* unterschiedliche Fensterbreiten
* Mausbedienung
* Tastaturbedienung
* Wechsel zwischen Mobile- und Desktop-Darstellung
* Fokusverhalten
* sichtbare Zustände
* responsive Größenanpassungen

Ein Test auf realen mobilen Endgeräten sowie eine breitere Browser-Matrix waren nicht Bestandteil der Prüfung.

---

## 9. Finaler Teststand

### Manuell geprüft

* Desktop Tab-Navigation
* Mobile Akkordeon
* Tastaturbedienung
* Fokusverhalten
* ARIA-Zustände
* responsives Verhalten
* Steuercheck / Formular
* Ansprechpartner
* Unterlagen
* Datei-Upload
* Dateityp- und Größenvalidierung
* Entfernen von Dateien
* Datei-Vorschau
* TypeScript Build / Typecheck

### Nicht umgesetzt

* automatisierte Tests mit Vitest
* automatisierte Accessibility-Tests
* Tests auf realen mobilen Endgeräten
* Prüfung über eine breitere Browser-Matrix

Automatisierte Tests mit Vitest waren als weiterer Entwicklungsschritt vorgesehen, konnten innerhalb des zeitlichen Rahmens der Aufgabe jedoch nicht mehr umgesetzt werden. Es liegen daher **keine automatisierten Testergebnisse** vor.

Als nächster Schritt wären insbesondere folgende Verhaltensweisen für eine automatisierte Prüfung relevant:

* Initialzustand
* Wechsel des aktiven Bereichs
* Öffnen und Schließen des Akkordeons
* responsive Zustandsänderungen
* korrekte ARIA-Zustände
* Roving `tabindex`
* Fokusbewegung mit den Pfeiltasten
* Trennung von Fokus und Aktivierung
* Aktivierung über `Enter` und `Space`
* Verhalten an den Grenzen der Navigation
* korrekte Zuordnung von Buttons und Panels
* Validierung und Zustandsverwaltung im Datei-Upload

Dabei wäre nicht ausschließlich die Codeabdeckung zu betrachten, sondern insbesondere das tatsächlich relevante Verhalten der Komponente.
