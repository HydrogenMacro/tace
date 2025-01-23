[![NPM tac Package](https://img.shields.io/npm/v/tac)](https://www.npmjs.com/package/tac)

# Templates As Custom Elements (TACE)
TACE allows you to create reusable components in the form of custom elements easily and directly in your HTML file. 

## Why?
If you've ever used a framework that integrates directly into your HTML, like [AlpineJS](https://alpinejs.dev), [HTMX](https://htmx.org), [Hyperscript](https://hyperscript.org), or [Tailwind CSS](https://tailwindcss.com), you might've wanted reuse complex HTML structures as components, similar to other conventional frameworks. Well, TACE allows you to do so, adding reusability as well as configurability to your markup.


## Installation
```html
<script defer src="https://cdn.jsdelivr.net/npm/@hydrogenmacro/tace"></script>
```
> [!IMPORTANT]
> Make sure that it is deferred and that it sits above any other script tags

## Examples
**Basic**
```html
<!-- Instead of this: -->
<button class="w-20 h-6 rounded-full bg-gray-400">
	Action 1
</button>
<button class="w-20 h-6 rounded-full bg-gray-400">
	Action 2
</button>

<!-- You can do this: -->

<!-- Wrap the component in a template element with a `component-name` attribute -->
<!-- Note that it has to follow the custom element naming rules, so it must have a dash in it. See https://webcomponents.guide/learn/components/naming-your-components/ for some tips on how to do so. -->
<template component-name="text-button">
	<button class="w-20 h-6 rounded-full bg-gray-400">
		<!-- the slot element is replaced with the children of the component -->
		<slot></slot>
	</button>
</template>
<!-- and now, reusing your component is easy! -->
<text-button>Action 1</text-button>
<text-button>Action 2</text-button>
```
**Advanced**
```html
<!-- Instead of this: -->

<dialog class="customizable-dialog">
	<h2 class="customizable-dialog--title">
		Dialog 1 Title
	</h2>
	<div class="customizable-dialog--contents">
		<p>Dialog 1 Contents</p>
		<img src="...">
	</div>
</dialog>

<dialog class="customizable-dialog">
	<h2 class="customizable-dialog--title">
		Dialog 2 Title
	</h2>
	<div class="customizable-dialog--contents">
		<p>Dialog 2 Contents</p>
		<canvas></canvas>
	</div>
</dialog>


<!-- You can do this with... -->

<!-- a. native named slot elements -->
<!-- see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots for more information -->
<template component-name="customizable-dialog">
	<dialog class="customizable-dialog">
		<h2 class="customizable-dialog--title"><slot name="dialog-title"></slot></h2>
		<div class="customizable-dialog--contents">
			<slot name="dialog-contents"></slot>
		</div>
	</dialog>
</template>

<customizable-dialog>
	<span slot="dialog-title">
		Dialog 1 Title
	</span>
	<!-- Multi-element slot contents might need a wrapper div that has `display: contents` -->
	<div slot="dialog-contents" style="display: contents;">
		<p>Dialog 1 Contents</p>
		<img src="...">
	</div>
</customizable-dialog>

<customizable-dialog>
	<span slot="dialog-title">
		Dialog 2 Title
	</span>
	<div slot="dialog-contents" style="display: contents;">
		<p>Dialog 2 Contents</p>
		<canvas></canvas>
	</div>
</customizable-dialog>

<!-- b. with attributes + unnamed slot -->
<!-- this uses Alpine.js -->

<template component-name="customizable-dialog">
	<!-- attributes on the component custom element get passed down to the first element of the template, see below at <customizable-dialog> -->
	<dialog class="customizable-dialog" x-data="{
		dialogTitle: () => $el.getAttribute('title') ?? 'No title specified'
	}">
		<h2 class="customizable-dialog--title" x-text="dialogTitle()"></h2>
		<div class="customizable-dialog--text">
			<slot></slot>
		</div>
	</dialog>
</template>

<!-- 
	The `title` attribute below gets passed down to the dialog element,
	which turns the below into into:
	<dialog title="Dialog 1 Title" class="..." x-data="...">
		...
	</dialog>
-->
<customizable-dialog title="Dialog 1 Title">
	<p>Dialog 1 Contents</p>
	<img src="...">
</customizable-dialog>

<customizable-dialog title="Dialog 2 Title">
	<p>Dialog 2 Contents</p>
	<canvas></canvas>
</customizable-dialog>
```

See the `examples` directory for more that are tailored to specific frameworks.

## Docs

TODO
