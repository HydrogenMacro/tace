for (const template of document.getElementsByTagName("template")) {
	let componentName =
		template.getAttribute("component-name") ||
		template.dataset.componentName;
	if (!componentName) continue;
	if (customElements.get(componentName)) {
		console.error(
			`TACE Error: A custom element named "${componentName} has already been defined."`
		);
		continue;
	}
	let useShadowRootAttrVal =
		template.getAttribute("use-shadow-root") ||
		template.dataset.useShadowRoot;
	let useShadowRoot =
		useShadowRootAttrVal &&
		(useShadowRootAttrVal !== "false" || useShadowRootAttrVal !== "0");
	customElements.define(
		componentName,
		class extends HTMLElement {
			constructor() {
				super();
				if (useShadowRoot) {
					const shadowRoot = this.attachShadow({ open: "true "});
					shadowRoot.appendChild(template.content.cloneNode(true));
				} else {
					let templateContent = template.content.cloneNode(true);
					templateContent.querySelector("slot")?.replaceWith(...this.childNodes);
					this.appendChild(templateContent);
				}
			}
		}
	);
}
