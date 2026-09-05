class ServiceTabs extends HTMLElement{
    connectedCallback(): void {
        console.log("ServiceTabs connected");
    }
}
customElements.define("service-tabs", ServiceTabs);