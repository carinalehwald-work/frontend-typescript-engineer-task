# Architecture & Design Decisions

## 1. Zielsetzung

Die Komponente soll mindestens drei unterschiedliche Inhaltstypen zugänglich machen und sich abhängig von der Bildschirmgröße unterschiedlich verhalten:

* **unter 800px:** Akkordeon

* **ab 800px:** Tab-Navigation

Die Umsetzung soll:

* barrierearm und tastaturbedienbar
* responsiv
* wartbar
* wiederverwendbar
* ohne Frameworks oder UI-Libraries
* mit TypeScript und nativen Web-Technologien

realisiert werden.

Die technischen Entscheidungen werden dokumentiert, um nachvollziehbar zu machen, warum bestimmte Lösungen gewählt und welche Alternativen bewusst nicht verwendet wurden.

---

## 2. Mobile-First-Ansatz

Die Komponente wird nach dem Mobile-First-Prinzip entwickelt.

### Begründung

Mobile Endgeräte stellen einen wichtigen Nutzungskontext moderner Webanwendungen dar. Gleichzeitig steht auf kleinen Bildschirmen deutlich weniger Platz für Navigation und Inhalte zur Verfügung.

Deshalb wird zunächst die kompaktere mobile Darstellung entwickelt. Die Navigation wird dabei als vertikales Akkordeon umgesetzt.

Auf größeren Bildschirmen steht mehr horizontaler Platz zur Verfügung. Dort wird dieselbe Navigation als Tab-Navigation dargestellt.

Die Desktop-Darstellung wird somit nicht als Ausgangspunkt genommen und anschließend für kleinere Geräte reduziert. Stattdessen wird die Benutzeroberfläche zunächst auf die restriktiveren Platzverhältnisse ausgelegt und anschließend für größere Bildschirme erweitert.

### Konsequenz

Die responsive Navigation basiert auf zwei Interaktionsmodellen:

* **Mobile:** Akkordeon
* **Desktop:** Tabs

Die Inhalte selbst bleiben dabei unabhängig von der Darstellung bestehen.

---

## 3. Verwendung nativer Web Components

Die zentrale Komponente wird als native Web Component umgesetzt:

```html
<service-tabs>
```

### Begründung

Die Aufgabenstellung schließt Frameworks und UI-Libraries ausdrücklich aus. Native Web Components ermöglichen trotzdem eine komponentenbasierte Architektur direkt auf Basis der Web-Plattform.

Dabei werden unter anderem folgende Web-Standards eingesetzt:

* Custom Elements
* `HTMLElement`
* Lifecycle-Methoden
* native DOM APIs

Die Lösung benötigt dadurch keine zusätzliche UI-Abstraktion durch ein Framework.

### Alternative: Framework wie React oder Angular

Eine Umsetzung mit React oder Angular wäre grundsätzlich möglich und würde bestimmte Entwicklungsaufgaben vereinfachen.

Sie wurde jedoch bewusst nicht gewählt, da Frameworks laut Aufgabenstellung nicht verwendet werden dürfen.

Darüber hinaus demonstriert die Verwendung nativer Web Components Kenntnisse der zugrunde liegenden Web-Plattform, die für eine Position mit Web Components und StencilJS besonders relevant sind.

---

## 4. Verwendung des Light DOM

Die Web Component verwendet bewusst den Light DOM und verzichtet auf einen Shadow DOM.

### Begründung

Die Komponente soll ihre enthaltenen Inhalte direkt als normale DOM-Kinder verwalten können. Dadurch kann `service-tabs` die bereitgestellten Inhaltselemente dynamisch erkennen und ihre Navigation strukturell um diese Inhalte herum aufbauen.

Außerdem bleibt die Komponente ohne zusätzliche Shadow-DOM-Kapselung leichter nachvollziehbar und die Inhalte bleiben Teil der normalen Dokumentstruktur.

### Alternative: Shadow DOM

Der Shadow DOM würde eine stärkere Kapselung von Struktur und Styles ermöglichen.

Für die aktuelle Komponente ist diese Kapselung jedoch nicht erforderlich. Navigation und bereitgestellte Inhalte sollen bewusst eng mit der normalen DOM-Struktur zusammenarbeiten.

