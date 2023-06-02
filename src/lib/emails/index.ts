import mjml2html from 'mjml';
import { convert } from 'html-to-text';
import pretty from 'pretty';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

export const render = <Component extends SvelteComponent>({
	template,
	props,
	options
}: {
	template: ComponentType<Component>;
	props?: ComponentProps<Component>;
	options?: {
		plainText?: boolean;
		pretty?: boolean;
	};
}) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { html } = template.render(props);

	if (options?.plainText) {
		return renderAsPlainText(html);
	}

	const value = mjml2html(html);
	if (value.errors.length > 0) console.warn(value.errors);

	if (options?.pretty) {
		return pretty(value.html);
	}

	return value.html;
};

const renderAsPlainText = (markup: string) => {
	return convert(markup, {
		selectors: [
			{ selector: 'img', format: 'skip' },
			{ selector: '#__svelte-email-preview', format: 'skip' }
		]
	});
};
