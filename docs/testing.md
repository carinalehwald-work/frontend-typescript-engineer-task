# Testing

## 1. Ziel

Die Komponente wird schrittweise getestet, um sicherzustellen, dass Funktionalität, responsives Verhalten und Accessibility zuverlässig funktionieren.

Während der Entwicklung werden zunächst manuelle Tests im Browser durchgeführt. Automatisierte Tests mit Vitest werden anschließend ergänzt.

Die Testdokumentation wird fortlaufend aktualisiert.

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

### Tab-Navigation auf Desktop-Bildschirmgrößen

* [x] Ab 800px wird die Desktop-Darstellung aktiviert.
* [x] Der erste Bereich ist initial aktiv.
* [x] Beim Klick auf einen Tab wird der entsprechende Bereich aktiviert.
* [x] Nur der aktive Bereich wird angezeigt.
* [x] Der aktive Tab wird über `aria-selected` dargestellt.
* [x] Nur der aktive Tab hat `tabindex="0"`.
* [x] Alle inaktiven Tabs haben `tabindex="-1"`.
* [x] Beim Wechsel des aktiven Tabs wird der `tabindex` entsprechend aktualisiert.
* [x] `ArrowRight` wechselt zum nächsten Tab.
* [x] `ArrowLeft` wechselt zum vorherigen Tab.
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
* [x] Der aktuell aktive Bereich bleibt beim Wechsel der Bildschirmgröße erhalten.
* [x] Beim Wechsel zwischen Mobile- und Desktop-Modus befinden sich die Navigationsbuttons jeweils im vorgesehenen Container.
* [ ] Fokusverhalten beim Wechsel über die 800px-Grenze prüfen.

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

### Tastaturbedienung

* [x] Die Navigation kann mit der Tastatur bedient werden.
* [x] Die Pfeiltasten werden abhängig vom Darstellungsmodus unterstützt.
* [x] Im Akkordeon bewegen `ArrowUp` und `ArrowDown` nur den Fokus.
* [x] Im Akkordeon aktivieren `Enter` und `Space` den fokussierten Bereich.
* [x] In der Tab-Navigation aktivieren `ArrowLeft` und `ArrowRight` den fokussierten Tab.
* [x] Die Navigation ist nicht zyklisch.

### DOM-Struktur und Fokusverhalten

* [x] Im Desktop-Modus befinden sich die Navigationsbuttons innerhalb der `tablist`.
* [x] Im Mobile-Modus befindet sich jeder Navigationsbutton innerhalb seines zugehörigen `.service-item`.
* [x] Bereits korrekt positionierte Navigationsbuttons werden bei einer erneuten Zustandsaktualisierung nicht unnötig verschoben.
* [x] Beim Klick auf einen bereits korrekt positionierten Tab bleibt der Fokus auf dem geklickten Button erhalten.
* [x] Beim Klick auf einen bereits korrekt positionierten Accordion-Button bleibt der Fokus auf dem geklickten Button erhalten.

---

## 5. TypeScript-Prüfung

Die TypeScript-Implementierung wird während der Entwicklung mit folgendem Befehl auf Typfehler geprüft:

```bash
npx tsc --noEmit
```

Die Prüfung soll vor relevanten Commits bzw. spätestens vor der finalen Abgabe erfolgreich durchlaufen.

Zusätzlich wird der Produktions-Build mit folgendem Befehl geprüft:

```bash
npm run build
```

---

## 6. Testumgebung

Die Tests werden zunächst manuell in einem aktuellen Desktop-Browser durchgeführt.

Geprüft werden insbesondere:

* unterschiedliche Fensterbreiten
* Mausbedienung
* Tastaturbedienung
* Wechsel zwischen Mobile- und Desktop-Darstellung

Weitere Browser und Geräte werden im Rahmen der finalen Prüfung ergänzt.

---

## 7. Automatisierte Tests

Automatisierte Tests mit Vitest werden nach der Fertigstellung der Kernfunktionalität ergänzt.

Dabei sollen insbesondere relevante Verhaltensweisen der Komponente automatisiert geprüft werden, beispielsweise:

* Initialzustand
* Wechsel des aktiven Bereichs
* responsive Zustandsänderungen
* korrekte ARIA-Zustände
* Tastaturinteraktionen

Dabei soll nicht ausschließlich die Codeabdeckung betrachtet werden, sondern insbesondere das tatsächlich relevante Verhalten der Komponente.
