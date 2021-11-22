/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Glean from '@mozilla/glean/web';

import { initPageView } from './page.es6';
import { ping, bindElementClicks } from './elements.es6';

// TODO add opt-out check.
function isTelemetryEnabled() {
    return true;
}

// eslint-disable-next-line no-undef
if (process.env.GLEAN_DEBUG === 'True') {
    Glean.setLogPings(true); // automatically console.log() pings.
    Glean.setDebugViewTag('moz-bedrock'); // https://debug-ping-preview.firebaseapp.com/
}

// Ensure telemetry coming from automated testing is tagged
// https://mozilla.github.io/glean/book/reference/debug/sourceTags.html
if (window.location.href.indexOf('automation=true') !== -1) {
    Glean.setSourceTags(['automation']);
}

Glean.initialize('moz-bedrock', isTelemetryEnabled());

// Initialize page view.
initPageView();

// Bind pings for page element clicks.
bindElementClicks();

// Create a global for individual pages to fire interaction pings.
if (typeof window.Mozilla === 'undefined') {
    window.Mozilla = {};
}
window.Mozilla.Glean = {
    ping: ping
};
