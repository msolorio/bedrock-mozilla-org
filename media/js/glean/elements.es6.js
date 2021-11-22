/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
    interaction as interactionPing,
    nonInteraction as nonInteractionPing
} from '../libs/glean/pings.js';
import * as elementMetrics from '../libs/glean/element.js';

function setElementMetrics(obj) {
    if (typeof obj.type === 'string') {
        elementMetrics.type.set(obj.type);
    }

    if (typeof obj.position === 'string') {
        elementMetrics.position.set(obj.position);
    }

    elementMetrics.label.set(obj.label);
}

function interaction(obj) {
    if (typeof obj !== 'object' && typeof obj.label !== 'string') {
        return;
    }
    setElementMetrics(obj);
    interactionPing.submit();
}

function nonInteraction(obj) {
    if (typeof obj !== 'object' && typeof obj.label !== 'string') {
        return;
    }
    setElementMetrics(obj);
    nonInteractionPing.submit();
}

function pingElementClicks(e) {
    const el = e.target;

    // Check all link and button elements for data attributes.
    if (el.nodeName === 'A' || el.nodeName === 'BUTTON') {
        const ctaText = el.getAttribute('data-cta-text');
        const linkName = el.getAttribute('data-link-name');
        const linkType = el.getAttribute('data-link-type');

        // CTA link clicks
        if (ctaText) {
            const type = el.getAttribute('data-cta-type');
            const position = el.getAttribute('data-cta-position');
            interaction({
                label: ctaText,
                type: type,
                position: position
            });
            return;
        }

        // Firefox Download link clicks
        if (linkType && linkType === 'download') {
            const os = el.getAttribute('data-download-os');
            const name = el.getAttribute('data-display-name');
            const position = el.getAttribute('data-download-location');

            if (os) {
                const label = `Firefox Download ${os}`;
                interaction({
                    label: label,
                    type: name,
                    position: position
                });
                return;
            }
        }

        // Older format links
        if (linkName) {
            const position = el.getAttribute('data-link-position');
            interaction({
                label: linkName,
                type: linkType,
                position: position
            });
            return;
        }
    }
}

function bindElementClicks() {
    document
        .querySelector('body')
        .addEventListener('click', pingElementClicks, false);
}

function unbindElementClicks() {
    document
        .querySelector('body')
        .removeEventListener('click', pingElementClicks, false);
}

export { interaction, nonInteraction, bindElementClicks, unbindElementClicks };
