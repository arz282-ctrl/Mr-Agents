# License & Attribution Compliance Report (LICENSE_REPORT.md)

**Generated:** 2026-11-08  
**Scope:** All 276 top-level portable skills in `Mr-Agents`  

---

## 1. Compliance Policy & Hard Rule 5

> **Hard Rule 5:** Preserve license and attribution. Read each skill's upstream license notes. Flag any skill whose license restricts redistribution in a LICENSE_REPORT.md. Do not silently relicense.

This document audits the licensing posture, attribution provenance, and third-party restrictions across all skills. No skills have been silently relicensed. All original license headers and files are preserved in both source and normalized distributions.

## 2. Flagged Skills with Usage / Redistribution Caveats

The following skills contain upstream dependencies, brand assets, or third-party datasets that impose non-standard or restrictive terms:

| Skill Name | Category | License / Terms Flagged | Guidance for Downstream Agents & Users |
|---|---|---|---|
| `html-video-production` | media | CDPR Fan Content Terms & GPL components | Contains CDPR Fan Content Guidelines (`CDPR-fankit-terms.txt`) and non-commercial assets. For educational/portfolio/personal use only. Do not redistribute commercially. |
| `gsap-plugins` | webdev | GreenSock Club GSAP / Commercial Web Terms | References GSAP premium animation plugins (ScrollSmoother, SplitText, InertiaPlugin, MorphSVG). Commercial multi-user sites require Club GreenSock license. |
| `database-lookup` | research | OMIM / NCBI Non-Commercial Terms | References OMIM (Online Mendelian Inheritance in Man) database queries, which permit non-profit academic research only; commercial entities require John Hopkins licensing. |
| `canva-mcp` | media | Canva Developer Terms & Proprietary APIs | Integrates with Canva REST APIs; subject to Canva's Developer Terms of Use and API rate limits. |
| `shopify-mcp` | devops | Shopify Partner & API Terms | Interacts with Shopify Admin GraphQL API; subject to Shopify Partner Agreement and store owner token authorization. |
| `stripe-best-practices` | webdev | Stripe Compliance & Security Terms | Governs payment processing implementation; code must comply with PCI-DSS SAQ-A requirements. |
| `tailscale-network` | devops | Tailscale API / Auth Key Terms | Tailscale networks require valid coordination server auth keys and adherence to Tailscale Terms of Service. |


## 3. Explicit License Breakdown in Frontmatter

| License Identifier | Skill Count | Permissive Redistribution? |
|---|---:|:---:|
| `MIT` | 25 | Yes (Permissive) |
| `Apache-2.0` | 6 | Yes (Permissive) |
| `MIT license` | 3 | Yes (Permissive) |
| `Complete terms in LICENSE.txt` | 2 | Review terms |
| `Apache License 2.0 (see LICENSE)` | 1 | Yes (Permissive) |
| `https://github.com/matplotlib/matplotlib/tree/main/LICENSE` | 1 | Review terms |
| `3-clause BSD license` | 1 | Yes (Permissive) |
| `BSD-3-Clause license` | 1 | Yes (Permissive) |
| *(Unspecified in frontmatter / governed by repo root)* | 236 | Default to repo Apache-2.0 / MIT upstream |


## 4. Skills Shipping Dedicated License / Credits Files

| Skill Name | Bundled File | Upstream Copyright / Attribution Excerpt |
|---|---|---|
| `appinsights-instrumentation` | `LICENSE.txt` | MIT License  Copyright 2025 (c) Microsoft Corporation.  Permission is hereby granted, free of charge, to any person obta... |
| `clipify` | `LICENSE` | MIT License  Copyright (c) 2026 Louise de Sadeleer  Permission is hereby granted, free of charge, to any person obtainin... |
| `cowork-plugin-customizer` | `LICENSE.txt` | Apache License                            Version 2.0, January 2004                         http://www.apache.org/licens... |
| `html-video-production` | `LICENSE` | Apache License                            Version 2.0, January 2004                         http://www.apache.org/licens... |
| `imagegen` | `LICENSE.txt` | Apache License Version 2.0, January 2004 http://www.apache.org/licenses/  TERMS AND CONDITIONS FOR USE, REPRODUCTION, AN... |
| `shopify-mcp` | `LICENSE` | MIT License  Copyright 2025-present, Shopify Inc.  Permission is hereby granted, free of charge, to any person obtaining... |
| `skill-creator` | `LICENSE.txt` | Apache License                            Version 2.0, January 2004                         http://www.apache.org/licens... |
| `stop-slop` | `LICENSE` | MIT License  Copyright (c) 2025 Hardik Pandya  Permission is hereby granted, free of charge, to any person obtaining a c... |
| `video-to-subtitle-summary` | `LICENSE` | MIT License  Copyright (c) 2025 ultrasev  Permission is hereby granted, free of charge, to any person obtaining a copy o... |
| `youtube-clipper` | `LICENSE` | MIT License  Copyright (c) 2026 op7418  Permission is hereby granted, free of charge, to any person obtaining a copy of ... |


## 5. Universal Dist Attribution Integrity

In `tools/normalize.py` and the CLI distribution pipeline:
1. **No Relicensing:** Any existing `license` declared in a skill's frontmatter or dedicated file is strictly preserved.
2. **Metadata Preservation:** All author, maintainer, and legacy frontmatter tags are maintained.
3. **Asset Integrity:** Dedicated LICENSE, NOTICE, CREDITS, and vendor term files are copied verbatim into `dist/skills/<skill>/`.