Der Light DOM wurde daher als passendere Lösung für diese Komponente gewählt.

---

## 5. Verwendung von TypeScript

Die Logik der Web Component wird mit TypeScript umgesetzt.

### Begründung

TypeScript ermöglicht eine klarere und typsichere Umsetzung der DOM- und Komponentenlogik.

Gerade bei einer interaktiven Komponente mit Zuständen, DOM-Referenzen, Events und responsivem Verhalten unterstützt die Typisierung dabei, Fehler frühzeitig zu erkennen und die Wartbarkeit zu verbessern.

Da die ausgeschriebene Position einen starken Fokus auf TypeScript legt, ist TypeScript außerdem ein bewusst gewählter Bestandteil der technischen Demonstration.

### Alternative: JavaScript

Eine Umsetzung mit modernem JavaScript wäre technisch ebenfalls möglich gewesen.

TypeScript wurde gewählt, weil die Komponente mehrere miteinander verbundene Zustände und DOM-Referenzen verwaltet und sich hier ein konkreter Vorteil der Typisierung ergibt.

---

## 6. Trennung von Container und Inhalt

Die zentrale `service-tabs`-Komponente übernimmt die Navigation und das responsive Verhalten.

Die eigentlichen Inhalte werden in eigenständigen Komponenten gekapselt.

Geplant sind beispielsweise:

* `service-information`
* `service-request`
* `service-documents`

### Begründung

Navigation und Inhalt haben unterschiedliche Verantwortlichkeiten.

`service-tabs` soll nicht wissen, wie die einzelnen Inhalte intern aufgebaut sind. Die Komponente muss lediglich wissen, welche Inhalte vorhanden sind und wie diese navigiert werden können.

Dadurch entsteht eine klare Trennung der Verantwortlichkeiten.

Die einzelnen Inhaltstypen können unabhängig voneinander entwickelt und erweitert werden, während `service-tabs` für Navigation, Zustand und responsives Verhalten zuständig bleibt.

### Alternative: Alles in einer Komponente

Eine einzelne große Komponente wäre zunächst einfacher umzusetzen.

Sie würde jedoch Navigation, responsive Logik und sämtliche Inhalte miteinander vermischen. Mit zunehmender Komplexität würde dadurch die Wartbarkeit sinken.

Die Trennung ermöglicht dagegen eine unabhängige Weiterentwicklung der einzelnen Inhaltstypen.

---

## 7. Dynamische Erkennung der Inhalte

Die `service-tabs`-Komponente erkennt ihre enthaltenen Elemente dynamisch.

Die Inhalte werden nicht anhand konkreter Komponentennamen fest im Parent programmiert.

Stattdessen arbeitet `service-tabs` mit einem gemeinsamen Vertrag: Die enthaltenen Elemente stellen über das Attribut `data-title` den für die Navigation benötigten Titel bereit.

### Begründung

Die Komponente soll möglichst wiederverwendbar sein.

Neue Inhaltstypen sollen hinzugefügt werden können, ohne die zentrale Navigationslogik grundlegend verändern zu müssen.

Beispielsweise kann später ein weiterer Inhaltstyp ergänzt werden, ohne dass `service-tabs` dafür eine zusätzliche `if`- oder `switch`-Bedingung für den konkreten Komponententyp benötigt.

### Alternative: Inhalte fest im Parent definieren

Eine mögliche Umsetzung wäre gewesen, die konkreten Inhaltstypen direkt in `service-tabs` fest zu programmieren:

* `service-information`
* `service-request`
* `service-documents`

Diese Variante wäre für genau diese drei Inhalte zunächst einfacher, würde die Komponente aber stärker an konkrete Inhaltstypen koppeln.

Die dynamische Variante bietet daher eine bessere Grundlage für Wiederverwendbarkeit und Erweiterbarkeit.

---

## 8. Verwendung von `data-title`

Der Titel eines Inhaltsbereichs wird über das Attribut `data-title` definiert.

Beispiel:

```html
<service-information data-title="Informationen"></service-information>
```

### Begründung

