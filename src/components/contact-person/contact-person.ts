export class ContactPerson extends HTMLElement {
  connectedCallback(): void {
    this.loadStyles();

    void this.loadTemplate().catch((error: unknown) => {
      console.error("Contact person could not be loaded.", error);
      this.renderError();
    });
  }

  private loadStyles(): void {
    const stylesheetId = "contact-person-styles";

    if (document.getElementById(stylesheetId)) {
      return;
    }

    const stylesheet = document.createElement("link");

    stylesheet.id = stylesheetId;
    stylesheet.rel = "stylesheet";
    stylesheet.href = "./src/components/contact-person/contact-person.css";

    document.head.append(stylesheet);
  }

  private async loadTemplate(): Promise<void> {
    const response = await fetch(
      "./src/components/contact-person/contact-person.html",
    );

    if (!response.ok) {
      throw new Error("Contact person template could not be loaded.");
    }

    const html = await response.text();

    const template = document.createElement("template");

    template.innerHTML = html;

    this.replaceChildren(template.content.cloneNode(true));

    this.setupMapFallback();
  }

  private setupMapFallback(): void {
    const iframe = this.querySelector<HTMLIFrameElement>("iframe");
    const fallback = this.querySelector<HTMLElement>(
      ".contact-person__map-fallback",
    );

    if (!iframe || !fallback) {
      return;
    }

    iframe.hidden = false;
    fallback.hidden = true;
  }

  private renderError(): void {
    this.innerHTML = `
      <div class="contact-person__error" role="alert">
        <p>Die Kontaktinformationen konnten nicht geladen werden.</p>
      </div>
    `;
  }
}

customElements.define("contact-person", ContactPerson);
