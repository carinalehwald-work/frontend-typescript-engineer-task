import { FormStepper } from "../../form-stepper/form-stepper.js";

class TaxFormNavigation {
  constructor(
    private readonly _root: HTMLElement,
    private readonly _stepper: FormStepper,
    private readonly _onStepChange: (step: number) => void,
  ) {}

  setup(): void {
    const actions =
      this._root.querySelector(".tax-form__actions");

    if (!(actions instanceof HTMLElement)) {
      throw new Error(
        "Tax form actions container is missing.",
      );
    }

    const backButton =
      document.createElement("button");

    backButton.type = "button";
    backButton.textContent = "Zurück";
    backButton.dataset.action = "back";

    const nextButton =
      document.createElement("button");

    nextButton.type = "button";
    nextButton.textContent = "Jetzt starten";
    nextButton.dataset.action = "next";

    actions.append(
      backButton,
      nextButton,
    );

    backButton.addEventListener("click", () => {
      this.setStep(this._stepper.activeStep - 1);
    });

    nextButton.addEventListener("click", () => {
      const steps =
        this._root.querySelectorAll<HTMLElement>(
          ".tax-form__step",
        );

      const currentStep =
        this._stepper.activeStep;

      const isLastStep =
        currentStep === steps.length - 1;

      if (isLastStep) {
        window.print();
        return;
      }

      if (!this.validateCurrentStep()) {
        return;
      }

      this.setStep(currentStep + 1);
    });
  }

  setStep(step: number): void {
    const steps =
      this._root.querySelectorAll<HTMLElement>(
        ".tax-form__step",
      );

    if (
      step < 0 ||
      step >= steps.length
    ) {
      return;
    }

    for (const [
      index,
      stepElement,
    ] of steps.entries()) {
      stepElement.hidden = index !== step;
    }

    const actions =
      this._root.querySelector(
        ".tax-form__actions",
      );

    if (!(actions instanceof HTMLElement)) {
      throw new Error(
        "Tax form actions container is missing.",
      );
    }

    const backButton =
      actions.querySelector<HTMLButtonElement>(
        '[data-action="back"]',
      );

    const nextButton =
      actions.querySelector<HTMLButtonElement>(
        '[data-action="next"]',
      );

    if (!backButton || !nextButton) {
      throw new Error(
        "Tax form navigation buttons are missing.",
      );
    }

    backButton.hidden = step === 0;

    if (step === 0) {
      nextButton.textContent = "Jetzt starten";
    } else if (
      step === steps.length - 1
    ) {
      nextButton.textContent =
        "Zusammenfassung drucken";
    } else {
      nextButton.textContent = "Weiter";
    }

    this._stepper.activeStep = step;
    this._onStepChange(step);

    const newStep = steps[step];

    if (newStep) {
      const heading =
        newStep.querySelector<HTMLElement>(
          "h2, h3, h4",
        );

      heading?.focus();
    }
  }

  private validateCurrentStep(): boolean {
    const steps =
      this._root.querySelectorAll<HTMLElement>(
        ".tax-form__step",
      );

    const currentStep =
      steps[this._stepper.activeStep];

    if (!currentStep) {
      return false;
    }

    const controls =
      currentStep.querySelectorAll<
        HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
      >(
        "input, select, textarea",
      );

    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return false;
      }
    }

    return true;
  }
}

export { TaxFormNavigation };