// mcp/gameIdeaSuggestions.ts
import { randomInt } from "node:crypto";

// shared/gameIdeaGenres.ts
var genre = (id, family, label, description, ...sourceAnchors) => ({ id, family, label, description, sourceAnchors });
var templateGenre = (id, family, label, mechanicsTemplate, ...sourceAnchors) => ({ id, family, label, mechanicsTemplate, sourceAnchors });
var GAME_IDEA_GENRES = [
  genre("action", "action", "Action", "Move through short challenges, react to hazards, and chain well-timed maneuvers to improve your score.", "Action"),
  templateGenre("platformer", "platformer", "Horizontal Platformer", "platformer", "Platform_games"),
  templateGenre("vertical-platformer", "platformer", "Vertical Platformer", "vertical-platformer", "Platform_games"),
  genre("shooter", "shooter", "Shooter", "Aim ranged attacks, prioritize moving targets, manage ammunition, and survive increasingly demanding encounters.", "Shooter_games"),
  genre("first-person-shooter", "shooter", "First-Person Shooter", "Explore through your character\u2019s eyes, use cover, aim at threats, and complete combat objectives against AI opponents.", "First-person_shooters"),
  genre("third-person-shooter", "shooter", "Third-Person Shooter", "Guide a visible character through cover, aim over their shoulder, and outmaneuver AI opponents.", "First-person_shooters"),
  genre("light-gun-shooter", "shooter", "Light Gun Shooter", "Use a pointer to hit appearing targets, spare protected targets, and reload between timed shooting sequences.", "Light_gun_shooters"),
  genre("shoot-em-up", "shooter", "Shoot \u2019em Up", "Pilot a nimble craft through enemy formations, fire continuously, collect power-ups, and defeat stage guardians.", "Shoot_'em_ups"),
  templateGenre("bullet-hell", "shooter", "Bullet-Hell Shooter", "bullet-hell", "Shoot_'em_ups"),
  genre("fighting", "fighting", "Fighting", "Read an opponent\u2019s moves, block or evade attacks, and combine strikes to win close-range rounds.", "Fighting_games"),
  genre("beat-em-up", "fighting", "Beat \u2019em Up", "Move through arenas, control crowds with combos and throws, and defeat waves of AI opponents.", "Beat_'em_up_games"),
  templateGenre("scroller", "fighting", "Side Scroller", "scroller", "Beat_'em_up_games"),
  genre("hack-and-slash", "fighting", "Hack and Slash", "Time melee weapon strikes, dodge surrounding enemies, and connect attack sequences to clear encounters.", "Beat_'em_up_games"),
  genre("stealth", "stealth", "Stealth", "Observe patrols, hide from sight, create distractions, and complete objectives without raising an alarm.", "Stealth_games"),
  genre("survival", "survival", "Survival", "Scavenge a hostile region, craft tools and shelter, and balance supplies against changing environmental threats.", "Survival_games"),
  genre("rhythm", "rhythm", "Rhythm", "Read incoming beat cues, time your inputs to music, and build a streak through varied patterns.", "Rhythm_games"),
  genre("dance-rhythm", "rhythm", "Dance Rhythm", "Follow directional dance cues, alternate steps in time, and earn accuracy scores across a musical routine.", "Rhythm_games"),
  genre("music-performance", "rhythm", "Music Performance", "Play an instrument through timed controls, sustain notes, and complete musical phrases with expressive accuracy.", "Rhythm_games"),
  genre("action-adventure", "action-adventure", "Action Adventure", "Explore a connected region, collect useful tools, solve environmental obstacles, and overcome active threats.", "Action-adventure"),
  genre("survival-horror", "horror", "Survival Horror", "Search unsettling locations for scarce supplies, solve escape problems, and choose when to evade or confront danger.", "Survival_horror"),
  genre("metroidvania", "action-adventure", "Metroidvania", "Explore an interconnected map, gain traversal abilities, and revisit earlier areas to uncover routes and secrets.", "Metroidvania"),
  genre("adventure", "adventure", "Adventure", "Investigate locations, talk to characters, collect clues, and solve a chain of story-driven problems.", "Adventure"),
  genre("text-adventure", "adventure", "Text Adventure", "Enter commands or choose written actions, examine a described world, and use discoveries to solve narrative puzzles.", "Text_adventures"),
  genre("graphic-adventure", "adventure", "Graphic Adventure", "Examine illustrated scenes, combine inventory items, and discover how objects and characters connect.", "Graphic_adventures"),
  genre("point-and-click", "adventure", "Point-and-Click Adventure", "Click scene details, gather objects, and combine clues or tools to unlock the next location.", "Graphic_adventures"),
  genre("visual-novel", "adventure", "Visual Novel", "Read illustrated dialogue, choose responses, and shape character relationships and branching story outcomes.", "Visual_novels"),
  genre("interactive-movie", "adventure", "Interactive Movie", "Choose actions during cinematic scenes and respond to timed prompts to steer the unfolding story.", "Interactive_movie"),
  genre("character-romance", "life-simulation", "Character Romance", "Get to know a cast of adult characters, choose conversations and shared activities, and develop a branching romance.", "Visual_novels"),
  genre("puzzle", "puzzle", "Puzzle", "Learn a small set of rules, recognize patterns, and manipulate pieces to solve increasingly intricate challenges.", "Puzzle"),
  templateGenre("merge-puzzle", "puzzle", "Merge Puzzle", "puzzle", "Tile-matching_game"),
  genre("block-breaker", "puzzle", "Block Breaker", "Move a paddle to rebound a ball, break arranged targets, and keep the ball in play through tricky rebounds.", "Breakout_clone_game"),
  genre("logic-puzzle", "puzzle", "Logic Puzzle", "Apply consistent rules, rule out impossible arrangements, and place or connect pieces to satisfy every condition.", "Logical_game"),
  genre("transport-puzzle", "puzzle", "Transport Puzzle", "Push or slide objects toward marked destinations, plan routes around obstacles, and avoid blocking the moves still needed.", "Action-adventure"),
  genre("physics-puzzle", "puzzle", "Physics Puzzle", "Arrange objects, trigger forces, and use motion, balance, or momentum to deliver objects to their goals.", "Physics_game"),
  genre("projectile-puzzle", "puzzle", "Projectile Collision Puzzle", "Choose launch angles and strength, predict ricochets or collapses, and clear targets with limited shots.", "Physics_game"),
  genre("programming", "puzzle", "Programming Puzzle", "Build a sequence of commands, run it on a simulated machine, and debug it until it completes the assigned task.", "Programming_game"),
  genre("puzzle-platformer", "platformer", "Puzzle Platformer", "Jump between ledges, manipulate mechanisms, and combine movement abilities to open a safe route to the exit.", "Puzzle-platform_game"),
  genre("hidden-object", "puzzle", "Hidden Object", "Inspect detailed scenes, find requested objects, and use discovered clues to advance an investigation.", "Hidden_object_game"),
  genre("picture-reveal", "puzzle", "Picture Reveal", "Solve spatial clues to uncover an image in sections while avoiding incorrect selections.", "Reveal_the_picture_game"),
  genre("tile-matching", "puzzle", "Tile Matching", "Rearrange tiles to form valid groups, clear them from the board, and plan chains before space runs out.", "Tile-matching_game"),
  genre("match-three", "puzzle", "Match Three", "Swap adjacent pieces to line up matching sets, trigger cascades, and finish board objectives in limited moves.", "Tile-matching_game"),
  genre("falling-block", "puzzle", "Falling Block", "Rotate descending pieces, fit them into open spaces, and clear completed patterns before the stack reaches the top.", "Tile-matching_game"),
  genre("traditional-puzzle", "puzzle", "Traditional Puzzle", "Solve familiar compact challenges involving words, numbers, or associations with clear rules and progressively harder boards.", "Traditional_puzzle_game"),
  genre("solitaire", "tabletop", "Solitaire", "Move cards between constrained piles, uncover hidden cards, and plan a sequence that completes the foundations.", "Traditional_puzzle_game"),
  genre("mahjong-solitaire", "puzzle", "Mahjong Solitaire", "Find matching exposed tiles, remove pairs, and preserve access to the tiles needed to clear the layout.", "Traditional_puzzle_game"),
  genre("word-puzzle", "puzzle", "Word Puzzle", "Arrange letters or interpret clues to discover words, fill a grid, and unlock connected answers.", "Traditional_puzzle_game"),
  genre("number-puzzle", "puzzle", "Number Puzzle", "Place or transform numbers to satisfy arithmetic and positional constraints across a compact board.", "Traditional_puzzle_game"),
  genre("association-puzzle", "puzzle", "Association Puzzle", "Find hidden relationships between clues, sort items into meaningful groups, and explain the connecting pattern.", "Traditional_puzzle_game"),
  genre("role-playing", "role-playing", "Role-Playing", "Develop a character through quests, choose abilities and equipment, and use growing strengths to overcome challenges.", "Role-playing"),
  genre("action-rpg", "role-playing", "Action RPG", "Fight in real time, evade enemy attacks, collect equipment, and develop a character build through earned abilities.", "Action_RPG"),
  genre("crpg", "role-playing", "Computer RPG", "Lead a party through quests, choose dialogue and skills, and resolve encounters using character statistics and tactical decisions.", "CRPG"),
  genre("turn-based-rpg", "role-playing", "Turn-Based RPG", "Build a party, choose actions in deliberate combat turns, and manage abilities and resources across a quest.", "Role-playing"),
  genre("roguelike", "roguelike", "Roguelike", "Explore a newly generated dungeon each run, make consequential resource choices, and adapt when defeat ends the run.", "Roguelikes"),
  genre("roguelite", "roguelike", "Roguelite", "Attempt varied procedural runs, combine changing upgrades, and use earned unlocks to expand future strategies.", "Roguelikes"),
  genre("tactical-rpg", "role-playing", "Tactical RPG", "Develop a party, position characters on a battlefield, and combine their abilities during deliberate tactical turns.", "Tactical_RPG"),
  genre("sandbox-rpg", "role-playing", "Sandbox RPG", "Create a character, roam a region freely, choose quests or professions, and develop through the activities you pursue.", "Sandbox_RPG"),
  genre("party-dungeon-rpg", "role-playing", "First-Person Party RPG", "Lead a party through a dungeon from a shared first-person viewpoint, map routes, solve mechanisms, and manage encounters.", "First-person_party-based_RPG"),
  genre("dungeon-crawler", "role-playing", "Dungeon Crawler", "Descend through dangerous rooms, search for treasure, conserve supplies, and overcome enemies to reach deeper floors.", "First-person_party-based_RPG"),
  genre("monster-taming", "role-playing", "Monster Taming", "Discover and recruit creatures, raise their abilities, and assemble a complementary team for encounters.", "Monster-taming"),
  genre("simulation", "simulation", "Simulation", "Operate a small model of a real or imagined system, adjust its controls, and observe the consequences of your decisions.", "Simulation"),
  genre("construction-management", "management", "Construction and Management", "Build a working community or facility, allocate limited resources, and balance growth against maintenance and demand.", "Construction_and_management_simulation"),
  genre("city-building", "management", "City Building", "Lay out a town, connect essential services, balance its budget, and respond to changing resident needs.", "Construction_and_management_simulation"),
  genre("business-simulation", "management", "Business Simulation", "Run a small enterprise, set production and prices, manage workers, and reinvest earnings to meet changing demand.", "Construction_and_management_simulation"),
  genre("government-simulation", "management", "Government Simulation", "Set policies for a fictional state, distribute a limited budget, and balance public needs against competing priorities.", "Construction_and_management_simulation"),
  genre("life-simulation", "life-simulation", "Life Simulation", "Guide a character\u2019s daily activities, develop skills and relationships, and balance needs with personal goals.", "Life_simulation"),
  genre("ecosystem-simulation", "life-simulation", "Ecosystem Simulation", "Adjust habitats and species populations, observe their interactions, and keep a changing ecosystem in balance.", "Life_simulation"),
  genre("world-shaping", "life-simulation", "World Shaping Simulation", "Shape terrain, influence a population indirectly, and guide its growth by changing the world around it.", "Life_simulation"),
  genre("virtual-pet", "life-simulation", "Virtual Pet", "Care for a small companion, learn its needs, play together, and help it grow through daily activities.", "Life_simulation"),
  genre("social-simulation", "life-simulation", "Social Simulation", "Guide the routines and relationships of simulated characters, arrange shared spaces, and see their stories emerge.", "Life_simulation"),
  genre("dating-simulation", "life-simulation", "Dating Simulation", "Balance an adult character\u2019s schedule, choose conversations, and develop relationships through shared experiences.", "Life_simulation"),
  genre("raising-simulation", "life-simulation", "Raising Simulation", "Plan training, rest, and activities for a developing character, then adapt the schedule as their strengths change.", "Life_simulation"),
  genre("vehicle-simulation", "vehicle", "Vehicle Simulation", "Learn a vehicle\u2019s controls, navigate a route, and complete handling challenges while managing speed and condition.", "Vehicle_simulation"),
  genre("flight-simulation", "vehicle", "Flight Simulation", "Control an aircraft through takeoff, navigation, and landing while responding to wind and instrument readings.", "Vehicle_simulation"),
  genre("combat-flight", "vehicle", "Combat Flight", "Pilot an aircraft, manage positioning and energy, and complete aerial missions against AI-controlled threats.", "Vehicle_simulation"),
  genre("civilian-flight", "vehicle", "Civilian Flight", "Plan a flight, follow navigation aids, manage changing weather, and deliver passengers or cargo safely.", "Vehicle_simulation"),
  genre("space-flight", "vehicle", "Space Flight", "Pilot a spacecraft, manage thrust and fuel, and navigate between orbital objectives or distant destinations.", "Vehicle_simulation"),
  genre("train-simulation", "vehicle", "Train Simulation", "Drive a train along signaled routes, manage braking and speed limits, and meet station or freight schedules.", "Vehicle_simulation"),
  genre("vehicular-combat", "vehicle", "Vehicular Combat", "Maneuver an armed vehicle, use terrain for protection, and disable AI opponents while protecting your own machinery.", "Vehicle_simulation"),
  genre("mecha-combat", "vehicle", "Mecha Combat", "Pilot a large combat machine, balance movement and weapon systems, and exploit enemy weak points in arena missions.", "Vehicle_simulation"),
  genre("strategy", "strategy", "Strategy", "Allocate limited resources, anticipate an AI opponent\u2019s plans, and coordinate units to secure a changing objective.", "Strategy"),
  genre("four-x", "strategy", "4X Strategy", "Explore a compact world, establish settlements, develop resources and technology, and compete with AI-controlled factions.", "4X_game"),
  genre("artillery", "strategy", "Artillery", "Choose firing angles and power, account for terrain and wind, and outlast an AI opponent in turn-based exchanges.", "Artillery_game"),
  genre("auto-battler", "strategy", "Auto Battler", "Recruit and arrange a squad, combine complementary abilities, and refine your formation between automated battles against AI.", "Auto_battler_(Auto_chess)"),
  templateGenre("rts", "strategy", "Real-Time Strategy", "rts", "Real-time_strategy_(RTS)"),
  genre("real-time-tactics", "strategy", "Real-Time Tactics", "Direct a fixed squad in real time, use cover and flanking, and complete objectives without building a base.", "Real-time_tactics_(RTT)"),
  templateGenre("td", "strategy", "Tower Defense", "td", "Tower_defense"),
  genre("turn-based-strategy", "strategy", "Turn-Based Strategy", "Plan a faction\u2019s development and movement one turn at a time, then respond to the consequences of rival AI actions.", "Turn-based_strategy_(TBS)"),
  genre("turn-based-tactics", "strategy", "Turn-Based Tactics", "Position a small squad, spend limited actions carefully, and coordinate attacks to complete tactical missions.", "Turn-based_tactics_(TBT)"),
  genre("wargame", "strategy", "Wargame", "Command forces on a map, protect supply routes, and weigh terrain and timing to achieve campaign objectives.", "Wargame"),
  genre("grand-strategy", "strategy", "Grand Strategy", "Guide a fictional nation\u2019s economy, diplomacy, and military priorities across a compact campaign against AI rivals.", "Grand_strategy_wargame"),
  genre("sports", "sports", "Sports", "Control an athlete or team, master a sport\u2019s rules and timing, and compete in matches against AI opponents or locally.", "Sports", "Sports_game"),
  genre("racing", "racing", "Racing", "Follow a winding course, manage speed through corners, and beat a time trial or AI-controlled rivals.", "Racing"),
  genre("kart-racing", "racing", "Kart Racing", "Steer a small racer around playful tracks, collect power-ups, and use shortcuts to beat AI opponents.", "Racing"),
  genre("arcade-racing", "racing", "Arcade Racing", "Drift through exaggerated courses, chain risky maneuvers, and earn boosts while pursuing fast lap times.", "Racing", "Vehicle_simulation"),
  genre("sim-racing", "racing", "Racing Simulation", "Manage traction, braking, and racing lines to improve consistent lap times with realistic vehicle handling.", "Racing", "Vehicle_simulation"),
  genre("sports-management", "management", "Sports Management", "Select a lineup, schedule training, set tactics, and adapt your team across a season of simulated matches.", "Sports_game"),
  genre("fictional-sport", "sports", "Fictional Sport", "Learn an invented scoring system, master its movement and ball control, and outplay AI opponents or local friends.", "Sports_game"),
  genre("board-card", "tabletop", "Board or Card Game", "Learn a compact set of tabletop rules, plan several moves ahead, and challenge AI opponents or take local turns.", "Board_game_or_card_game"),
  genre("casino", "tabletop", "Casino Game", "Play probability-based rounds using virtual currency only, choose when to take risks, and track a fictional score.", "Casino_game"),
  genre("casino-machine", "tabletop", "Casino Machine", "Launch balls or spin a simulated machine, watch its outcomes, and pursue score goals using virtual currency only.", "Casino_game"),
  genre("casino-table", "tabletop", "Casino Table Game", "Choose actions in card or dice rounds against a simulated house, using virtual currency only and no cash prizes.", "Casino_game"),
  genre("number-draw", "tabletop", "Number Draw Game", "Mark a card, follow randomized number draws, and complete patterns for points using virtual currency only.", "Casino_game"),
  templateGenre("trading-card", "tabletop", "Card Battler", "trading-card", "Digital_collectible_card_game"),
  genre("wellness-training", "purpose", "Wellness and Attention Training", "Complete short attention and coordination exercises, adjust difficulty, and track practice scores without claiming medical treatment or efficacy.", "Digital_therapeutic_video_game"),
  genre("gacha", "collection", "Gacha Collection", "Earn virtual currency through play, spend virtual currency only on randomized collectibles, and combine discoveries toward collection goals.", "Gacha_game"),
  genre("horror", "horror", "Horror", "Investigate an unsettling place, interpret environmental clues, and respond to changing threats as a mystery unfolds.", "Horror_game"),
  genre("idle", "incremental", "Idle and Incremental", "Start a small production loop, buy upgrades, automate repeated work, and choose how to expand its output.", "Idle_game"),
  genre("party", "party", "Party", "Pass a device or share local controls to compete in a varied sequence of short skill, memory, and timing challenges.", "Party_game"),
  genre("photography", "photography", "Photography", "Explore a scene, frame interesting subjects, time the shutter, and complete assignments through composition and observation.", "Photography_game"),
  genre("social-deduction", "party", "Social Deduction", "Assign hidden roles on a shared device, discuss clues face to face, and vote to identify deceptive players during local rounds.", "Social_deduction_game"),
  genre("trivia", "trivia", "Trivia", "Answer questions across selected subjects, earn points for accuracy, and progress through increasingly demanding rounds.", "Trivia_game"),
  genre("typing", "typing", "Typing", "Type prompted words or commands accurately to overcome obstacles, maintain a streak, and improve your speed.", "Typing_game"),
  genre("art-game", "purpose", "Art Game", "Explore an expressive interactive space, manipulate its visual or sound rules, and uncover meaning through your choices.", "Art_game"),
  genre("casual", "purpose", "Casual", "Learn a simple interaction immediately, complete short relaxing challenges, and return to saved progress at your own pace.", "Casual_game"),
  genre("educational", "purpose", "Educational", "Practice a chosen subject through interactive problems, receive explanations, and apply what you learn to new challenges.", "Educational_game"),
  genre("math-learning", "purpose", "Math Learning", "Solve arithmetic or spatial problems through playable situations and use feedback to tackle more demanding puzzles.", "Educational_game"),
  genre("esports", "purpose", "Competitive Tournament", "Master a clear skill challenge, face AI opponents or local players, and advance through a tournament with consistent rules.", "Esports"),
  genre("fitness", "purpose", "Fitness Game", "Follow a paced movement routine, complete comfortable activity challenges, and track participation with accessible input options.", "Exergame_(Fitness_Game)"),
  genre("personalized", "purpose", "Personalized Game", "Explore a short adventure shaped by details supplied for its recipient, solving personal clues and reaching a celebratory goal.", "Personalized_game"),
  genre("serious", "purpose", "Serious Game", "Practice decisions in a focused training scenario, observe consequences, and reflect on feedback to improve the next attempt.", "Serious_game"),
  genre("sandbox", "sandbox", "Sandbox", "Combine tools and materials in a responsive space, test your own ideas, and discover unexpected interactions.", "Sandbox"),
  genre("creative", "sandbox", "Creative", "Build and reshape a scene with an open set of materials, experiment freely, and play with what you create.", "Creative"),
  genre("open-world", "sandbox", "Open World", "Roam a compact open region, discover optional activities, and choose your own route through its objectives.", "Open_world"),
  genre("software-toy", "sandbox", "Software Toy", "Manipulate a playful set of objects, discover their reactions, and compose small experiments without a required victory condition.", "Sandbox"),
  genre("space-trading", "management", "Space Trading", "Pilot between settlements, compare local markets, deliver cargo, and improve a ship through successful trade runs.", "Sandbox"),
  // Existing sampler capability retained independently of the article’s content headings.
  templateGenre("pinball", "pinball", "Pinball", "pinball")
];

