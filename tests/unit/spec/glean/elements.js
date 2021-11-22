/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* For reference read the Jasmine and Sinon docs
 * Jasmine docs: https://jasmine.github.io/
 * Sinon docs: http://sinonjs.org/docs/
 */

import { testResetGlean } from '@mozilla/glean/testing';
import {
    ping as directPing,
    bindElementClicks,
    unbindElementClicks
} from '../../../../media/js/glean/elements.es6';
import * as elementMetrics from '../../../../media/js/libs/glean/element.js';
import { interaction as interactionPing } from '../../../../media/js/libs/glean/pings.js';

describe('elements.js', function () {
    beforeEach(async function () {
        await testResetGlean('moz-bedrock-test');
        bindElementClicks();
    });

    afterEach(function () {
        unbindElementClicks();
    });

    describe('Element click (data-cta)', function () {
        beforeEach(async function () {
            const link =
                '<button type="button" class="mzp-c-button glean-test-element" data-cta-text="Subscribe" data-cta-type="button" data-cta-position="primary">Subscribe</button>';
            document.body.insertAdjacentHTML('beforeend', link);
        });

        afterEach(function () {
            document
                .querySelectorAll('.glean-test-element')
                .forEach(function (e) {
                    e.parentNode.removeChild(e);
                });
        });

        it('should send an interaction ping when element is clicked containing data-cta attributes', async function () {
            let validatorRun = false;
            const ping = interactionPing.testBeforeNextSubmit(
                async function () {
                    const label = await elementMetrics.label.testGetValue();
                    const type = await elementMetrics.type.testGetValue();
                    const position =
                        await elementMetrics.position.testGetValue();
                    expect(label).toEqual('Subscribe');
                    expect(type).toEqual('button');
                    expect(position).toEqual('primary');
                    validatorRun = true;
                }
            );

            document.querySelector('.glean-test-element').click();

            // Wait for the validation to finish.
            await ping;

            expect(validatorRun).toBeTrue();
        });
    });

    describe('Element click (data-link)', function () {
        beforeEach(async function () {
            const link =
                '<button type="button" class="mzp-c-button glean-test-element" data-link-name="Submit" data-link-type="button" data-link-position="primary">Submit</button>';
            document.body.insertAdjacentHTML('beforeend', link);
        });

        afterEach(function () {
            document
                .querySelectorAll('.glean-test-element')
                .forEach(function (e) {
                    e.parentNode.removeChild(e);
                });
        });

        it('should send an interaction ping when element is clicked containing data-link attributes', async function () {
            let validatorRun = false;
            const ping = interactionPing.testBeforeNextSubmit(
                async function () {
                    const label = await elementMetrics.label.testGetValue();
                    const type = await elementMetrics.type.testGetValue();
                    const position =
                        await elementMetrics.position.testGetValue();
                    expect(label).toEqual('Submit');
                    expect(type).toEqual('button');
                    expect(position).toEqual('primary');
                    validatorRun = true;
                }
            );

            document.querySelector('.glean-test-element').click();

            // Wait for the validation to finish.
            await ping;

            expect(validatorRun).toBeTrue();
        });
    });

    describe('Firefox download click (release)', function () {
        beforeEach(async function () {
            const link =
                '<button type="button" class="mzp-c-button glean-test-element" data-link-type="download" data-download-os="Desktop" data-display-name="macOS" data-download-version="osx" data-download-location="primary">Submit</button>';
            document.body.insertAdjacentHTML('beforeend', link);
        });

        afterEach(function () {
            document
                .querySelectorAll('.glean-test-element')
                .forEach(function (e) {
                    e.parentNode.removeChild(e);
                });
        });

        it('should send an interaction ping when element is clicked containing data-link attributes', async function () {
            let validatorRun = false;
            const ping = interactionPing.testBeforeNextSubmit(
                async function () {
                    const label = await elementMetrics.label.testGetValue();
                    const type = await elementMetrics.type.testGetValue();
                    const position =
                        await elementMetrics.position.testGetValue();
                    expect(label).toEqual('Firefox Download Desktop');
                    expect(type).toEqual('macOS');
                    expect(position).toEqual('primary');
                    validatorRun = true;
                }
            );

            document.querySelector('.glean-test-element').click();

            // Wait for the validation to finish.
            await ping;

            expect(validatorRun).toBeTrue();
        });
    });

    describe('direct ping', function () {
        it('should send an interaction ping when ping function is called directly', async function () {
            let validatorRun = false;
            const ping = interactionPing.testBeforeNextSubmit(
                async function () {
                    const label = await elementMetrics.label.testGetValue();
                    const type = await elementMetrics.type.testGetValue();
                    const position =
                        await elementMetrics.position.testGetValue();
                    expect(label).toEqual('Newsletter Submit');
                    expect(type).toEqual('button');
                    expect(position).toEqual('secondary');
                    validatorRun = true;
                }
            );

            directPing('Newsletter Submit', 'button', 'secondary');

            // Wait for the validation to finish.
            await ping;

            expect(validatorRun).toBeTrue();
        });
    });
});
