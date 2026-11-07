# Managed Redis

Managed Redis is a Web-only capability and requires `features.server: true`. Capability
declaration defaults and enablement rules are in [features](features.md). Each project gets one
isolated instance and works with both `on_demand` and `always_on` hosting. Use it for disposable
caches or reconstructible state; keep durable records in the [database](database.md).

## Cost and data loss

The Cloud balance of the account that owns the project, personal or team, pays USD 0.75 for each
UTC month at whose end the instance is still on, plus daily usage: USD 0.30 per 100,000 commands, USD 0.045 per GB of bandwidth and
USD 0.375 per GB-month of storage. Every command is billed, so avoid polling loops and other Redis
traffic the application does not need.

Charges draw on the free Cloud allowance first, then the paid balance; Agent credits are not used.
If both run out, the platform deletes the instance and its data; a recharge creates an empty
instance. Duplicating the project creates a new, empty instance billed separately; data and
credentials are not copied. Deleting the project deletes the instance; restoring the project creates
a new, empty one.

Explain these costs and data-loss rules to the user before enabling Redis.

## Connection

Read `REDIS_URL` from the server process environment. `REDIS_REST_URL` and `REDIS_REST_TOKEN`
are also present for the Upstash-compatible REST API, for example through `@upstash/redis`. Never
print these values, copy them into code, commit them or expose them to the browser. `MANUS_REDIS_GENERATION` changes when the platform
recreates the instance and contains no credential. Managed Redis owns these four names; a
user-supplied Redis without this capability uses
[secrets](secrets.md#names-that-interact-with-platform-supply).

Set connect and command timeouts of a few seconds on the Redis client and fail the affected
request instead of waiting. A deleted or replaced instance can leave a running process holding a
dead connection until it receives new credentials.

## Provisioning and recovery

Enabling Redis waits a bounded time for provisioning; payment is asynchronous. A timeout or
provisioning failure leaves Redis pending for background recovery and does not fail project creation.
While Redis is pending or suspended, development environment reads return the other platform
values without Redis credentials. `GET config` reports the current `redis.status` and, when Redis
is not usable, the platform `reason`. Publishing requires ready Redis. Report Redis as usable only
after a connection succeeds. A `features.redis` field error with `invalid_value` means this project
cannot currently enable managed Redis; correct the project configuration or wait for platform
availability rather than repeating the same request.

Initialization and configuration changes load the available Redis environment;
`runtime_sync: applied` confirms that loading, not Redis readiness. If Redis is still pending or is
rebuilt after a recharge, read config again to refresh the attached working copy, then restart
existing development processes.

After recovery the platform refreshes the original published service. Do not create a replacement
project.

## Turning Redis off

Turn Redis off only when the user asks, for example to stop its charges. Before writing anything,
tell the user that the instance and all its data are deleted immediately and usage up to deletion
is still billed; turned off before the month ends, it avoids that month's fee. Proceed after they
confirm.

Turning it off does not change the application, so first change the code to stop using Redis
without breaking the features that relied on it, verify the result, and publish that version if
the site is published. Then write `features.redis: false`. The Redis variables disappear from
refreshed environments; restart development processes that still hold them. Turning Redis on
again creates an empty instance.