// packages/l10n/src/TranslationsManager.ts
var TranslationsManager = class {
  locale = "en";
  translations = {};
  getTranslation(locale = this.locale) {
    return this.translations[locale] || {};
  }
  setTranslation(locale, translations) {
    this.locale = locale;
    this.translations[locale] = translations;
  }
};

// packages/l10n/src/l10n.ts
var L10n = class {
  translationManager = new TranslationsManager();
  isTranslationActive = true;
  createT = (locale) => {
    return (arg, ...args) => {
      const { key, message, data } = this.calculateKey(arg, args);
      const translations = this.translationManager.getTranslation(locale);
      const S = this.isTranslationActive && Object.hasOwn(translations, key) ? translations[key] : message;
      return this.replaceVariables(S || message, data);
    };
  };
  t = this.createT();
  // usage: l10n.locale('en').t("Hello")
  locale = (l) => ({
    t: this.createT(l)
  });
  /**
   * Runs fn with l10n.t returning the untranslated source message (placeholders
   * still interpolated), regardless of loaded bundles. Synchronous callbacks
   * only: an async callback loses the effect after its first await.
   */
  withTranslationDeactivated(fn) {
    const previousState = this.isTranslationActive;
    this.isTranslationActive = false;
    try {
      return fn();
    } finally {
      this.isTranslationActive = previousState;
    }
  }
  /**
   * input example: s = 'Hello {name}!' , data = { name: 'John' }
   * output example: Hello John!
   * @param S The string containing placeholders in format {key}
   * @param data Object containing values to replace placeholders
   */
  replaceVariables(S, data) {
    if (!data) return S;
    return S.replace(
      /\{([^{}]+)\}/g,
      (match, key) => Object.hasOwn(data, key) ? this.convertValueToString(data[key]) : match
    );
  }
  /**
   *  input example:  'Hello <a>John</a>'
   *  output example: [ { type: 'text', text: 'Hello ' } , { type: 'tag', tagName: 'a', text: 'John' } ]
   * @param s
   */
  parseTemplateToFragments(s, components) {
    const result = [];
    const matchResults = [];
    if (components) {
      const keys = Object.keys(components);
      for (let i = 0; i < keys.length; i++) {
        const compName = keys[i];
        const regexp = new RegExp(
          `<${compName}>([\\s\\S]*?)</${compName}>`,
          "g"
        );
        let match;
        while (match = regexp.exec(s)) {
          matchResults.push({
            startIndex: match.index,
            endIndex: match.index + match[0].length,
            compName,
            renderText: match[1] || ""
          });
        }
      }
      matchResults.sort((a, b) => a.startIndex - b.startIndex);
    }
    if (matchResults.length === 0) {
      result.push({
        type: "text",
        text: s
      });
    } else {
      let lastEndIndex = 0;
      for (let i = 0; i < matchResults.length; i++) {
        const matchResult = matchResults[i];
        const { startIndex, endIndex, compName, renderText } = matchResult;
        if (startIndex > lastEndIndex) {
          result.push({
            type: "text",
            text: s.slice(lastEndIndex, startIndex)
          });
        }
        result.push({
          type: "component",
          compName,
          renderText
        });
        lastEndIndex = endIndex;
      }
      if (lastEndIndex < s.length) {
        result.push({
          type: "text",
          text: s.slice(lastEndIndex)
        });
      }
    }
    return result;
  }
  convertValueToString(dataValue) {
    if (typeof dataValue === "string") {
      return dataValue;
    }
    if (typeof dataValue === "number") {
      return dataValue.toString();
    }
    if (typeof dataValue === "boolean") {
      return dataValue ? "true" : "false";
    }
    if (dataValue === void 0 || dataValue === null) {
      return "";
    }
    return "";
  }
  calculateKey(arg, args) {
    if (arg === null || arg === void 0) {
      throw new Error("Translation key cannot be null or undefined");
    }
    if (typeof arg === "string") {
      const message = arg;
      if (args.length === 0) {
        return {
          key: message,
          message,
          data: {}
        };
      }
      if (Array.isArray(args[0])) {
        const data2 = {};
        args[0].forEach((value, index) => {
          data2[index] = value;
        });
        return {
          key: message,
          message,
          data: data2
        };
      }
      if (typeof args[0] === "object") {
        return {
          key: message,
          message,
          data: args[0]
        };
      }
      const data = {};
      args.forEach((value, index) => {
        data[index] = value;
      });
      return {
        key: message,
        message,
        data
      };
    }
    if (typeof arg === "object") {
      const { message, args: messageArgs, comment } = arg;
      const messagePostfix = comment ? "/" + (Array.isArray(comment) ? comment.join("") : comment) : "";
      if (typeof message !== "string") {
        throw new Error("Message must be a string");
      }
      if (!messageArgs) {
        return {
          key: message + messagePostfix,
          message,
          data: {}
        };
      }
      if (Array.isArray(messageArgs)) {
        const data = {};
        messageArgs.forEach((value, index) => {
          data[index] = value;
        });
        return {
          key: message + messagePostfix,
          message,
          data
        };
      }
      if (typeof messageArgs === "object") {
        return {
          key: message + messagePostfix,
          message,
          data: messageArgs
        };
      }
    }
    throw new Error("Invalid translation key type");
  }
};
var l10n = new L10n();

