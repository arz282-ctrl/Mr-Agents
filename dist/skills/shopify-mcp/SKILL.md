---
name: shopify-mcp
description: "Operate the Admin data of a Shopify store the user already runs through the shopify connector MCP tools — querying/creating/updating products, orders, discounts, inventory; writing and validating raw GraphQL queries; troubleshooting API errors. Not for building a store — a request to make, build, create, launch or design a Shopify store, shop, storefront or e-commerce site goes to the webdev skill's Shopify integration, even when Shopify accounts are connected."
---


This skill helps you use Manus's built-in `shopify_*` MCP tools to manage the Admin data of a Shopify store the user already runs. It includes helper scripts for writing and validating raw GraphQL when no specialized tool fits.

## Routing — read first

These tools operate store data (products, orders, inventory, discounts) in an existing store. They do not create stores or build storefronts.

If the user asks to make, build, create, launch or design a Shopify store, shop, storefront or e-commerce website — for example "make me a Shopify store to sell X" — do not use these tools, even when Shopify accounts are already connected. Use the webdev route instead:

1. Read the `webdev` skill and its Shopify reference, then create the project with `webdev.init_project` on the `webdev-mcp` server.
2. Call `webdev.config` with `POST integrations/shopify/enable`. In the card that opens, the user chooses **Create a new store** or **Connect an existing store**; that is how an already connected store is reused for the new storefront.

Stay on these tools for Admin work on an existing store when no new store or website is requested, such as "add 3 products to my store" or "create a 20% discount code". This includes Admin work for a webdev project whose store has been claimed and added to Connectors.

## Workflow Overview

Using Shopify MCP tools involves these steps:

1. **Choose the right tool** — Use specialized tools when available; only use wildcards when no specialized tool fits
2. **For wildcard (custom GraphQL) operations:**
   - **Check scopes first** — Verify the operation is allowed by Manus's app scopes (see [references/scopes.md](references/scopes.md))
   - Search the docs to find the correct operation/type names
   - Write the GraphQL query or mutation
   - Validate the GraphQL locally before calling the tool
   - Call the wildcard tool and interpret any errors
3. **Handle errors** — Distinguish business-rule failures (userErrors) from schema errors
4. **Ask for clarification** when ambiguous or validation fails repeatedly

**Note on scopes:** Specialized tools don't require scope checking—they're pre-built for allowed operations. Scope checking applies only when writing custom GraphQL for the wildcard tools.

---

## Tool Selection

The `shopify_*` tool set has two layers:

### Specialized Tools (default choice)

Each covers one use case and takes typed parameters; no GraphQL writing required. Examples include:

- **Products**: `shopify_get_products`, `shopify_create_product`, `shopify_update_product`, `shopify_delete_product`
- **Variants**: `shopify_create_product_variants`, `shopify_update_product_variants`, `shopify_delete_product_variants`
- **Orders**: `shopify_get_orders`, `shopify_update_order`
- **Discounts**: `shopify_get_discount(s)`, `shopify_create_basic_discount_code`, `shopify_update_basic_discount_code`, `shopify_create_free_shipping_code`, `shopify_update_free_shipping_code`, `shopify_deactivate_discount_code`, `shopify_delete_discount_code`
- **Inventory**: `shopify_get_inventory_items`
- **Metafields**: `shopify_list_product_metafields`, `shopify_product_set_update`

Always check each tool's own description first—it tells you exactly when to use it.

### Wildcard Tools (fallback only)

Use only when no specialized tool fits. These accept raw GraphQL:

- `shopify_query` — Any read operation
- `shopify_mutation` — Non-destructive writes (rejects destructive top-level fields ending in `Delete`, `Cancel`, `Deactivate`, `Archive`, `Remove`, `Close`, `Void`, `Refund`)
- `shopify_delete` — Destructive writes. Requires a `display_name` (and optional `display_details`) for the confirmation UI

**Important:** Metafield writes on products/variants must go through the specialized `shopify_*_product*` tools—never via a wildcard. They orchestrate definition create + pin + metafieldsSet atomically.

---

## Writing Raw GraphQL for Wildcard Tools

When no specialized tool fits, you'll write GraphQL and pass it into a wildcard. **Do not trust trained-knowledge guesses**—the Admin API is large and version-specific. Use the helper scripts in this skill.

### Step 1: Check Scopes

**Before writing any custom GraphQL**, verify the operation is allowed by Manus's app scopes.

1. **Identify the operation** you want to perform (e.g., "Create a product", "Update inventory")
2. **Check [references/scopes.md](references/scopes.md)** to find the required scope
3. **Verify availability**:
   - ✅ **Available** — Proceed to Step 2
   - ❌ **Not available** — **Stop.** Tell the user the operation is not available due to missing scope. Do NOT write the GraphQL.

**Critical:** Do NOT spend effort writing GraphQL for operations that require unavailable scopes. Check scopes first, always.

### Step 2: Search the Docs

Run the helper script to find the correct operation/type names:

```bash
node /home/ubuntu/skills/shopify-mcp/scripts/search_docs.mjs "<operation or type name>" \
  --model YOUR_MODEL --client-name YOUR_CLIENT --client-version YOUR_VERSION
```

