import { FormStepper } from "../form-stepper/form-stepper.js";
import { TaxFormCosts } from "./components/tax-form-costs.js";
import { TaxFormNavigation } from "./components/tax-form-navigation.js";
import { TaxFormSummary } from "./components/tax-form-summary.js";

class TaxForm extends HTMLElement {
  private _stepper: FormStepper | null = null;
  private _costs: TaxFormCosts | null = null;
  private _summary: TaxFormSummary | null = null;
  private _navigation: TaxFormNavigation | null = null;

  connectedCallback(): void {
    void this.loadTemplate().catch((error: unknown) => {
      console.error("Tax form could not be initialized.", error);

      this.renderError();
    });
  }

  private async loadTemplate(): Promise<void> {
    const response = await fetch("./src/components/tax-form/tax-form.html");

    if (!response.ok) {
      throw new Error("Tax form template could not be loaded.");
    }

    const html = await response.text();

    const parsedDocument = new DOMParser().parseFromString(html, "text/html");

    const form = parsedDocument.body.firstElementChild;

    if (!(form instanceof HTMLFormElement)) {
      throw new Error("Tax form template must contain a form.");
    }

    this.replaceChildren(form);

    this.loadStyles();
    this.setupStepper();
    this.setupSteps();
    this.setupWorkFields();
    this.setupCosts();
    this.setupSummary();
    this.setupNavigation();
  }

  private setupStepper(): void {
    const stepper = this.querySelector("form-stepper");

    if (!(stepper instanceof FormStepper)) {
      throw new Error("Tax form requires a form-stepper.");
    }

    const steps = this.querySelectorAll<HTMLElement>(".tax-form__step");

    stepper.steps = Array.from(steps, (step) => ({
      label: step.dataset.stepLabel ?? "Schritt",
    }));

    this._stepper = stepper;
  }

  private setupSteps(): void {
    const steps = this.querySelectorAll<HTMLElement>(".tax-form__step");

    for (const step of steps) {
      step.hidden = true;
    }
  }

  private setupWorkFields(): void {
    const commuteDistance =
      this.querySelector<HTMLInputElement>("#commute-distance");

    const commuteOutput = this.querySelector<HTMLOutputElement>(
      'output[for="commute-distance"]',
    );

    if (!commuteDistance || !commuteOutput) {
      throw new Error("Commute distance fields are missing.");
    }

    const updateCommuteDistance = (): void => {
      const value = Number(commuteDistance.value);

      const min = Number(commuteDistance.min);

      const max = Number(commuteDistance.max);

      const progress = max > min ? ((value - min) / (max - min)) * 100 : 0;

      commuteOutput.value = `${value} km`;

      commuteDistance.style.setProperty("--range-progress", `${progress}%`);

      commuteDistance.setAttribute("aria-valuetext", `${value} km`);
    };

    commuteDistance.addEventListener("input", updateCommuteDistance);

    updateCommuteDistance();
  }

  private setupCosts(): void {
    const costs = new TaxFormCosts(this);

    costs.setup();

    this._costs = costs;
  }

  private setupSummary(): void {
    if (!this._costs) {
      throw new Error("Tax form costs must be initialized first.");
    }

    const summary = new TaxFormSummary(this, this._costs);

    this._summary = summary;
  }

  private setupNavigation(): void {
    if (!this._stepper) {
      throw new Error("Tax form stepper must be initialized first.");
    }

    const navigation = new TaxFormNavigation(this, this._stepper, (step) => {
      if (step === this.querySelectorAll(".tax-form__step").length - 1) {
        this._summary?.update();
      }
    });

    navigation.setup();

    navigation.setStep(0);
  }

  private loadStyles(): void {
    const styleId = "tax-form-styles";

    if (document.getElementById(styleId)) {
      return;
    }

    const stylesheet = document.createElement("link");

    stylesheet.id = styleId;
    stylesheet.rel = "stylesheet";
    stylesheet.href = "./src/components/tax-form/tax-form.css";

    document.head.append(stylesheet);
  }

  private renderError(): void {
    this.replaceChildren();

    const container = document.createElement("div");

    container.className = "tax-form__error";

    const heading = document.createElement("h2");

    heading.textContent = "Der Steuer-Check konnte nicht geladen werden.";

    const message = document.createElement("p");

    message.textContent =
      "Bitte laden Sie die Seite neu. Wenn das Problem weiterhin besteht, versuchen Sie es später erneut.";

    container.append(heading, message);

    this.append(container);
  }
}

customElements.define("tax-form", TaxForm);