// shared/gameBlueprintTemplates.ts
var GAME_BLUEPRINT_TEMPLATES = {
  platformer: {
    label: l10n.locale("en").t("Horizontal Platformer"),
    description: l10n.locale("en").t("Run and jump through a felt-and-yarn world, collect treasures, and avoid robot vacuums.")
  },
  "bullet-hell": {
    label: l10n.locale("en").t("Bullet-Hell Shooter"),
    description: l10n.locale("en").t("Pilot a spaceship through scrolling enemy formations, collect upgrades, and battle bosses.")
  },
  "vertical-platformer": {
    label: l10n.locale("en").t("Vertical Platformer"),
    description: l10n.locale("en").t("Bounce up a hand-drawn world, dodge hazards, collect stars, and unlock character skins.")
  },
  scroller: {
    label: l10n.locale("en").t("Side Scroller"),
    description: l10n.locale("en").t("Run, shoot and grapple across three stages, throw enemies and explosive props, build STYLE ranks, and unleash FURY against the Rhino Crawler.")
  },
  td: {
    label: l10n.locale("en").t("Tower Defense"),
    description: l10n.locale("en").t("Place, upgrade, and merge elemental guardians to defend against waves of enemies.")
  },
  rts: {
    label: l10n.locale("en").t("Real-Time Strategy"),
    description: l10n.locale("en").t("Rescue classmates, capture classrooms, train superheroes, and defend your school against waves of invaders.")
  },
  "trading-card": {
    label: l10n.locale("en").t("Card Battler"),
    description: l10n.locale("en").t("Build a deck, play units and spells, and plan tactical card battles.")
  },
  puzzle: {
    label: l10n.locale("en").t("Puzzle"),
    description: l10n.locale("en").t("Drop and merge matching plushies, chase growing goals, and play solo or local split-screen.")
  },
  pinball: {
    label: l10n.locale("en").t("Pinball"),
    description: l10n.locale("en").t("Launch a comet, keep it in play with flippers, complete table missions, and score multiball jackpots.")
  }
};

