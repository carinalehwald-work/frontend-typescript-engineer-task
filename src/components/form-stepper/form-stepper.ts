import type { FormStepperStep } from "./types.js";

export class FormStepper extends HTMLElement {
  private _steps: FormStepperStep[] = [];

  private _activeStep = 0;

  private _pendingActiveStep: number | null = null;

  private _liveRegion: HTMLParagraphElement | null = null;

  private _list: HTMLOListElement | null = null;

  connectedCallback(): void {
    this.loadStyles();

    this.createLiveRegion();

    this.render();
  }

  private loadStyles(): void {
    const stylesheetId = "form-stepper-styles";

    if (document.getElementById(stylesheetId)) {
      return;
    }

    const stylesheet = document.createElement("link");

    stylesheet.id = stylesheetId;

    stylesheet.rel = "stylesheet";

    stylesheet.href =
      "./src/components/form-stepper/form-stepper.css";

    document.head.append(stylesheet);
  }

  private createLiveRegion(): void {
    if (this._liveRegion) {
      return;
    }

    const liveRegion = document.createElement("p");

    liveRegion.classList.add("form-stepper__current");

    liveRegion.setAttribute("aria-live", "polite");

    liveRegion.setAttribute("aria-atomic", "true");

    this._liveRegion = liveRegion;

    this.append(liveRegion);
  }

  set steps(value: FormStepperStep[]) {
    this._steps = [...value];

    if (this._pendingActiveStep !== null) {
      this._activeStep = this.clampStep(
        this._pendingActiveStep,
      );

      this._pendingActiveStep = null;
    } else {
      this._activeStep = this.clampStep(
        this._activeStep,
      );
    }

    this.render();
  }

  get steps(): FormStepperStep[] {
    return [...this._steps];
  }

  set activeStep(value: number) {
    if (!Number.isInteger(value)) {
      return;
    }

    if (this._steps.length === 0) {
      this._pendingActiveStep = value;

      return;
    }

    this._activeStep = this.clampStep(value);

    this.render();
  }

  get activeStep(): number {
    return this._activeStep;
  }

  private clampStep(value: number): number {
    return Math.min(
      Math.max(value, 0),
      Math.max(this._steps.length - 1, 0),
    );
  }

  private render(): void {
    if (this._list) {
      this._list.remove();

      this._list = null;
    }

    if (this._steps.length === 0) {
      if (this._liveRegion) {
        this._liveRegion.textContent = "";
      }

      return;
    }

    if (this._liveRegion) {
      this._liveRegion.textContent =
        `Schritt ${this._activeStep + 1} von ${this._steps.length} · ` +
        `${this._steps[this._activeStep]?.label ?? ""}`;
    }

    const list = document.createElement("ol");

    list.classList.add("form-stepper__steps");

    list.setAttribute("role", "list");

    list.setAttribute("aria-label", "Fortschritt");

    for (const [index, step] of this._steps.entries()) {
      const item = document.createElement("li");

      item.classList.add("form-stepper__step");

      if (index < this._activeStep) {
        item.classList.add("is-completed");
      }

      if (index === this._activeStep) {
        item.classList.add("is-active");

        item.setAttribute("aria-current", "step");
      }

      const number = document.createElement("span");

      number.classList.add("form-stepper__number");

      number.textContent = String(index + 1);

      number.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");

      label.classList.add("form-stepper__label");

      label.textContent = step.label;

      item.append(number, label);

      if (index < this._activeStep) {
        const completed = document.createElement("span");

        completed.classList.add("form-stepper__status");

        completed.textContent = "abgeschlossen";

        item.append(completed);
      }

      list.append(item);
    }

    this._list = list;

    this.append(list);
  }
}

customElements.define("form-stepper", FormStepper);