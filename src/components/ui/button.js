/**
 * FLASHWEAR COMPONENT ARCHITECTURE — BUTTON FACTORY
 * Standardized reusable button component contract.
 * Consumes design system classes from styles/components.css.
 */

import { escapeHTML } from '../../utils/dom.js';

/**
 * Render button HTML string adhering to component specifications.
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'|'icon'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} props.text
 * @param {string} [props.icon]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 * @param {string} [props.ariaLabel]
 * @param {string} [props.href]
 * @returns {string} HTML string
 */
export function createButtonMarkup({
  variant = 'primary',
  size = 'md',
  text = '',
  icon = '',
  disabled = false,
  className = '',
  ariaLabel = '',
  href = ''
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const classes = ['btn', variantClass, sizeClass, className].filter(Boolean).join(' ');
  const ariaAttr = ariaLabel ? `aria-label="${escapeHTML(ariaLabel)}"` : '';
  const disabledAttr = disabled ? 'disabled aria-disabled="true"' : '';
  const iconHTML = icon ? `<span class="btn-icon-slot" aria-hidden="true">${icon}</span>` : '';

  if (href && !disabled) {
    return `<a href="${escapeHTML(href)}" class="${classes}" ${ariaAttr}>${escapeHTML(text)}${iconHTML}</a>`;
  }

  return `<button type="button" class="${classes}" ${ariaAttr} ${disabledAttr}>${escapeHTML(text)}${iconHTML}</button>`;
}