Der Navigationstext wird damit von der konkreten Implementierung der Navigation getrennt.

`service-tabs` muss nicht wissen, welche konkrete Komponente verwendet wird. Es benötigt lediglich die für die Navigation erforderlichen Metadaten.

Dadurch kann dieselbe Navigationskomponente mit unterschiedlichen Inhaltstypen verwendet werden.

---

## 9. Verwendung nativer Buttons

Die Navigation wird mit nativen HTML-`button`-Elementen umgesetzt.

### Begründung

Ein Button besitzt bereits wichtige grundlegende Eigenschaften für Interaktion und Tastaturbedienung.

Dadurch muss diese Semantik nicht vollständig selbst nachgebaut werden.

Zusätzlich können ARIA-Attribute wie `aria-selected`, `aria-expanded` und `aria-controls` verwendet werden, um den jeweiligen Zustand und die Beziehungen zwischen Navigation und Inhalt für assistive Technologien zu beschreiben.

### Alternative: Klickbare `div`-Elemente

Eine Navigation hätte auch mit `div`-Elementen und vollständig eigener Event-Logik umgesetzt werden können.

Das würde jedoch zusätzliche Arbeit für Tastaturbedienung, Fokusverhalten und Semantik erzeugen.

Ein nativer Button ist daher die robustere Grundlage.

---

## 10. Zentraler aktiver Zustand

Der aktuell aktive Bereich wird über `activeIndex` verwaltet.

### Begründung

Die Komponente besitzt zwei unterschiedliche Darstellungsmodi, verwendet aber dieselben Inhalte.

Der aktive Zustand sollte deshalb unabhängig davon sein, ob gerade die mobile oder Desktop-Darstellung verwendet wird.

Durch `activeIndex` kann die Komponente bei einem Wechsel der Bildschirmgröße denselben aktiven Bereich beibehalten.

Dadurch wird die responsive Darstellung von der eigentlichen Zustandsverwaltung getrennt.

---

## 11. Breakpoint bei 800px

Der Wechsel zwischen Akkordeon und Tabs erfolgt bei 800px.

### Begründung

Der Breakpoint von 800px ist direkt aus der Aufgabenstellung abgeleitet:

* `< 800px`: Akkordeon
* `>= 800px`: Tab-Navigation

Der Wert ist daher keine subjektive Designentscheidung, sondern eine explizite fachliche Anforderung der Aufgabe.

Für die Erkennung wird `window.matchMedia()` verwendet.

### Alternative: `window.innerWidth`

Eine Prüfung über `window.innerWidth` wäre ebenfalls möglich.

`matchMedia()` beschreibt jedoch direkt eine Media-Query-Bedingung und passt damit konzeptionell besser zur responsiven Logik.

---

## 12. Responsive Darstellung statt separater Komponenten

Für Mobile und Desktop werden keine zwei vollständig unabhängigen Navigationskomponenten erstellt.

Stattdessen passt sich `service-tabs` abhängig von der Bildschirmgröße an.

### Begründung

Die Inhalte und der aktive Zustand bleiben identisch. Nur Darstellung, Interaktion und teilweise die Semantik der Navigation ändern sich.

Eine gemeinsame Komponente vermeidet dadurch doppelte Logik und stellt sicher, dass beide Darstellungen denselben Zustandsbestand verwenden.

Die responsive Umsetzung wird dabei schrittweise entwickelt: Zunächst wird die Navigation funktional umgesetzt, anschließend visuell gestaltet. Die eigentlichen Inhaltstypen und deren responsive Gestaltung werden danach ergänzt.

### Alternative: Zwei separate Komponenten

Eine mögliche Alternative wäre gewesen, jeweils eine eigene Komponente für die mobile und die Desktop-Darstellung zu entwickeln, beispielsweise:

* `service-accordion`
* `service-tabs`

Diese Lösung würde die beiden Interaktionsmodelle stärker voneinander trennen.

Da sich jedoch die Inhalte und der aktive Zustand nicht unterscheiden und hauptsächlich die Navigation abhängig von der Bildschirmgröße angepasst wird, wurde eine gemeinsame Komponente gewählt. Dadurch kann die gemeinsame Logik zentral verwaltet und doppelte Implementierung vermieden werden.

