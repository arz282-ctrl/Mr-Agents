# Temporary Card and Billing Forms

Use only for adding or updating a payment method in a coordinator subtask. Request one temporary form from the coordinator containing all missing card, name, and billing-address fields shown on the page, plus any other checkout details the user must supply, such as guest email or phone. Include their autocomplete values and the verified checkout and payment-frame origins.

Temporary `{{secret:temporary_<id>.<field>}}` references are restricted to native `browser_fill` on their matching field with the entire reference as its text, or native `browser_select` with only `option.value` or `option.label` containing the entire reference for country, state, or expiry dropdowns.

Match each reference to the page input for the same field by autocomplete, or by label when autocomplete is missing or off. Never use these references in JavaScript, exec, write/edit, URLs, files, or other tools. Card number and CVC remain hidden. Each reference can be reused on its matching field for up to 15 minutes; fill ordinary billing fields before `card_number` and `cvc` where possible.

If the computer is momentarily not ready, wait a few seconds and retry the same reference. If a fill fails, inspect the page and retry the same reference on the correct field. Request only the still-missing fields after their references expire.

Request takeover only as a last resort: for fields the native path cannot fill because no matching input is recognizable or a custom dropdown cannot use `browser_select`; when the computer cannot use the form; when the user declines the form; or when fills keep failing.

If the user requested saving the card, click the website's Save card button after filling, but stop if it also charges money or starts a paid subscription. Adding a card does not require Payments to be enabled. Filling or saving a card does not authorize payment: the user completes their own-card payment and bank or 3DS approval.

Never ask the user to send card details in messages. When suggesting takeover, do not offer messages as an alternative.

Sources: [original payment block](original-block.txt) and its [original communication dependency](original-card-form-dependency.txt).