// shared/gameStarterCatalog.ts
var GAME_STARTER_CATALOG = {
  generic: { id: "game-generic-v56", reference: "game-generic.md" },
  platformer: { id: "game-platformer-v62", reference: "game-platformer.md" },
  "bullet-hell": { id: "game-bullet-hell-v52", reference: "game-bullet-hell.md" },
  "vertical-platformer": { id: "game-vertical-platformer-v63", reference: "game-vertical-platformer.md" },
  scroller: { id: "game-scroller-v63", reference: "game-scroller.md" },
  td: { id: "game-td-v67", reference: "game-td.md" },
  rts: { id: "game-rts-v63", reference: "game-rts.md" },
  "trading-card": { id: "game-trading-card-v56", reference: "game-trading-card.md" },
  "generic-multiplayer": { id: "game-generic-multiplayer-v40", reference: "game-generic-multiplayer.md" },
  puzzle: { id: "game-puzzle-v63", reference: "game-puzzle.md" },
  pinball: { id: "game-pinball-v9", reference: "game-pinball.md" }
};
var GAME_STARTER_CHOICES = Object.keys(GAME_STARTER_CATALOG);

// mcp/gameBlueprintSuggestions.ts
var GAMEPLAY_BRIEFS = {
  platformer: "Run and jump across platforms, navigate hazards, collect items, and reach the level goal.",
  "bullet-hell": "Move and shoot through scrolling stages, dodge projectile patterns, collect upgrades, and defeat bosses.",
  "vertical-platformer": "Auto-bounce upward between platforms, steer around hazards, collect items, and chase a height score.",
  scroller: "Run and shoot through side-scrolling stages, grapple and throw enemies or props, build style ranks, and unleash a powered-up combat mode.",
  td: "Place, upgrade, and merge elemental guardians to stop enemy waves from reaching the objective.",
  rts: "Rescue civilians, capture production points, train units, and command squads to defend an objective against enemy waves.",
  "trading-card": "Build a deck, manage resources, and play units and abilities in tactical card battles.",
  puzzle: "Aim and drop pieces, merge matching pieces into larger ones, and manage limited space while chasing score goals; supports solo or local split-screen.",
  pinball: "Charge and launch a ball, time flipper shots, hit table targets, complete missions, and earn multiball jackpots before time or balls run out."
};

