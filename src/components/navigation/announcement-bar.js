/**
 * FLASHWEAR COMPONENT — ANNOUNCEMENT BAR
 * Creative Direction: LIGHTNING STRIKE
 * 
 * Positioned at the top of the viewport. Features rotating archival announcements,
 * lightning status tag, accessible dismiss button, and LocalStorage persistence.
 */

import { navigationConfig } from '../../data/navigation.js';
import { storage } from '../../utils/storage.js';
import { eventBus } from '../../utils/events.js';
import { STORAGE_KEYS, EVENTS } from '../../utils/constants.js';
import { ICONS } from './icons.js';
import { escapeHTML } from '../../utils/dom.js';

export class AnnouncementBar {
  constructor(options = {}) {
    this.config = {
      ...navigationConfig.announcement,
      ...options
    };
    this.currentIndex = 0;
    this.timer = null;
    this.container = null;
    this.isDismissed = storage.get(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, false);
  }

  /**
   * Render and mount announcement bar into the target slot.
   * @param {HTMLElement} mountSlot
   */
  mount(mountSlot) {
    if (!mountSlot || !this.config.enabled || this.isDismissed) {
      if (mountSlot) mountSlot.innerHTML = '';
      return;
    }

    const messages = this.config.messages || [];
    if (!messages.length) return;

    this.container = document.createElement('div');
    this.container.id = 'fw-announcement-bar';
    this.container.className = 'fw-announcement-bar';
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Announcement');

    this._renderCurrentMessage();
    mountSlot.innerHTML = '';
    mountSlot.appendChild(this.container);

    this._setupEvents();
    this._startRotation();
  }

  _renderCurrentMessage() {
    if (!this.container) return;

    const messages = this.config.messages;
    const msg = messages[this.currentIndex] || messages[0];

    const tagHTML = msg.tag
      ? `<span class="fw-announcement-tag"><span class="pulse-dot" aria-hidden="true"></span>${escapeHTML(msg.tag)}</span>`
      : '';

    const contentHTML = msg.link
      ? `<a href="${escapeHTML(msg.link)}" class="fw-announcement-link">${tagHTML}<span class="fw-announcement-text">${escapeHTML(msg.text)}</span></a>`
      : `<div class="fw-announcement-content">${tagHTML}<span class="fw-announcement-text">${escapeHTML(msg.text)}</span></div>`;

    this.container.innerHTML = `
      <div class="fw-announcement-inner">
        <div class="fw-announcement-viewport" aria-live="polite">
          ${contentHTML}
        </div>
        <button type="button" class="fw-announcement-dismiss" aria-label="Dismiss announcement" title="Dismiss announcement">
          ${ICONS.close}
        </button>
      </div>
    `;
  }

  _setupEvents() {
    if (!this.container) return;

    // Dismiss button click handler
    const dismissBtn = this.container.querySelector('.fw-announcement-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => this.dismiss());
    }

    // Pause rotation on mouse hover or focus within
    this.container.addEventListener('mouseenter', () => this._stopRotation());
    this.container.addEventListener('mouseleave', () => this._startRotation());
    this.container.addEventListener('focusin', () => this._stopRotation());
    this.container.addEventListener('focusout', () => this._startRotation());
  }

  _startRotation() {
    if (this.config.messages.length <= 1) return;
    this._stopRotation();

    const interval = this.config.rotationIntervalMs || 6000;
    this.timer = setInterval(() => {
      this.next();
    }, interval);
  }

  _stopRotation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  next() {
    if (!this.config.messages.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.config.messages.length;
    this._renderCurrentMessage();
    this._setupEvents();
  }

  previous() {
    if (!this.config.messages.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.config.messages.length) % this.config.messages.length;
    this._renderCurrentMessage();
    this._setupEvents();
  }

  /**
   * Smoothly dismiss the announcement bar and persist state.
   */
  dismiss() {
    this._stopRotation();
    this.isDismissed = true;
    storage.set(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, true);

    if (this.container) {
      this.container.classList.add('is-dismissing');
      setTimeout(() => {
        if (this.container && this.container.parentElement) {
          this.container.parentElement.innerHTML = '';
        }
        eventBus.emit(EVENTS.ANNOUNCEMENT_DISMISSED, { dismissed: true });
      }, 250);
    }
  }

  /**
   * Reset dismissal state (for testing or user preference).
   */
  resetDismissal() {
    this.isDismissed = false;
    storage.remove(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED);
  }
}