---

## 13. Tastaturbedienung und APG-orientierte Interaktion

Die Tastaturbedienung orientiert sich an den Interaktionsmustern des WAI-ARIA Authoring Practices Guide.

### Desktop: Tab-Navigation

Im Desktop-Modus bewegen `ArrowLeft` und `ArrowRight` den Fokus zwischen den Tabs.

Die Navigation verwendet dabei automatische Aktivierung: Der fokussierte Tab wird gleichzeitig zum aktiven Tab.

### Mobile: Akkordeon

Im Mobile-Modus bewegen `ArrowUp` und `ArrowDown` ausschließlich den Fokus zwischen den Akkordeon-Buttons.

Der fokussierte Bereich wird dabei **nicht automatisch geöffnet**.

Die Aktivierung erfolgt über das native Button-Verhalten mit `Enter` oder `Space`.

### `Home` und `End`

`Home` und `End` werden für die Navigation nicht zusätzlich implementiert.

Die Navigation unterstützt bewusst nur die für die jeweiligen Interaktionsmodelle relevanten Pfeiltasten. Die Navigation ist außerdem nicht zyklisch, sodass der erste bzw. letzte Eintrag eine klare Grenze bildet.

### Begründung

Die beiden Darstellungsformen verwenden unterschiedliche Interaktionsmodelle. Die Tastaturbedienung wird deshalb an das jeweilige Muster angepasst, anstatt das Verhalten der beiden Modi künstlich zu vereinheitlichen.

Dadurch entspricht die Interaktion stärker den etablierten Accessibility-Mustern für Tabs und Akkordeons.

---

## 14. Roving `tabindex` bei der Tab-Navigation

### Entscheidung

Im Desktop-Modus erhält ausschließlich der aktive Tab `tabindex="0"`. Alle anderen Tabs erhalten `tabindex="-1"`.

Dadurch befindet sich nur der aktive Tab in der normalen Tab-Reihenfolge. Zwischen den Tabs wird mit `ArrowLeft` und `ArrowRight` navigiert.

### Begründung

Die Tab-Navigation verwendet damit ein Roving-`tabindex`-Muster. Die Tastaturbedienung trennt zwischen dem Einstieg in die Tab-Navigation über `Tab` und der Navigation innerhalb der Tabs über die Pfeiltasten.

Dadurch müssen nicht alle Tabs einzeln durch die normale Tab-Reihenfolge durchlaufen werden.

Auf mobilen Bildschirmgrößen wird `tabindex` dagegen nicht gesetzt, sodass die Akkordeon-Buttons ihre normale Browser-Tab-Reihenfolge behalten.

---

## 15. Vermeidung unnötiger doppelter Logik

Die Komponente verwendet eine gemeinsame `entries`-Struktur für die Beziehung zwischen Inhalt, Button und umgebendem Element.

Jeder Eintrag enthält:

* `panel`
* `button`
* `item`

### Begründung

Die drei Elemente gehören logisch zusammen und müssen beim Wechsel zwischen den Darstellungsmodi gemeinsam verwaltet werden.

Eine gemeinsame Struktur verhindert, dass mehrere parallele Arrays synchron gehalten werden müssen.

Auch Zustandsänderungen werden möglichst zentral über `updateMode()` verarbeitet.

Dadurch bleibt die responsive Umschaltung an einer zentralen Stelle nachvollziehbar.

---

## 16. Umgang mit Komponenteninstanzen

Für die generierten IDs wird eine komponenteninterne Instanznummer verwendet.

### Begründung

Die Komponente kann mehrfach auf derselben Seite verwendet werden. IDs für Tabs und Panels müssen deshalb innerhalb des Dokuments eindeutig sein.

Eine statische Instanzzählung erzeugt lesbare IDs wie:

```text
service-tabs-0-tab-0

service-tabs-0-panel-0
```

Dabei wird bewusst nicht auf `crypto.randomUUID()` zurückgegriffen.

### Alternative: `crypto.randomUUID()`

`crypto.randomUUID()` erzeugt zwar komfortabel eindeutige IDs, ist jedoch an Secure Contexts gebunden.