// mcp/gameIdeaSuggestions.ts
var GAME_IDEA_SUGGESTION_GUIDANCE = "Treat these genres and mechanics as inspiration, not finished game ideas or available starter templates. Keep each sampled genre and core loop, but invent an original, coherent setting, player role, goal, hazards and visual identity. For purpose-based categories, make the supplied playable loop concrete rather than pitching only a purpose. Honor the user's supplied gameplay, 2D/3D, engine, language and other constraints; invent only what remains open. Use neutral themes by default. Introduce religious themes, specific organizations or brands, political parties or partisan causes, or racial or ethnic group-specific themes only when explicitly requested by the user. Do not infer such a request from language, locale, name or identity. Default to single-player, computer opponents or same-device local play. Preserve explicitly requested online play for eligible genres and follow installed setup guidance; do not introduce MMO or online-multiplayer-specific genres. Write three distinct short titles and concrete pitches explaining what you control, what you do and why. Keep genre IDs internal. A genreId is not a gameStarter or an initialization argument; follow the installed game setup guidance after selection. These are proposals only and create no project, Blueprint or approval.";
function suggestGameIdeas(randomIndex = randomInt) {
  let candidates = [...GAME_IDEA_GENRES];
  if (new Set(candidates.map((genre2) => genre2.family)).size < 3) throw new Error("At least three game idea families must be available");
  const suggestions = [];
  for (let count = 0; count < 3; count++) {
    const genre2 = candidates[randomIndex(candidates.length)];
    const description = genre2.mechanicsTemplate ? GAMEPLAY_BRIEFS[genre2.mechanicsTemplate] : genre2.description;
    suggestions.push({ genreId: genre2.id, family: genre2.family, label: genre2.label, description });
    candidates = candidates.filter((candidate) => candidate.family !== genre2.family);
  }
  return suggestions;
}

// skill-src/internal/scripts/suggest-game-templates.ts
try {
  console.log(JSON.stringify({
    suggestions: suggestGameIdeas(),
    guidance: GAME_IDEA_SUGGESTION_GUIDANCE
  }));
} catch (error) {
  console.error(`Unable to sample game genres: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
