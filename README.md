# Digital Service

Eine responsive Web-Komponente auf Basis nativer Web-Technologien mit Fokus auf Accessibility, Wiederverwendbarkeit und einer sauberen TypeScript-Architektur.

## Ziel

Dieses Projekt entstand im Rahmen einer Frontend-Entwicklungsaufgabe.

Die zentrale Komponente stellt mindestens drei unterschiedliche Inhaltstypen bereit und passt ihre Navigation an die jeweilige Bildschirmgröße an:

* **Desktop (≥ 800px):** Tab-Navigation
* **Mobile (< 800px):** Akkordeon

Die Entwicklung erfolgt nach dem **Mobile-First-Prinzip** mit Fokus auf:

* Accessibility
* Responsive Design
* Wiederverwendbarkeit
* Wartbarkeit
* native Web-Technologien

## Technologien

* HTML5
* CSS3
* TypeScript
* Web Components
* Native Web APIs

Automatisierte Tests mit **Vitest** sind als weiterer Entwicklungsschritt vorgesehen.

## Start

Repository klonen und Abhängigkeiten installieren:

```bash
npm install
```

TypeScript kompilieren:

```bash
npm run build
```

Anschließend das Projekt über einen lokalen HTTP-Server starten:

```bash
npx serve .
```

Die von `serve` angezeigte lokale Adresse im Browser öffnen.

## Projektstruktur

```text
├── docs
│   ├── decisions.md
│   ├── design.md
│   └── testing.md
├── src
│   ├── main.ts
│   ├── service-tabs.ts
│   └── styles.css
├── .gitattributes
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

## Anforderungen

### Umgesetzt

* keine Frameworks
* keine UI-Libraries
* responsive
* Mobile First
* native Web Component
* TypeScript
* Tastaturbedienung
* semantische HTML-Elemente
* ARIA-Zustände für Tabs und Akkordeon
* Desktop-Tab-Navigation ab 800px
* Mobile-Akkordeon unter 800px
* Roving Tabindex für die Desktop-Tab-Navigation
* Fokus- und Aktivierungszustände getrennt behandelt
* wiederverwendbare Komponentenstruktur

### Noch offen

* unterschiedliche konkrete Inhaltstypen vollständig ergänzen
* Inhalte responsive gestalten
* automatisierte Tests mit Vitest
* abschließende Accessibility-Prüfung
* abschließende Tests und Optimierungen

## Entwicklung

Das Projekt wird schrittweise entwickelt:

1. TypeScript und native Web Components einrichten
2. Responsive Navigation als Akkordeon und Tab-Navigation umsetzen
3. Navigation visuell gestalten
4. Unterschiedliche Inhaltstypen ergänzen
5. Inhalte responsive gestalten
6. Accessibility systematisch prüfen und verbessern
7. Automatisierte Tests ergänzen
8. Abschließende Tests und Optimierungen durchführen

## Dokumentation

Die technischen Entscheidungen und ihre Begründungen sind in [`decisions.md`](./docs/decisions.md) dokumentiert.

Die visuellen und gestalterischen Entscheidungen sind in [`design.md`](./docs/design.md) dokumentiert.

Der aktuelle Teststand und die geplanten Prüfungen befinden sich in [`testing.md`](./docs/testing.md).

Die Entwicklungsschritte sind zusätzlich über die Git-Historie nachvollziehbar.

## Status

🚧 **In Entwicklung**

Die responsive Navigation einschließlich Akkordeon- und Tab-Modus sowie die grundlegende visuelle Gestaltung sind umgesetzt. Die konkreten Inhaltstypen, automatisierten Tests und abschließenden Prüfungen folgen als weitere Entwicklungsschritte.
