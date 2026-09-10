import type { CostType } from "../types.js";

import { TaxFormCosts } from "./tax-form-costs.js";

class TaxFormSummary {
  constructor(
    private readonly _root: HTMLElement,
    private readonly _costs: TaxFormCosts,
  ) {}

  update(): void {
    const firstName = this._root.querySelector<HTMLInputElement>("#first-name");

    const lastName = this._root.querySelector<HTMLInputElement>("#last-name");

    const birthDate = this._root.querySelector<HTMLInputElement>("#birth-date");

    const maritalStatus = this._root.querySelector<HTMLInputElement>(
      'input[name="marital-status"]:checked',
    );

    const employmentType = this._root.querySelector<HTMLInputElement>(
      'input[name="employment-type"]:checked',
    );

    const workDays = this._root.querySelector<HTMLInputElement>("#work-days");

    const commuteDistance =
      this._root.querySelector<HTMLInputElement>("#commute-distance");

    const homeofficeDays =
      this._root.querySelector<HTMLInputElement>("#homeoffice-days");

    this.setValue("first-name", firstName?.value || "–");

    this.setValue("last-name", lastName?.value || "–");

    this.setValue("birth-date", birthDate?.value || "–");

    this.setValue(
      "marital-status",
      this.getMaritalStatusLabel(maritalStatus?.value),
    );

    this.setValue(
      "employment-type",
      this.getEmploymentTypeLabel(employmentType?.value),
    );

    this.setValue(
      "work-days",
      workDays?.value ? `${workDays.value} Tage` : "–",
    );

    this.setValue(
      "commute-distance",
      commuteDistance?.value ? `${commuteDistance.value} km` : "–",
    );

    this.setValue(
      "homeoffice-days",
      homeofficeDays?.value ? `${homeofficeDays.value} Tage` : "–",
    );

    const totals = this._costs.getAllTotals();

    this.setCostSummary("equipment", totals.equipment);

    this.setCostSummary("training", totals.training);

    this.setCostSummary("other", totals.other);

    const workDaysValue = Number(workDays?.value) || 0;

    const commuteDistanceValue = Number(commuteDistance?.value) || 0;

    const homeofficeDaysValue = Number(homeofficeDays?.value) || 0;

    // The form collects weekly values.
    // For this demo, calculations use 46 working weeks per year.
    const annualWorkDays = workDaysValue * 46;

    const annualHomeofficeDays = homeofficeDaysValue * 46;

    const annualCommuteDays = Math.max(
      0,
      annualWorkDays - annualHomeofficeDays,
    );

    const commuteAllowance = annualCommuteDays * commuteDistanceValue * 0.38;

    const homeofficeAllowance = Math.min(annualHomeofficeDays * 6, 1260);

    this.setValue("commute-total", this.formatCurrency(commuteAllowance));

    this.setValue("homeoffice-total", this.formatCurrency(homeofficeAllowance));

    const totalCosts = this.getTotalCosts(
      totals,
      commuteAllowance,
      homeofficeAllowance,
    );

    this.setValue("total-costs", this.formatCurrency(totalCosts));
  }

  private setCostSummary(type: CostType, amount: number): void {
    this.setValue(`${type}-total`, this.formatCurrency(amount));
  }

  private getTotalCosts(
    totals: Record<CostType, number>,
    commuteAllowance: number,
    homeofficeAllowance: number,
  ): number {
    return (
      totals.equipment +
      totals.training +
      totals.other +
      commuteAllowance +
      homeofficeAllowance
    );
  }

  private setValue(key: string, value: string): void {
    const element = this._root.querySelector<HTMLElement>(
      `[data-summary="${key}"]`,
    );

    if (!element) {
      throw new Error(`Summary element "${key}" is missing.`);
    }

    element.textContent = value;
  }

  private formatCurrency(amount: number): string {
    return `${amount.toFixed(2).replace(".", ",")} €`;
  }

  private getMaritalStatusLabel(value: string | undefined): string {
    switch (value) {
      case "single":
        return "Ledig";

      case "married":
        return "Verheiratet";

      case "divorced":
        return "Geschieden";

      case "widowed":
        return "Verwitwet";

      default:
        return "–";
    }
  }

  private getEmploymentTypeLabel(value: string | undefined): string {
    switch (value) {
      case "employee":
        return "Angestellt";

      case "self-employed":
        return "Selbstständig";

      default:
        return "–";
    }
  }
}

export { TaxFormSummary };
