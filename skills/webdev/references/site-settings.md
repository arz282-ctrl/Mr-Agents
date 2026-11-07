# Platform analytics and Manus badge

Use `PUT <config-plane>/config/analytics` with `{"analytics":{"enabled":false}}` to stop platform
Umami and Plausible injection, or `true` to enable it. Existing reports and application-authored
trackers are unchanged.

Use `PUT <config-plane>/config/branding` with `{"branding":{"hideManusBadge":true}}` to hide the
Manus badge and its scripts (including badge analytics), or `false` to show it. This shares the
Dashboard setting and its existing membership rules. To stop both site and badge analytics,
disable site analytics and hide the badge.
Other platform or CDN analytics may remain; do not report that all tracking has stopped.

Save these Web settings separately from other config domains. They apply to newly loaded
published pages within about 60 seconds without republishing. Read `GET <config-plane>/config`
after saving and verify the published page; Dashboard changes appear there too.