Die Komponente soll auch bei lokaler Entwicklung und Tests über unterschiedliche lokale Netzwerkadressen problemlos funktionieren.

Die einfache Instanzzählung erfüllt diese Anforderung ohne zusätzliche Abhängigkeit von der Umgebung.

---

## 17. Entwicklung in kleinen Schritten

Die Komponente wird schrittweise entwickelt.

Die Reihenfolge ist bewusst gewählt:

1. TypeScript und native Web Components einrichten
2. Responsive Navigation funktional umsetzen
3. Navigation visuell gestalten
4. Unterschiedliche Inhaltstypen ergänzen
5. Inhalte responsive gestalten
6. Accessibility systematisch prüfen und verbessern
7. Automatisierte Tests ergänzen
8. Abschließende Tests und Optimierungen durchführen

Dadurch bleibt jeder Entwicklungsschritt überschaubar und kann unabhängig überprüft werden.

---

## 18. Verschieben der Navigationsbuttons statt Duplizieren

### Entscheidung

Die Navigationsbuttons werden abhängig vom Darstellungsmodus zwischen der `tablist` und dem jeweiligen `.service-item` verschoben.

Auf Desktop befinden sich die Buttons innerhalb der `tablist`. Auf Mobile befinden sie sich innerhalb des jeweiligen `.service-item` und bilden dort gemeinsam mit dem zugehörigen Panel ein Akkordeon-Element.

### Begründung

Die Buttons werden nicht doppelt im DOM angelegt. Dadurch existiert pro Inhaltseintrag nur ein Navigationsbutton und damit auch nur eine Quelle für Zustand, IDs und Event-Handler.

Das Verschieben erfolgt nur dann, wenn sich die aktuelle Elternstruktur tatsächlich vom benötigten Ziel unterscheidet. Dadurch werden bereits korrekt positionierte und fokussierte Buttons bei wiederholten Zustandsaktualisierungen nicht unnötig aus dem DOM entfernt und erneut eingefügt.

Das reduziert unnötige DOM-Operationen und verhindert insbesondere Fokusverlust bei Interaktionen innerhalb eines bereits korrekt aufgebauten Modus.

### Verworfene Alternative

Eine alternative Umsetzung wäre, zwei separate Navigationen im DOM zu erzeugen und jeweils eine davon abhängig von der Bildschirmgröße per CSS auszublenden.

Diese Variante würde jedoch doppelte Buttons, doppelte IDs und doppelte Zustands-/Event-Logik erzeugen. Außerdem müsste sichergestellt werden, dass die jeweils nicht sichtbare Navigation nicht versehentlich für Tastatur- oder Screenreader-Nutzer zugänglich bleibt.

Die gemeinsame Verwendung eines einzelnen Buttons pro Eintrag wurde daher bevorzugt.

---

## 19. Verwendung von `.service-item`

### Entscheidung

Jeder Inhaltseintrag wird innerhalb eines `.service-item` zusammengefasst. Dieses Element enthält auf mobilen Bildschirmgrößen den zugehörigen Navigationsbutton und das zugehörige Panel.

### Begründung

Im Akkordeon-Modus bilden Navigationsbutton und Inhaltsbereich eine gemeinsame Einheit. Der Button steht dabei direkt vor dem zugehörigen Panel.

Durch `.service-item` kann diese Beziehung strukturell im DOM abgebildet werden. Beim Wechsel in den Desktop-Modus wird der Button aus dem `.service-item` in die `tablist` verschoben, während das Panel seinem jeweiligen Eintrag zugeordnet bleibt.

### Verworfene Alternative

Eine mögliche Alternative wäre eine flache DOM-Struktur gewesen, bei der alle Buttons und Panels unabhängig voneinander angeordnet und ausschließlich über CSS positioniert werden.

Diese Variante würde die Zuordnung zwischen Button und Panel im mobilen Akkordeon weniger eindeutig abbilden und zusätzliche CSS-Logik für die Anordnung erfordern.

`.service-item` bildet die logische Beziehung der Elemente daher direkt in der DOM-Struktur ab.