Search the mutation/query/type _name_ (e.g., `inventoryAdjustQuantities mutation`, `ProductInput type`)—not the user's prompt. Use the returned fields, arguments, input types, and examples. Cite the `url` from results back to the user.

### Step 3: Write the GraphQL

1. **Determine operation type**: Read (`query`) or write (`mutation`)? Destructive top-level field → `shopify_delete`; non-destructive → `shopify_mutation`; read → `shopify_query`
2. **Choose the top-level field**: For reads, which `Query` field; for writes, which mutation accepts your input?
3. **Select the input type**: Most mutations take `XInput`, but some take `XCreateInput`, `XUpdateInput`, `XSetInput`, or `XBulkInput`. If unsure, search.
4. **Keep return fields tight**: Always select `id`, and for mutations always select `userErrors { field message }`
5. **Use variables, not inline values**: Variables (`$id: ID!`) keep PII out of logs and enable clean retries

### Step 4: Validate Before Calling

Run the validation helper (max 3 retries):

```bash
node /home/ubuntu/skills/shopify-mcp/scripts/validate.mjs --code '<your GraphQL>' \
  --model YOUR_MODEL --client-name YOUR_CLIENT --client-version YOUR_VERSION \
  --artifact-id <stable random id, reused across retries> \
  --revision <start at 1, increment per retry>
```

Exits 0 on pass, 1 on fail. On failure: read the named field/arg/type, search for the correct value, fix exactly what the error reports, re-run.

### Step 5: Call the Wildcard Tool

Only after validation exits 0. Manus re-validates server-side against its own schema bundle. If it rejects with a schema error (`Cannot query field "X" on type "Y"`, `Unknown argument "X"`, `Unknown type "X"`), treat it the same way: identify the named identifier, search, fix, retry (max 2 more attempts). A `Relevant docs:` URL is often attached.

If the tool succeeds but the response contains `userErrors`, those are business-rule failures (duplicate SKU, invalid state, missing scope). Surface them to the user—don't retry blindly.

---

## Key Gotchas

These patterns save retries:

- **IDs are GIDs**, not integers: `gid://shopify/Product/1234567`. Type: `ID`.
- **Money fields are objects**: `MoneyV2 { amount, currencyCode }`, not raw numbers.
- **Every mutation must select** `userErrors { field message }`
- **Check scopes before writing custom GraphQL** — See [references/scopes.md](references/scopes.md)

For a complete list of common patterns and traps, see [references/common-traps.md](references/common-traps.md).

---

## Examples

### Example 1: Simple Query (No Variables)

Use this pattern when you don't need to parameterize values:

```graphql
query GetShopBasics {
  shop {
    name
    email
    primaryDomain {
      url
    }
    currencyCode
  }
}
```

### Example 2: Mutation with Variables (Recommended)

Always use variables for mutations to keep PII out of logs and enable clean retries:

```graphql
mutation UpdateCustomerEmail($id: ID!, $email: String!) {
  customerUpdate(input: { id: $id, email: $email }) {
    customer {
      id
      displayName
      email
    }
    userErrors {
      field
      message
    }
  }
}
```

Variables: `{ "id": "gid://shopify/Customer/1234567", "email": "new@example.com" }`

---

## Error Handling

When a wildcard tool call fails, determine the error type and respond accordingly:

| Error Type | Cause | Action |
|---|---|---|
| Schema error (e.g., `Cannot query field "X" on type "Y"`) | Incorrect field/type name | Search docs, fix exactly what the error reports, retry (max 2 more) |
| `userErrors` in response | Business-rule failure (duplicate SKU, invalid state, missing scope) | Surface to user; don't retry blindly |
| Validation failure (before tool call) | Local GraphQL syntax error | Fix and re-run validate.mjs (max 3 retries) |

If errors persist after max retries, describe what you tried and ask the user for clarification.

---

## When to Stop and Ask

- **Custom GraphQL operation not available** — User requests a wildcard operation that requires a scope Manus doesn't have (check [references/scopes.md](references/scopes.md))
- Request maps to multiple plausible mutations (`productCreate` vs `productSet` vs `productOptionsCreate`) — clarify which behavior
- Validation keeps failing on the same identifier after 2 retries — describe what you tried and ask
- Destructive op with no specialized tool — use `shopify_delete` with a clear `display_name` so the user sees what's being destroyed in the confirmation UI

---

---

## Portability & Multi-Agent Execution Notes

This skill was canonicalized from the Mr-Agents collection for universal agent compatibility.

- **Primary Target Category:** webdev
- **Required Capabilities:** filesystem, network, node, shell
- **Tool Substitution:** Execute shell or python commands through your agent's native execution tool (e.g., Claude Code `Bash`, Gemini CLI terminal, Cursor terminal, Copilot workspace agent).
- **Path Resolution:** Any historical references to `/home/ubuntu/...` should be mapped to the active workspace root or `$TMPDIR` on your host operating system.
- **Authentication & Connectors:** Pass any required API keys or tokens via standard environment variables or MCP server configurations rather than proprietary platform connectors.
