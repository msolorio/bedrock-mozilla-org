# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.

from bedrock.mozorg.util import page

urlpatterns = (
    page(
        "about/",
        "pocket/about.html",
        url_name="pocket.about",
        ftl_files=["pocket/about"],
    ),
    page(
        "add/",
        "pocket/add.html",
        url_name="pocket.add",
    ),
    page(
        "android/",
        "pocket/android.html",
        url_name="pocket.android",
    ),
    page(
        "ios/",
        "pocket/ios.html",
        url_name="pocket.ios",
    ),
    page(
        "chrome/",
        "pocket/chrome.html",
        url_name="pocket.chrome",
    ),
    page(
        "safari/",
        "pocket/safari.html",
        url_name="pocket.safari",
    ),
    page(
        "opera/",
        "pocket/opera.html",
        url_name="pocket.opera",
    ),
    page(
        "edge/",
        "pocket/edge.html",
        url_name="pocket.edge",
    ),
    page(
        "welcome/",
        "pocket/welcome.html",
        url_name="pocket.welcome",
    ),
    page(
        "contact-info/",
        "pocket/contact-info.html",
        url_name="pocket.contact-info",
    ),
    page(
        "firefox/new_tab_learn_more/",
        "pocket/firefox/new-tab-learn-more.html",
        url_name="pocket.firefox-new-tab-learn-more",
    ),
    page(
        "pocket-and-firefox/",
        "pocket/pocket-and-firefox.html",
        url_name="pocket.pocket-and-firefox",
    ),
    page(
        "get-inspired/",
        "pocket/get-inspired.html",
        url_name="pocket.get-inspired",
    ),
    page(
        "jobs/",
        "pocket/jobs.html",
        url_name="pocket.jobs",
    ),
    page(
        "privacy/",
        "pocket/privacy.html",
        url_name="pocket.privacy",
    ),
    page(
        "tos/",
        "pocket/tos.html",
        url_name="pocket.tos",
    ),
    page(
        "save-to-pocket/",
        "pocket/save-to-pocket.html",
        url_name="pocket.save-to-pocket",
    ),
)
