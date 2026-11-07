# Platformer Game Template (Godot 4.7.2 → Web/WASM)

Legacy implementation reference: keep the installed project and protocol; new initialization selects newer revisions.
Paths below are relative to this project's root. [Game workflow](game-workflow.md) owns scope and art/audio/font policy;
[delivery](game-delivery.md) owns Preview, validation, release preparation and publishing. Source-specific test/export
commands are diagnostics only, not lifecycle replacements; serialize them with active Game builds.
For requested tuning, follow [this project's tuning compatibility](#tuning-and-debug-builds): Addon Tweak needs an
existing preview adapter; legacy projects can use their working debug panel. Neither a panel nor an adapter is a
first-checkpoint requirement. Keep existing tuning source, gameplay consumers and protocol; do not migrate an
unchanged game or expose every parameter as a completion gate.


The current playable theme is **Calico Yarn Adventure**: a wool-felt calico exotic shorthair cat collects dried fish, defeats robot vacuums, and traverses felt terrain. Press **J/X** (or the on-screen YARN button) to fire a yarn ball in the facing direction. Missed yarn makes three ground rebounds and disappears when the third rebound lands; hits and walls consume it immediately. Shots have cooldown, swept wall/enemy collision, a lifetime and a hard count limit; tree pause freezes them and scene teardown frees them. `attack_cooldown`, `yarn_speed` and `yarn_lifetime` live in the existing Tweak schema. `pnpm verify-export` includes `test/yarn_combat.gd`. Cat standing/running sprites share one reference, continuous-video-derived frames, a 192×192 canvas and a common foot baseline.
A **complete, playable browser platformer reference** originally authored with Godot 4.7.1 and GDScript; use the Addon-required Godot 4.7.2 stable and verify compatibility. It includes a title screen, pause and main-menu navigation, keyboard and touch controls, checkpoint-ready Tweak controls, a reachable-jump reference route, enemies, collectibles, generated art, animation frames, reusable particle feedback, score persistence, deterministic tests, and the Web/WASM publishing path.
## Definition of done: complete game delivery
Use the current [completion contract](game-workflow.md#first-checkpoint-completion-contract) and
[validation policy](game-delivery.md#develop-and-validate). The table describes reference behavior to preserve when
affected, not additional production, art, tuning or capture requirements for every task.
| Reference part | Existing behavior and current guidance |
|---|---|
| Bounded viewport | The actual game surface stays between 1:1 and 16:6, with centered letterboxing outside that range; UI and touch coordinates follow the game surface rather than the outer preview. |
| Game-specific start screen | Keep title, instructions and Start readable and usable; follow current [scene/title art](game-workflow.md#coherent-scene-and-title-art). |
| CJK-safe UI typography | Follow the current typography contract, including user-uploaded fonts. Every runtime string has bundled glyph coverage; Godot Web never relies on a system CJK font. Smoke and exported-PCK tests prove representative Chinese, Latin, numbers, punctuation, and arrows exist, and the user confirms the delivered checkpoint has no tofu boxes or missing glyphs in a real browser. |
| Pause and navigation | `Esc` and the existing touch pause button stop gameplay; Resume preserves state and Return to Main Menu reaches the title without reloading. Historical Tuning entries are described below, not required player UI. |
| Scene art | Follow current [asset reuse](game-workflow.md#asset-reuse-and-targeted-production) and recorded source permissions; no separate full-generation or prototype-shape replacement gate. |
| Gameplay feedback and visual effects | Preserve readable gameplay feedback; effects follow current [optional polish](game-workflow.md#gameplay-feedback-and-optional-polish), not a mandatory particle set. |
| Audio when needed | Follow shared optional audio production; reuse fitting cues and check changed routing. |
| Tuning source | `config/tuning.json` and `TuningStore` own existing parameters and consumers. Requested tuning uses the [compatible existing interface](#tuning-and-debug-builds); no implicit adapter migration. |
| Persistence where required | Player-facing progress or scores that should survive a reload are saved, loaded, versioned, and covered by deterministic tests. Browser acceptance happens from the delivered checkpoint. |
| Automated and visual verification | Reuse affected import, smoke, pause/menu, jump-reachability and pack checks. Select native captures and any new checks under the current validation policy; no mandatory Tuning-entry or capture matrix. |
| Checkpoint-ready delivery | The Web export matches current sources, contains every runtime asset, excludes test outputs, respects size limits, and uses the intended title and instructions. A normal checkpoint is saved and handed to the user for browser acceptance. |
## Development loop
1. Read the affected scripts and preserve working gameplay, pause/navigation, input, persistence and parameter consumers.
2. Change only the requested mechanics/theme, following current source permissions and art scope.
3. Build Preview, validate and save through [delivery](game-delivery.md), reusing affected checks.
4. If tuning is requested, use the [compatible existing interface](#tuning-and-debug-builds), edit approved source defaults and verify changed behavior. Do not add a panel or adapter as a completion gate.
## Native capture implementation
Follow the shared verification and handoff workflow. This template’s native harness is `test/debug_capture.gd`: arrange representative deterministic states, capture the live viewport with `get_viewport().get_texture().get_image()`, and save PNGs with `Image.save_png()`. Pair each capture with state assertions and use the commands below.
## Playable reference map
| Path | Working reference included in the template |
|---|---|
| `scenes/title_screen.tscn` + `scripts/title_screen.gd` | Styled title screen, score display, keyboard and button start flow |
| `scenes/game.tscn` + `scripts/game.gd` | Full level construction, HUD, score, timer, checkpoints, respawn, camera, and finish flow |
| `scripts/pause_menu.gd` | `Esc` and touch pause flow with Resume, debug Tuning, and Return to Main Menu actions |
| `scripts/player.gd` | `CharacterBody2D` platforming with acceleration, friction, gravity, coyote time, jump buffering, variable jump height, stomping, and animation |
| `scripts/entities.gd` | Reusable coins, walking enemies, question blocks, and goal flag |
| `scripts/game_audio.gd` + `scripts/audio_catalog.gd` | Persistent streamed BGM, bounded SFX pool, pause/menu cleanup, and replaceable static asset mapping |
| `scripts/visual_effects.gd` | Web-compatible `CPUParticles2D` presets for jump and landing dust, collection sparkles, stomp impact, death burst, checkpoint feedback, and finish confetti |
| `config/tuning.json` | Single schema for tuning keys, source defaults, ranges, steps, labels, precision, and units |
| `scripts/tuning_store.gd` + `scripts/tuning_panel.gd` | Schema-driven live editing, automatic browser persistence, reset, and debug-only UI |
| `scripts/world_art.gd` | Dimmed screen-space felt scenery, independent of camera zoom |
| `scripts/touch_input.gd` | Floating touch joystick; horizontal drag moves and upward drag jumps |
| `scripts/save_store.gd` | Versioned score persistence in `user://` |
| `assets/template/backgrounds/`, `collectibles/`, `enemies/`, `audio/` | User-supplied title background, coin/enemy artwork, one BGM and eight SFX cues |
| `assets/template/cat/` | Current calico character and run frames, robot, dried fish, yarn, felt terrain, cat tree, warm scenery and game-specific title art |
| `assets/template/generated/` | Retained original reference assets |
| `fonts/fusion-pixel-12px-proportional-zh_hans.woff2` | Historical font path; replace through the current typography contract |
| `tools/art_pipeline/` + `tools/font_pipeline/` | Parameterized media processing plus reproducible runtime-text collection and `pyftsubset` font generation |
| `test/smoke.gd` | Boots both scenes and verifies keyboard/touch movement, particle presets and jump/landing wiring, pause/menu flow, reachable jumping, stomping, live tuning, and checkpoint respawn |
| `test/debug_capture.tscn` | Drives the game into representative states and saves title, particle-enhanced gameplay, pause, and tuning screenshots |
| `test/exported_pack_boot.gd` | Boots the exported PCK main scene to catch omitted resources |
| Game runtime | Local Web export/preview, asset sync, and published-site assembly; the platform manages this runtime outside the project scaffold |
## How to adapt the reference
Keep working input, `ViewportPolicy`, `GameAudio`, pause/navigation, feedback, saves, parameter consumers and export resources while changing the requested layout, copy, art, rules or scoring. Verify affected gameplay and navigation under current delivery policy; historical `TuningPanel`/`F1` wiring does not add a developer-UI requirement.
Follow the shared ownership boundaries, with these additional owners:
- `pause_menu.gd` owns pause presentation and navigation actions; `game.gd` coordinates it with Tuning and scene changes.
- `visual_effects.gd` owns reusable particle construction and styling; gameplay scripts emit semantic events instead of duplicating particle setup.
For platformer-specific supplements, read `docs/GAME_PRODUCTION_PLAYBOOK.md`: level reachability and route constants, optional action-design examples, audio prompt skeletons, and ffmpeg conversion examples. The shared rules and this template's media/font/audio integration sections remain the primary guidance for those topics.
## Bounded game viewport: 1:1 to 16:6
The game surface must keep a **width/height ratio between 1:1 and 16:6**, independently of the preview panel or browser window. `ViewportPolicy` (`scripts/viewport_policy.gd`) clamps the logical viewport, while Godot's `canvas_items` + `keep` stretch mode uniformly scales and centers it. In **adaptive mode**, a host within the range is filled; a taller host gets top/bottom letterboxing and a wider host gets left/right pillarboxing. In that adaptive mode, a 400×800 preview displays a centered 400×400 game surface; a 2400×600 preview displays 1600×600. Do not distort the canvas, crop the scene, or restore unrestricted `expand` to fill these margins.
**Display defaults to locked 16:9** (`display_mode = 0`), using the 1280×720 design area with centered letterboxing/pillarboxing and no stretching. In debug Tweak, **Display → 自适应画面比例** (`display_mode = 1`) restores the bounded adaptive mode described below. Both choices apply while paused, survive scene changes, and use the existing local draft save/reset path. The release debug-UI gate remains unchanged.
In adaptive mode, keep the existing 1280×720 design area: the logical viewport can grow to 1280×1280 at the square limit or 1920×720 at the wide limit. Design backgrounds, camera bounds, HUD, pause menu, and Tweak layout for that bounded range—not the outer page dimensions. The autoload survives scene transitions and applies changes even while paused. Keep the Web canvas resize policy unchanged: Godot, rather than a second CSS transform, owns the viewport and input mapping in both preview and exported PCK.
Touch and mouse joystick presses must originate inside the game surface; presses in the bars are ignored, and releasing outside still clears an active drag. Transparent full-rect HUD containers must ignore mouse input without disabling their interactive children. Preserve the policy when adapting the template. Run `pnpm test:responsive` after layout changes; it covers portrait, square, normal landscape, 16:6, ultrawide, resize while paused, background coverage, and input boundaries. A different aspect policy requires an explicit user request.
**Layout acceptance:** backgrounds cover the visible game surface after camera movement and resizing throughout 1:1–16:6; tiled terrain has no transparent seams or artwork beyond collision bounds; passages remain traversable without bump animations trapping the player. Implementation safeguards live beside the relevant code. `pnpm verify-export` runs the box/camera regression; `pnpm test:terrain-render` checks actual rendered coverage and tile pixels using a real renderer or Xvfb.
## Visual effects and particles
`scripts/visual_effects.gd` is a working, asset-free particle reference built with `CPUParticles2D`, which stays compatible with the Godot Web renderer. The template already wires the following cues:
| Gameplay event | Included particle feedback |
|---|---|
| Jump / landing | Small takeoff dust and a wider landing dust puff |
| Coin or block reward | Bright collection sparkles at the world position |
| Enemy stomp | A fast impact burst at the player/enemy contact point |
| Player death | A larger warm-colored radial burst before respawn |
| Checkpoint | A cool-colored confirmation burst, emitted only on first activation |
| Course clear | A long-lived confetti burst behind the completion message |
Keep event meaning separate from rendering: `player.gd` emits jump and landing signals, entities emit world positions, `game.gd` maps gameplay events to feedback, and `visual_effects.gd` builds the particle nodes. When changing genre or art direction, preserve that flow and adjust particle colors, amount, velocity, gravity, lifetime, spread, texture, and scale in one place. Add a named preset and deterministic assertion for every new high-value action; do not scatter one-off `CPUParticles2D` configuration across gameplay files.
The generated particle textures are tiny runtime shapes, so the baseline has no additional image dependency. Replace them with approved textures only when the visual direction requires it. Keep one-shot effects bounded and self-cleaning, and prefer `CPUParticles2D` for these lightweight cues unless the target Web build has explicitly verified another implementation.
`test/smoke.gd` verifies every included preset creates an emitting particle node and verifies real player jump/landing signals reach the system. `test/debug_capture.gd` adds visible sparkle and confetti to the gameplay viewport capture, while the exported-pack test ensures the effect script and node are present in the PCK.
## Tuning and debug builds
`config/tuning.json` is the single owner of every tunable key, source default, range, slider step, display label, precision, and unit. `TuningStore` loads that schema and the current browser-local values; `TuningPanel` builds its controls from the same entries. Add or change tuning metadata there instead of duplicating constants across GDScript, UI, and server code. Increment its `version` when stored browser values are no longer compatible.
Addon-hosted [Tweak](game-runtime.md#development-tweak-when-needed) and its [handoff](game-runtime.md#preview-tuning-handoff)
apply only when the project already has a working `scripts/manus/preview/` adapter. The original v1 has none;
the runtime does not inject one. Adding Addon support is a separate integration requiring an explicit user request.
Without that adapter, requested tuning can use the existing debug `TuningPanel` (`F1`/`P` or the pause-menu entry)
for experiments, or apply user-supplied values directly to source defaults. Keep the working panel for that use;
do not recreate it or require it for unrelated delivery. Retain one parameter manager and controls with real consumers.
The legacy panel saves experiments to `user://platformer_tuning.json`; this is a local draft, not a source update
or Save with Manus receipt. Write approved values to `config/tuning.json`, then verify and checkpoint normally.
The panel displays the derived full-jump apex. For the reference route, the default `jump_power` and `gravity` must produce at least `REFERENCE_MAX_PLATFORM_RISE + MIN_JUMP_CLEARANCE`; the smoke test checks both the calculated envelope and an actual held jump. When changing a level, measure the largest required vertical rise on the intended route, update the route constant, keep a deliberate clearance margin, and test the real jump. A platform visible on screen is not valid level content until the default controls can reach it.
When approved tuning changes source defaults, update `config/tuning.json`, verify affected gameplay and checkpoint normally. Current [release exclusion](game-runtime.md#release-candidates-and-developer-ui-exclusion) owns developer UI removal; preserve normal player Settings and do not bypass the old `OS.is_debug_build()` guard to expose historical controls in a release.
The debug template includes jump power/gravity and movement, enemy speed/count, camera zoom/smoothing, and yarn speed/cooldown/lifetime/upward speed/gravity. Enemy-count edits rebuild the population; camera zoom updates immediately, including while paused, without shrinking the screen-space background. `test/tweak_regression.gd` covers the build gate, panel entry, local autosave/reload and reset. Browser storage restrictions can prevent persistence; show the save result, never report a local draft as a source update.
## Art workflow
The included art is reusable reference material under its recorded permissions. Current [asset reuse](game-workflow.md#asset-reuse-and-targeted-production) and [generation permissions](game-workflow.md#asset-generation-mode-gate) determine what changes; this legacy page adds no full-art production gate.
### Scene art within the current production scope
Use the current [coherent scene/title art](game-workflow.md#coherent-scene-and-title-art) policy. Simple intentional visuals are permitted within the recorded source choice; no mandatory generation pass, complete asset-category inventory or blanket ban on engine-drawn geometry. Reuse fitting supplied/template/catalog assets and produce replacements only within the requested scope and permissions.
Process each accepted environment asset at its actual maximum display size, remove accidental backgrounds or halos, preserve intentional transparency, and export a clean-edged WebP. Use tileable or modular pieces for repeated ground and structures, separate far/mid/near layers for depth, and keep collision shapes independent from the visible texture so art can change without changing gameplay.
Inspect affected visuals through [delivery validation](game-delivery.md#develop-and-validate); use existing native capture hooks when needed, not as a new mandatory art-completion artifact.
### Title-screen art must communicate the actual game
Title screens may reuse permitted game art with live text; separate key art is optional unless requested. Follow current [scene/title art](game-workflow.md#coherent-scene-and-title-art) and [sharing](game-sharing.md) requirements. Preserve suitable existing title art on routine changes; update misleading art only within scope and permission, without milestone-based refresh prompts.
Follow the shared video-first animation workflow before processing or integrating character frames.
### Character size and anchor consistency
Idle, run, jump, attack, hit, death, and any other state must look like the same character occupying the same world-space scale. Use the approved character reference for every source clip, keep the camera framing and character scale fixed, and process every state to the same transparent canvas. `tools/art_pipeline/process_animation_frames.py` demonstrates the required pattern: inspect Alpha bounds, compute one union crop, apply one resize, center horizontally, and align the result to a shared bottom padding that acts as the foot baseline.
Before wiring frames into Godot, inspect the non-transparent bounding box of every frame. Width and height may change naturally with a pose, but a whole state becoming consistently larger, smaller, higher, or lower usually means its source framing, crop, scale, or baseline differs. Do not directly mix independently generated poses, different source resolutions, per-action tight crops, or frames processed with different canvas/content settings.
At runtime, keep a single scale and drawing origin across all states. Follow the reference in `scripts/player.gd`: both `HERO_TEXTURE` and `RUN_FRAMES` use the same square canvas, `draw_scale`, and centered `draw_texture()` origin. State selection should change only the texture unless an intentional gameplay effect such as death squash is explicitly designed. Do not add idle-only, run-only, or jump-only offsets to hide an asset-pipeline defect.
If the user reports that a character changes size, floats, drifts, or has a shaking foot position when its state changes:
1. Compare the affected files' pixel dimensions and Alpha bounding boxes; identify whether the mismatch is canvas size, occupied size, crop position, or foot baseline.
2. If anatomy, camera distance, or source character scale changed, regenerate or re-extract that action from the approved reference; cropping cannot repair a different character scale.
3. Otherwise, reprocess every affected character state in **one invocation** with repeated `--state SOURCE_DIR TARGET_DIR PREFIX` arguments and the same `--canvas` and `--content`. The tool scans every source frame once, derives one union crop and scale, and applies that exact geometry to every output state; do not run one command per action or omit a state from the batch.
4. Remove any per-state runtime scale or offset workaround, reimport the assets, and confirm that every state still uses the shared Godot scale and origin. Preserve clearly intentional motion such as the reference run bob or death squash; remove only compensation added to disguise inconsistent source assets.
5. Give the updated checkpoint to the user to verify the transition. A Godot-native comparison capture can help diagnose or demonstrate a reported mismatch, but it is not a mandatory completion artifact by default.
Follow the shared asset storage and import rules.
Check FFmpeg in the current execution environment before video extraction. The image-processing tools require Pillow:
```bash
# Keep raw video and extracted PNGs outside the Godot project.
uv run python tools/art_pipeline/extract_video_frames.py ../game-art-sources/run.mp4 ../game-art-sources/run_frames/ --fps 12 --start 0.4 --duration 1.4
uv run --with-requirements tools/art_pipeline/requirements.txt python tools/art_pipeline/remove_image_background.py input.webp output.webp
uv run --with-requirements tools/art_pipeline/requirements.txt python tools/art_pipeline/process_animation_frames.py \
  --state ../game-art-sources/idle_frames/ assets/characters/hero/idle/ idle \
  --state ../game-art-sources/run_frames/ assets/characters/hero/run/ run \
  --state ../game-art-sources/jump_frames/ assets/characters/hero/jump/ jump \
  --pattern 'frame_*.png' --report-bounds
```
After adding or replacing art, run an import before other tests:
```bash
godot --headless --path . --import
```
## CJK-safe game UI font
Follow the [current typography contract](game-workflow.md#default-typography): default to bundled ManusCC0 with ManusCC0 Sans CJK SC fallback, and allow unrestricted user-uploaded fonts. For font changes, update theme overrides, hydration pins, loader sources and project-local checks together; preserve gameplay and protocol. Check chosen-font rendering, Chinese player names and actual Web font resolution; diagnostics do not block uploaded-font choices. Keep system fallback disabled; update the project theme, fallback resources, imports and export tests together. The original per-copy subset commands are retired. Check line height and clipping with the replacement fonts.
## Audio integration
Follow the current shared optional audio workflow: reuse fitting permitted audio, and generate only for a concrete need. No separate cue sheet is required. The generation recipes below apply only when new audio is needed.
- **Preferred Manus Max Mode BGM:** use `generate_music` for loopable music.
- Follow the live tool contract for arguments; do not guess parameter names in project code or documentation.
Use [audio production as needed](game-workflow.md#audio-production-as-needed). Reuse fitting permitted reference BGM/SFX. Consult `docs/GAME_PRODUCTION_PLAYBOOK.md` only for a missing conversion or wiring detail; its cue-sheet and mandatory replacement instructions do not apply.
**Design for sustained browser play, not just successful boot.** Reuse resources, bound concurrent SFX, and never unconditionally restart audio, reassign streams, or allocate resources every frame. Compare pause state before assigning `stream_paused`: repeated `false` assignments have caused Web audio buffer reallocation and freezes. Long BGM must use `AudioServer.PLAYBACK_TYPE_STREAM`; `.ogg` alone does not select streaming. Pause/resume, respawn, and scene changes must not accumulate players, timers, or signal connections.
The included `test/audio_idle_regression.gd` runs through `pnpm test:audio` and is mandatory in `pnpm verify-export` against the actual PCK. It checks: 10,000 idle updates produce zero pause-state writes; 10,000 paused and 10,000 resumed updates produce exactly one write per transition, with streaming BGM asserted. This catches the setter loop, not Web memory leaks. For browser-only failures, request targeted user acceptance on the exported checkpoint: sustained idle play, repeated pause/resume, respawn and menu return, checking freezes, audio errors and growing resource usage. Native/headless success is not proof of Web stability; use the shared verification workflow for the remaining browser acceptance.
### Reuse GameAudio; replace the catalog, not the lifecycle
`GameAudio` is an autoload with one streaming music player and **eight SFX voices total**, each limited to one playback. When full, the pool reuses a voice instead of allocating a new player. `scripts/audio_catalog.gd` is the single asset mapping: when changing a cue, update its entry with static `preload("res://assets/audio/...")` references to generated or user-supplied BGM and cues. Null entries are valid for optional absent audio; explicitly requested audio must still be fulfilled or reported missing; the reference catalog now supplies one BGM and eight SFX files under `assets/template/audio/`. Use looping Ogg Vorbis for BGM and short non-looping clips for SFX.
The Start button/key calls `GameAudio.begin_game()` within the user gesture; do not autoplay from scene `_ready()`. Existing gameplay handlers call `GameAudio.play(&"jump")`, `&"land"`, `&"coin"`, `&"stomp"`, `&"checkpoint"`, `&"death"`, and `&"success"`. Tree pause is synchronized with guarded assignments. Respawn keeps the same music player and playback; returning to the title or removing the game scene stops all voices. Do not create another manager on respawn or bypass it with per-entity audio players. `set_muted()` / `set_volume()` are available for UI controls; `M` and `-` / `+` are reference keyboard controls.
Keep the regression test when adapting the game. Besides idle/pause transitions, it exercises real title/game/menu and respawn paths, checks player and bus counts, SFX bounds, idempotent starts, and muted/volume controls. Its silent test streams are created only by the excluded test script, not shipped as final audio. The runner requires an explicit `[AUDIO_IDLE_PASS]`, rejects script errors even on exit code zero, and times out instead of silently passing or hanging. These checks cover the manager contract; validate game-specific cue mappings and final browser sound separately.
## Template-specific diagnostics
Use the shared log guide for export, runtime, network, and replay errors.
| Symptom | Where the answer is |
| --- | --- |
| Whether the screen looks right | Godot `test/debug_capture.tscn` output |
| Character changes size, drifts, floats, or has a shaking foot position between states | Compare canvas dimensions and Alpha bounds, then follow **Character size and anchor consistency**; repair the shared asset-processing batch instead of adding per-state runtime offsets |
| Whether approved tuning reached the source and preview | `config/tuning.json` plus the later `[export] done` line in `.manus-logs/devserver.log` |
## Verification commands
Run these from the generated game project directory:
```bash
# Audio lifecycle, idle/pause, bounded voices and scene reuse
pnpm test:audio

# Scene, world, movement, and tuning smoke test
godot --headless --path . -s test/smoke.gd

# Render deterministic title, gameplay, and tuning screenshots with Godot APIs
GAME_CAPTURE_DIR=../game-captures xvfb-run -a godot --audio-driver Dummy \
  --path . --resolution 1280x720 res://test/debug_capture.tscn

# Export, then verify its contents and configured main scene from an isolated directory
pnpm export
pnpm verify-export
```
The smoke test must print `[SMOKE_PASS]`, the capture test must print `[DEBUG_CAPTURE_PASS]`, and the PCK checks must print `[PCK_CONTENTS_PASS]` and `[PCK_BOOT_PASS]`; the audio regression must also print `[AUDIO_IDLE_PASS]`.
The capture requires a rendering display so the viewport texture exists. Use the Xvfb command above in Sandbox; do not add `--headless` to the capture command.
If `godot` is not on `PATH`, set `GODOT_BIN` to the executable before running `pnpm verify-export`.
## Template-specific constraints
Apply the shared export constraints, plus:
- Keep `config/*.json` in the Web preset's `include_filter`; the tuning schema must be present in the exported PCK.
- Never depend on system CJK fonts. Keep the supported glyph repertoire, `gui/theme/custom_font`, and PCK glyph assertions in sync.
- Run the native capture and exported-pack checks below, then follow the shared browser-acceptance handoff.
## Publishing
**Finish deterministic checks, save a checkpoint, and give it to the user.** Publishing can follow after user acceptance. Follow the shared checkpoint artifact and publishing workflow.
## Template-specific failures
Check the shared common failures first.
- **Chinese text becomes boxes or disappears in Web:** rebuild the Fusion Pixel subset from all runtime text, confirm `gui/theme/custom_font`, reimport, and rerun the exported-pack check. Add omitted dynamic text through `--text-file` or `--characters`; do not add a system-font fallback.
- **Movement feels wrong:** inspect the existing parameter manager and requested behavior; requested tuning follows the [compatible existing interface](#tuning-and-debug-builds), then verify approved source changes.
- **Approved tuning is missing after restart:** update the matching defaults in `config/tuning.json`, then request one preview build and verify the updated game again.
- **Generated BGM does not fit:** regenerate it with tighter duration, arrangement, sonic-palette, and negative instructions; do not keep an unrelated result merely because a file was produced.
- **An SFX cue does not fit:** regenerate only that cue with a tighter event, duration, material, intensity, perspective, and negative description, then audition and integrate it yourself. Do not switch to `generate_music` or accept a poor result.
