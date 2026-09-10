import type { CostConfiguration, CostItem, CostType } from "../types.js";

export class TaxFormCosts {
  private _costItems: Record<CostType, CostItem[]> = {
    equipment: [],
    training: [],
    other: [],
  };

  constructor(private readonly _root: HTMLElement) {}

  setup(): void {
    const configurations: CostConfiguration[] = [
      {
        type: "equipment",
        addAction: "add-equipment",
        nameId: "work-equipment-name",
        amountId: "work-equipment-amount",
        listAttribute: "data-equipment-list",
        totalAttribute: "data-equipment-total",
      },
      {
        type: "training",
        addAction: "add-training",
        nameId: "training-name",
        amountId: "training-amount",
        listAttribute: "data-training-list",
        totalAttribute: "data-training-total",
      },
      {
        type: "other",
        addAction: "add-other",
        nameId: "other-costs-name",
        amountId: "other-costs-amount",
        listAttribute: "data-other-list",
        totalAttribute: "data-other-total",
      },
    ];

    for (const configuration of configurations) {
      this.setupCostType(configuration);
    }
  }

  getTotal(type: CostType): number {
    return this._costItems[type].reduce(
      (total, item) => total + item.amount,
      0,
    );
  }

  getAllTotals(): Record<CostType, number> {
    return {
      equipment: this.getTotal("equipment"),
      training: this.getTotal("training"),
      other: this.getTotal("other"),
    };
  }

  private setupCostType(configuration: CostConfiguration): void {
    const button = this._root.querySelector<HTMLButtonElement>(
      `[data-action="${configuration.addAction}"]`,
    );

    const nameInput = this._root.querySelector<HTMLInputElement>(
      `#${configuration.nameId}`,
    );

    const amountInput = this._root.querySelector<HTMLInputElement>(
      `#${configuration.amountId}`,
    );

    if (!button || !nameInput || !amountInput) {
      throw new Error("Tax form cost fields are missing.");
    }

    button.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const amount = Number.parseFloat(amountInput.value);

      if (!name || !Number.isFinite(amount) || amount < 0) {
        return;
      }

      this._costItems[configuration.type].push({
        name,
        amount,
      });

      nameInput.value = "";
      amountInput.value = "";

      this.renderCostList(configuration);
      nameInput.focus();
    });
  }

  private renderCostList(configuration: CostConfiguration): void {
    const list = this._root.querySelector<HTMLElement>(
      `[${configuration.listAttribute}]`,
    );

    const total = this._root.querySelector<HTMLElement>(
      `[${configuration.totalAttribute}]`,
    );

    if (!list || !total) {
      throw new Error("Tax form cost list is missing.");
    }

    list.replaceChildren();

    const items = this._costItems[configuration.type];

    for (const [index, item] of items.entries()) {
      const listItem = document.createElement("li");

      const name = document.createElement("span");
      name.textContent = item.name;

      const amount = document.createElement("span");
      amount.textContent = this.formatCurrency(item.amount);

      const removeButton = document.createElement("button");

      removeButton.type = "button";
      removeButton.textContent = "Entfernen";
      removeButton.setAttribute("aria-label", `${item.name} entfernen`);

      removeButton.addEventListener("click", () => {
        const removedIndex = index;

        items.splice(removedIndex, 1);

        this.renderCostList(configuration);

        const remainingItems = items.length;

        if (remainingItems === 0) {
          const addButton = this._root.querySelector<HTMLButtonElement>(
            `[data-action="${configuration.addAction}"]`,
          );

          addButton?.focus();
          return;
        }

        const focusIndex = Math.min(removedIndex, remainingItems - 1);

        const focusItem =
          list.querySelectorAll<HTMLLIElement>("li")[focusIndex];

        const focusButton =
          focusItem?.querySelector<HTMLButtonElement>("button");

        focusButton?.focus();
      });

      listItem.append(name, amount, removeButton);

      list.append(listItem);
    }

    total.textContent = `Summe: ${this.formatCurrency(
      this.getTotal(configuration.type),
    )}`;
  }

  private formatCurrency(amount: number): string {
    return `${amount.toFixed(2).replace(".", ",")} €`;
  }
}
