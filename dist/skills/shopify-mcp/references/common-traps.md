# Common Traps in Shopify GraphQL

This reference expands on the key gotchas mentioned in SKILL.md with detailed explanations and examples.

## Data Types and Formats

### IDs Are GIDs, Not Integers

**Trap:** Passing a numeric ID like `1234567` instead of a GID.

**Correct format:** `gid://shopify/Product/1234567`

**Type:** `ID`

**Example:**
```graphql
mutation UpdateProduct($id: ID!) {
  productUpdate(input: { id: $id, title: "New Title" }) {
    product { id }
    userErrors { field message }
  }
}
```

Variables: `{ "id": "gid://shopify/Product/1234567" }`

---

### Money Fields Are Objects, Not Numbers

**Trap:** Passing `price: 19.99` instead of a `MoneyV2` object.

**Correct format:** `{ amount: "19.99", currencyCode: "USD" }`

**Type:** `MoneyV2`

**Example:**
```graphql
mutation CreateVariant($input: ProductVariantInput!) {
  productVariantCreate(input: $input) {
    productVariant { id }
    userErrors { field message }
  }
}
```

Variables:
```json
{
  "input": {
    "productId": "gid://shopify/Product/1234567",
    "price": {
      "amount": "19.99",
      "currencyCode": "USD"
    }
  }
}
```

---

## Mutation Patterns

### Every Mutation Must Select userErrors

**Trap:** Forgetting to select `userErrors` in the mutation response.

**Why it matters:** Without `userErrors`, you won't see business-rule failures (duplicate SKU, invalid state, missing scope). The mutation may succeed at the API level but fail at the business level.

**Correct pattern:**
```graphql
mutation UpdateProduct($id: ID!, $title: String!) {
  productUpdate(input: { id: $id, title: $title }) {
    product {
      id
      title
    }
    userErrors {
      field
      message
    }
  }
}
```

---

### Field Names: displayName, Not nickname / fullName

**Trap:** Using `nickname` or `fullName` on types like `Customer` or `Staff`.

**Correct field name:** `displayName`

**Example:**
```graphql
query GetCustomer($id: ID!) {
  customer(id: $id) {
    id
    displayName
    email
  }
}
```

---

### Slugs Use handle, Not slug

**Trap:** Using `slug` for product, collection, or page URLs.

**Correct field name:** `handle`

**Example:**
```graphql
query GetProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    handle
  }
}
```

---

## Connection and Pagination Patterns

### Pagination: Use first, after, and pageInfo

**Trap:** Trying to fetch all items without pagination, or using incorrect pagination fields.

**Correct pattern:**
```graphql
query GetProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    nodes {
      id
      title
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Variables:
```json
{
  "first": 50,
  "after": null
}
```

**For next page:**
```json
{
  "first": 50,
  "after": "<endCursor from previous response>"
}
```

---

### Media: Prefer media() Over Deprecated images

**Trap:** Using the deprecated `images` connection instead of `media`.

**Correct pattern:**
```graphql
query GetProductMedia($id: ID!) {
  product(id: $id) {
    id
    media(first: 10) {
      nodes {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
  }
}
```

---

## Search and Filter Patterns

### Search Syntax: Space-Separated Clauses

**Trap:** Using incorrect syntax for search filters.

**Correct format:** Space-separated clauses like `status:active AND vendor:Nike`

**Example:**
```graphql
query SearchProducts($query: String!) {
  products(first: 10, query: $query) {
    nodes {
      id
      title
    }
  }
}
```

Variables:
```json
{
  "query": "status:active AND vendor:Nike"
}
```

**Reference:** See `/docs/api/usage/search-syntax` in Shopify docs for all available filters.

---

## Bulk Operations

### Bulk Variants: Use Bulk Mutations, Not Per-Variant

**Trap:** Creating/updating/deleting variants one at a time instead of using bulk operations.

**Correct mutations:**
- `productVariantsBulkCreate`
- `productVariantsBulkUpdate`
- `productVariantsBulkDelete`

**Example:**
```graphql
mutation BulkCreateVariants($input: ProductVariantsBulkInput!) {
  productVariantsBulkCreate(input: $input) {
    productVariants {
      id
      title
    }
    userErrors {
      field
      message
    }
  }
}
```

---

## Metafield Patterns

### Metafield Writes on Products/Variants: Use Specialized Tools Only

**Trap:** Trying to write metafields via `shopify_mutation` or raw GraphQL.

**Correct approach:** Use the specialized `shopify_product_set_update` tool, which orchestrates definition create + pin + metafieldsSet atomically.

These tools handle the complexity of metafield definitions and ensure consistency.

---

## Input Type Variations

### Input Types: XInput vs XCreateInput vs XUpdateInput

**Trap:** Using the wrong input type for a mutation.

**Pattern:** Most mutations take `XInput`, but some take:
- `XCreateInput` (for creation-specific fields)
- `XUpdateInput` (for update-specific fields)
- `XSetInput` (for set operations)
- `XBulkInput` (for bulk operations)

**Solution:** Always search the docs for the exact mutation name to find the correct input type.

**Example:**
```bash
node /home/ubuntu/skills/shopify-mcp/scripts/search_docs.mjs "productCreate mutation"
```

---

## Summary

The most critical patterns to remember:

1. **IDs are GIDs**: `gid://shopify/Type/numeric_id`
2. **Money is an object**: `{ amount, currencyCode }`
3. **Always select userErrors** in mutations
4. **Use variables**, not inline values
5. **Paginate with first/after/pageInfo**
6. **Search the docs** when unsure about field names or input types

When in doubt, search the docs and validate locally before calling the wildcard tool.
