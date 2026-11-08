# Specialized Tools Reference

This reference provides a complete list of specialized `shopify_*` tools available in Manus, organized by domain.

## Products

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_get_products` | Retrieve products | Listing, searching, or fetching product details |
| `shopify_create_product` | Create a new product | Adding a new product to the store |
| `shopify_update_product` | Update product details | Changing title, description, vendor, etc. |
| `shopify_delete_product` | Delete a product | Removing a product from the store |

---

## Product Variants

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_create_product_variants` | Create variants for a product | Adding size, color, or other variant options |
| `shopify_update_product_variants` | Update variant details | Changing price, SKU, weight, etc. |
| `shopify_delete_product_variants` | Delete variants | Removing variant options from a product |

**Note:** For bulk variant operations (creating/updating/deleting many variants at once), use the raw GraphQL wildcard tools with `productVariantsBulkCreate`, `productVariantsBulkUpdate`, or `productVariantsBulkDelete` mutations.

---

## Orders

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_get_orders` | Retrieve orders | Listing, searching, or fetching order details |
| `shopify_update_order` | Update order details | Changing order notes, customer info, etc. |

---

## Discounts

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_get_discount(s)` | Retrieve discount details | Listing or fetching discount information |
| `shopify_create_basic_discount_code` | Create a percentage/fixed-amount discount | Creating simple discount codes |
| `shopify_update_basic_discount_code` | Update a basic discount | Changing discount percentage, usage limits, etc. |
| `shopify_create_free_shipping_code` | Create a free shipping discount | Adding free shipping promotions |
| `shopify_update_free_shipping_code` | Update a free shipping discount | Changing free shipping conditions |
| `shopify_deactivate_discount_code` | Deactivate a discount | Temporarily disabling a discount without deleting |
| `shopify_delete_discount_code` | Delete a discount | Permanently removing a discount |

---

## Inventory

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_get_inventory_items` | Retrieve inventory items | Checking stock levels, SKUs, tracking info |

---

## Metafields

| Tool | Purpose | When to Use |
|---|---|---|
| `shopify_list_product_metafields` | List metafields on a product | Viewing custom metadata on products |
| `shopify_product_set_update` | Update product metafields | Adding or modifying custom metadata (handles definition create + pin + metafieldsSet atomically) |

---

## How to Choose a Tool

1. **Identify the domain** (Products, Orders, Discounts, etc.)
2. **Find the action** (Get, Create, Update, Delete)
3. **Check the tool's description** — Each tool's own description tells you exactly when to use it and what parameters it accepts
4. **Use wildcards only as fallback** — If no specialized tool fits, use `shopify_query`, `shopify_mutation`, or `shopify_delete` with raw GraphQL

---

## When to Use Wildcards Instead

Use the raw GraphQL wildcard tools when:

- You need to perform a complex operation combining multiple mutations
- You need to read data not covered by specialized tools
- You need to use advanced filtering or search syntax
- You need to work with types/fields not exposed by specialized tools

For these cases, follow the workflow in SKILL.md: search docs → write GraphQL → validate → call wildcard tool.

---
