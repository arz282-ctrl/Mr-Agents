# Studio Voice Catalog

The 30 studio voices below are the default voices for every language. For a regional accent or a specific persona, use a library voice found with `scripts/find_voice.py` (SKILL.md §5.2).

- Write the name exactly as listed in `voice_name` or `speaker_voice_configs[].voice_name`.
- Gender and pitch (from the provider's voice metadata) come from the voice, so choose the right voice instead of describing gender or age in `style`.
- When a project must match audio generated earlier, reuse the same voice name. The exact sound may differ slightly across model generations, so do not mix clips from an earlier session into one continuous track without telling the user.
- Designed and replicated (cloned) voices are **not** supported.

| Voice Name | Gender | Pitch | Character / Timbre |
| :--- | :--- | :--- | :--- |
| **Zephyr** | Female | High | Bright |
| **Puck** | Male | Low | Upbeat |
| **Charon** | Male | Low | Informative |
| **Kore** | Female | Medium | Firm |
| **Fenrir** | Male | Low | Excitable |
| **Leda** | Female | High | Youthful |
| **Orus** | Male | Low | Firm |
| **Aoede** | Female | Medium | Breezy |
| **Callirrhoe** | Female | Medium | Easy-going |
| **Autonoe** | Female | Medium | Bright |
| **Enceladus** | Male | Low | Breathy |
| **Iapetus** | Male | Low | Clear |
| **Umbriel** | Male | Low | Easy-going |
| **Algieba** | Male | Low | Smooth |
| **Despina** | Female | Medium | Smooth |
| **Erinome** | Female | Medium | Clear |
| **Algenib** | Male | Low | Gravelly |
| **Rasalgethi** | Male | Medium | Informative |
| **Laomedeia** | Female | High | Upbeat |
| **Achernar** | Female | High | Soft |
| **Alnilam** | Male | Low | Firm |
| **Schedar** | Male | Low | Even |
| **Gacrux** | Female | Medium | Mature |
| **Pulcherrima** | Neutral | Medium | Forward |
| **Achird** | Male | Low | Friendly |
| **Zubenelgenubi** | Male | Low | Casual |
| **Vindemiatrix** | Female | Medium | Gentle |
| **Sadachbia** | Male | Low | Lively |
| **Sadaltager** | Male | Medium | Knowledgeable |
| **Sulafat** | Female | Medium | Warm |

## Quick pick by role

| Role | Female | Male |
| :--- | :--- | :--- |
| Documentary or explainer narration | Erinome (Clear), Kore (Firm) | Charon (Informative), Rasalgethi (Informative), Sadaltager (Knowledgeable), Schedar (Even), Iapetus (Clear) |
| Warm storytelling, wellness, bedtime | Sulafat (Warm), Vindemiatrix (Gentle), Achernar (Soft), Despina (Smooth) | Algieba (Smooth), Umbriel (Easy-going) |
| Energetic ad, promo, announcement | Laomedeia (Upbeat), Zephyr (Bright), Autonoe (Bright) | Puck (Upbeat), Fenrir (Excitable), Sadachbia (Lively) |
| Authority, instruction, corporate | Kore (Firm), Gacrux (Mature); neutral: Pulcherrima (Forward) | Orus (Firm), Alnilam (Firm) |
| Casual conversation, podcast host | Callirrhoe (Easy-going), Aoede (Breezy), Leda (Youthful) | Achird (Friendly), Zubenelgenubi (Casual), Umbriel (Easy-going) |
| Gritty or textured character | — | Algenib (Gravelly), Enceladus (Breathy) |

For two speakers, pair voices that are easy to tell apart: different genders, or contrasting timbres such as Firm with Breezy, or Gravelly with Bright.
