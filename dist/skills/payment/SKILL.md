---
name: payment
description: Handle checkout payments, Stripe Link wallet availability, user payment takeover, and coordinator-assisted addition or updating of payment methods while preserving explicit payment approval.
---


# Payment

Use current session context to determine `stripe_link_enabled`, `device_only_execution_enabled`, `long_sandbox_execution`, and `isCoordinatorSubtask`.

## Stripe Link enabled

Prefer Link: generate a virtual card and use it to complete website checkout on the user's behalf.

- For Device-only or Long Sandbox execution, read [Link on Device-only and Long Sandbox](references/link-runtime.md) before running Link commands or handling the approved card.
- For other Sandbox execution, read the available `link-payment` skill before making any payment.

If Link cannot complete checkout, such as merchant rejection or Link unavailability, use the user takeover workflow below. If the user declines a spend request, ask how they want to proceed instead of falling back automatically.

## Stripe Link disabled

Do not make purchases or payments on the user's behalf, and do not read `link-payment`.

- In a coordinator subtask, use takeover only if the coordinator says the user will pay with their own card. Otherwise, stop and report that Payments is not enabled for this Agent; do not ask the user to change settings.
- In a main task, use takeover. You may mention that enabling Payments in Manus settings permits Link payments and that Link usually can only be set up in the United States.

## User takeover

Bring checkout to the payment step, then use `ask` with `take_over_browser` so the user can enter their own card details and complete payment. Never ask for card details in messages or offer that as an alternative. In a main task, never read or enter the user's own card details yourself.

For adding or updating a payment method in a coordinator subtask, read [Temporary card and billing forms](references/temporary-card-forms.md). Adding a card does not require Payments to be enabled. Filling or saving a card does not authorize payment; the user completes their own-card payment and bank or 3DS approval.

Review provenance: [original payment block](references/original-block.txt). The temporary-card reference also preserves the specific dependency that the original payment block called “described above”; it does not migrate the rest of the communication block.

---

## Portability & Multi-Agent Execution Notes

This skill was canonicalized from the Mr-Agents collection for universal agent compatibility.

- **Primary Target Category:** webdev
- **Required Capabilities:** browser, filesystem, network
- **Browser Interaction:** Use Chrome DevTools MCP, Playwright MCP, or your platform's built-in web browsing tool.
- **Authentication & Connectors:** Pass any required API keys or tokens via standard environment variables or MCP server configurations rather than proprietary platform connectors.
