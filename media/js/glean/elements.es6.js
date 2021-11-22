/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { interaction as interactionPing } from '../libs/glean/pings.js';
import * as elementMetrics from '../libs/glean/element.js';

function ping(label, type, position) {
    if (type) {
        elementMetrics.type.set(type);
    }

    if (position) {
        elementMetrics.position.set(position);
    }

    elementMetrics.label.set(label);
    interactionPing.submit();
}

function pingElementClicks(e) {
    const el = e.target;

    if (el.classList.contains('mzp-c-button')) {
        const ctaText = el.getAttribute('data-cta-text');
        const linkName = el.getAttribute('data-link-name');
        const linkType = el.getAttribute('data-link-type');

        // CTA link clicks
        if (ctaText) {
            const type = el.getAttribute('data-cta-type');
            const position = el.getAttribute('data-cta-position');
            ping(ctaText, type, position);
            return;
        }

        // Firefox Download link clicks
        if (linkType && linkType === 'download') {
            const os = el.getAttribute('data-download-os');
            const name = el.getAttribute('data-display-name');
            const position = el.getAttribute('data-download-location');

            if (os) {
                const label = `Firefox Download ${os}`;
                ping(label, name, position);
                return;
            }
        }

        // Older format links
        if (linkName) {
            const position = el.getAttribute('data-link-position');
            ping(linkName, linkType, position);
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

export { ping, bindElementClicks, unbindElementClicks };
