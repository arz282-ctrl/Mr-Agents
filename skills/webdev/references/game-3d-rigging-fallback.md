# Local 3D hand-rigging fallback

Use only as a last resort: inspect the active built-in tool schemas and actual character rig first, and use
supported built-in operations, suitable existing joints and ordinary engine attachments wherever they meet the
approved requirement. Read this page only when a required socket, finger deformation or hand-grip behavior remains
unsupported. Do not augment every character preemptively.

Preserve the approved rigging/animation choice and narrower source restrictions; for Three.js, follow
[rigging consent](game-blueprint.md#threejs-character-rigging-and-animation). A No or absent permission does not
authorize local rigging. An explicit later rigging request can establish the needed permission. This fallback
does not replace unavailable base rigging/animation tools or permit custom provider submissions or paid retries.

## Smallest supported path

1. Reuse the completed character, separate equipment and usable animation clips. A hand-parented offset node is
   enough for a rigid weapon when the returned hand pose already works; it needs no new deformation bones.
2. Complete any needed, authorized provider rigging/animation first. `animate_3d_model` consumes its saved provider
   rig reference, not local skeleton edits. Apply augmentation to a working copy of the final animated asset.
3. Add only the missing capability. Existing finger bones need posing, not replacement. A modeled fist may need
   only an attachment offset. Missing finger deformation needs both joints and skin weights; arm IK alone cannot
   curl a fixed hand mesh. Keep the original asset recoverable and preserve the recorded engine.

## Reference approach: augment the GLB locally

The working approach uses `@gltf-transform/core` for GLB skin/accessor edits and Three.js math. Reuse installed
project tooling where suitable. This is an adaptation recipe, not an automatic general-purpose hand rigger.

### Inspect the actual bind geometry

- Inspect each relevant skin, its joint names/hierarchy, inverse-bind matrices, mesh bind transform and
  `POSITION`, `JOINTS_0`, `WEIGHTS_0` accessors. Preserve existing clips, materials, textures and non-hand weights.
- Map the real upper-arm, forearm and hand joints; naming conventions do not guarantee finger joints. Convert
  hand-influenced vertices into hand bind space, accounting for the mesh bind transform and inverse-bind matrix.
- Derive wrist-to-finger, palm and thumb-side axes from this model's rest pose and inspect the geometry. Never
  copy another character's coordinates, bone indices, facing axis or glove dimensions.

### Add joints and redistribute weights only where needed

1. For stylized collective finger curls, place a three-joint chain from the knuckle line toward the fingertips,
   parented to the hand. This bends the four fingers together; it is not independent per-finger articulation.
   Add a separate thumb chain only when its geometry can be identified reliably. Preserve an existing modeled
   fist rather than forcing an open-hand fitting algorithm onto it. If the fit is unreliable, retain the original
   and report the limitation instead of assigning arbitrary weights.
2. Preserve the original joint ordering and append new joints. For a child joint with local bind transform `L`
   and parent inverse-bind matrix `B`, compute its inverse-bind matrix as `inverse(L) * B`. Update the skin's
   joint list and inverse-bind accessor together; adding named scene nodes alone cannot deform the fingers.
3. Use this four-weight path only when no additional `JOINTS_n`/`WEIGHTS_n` sets have nonzero influences. Otherwise
   use compatible tooling that preserves all influence sets together, or defer augmentation; never normalize
   `WEIGHTS_0` independently while leaving additional weights unchanged. Split each affected vertex's original
   hand influence between the hand/palm and new finger segments using smooth bands along the measured finger
   length. Keep unrelated influences, merge contributions to the same joint, retain the four strongest influences
   for this four-weight path and normalize their sum. Update both
   joint-index and weight accessors, processing shared accessors/vertices only once. Keep finite weights and
   valid indices; do not alter an uninvolved skin or mutate geometry shared with an unaugmented character.
4. Store measured curl axes with the joint data. Use blended relaxed/fist/hook poses appropriate to the weapon
   handle. These presets are approximate grasps, not a collision-aware finger-contact solver.

### Place sockets and IK targets

- A weapon socket follows the actual hand. A runtime offset node is preferred when sufficient; add a GLB socket
  joint only when the exported rig needs one. If included in the skin joint list, give it a matching inverse bind.
- Calibrate the socket at the closed fist's hollow, with an explicit grip axis and orientation. Measure the
  weapon's handle cross-section rather than its whole bounding-box center, which a heavy head can skew. Keep the
  weapon a separate rigid object, outside body skin deformation, with consistent units and scale.
- For a two-handed weapon, the secondary grip or moving bowstring contact drives the off-hand target. The
  primary hand drives the weapon; the off-hand solver must not move that primary arm or form a dependency cycle.
  When the solver requires target bones in the skeleton, append non-deforming targets with valid joint indices
  and inverse binds. A rigid attachment socket alone does not supply finger deformation or an IK target.

## Three.js runtime integration

Load the augmented copy and preserve independent skeleton state for each character instance. Attach each rigid
weapon once to its socket; compensate for inherited scale and use the calibrated handle offset/orientation.

For secondary-hand IK, import `CCDIKSolver` from `three/addons/animation/CCDIKSolver.js`. It requires a compatible
`SkinnedMesh` and target, effector and link indices in that mesh's `skeleton.bones`. Use the hand as effector and
forearm/upper arm as links, with suitable joint limits. Configure only the arm that should follow the weapon.

To place the fist rather than the wrist on the grip, subtract the socket's scaled, rotated local offset from
the world-space grip target before solving. Convert targets to their parent's local space where required, then
refresh their world matrices. Correct wrist orientation after the arm solve. Blend from the animation pose and
ease out when a target is unreachable, a clip releases the weapon or the carry state ends; never stretch the arm.
A one-handed upright hold can use a bounded two-bone arm solve without constraining the other hand.

Each frame: `AnimationMixer.update(delta)` → current world matrices → primary hold/weapon grip targets → off-hand
IK → wrist orientation and finger curls → refreshed world matrices → render. All targets must reflect the
current pose; invoking the mixer before rendering alone does not prevent stale-target jitter or one-frame lag.
For bows, update the string contact from the current draw-hand grip; do not force the hand toward a stale string.

For Godot, keep the same asset/skin invariants and use the project's compatible skeleton/IK facilities; a
`BoneAttachment3D` bound to the actual hand with an offset child is sufficient for a simple rigid attachment.
Do not port Three.js solver calls or change engines to use this reference.

## Verify before replacing the working asset

- Reopen the exported GLB: joint indices resolve, inverse-bind count matches the skin, weights are finite and
  normalized, and the original clips/materials remain. Confirm the expected sockets and deformed hand vertices
  exist; a larger joint count alone does not establish a working grip.
- Check the rest pose and representative idle, walk, run, attack/cast and release transitions from front, side
  and back. Inspect finger contact, thumb placement, elbow bends and weapon rigidity; test reachable/unreachable
  targets, scale and cloned characters. Preserve in-place motion and one-shot/loop behavior.
- Verify no hand slip, bending equipment, sudden arm snaps or one-frame lag. Screenshots verify poses; continuous
  playback is needed for motion claims. Record simplified collective fingers and missing thumb control honestly.
- Register and save the derived model through the existing [asset lifecycle](game-assets.md), or
  [Three.js asset lifecycle](game-threejs-assets.md), before checkpoint/delivery. Report exactly which exported
  asset and runtime were checked; documentation or a successful build alone is not grasp verification.
