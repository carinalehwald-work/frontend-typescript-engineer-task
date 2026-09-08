class ServiceTabs extends HTMLElement {
  private initialized = false;
  private activeIndex = 0;
  private mediaQuery = window.matchMedia("(min-width: 800px)");
  private tabList: HTMLDivElement | null = null;
  private static instanceCount = 0;
  private instanceId = `service-tabs-${ServiceTabs.instanceCount++}`;

  private entries: {
    panel: Element;
    button: HTMLButtonElement;
    item: HTMLDivElement;
  }[] = [];

  private handleMediaQueryChange = (): void => {
    this.updateMode();
  };

  private applyMode(isDesktop: boolean): void {
    const tabList = this.tabList;

    if (!tabList) {
      return;
    }

    if (isDesktop && this.entries.length > 0) {
      tabList.setAttribute("role", "tablist");
      if (tabList.parentElement !== this) {
        this.insertBefore(tabList, this.firstElementChild);
      }
    } else {
      tabList.removeAttribute("role");
      if (tabList.parentElement === this) {
        tabList.remove();
      }
    }
  }

  private updateMode(): void {
    const isDesktop = this.mediaQuery.matches;

    if (isDesktop && this.activeIndex === -1) {
      this.activeIndex = 0;
    }

    this.applyMode(isDesktop);

    const tabList = this.tabList;

    if (!tabList) {
      return;
    }

    this.entries.forEach(({ button, panel, item }, index) => {
      const isActive = index === this.activeIndex;

      // Navigation
      if (isDesktop) {
        if (button.parentElement !== tabList) {
          tabList.appendChild(button);
        }

        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("tabindex", isActive ? "0" : "-1");
        button.removeAttribute("aria-expanded");
      } else {
        if (button.parentElement !== item) {
          item.insertBefore(button, panel);
        }

        button.removeAttribute("role");
        button.setAttribute("aria-expanded", String(isActive));
        button.removeAttribute("aria-selected");
        button.removeAttribute("tabindex");
      }

      // Panel
      if (isDesktop) {
        panel.setAttribute("role", "tabpanel");
      } else {
        panel.removeAttribute("role");
      }

      panel.toggleAttribute("hidden", !isActive);
    });
  }

  disconnectedCallback(): void {
    this.mediaQuery.removeEventListener("change", this.handleMediaQueryChange);
  }

  connectedCallback(): void {
    this.mediaQuery.addEventListener("change", this.handleMediaQueryChange);

    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.tabList = document.createElement("div");

    const panels = Array.from(this.children)
      .map((panel) => ({
        panel,
        title: panel.getAttribute("data-title"),
      }))
      .filter(
        (entry): entry is { panel: Element; title: string } =>
          entry.title !== null && entry.title.trim() !== "",
      );

    panels.forEach(({ panel, title }, index) => {
      const button = document.createElement("button");
      const item = document.createElement("div");
      item.className = "service-item";
      panel.classList.add("service-panel");

      button.type = "button";
      const titleElement = document.createElement("span");
      titleElement.textContent = title;
      button.appendChild(titleElement);

      const panelId = `${this.instanceId}-panel-${index}`;
      const buttonId = `${this.instanceId}-tab-${index}`;

      const resolvedPanelId = panel.id || panelId;
      panel.id = resolvedPanelId;
      button.id = buttonId;

      button.setAttribute("aria-controls", resolvedPanelId);
      panel.setAttribute("aria-labelledby", buttonId);

      item.appendChild(button);
      item.appendChild(panel);
      this.entries.push({
        panel,
        button,
        item,
      });

      button.addEventListener("click", () => {
        if (this.mediaQuery.matches) {
          this.activeIndex = index;
        } else {
          this.activeIndex = this.activeIndex === index ? -1 : index;
        }

        this.updateMode();
      });

      button.addEventListener("keydown", (event) => {
        if (!this.mediaQuery.matches && event.key === "ArrowDown") {
          this.moveBy(index, 1, event, { activate: false });
        }

        if (!this.mediaQuery.matches && event.key === "ArrowUp") {
          this.moveBy(index, -1, event, { activate: false });
        }

        if (this.mediaQuery.matches && event.key === "ArrowRight") {
          this.moveBy(index, 1, event);
        }

        if (this.mediaQuery.matches && event.key === "ArrowLeft") {
          this.moveBy(index, -1, event);
        }
      });

      this.appendChild(item);
    });
    this.updateMode();
  }

  private moveTo(index: number, event: KeyboardEvent, activate = true): void {
    const entry = this.entries[index];

    if (!entry) {
      return;
    }

    event.preventDefault();

    if (activate) {
      this.activeIndex = index;
      this.updateMode();
    }

    entry.button.focus();
  }
  private moveBy(
    currentIndex: number,
    offset: number,
    event: KeyboardEvent,
    options: { activate: boolean } = { activate: true },
  ): void {
    this.moveTo(currentIndex + offset, event, options.activate);
  }
}
customElements.define("service-tabs", ServiceTabs);
