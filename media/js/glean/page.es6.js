/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import * as pageMetrics from '../libs/glean/page.js';
import Utils from './utils.es6';
import { pageView as pageViewPing } from '../libs/glean/pings.js';

const validParams = [
    'utm_source',
    'utm_campaign',
    'utm_medium',
    'utm_content',
    'entrypoint_experiment',
    'entrypoint_variation',
    'experiment',
    'variation',
    'v',
    'xv'
];

function initPageView() {
    pageMetrics.viewed.set();
    pageMetrics.path.set(Utils.getPathFromUrl());
    pageMetrics.locale.set(Utils.getLocaleFromUrl());
    pageMetrics.referrer.set(Utils.getReferrer());

    const params = Utils.getQueryParamsFromURL();

    if (params) {
        // validate only known & trusted query params
        // for inclusion in Glean metrics.
        for (const param in validParams) {
            const allowedChars = /^[\w/.%-]+$/;
            const p = validParams[param];
            let v = params.get(p);

            if (v) {
                v = decodeURIComponent(v);
                if (allowedChars.test(v)) {
                    pageMetrics.queryParams[p].set(v);
                }
            }
        }
    }

    pageViewPing.submit();
}

export { initPageView };
