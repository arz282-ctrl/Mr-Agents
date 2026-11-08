# Required Shopify App Scopes

The Manus Shopify MCP connects via a custom Shopify app. The app must be granted the following access scopes (configured in the Shopify Partners dashboard or the store's custom app settings).

## Minimum Required Scopes

| Scope | Grants |
|---|---|
| `read_products` | Read products, variants, metafields, collections |
| `write_products` | Create / update / delete products, variants, and product metafields |
| `read_orders` | Read orders and their line items |
| `write_orders` | Update order details (notes, tags, customer info) |
| `read_discounts` | Read discount codes and automatic discounts |
| `write_discounts` | Create / update / deactivate / delete discounts |
| `read_inventory` | Read inventory items, levels, and locations |
| `write_inventory` | Adjust inventory quantities |

## Optional Scopes

| Scope | Grants | When needed |
|---|---|---|
| `read_customers` | Read customer profiles | Querying customer data |
| `write_customers` | Update customer profiles | Mutations on customers |
| `read_fulfillments` | Read fulfillment orders | Checking fulfillment status |
| `write_fulfillments` | Create / update fulfillments | Fulfillment mutations |

## Scope-to-Tool Mapping

| Tool(s) | Required scopes |
|---|---|
| `shopify_get_products` | `read_products` |
| `shopify_create_product`, `shopify_update_product`, `shopify_delete_product` | `write_products` |
| `shopify_create_product_variants`, `shopify_update_product_variants`, `shopify_delete_product_variants` | `write_products` |
| `shopify_list_product_metafields`, `shopify_product_set_update` | `read_products` / `write_products` |
| `shopify_get_orders` | `read_orders` |
| `shopify_update_order` | `write_orders` |
| `shopify_get_discount(s)` | `read_discounts` |
| `shopify_create_basic_discount_code`, `shopify_update_basic_discount_code`, `shopify_create_free_shipping_code`, `shopify_update_free_shipping_code`, `shopify_deactivate_discount_code`, `shopify_delete_discount_code` | `write_discounts` |
| `shopify_get_inventory_items` | `read_inventory` |
| Wildcard `shopify_query` / `shopify_mutation` / `shopify_delete` | Depends on the underlying API resource |

## Diagnosing Missing-Scope Errors

A missing scope surfaces as a `userErrors` entry (not a schema error):

```json
{
  "userErrors": [
    { "field": null, "message": "Access denied for <field_name> field." }
  ]
}
```

Or as a top-level extension error:

```json
{
  "errors": [{ "message": "The access token does not have the required scopes." }]
}
```

When you see either pattern, check which scope covers the failing resource in the table above, then ask the user to add that scope to their Shopify app and reinstall it.
