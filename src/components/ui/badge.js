/**
 * FLASHWEAR COMPONENT ARCHITECTURE — BADGE FACTORY
 * Standardized status and archival metadata badges.
 */

import { escapeHTML } from '../../utils/dom.js';

/**
 * Render badge markup adhering to Lightning Strike visual rules.
 * @param {Object} props
 * @param {'strike'|'edition'|'amber'|'soldout'} [props.type='edition']
 * @param {string} props.text
 * @param {string} [props.className='']
 * @returns {string} HTML string
 */
export function createBadgeMarkup({ type = 'edition', text = '', className = '' }) {
  const typeClass = `badge-${type}`;
  const pulseDot = type === 'strike' ? '<span class="pulse-dot" aria-hidden="true"></span>' : '';
  const classes = ['badge', typeClass, className].filter(Boolean).join(' ');

  return `<span class="${classes}">${pulseDot}${escapeHTML(text)}</span>`;
}
