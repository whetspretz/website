import type { Slide, MiniProjectBlock } from './slideTypes'

export interface CaseStudy {
  kind: 'project'
  slug: string
  title: string
  tag: string
  year: string
  description: string
  hero: string
  slides: Slide[]
  locked?: boolean
}

export interface SectionDivider {
  kind: 'divider'
  label: string
}

export interface MiniProject {
  kind: 'mini'
  slug: string
  title: string
  tag: string
  year: string
  description: string
  blocks: MiniProjectBlock[]
  locked?: boolean
}

export interface TrashItem {
  kind: 'trash-item'
  slug: string
  title: string
  tag: string
  year: string
  pdfSrc: string
}

export type CaseStudyEntry = CaseStudy | MiniProject | SectionDivider
export type TrashEntry = TrashItem | SectionDivider

/**
 * Case studies data.
 *
 * Images go in public/projects/<slug>/
 * Reference them as "/projects/<slug>/filename.webp"
 */
export const CASE_STUDIES: CaseStudyEntry[] = [

  {
    kind: 'project',
    slug: 'shelfspace',
    title: 'Shelfspace',
    tag: 'Reading app',
    year: '2025-2026',
    description: 'Book discovery for readers, by readers.',
    hero: '/projects/shelfspace/hero-shelf.webp',
    locked: true,
    slides: [
      /* ===================================
   Shelfspace
   =================================== */
      {
        type: 'intro',
        title: 'Shelfspace',
        subtitle: [
          'Book discovery for readers, by readers.',
        ],
        meta: [
          { label: 'When', value: '2025-present' },
          { label: 'Role', value: 'Founding Designer' },
          { label: 'Team', value: '3 Friends (Eng, PM, & Me—all builders)' },
        ],
        tags: ['Product Design', 'Frontend'],
        dividers: { afterSubtitle: 'rainbow' },
        avatarSrc: '',
        logoSrc: '',
      },
      {
        type: 'toc',
        title: 'Contents',
        entries: [
          { label: 'Project Background', slideIndex: 2 },
          { label: '1. The Shelf Concept', slideIndex: 9 },
          { label: '2. Moodreader', slideIndex: 24 },
          { label: '3. Book Details', slideIndex: 40 },
          { label: '4. Onboarding', slideIndex: 56 },
      
        ],
      },
      { type: 'title', title: 'Project Background', caption: 'Why did my friends and I build Shelfspace?' },

      { type: 'quote', text: 'Discovering and sharing good books is hard.', attribution: 'Core pain' },
      {
        type: 'split',
        title: 'The current ecosystem',
        imagePosition: 'right',  // or 'left'
        imageSrc: '/projects/shelfspace/comparison.webp',
        imageAlt: 'The current landscape of books apps.',
        bullets: [
          `Goodreads is aleep at the wheel. It's great at tracking books, but weak at understanding taste. It treats reading as a flat activity feed—ratings, reviews, and yearly goals—rather than a signal of why someone liked a book. Five-star ratings collapse nuance, social graphs are noisy, and recommendations optimize for popularity over alignment. The result is a platform that's excellent at cataloging what you've read, but not at helping you discover what you'll actually love next.  `,
          `Booktok has been a boon for the book community, but it's also an echo chamber by design of the algorithm.`,
          'Fable is focused on book clubs.',
          'Storygraph is the next best thing, but it feels like a chore and a spreadsheet.',
        ],
      },
      { type: 'quote', text: 'The world lacks a space where passionate readers can not just track their books, but express their taste.', attribution: 'Our Manifesto.' },
      {
        type: 'image',
        title: 'We talked to friends, mutuals and followers on Booktok (I made a videos/stories to engage), and tested our ideas with friends quickily.',
        imageSrc: '/projects/shelfspace/background-research.webp',
        imageAlt: 'Goals visualization',
        caption: 'Insight: Users want personalized, taste-driven discovery and meaningful connections around books, potentially even more with strangers who share their taste than with friends who don\'t.',
      },
    
      {
        type: 'blank',
        title: 'Our approach is to understand the user more than they know themselves.',
        componentId: 'taste-discovery',
      },

      {
        type: 'timeline',
        title: 'Shelfspace Timeline',
        entries: [
          { label: 'Research and Ideation', sublabel: 'Prove Concept', startYear: 2025, startMonth: 6, endYear: 2025, endMonth: 8, details: ['This is when we wanted to validate our own pain points and get feedback from users on our early ideas and hypothesis.'] },
          { label: 'Iteration', sublabel: 'Test real designs and refine.', startYear: 2025, startMonth: 9, endYear: 2025, endMonth: 10, details: ['Goal: solidify design and scope.'] },
          { label: 'MVP', sublabel: 'Build out our MVP', startYear: 2025, startMonth: 11, endYear: 2026, endMonth: 2, details: ['Get something ready that we can launch to friends and family'] },
          { label: 'Friends & Family', sublabel: 'Can we find PMF?', startYear: 2026, startMonth: 3, endYear: 2026, endMonth: 4, details: ['We hope to launch in March, learn what\'s working and what isn\'t, and evolve.'] },
        ],
        caption: 'The project timeline.',
      },
      { type: 'title', title: '1. Shelves, baby!', caption: 'It\'s not just shelf, it\'s a philosophical approach to book discovery UX/UI.' },

      {
        type: 'split',
        title: 'A shelf is many things',
        imagePosition: 'right',
        componentId: 'shelfspace-graphic',
        bullets: [
          'It\'s a home for your books and how you keep track of them.',
          'It\'s an expression of who you are. What you put where matters.',
          'It draws curiosity.',
          'When you think of a bookstore, you think of endless hours scouring shelves for something to inspire. They encourage discovery.',
        ],
        caption: 'shelves are not just four walls, but a frame of your soul.',
      },
      {
        type: 'split',
        title: 'Embedded in the name, it drives our vision.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/logo_spacing.webp',
        bullets: [
          'A nod to the Myspace era: inspired by the Top 8, we imagined a “top shelf” of books that signals taste and becomes the foundation for a living taste graph.',
          'Shelves are personal and proud: what you put on display at home says something about you.',
          `More than tracking: Shelfspace isn't about logging reads; it's about expressing identity through what you choose to keep on your shelf.`,
        ],
      },
   
      {
        type: 'image',
        title: 'What does a shelf mean on a screen?',
        imageSrc: '/projects/shelfspace/exploration-otherapps.webp',
        imageAlt: 'App comparison',
        caption: 'The UX of what a shelf could be is wide. At it\'s heart, digitally, it\'s a collection of books. That\'s lists, groupings, or associations.',
      },

      { type: 'image', title: 'Inspo gathering, exploration, and AI-vision iterations. ', videoSrc: '/projects/shelfspace/exploration.mp4', },
      { type: 'quote', text: '"Do the interesting thing."', attribution: '—Ken Liu.' },
  
      {
        type: 'image',
        title: 'I kept coming back to bookshelves.',
        imageSrc: '/projects/shelfspace/our_experience.webp',
        imageAlt: 'App comparison',
        caption: 'How might we recreate the magic of a bookshelf without being literal or cliche?.',
      },
      {
        type: 'image',
        title: 'No one has done \'shelves\' right.',
        imageSrc: '/projects/shelfspace/ugg-shelves.webp',
        imageAlt: 'Ugly shelves',
        caption: 'It\'s a threading of the needle to make this work.',
      },
      { type: 'image', title: 'I explored more around the idea of shelves to see if I could create the magic of a real shelf.', videoSrc: '/projects/shelfspace/second-discovery.mp4', },

      {
        type: 'split',
        title: 'Shelves become the backbone of a person\'s profile.',
        imagePosition: 'right',  // or 'left'
        imageSrc: '/projects/shelfspace/home-angle.webp',
        imageAlt: 'Screenshot description',
        bullets: [
          `The shelf behaves like a real bookcase. You browse spines, pull a book forward on hover, read the jacket on click, and dive deeper only when you're ready to commit.`,
          `Covers earn attention, not demand it. They're intentionally masked and revealed on hover or tap, letting curiosity—not noise—do the work. `,
          'Irregular book heights are a feature. Tall and short spines break rigid grids, slow the eye, and make the shelf feel lived-in rather than blocky.',
          'Shelf titles and controls stay quiet. Present enough to orient you, restrained enough to keep the focus on the books themselves.',
        ],
        caption: 'Your bookcase in your pocket.',
      },
      { type: 'image', title: 'Working UI in storybook.', videoSrc: '/projects/shelfspace/stroybook_shelfexample.mp4', },
      {
        type: 'image',
        title: 'Shelf discovery allows for a visual experience that encourages discovery.',
        imageSrc: '/projects/shelfspace/home-friend-shelf.webp',
        imageAlt: 'Ugly shelves',
        caption: 'Balancing Maximalism with Minimalism. ',
      },
      { type: 'image', title: 'A peek inside my Figma file + build a shelf.', videoSrc: '/projects/shelfspace/work_laidout.mp4', },
      {
        type: 'split',
        title: 'Shelves as a growth loop.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/insta_shelves.webp',
        bullets: [
          'A reader\'s 2026 mixed tape.',
          'Visually appealing.',
          `FOMO when your favorite influencer shares a shelf.`,
        ],
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about MoodReader Discovery.' },
      { type: 'title', title: 'Moodreader', caption: 'How we built a book discovery engine.' },
      { type: 'quote', text: 'Book discovery is moody.', attribution: 'Mood > Genre' },
      {
        type: 'split',
        title: 'Reading decisions are emotional, not categorical.',
        imagePosition: 'right',
        componentId: 'mood-spinner',
        bullets: [
          `People don't open a book app thinking "I want literary fiction." They think: "I need comfort. I want escape. I want to feel something."`,
          'Most discovery tools ignore that and force readers to translate feelings into filters.',
          `"My taste stays the same. My mood doesn't."`,
        ],
      },
      {
        type: 'image',
        title: 'Every single research participant mentioned switching reading moods between books and wanting to browse by vibe/emotion rather than genre.',
        imageSrc: '/projects/shelfspace/mood-research-disc.webp',
        imageAlt: 'User research',
        caption: 'We talked to all of the people we tested our prototypes with, and asked how they pick their next read.',
      },
      {
        type: 'split',
        title: 'Most book apps confuse identity with inventory.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/mood-other-apps.webp',
        bullets: [ 
          'Genre explains what a book is, not why it resonates.',
          'Feeds optimize for popularity, not personal intent.',
          'Readers are left translating feelings into filters—and hoping for the best.',
        ],
      },

      { type: 'quote', text: 'Book Discovery should feel like asking a best friend “what should I read when I\’m feeling like *this*?”', attribution: 'Vision' },
      { type: 'image', title: 'The first round of exploration focused on shelves or match scores to carry the mood.', videoSrc: '/projects/shelfspace/mood-first-discovery.mp4', },
      {
        type: 'image',
        title: 'A closer look.',
        imageSrc: '/projects/shelfspace/mood-explore-2.webp',
        imageAlt: 'Design exploration',
        caption: 'This approach feels too expected. Not strong enough of a solution.',
      },
      {
        type: 'split',
        title: 'We took a sharper eye at our archetype motivations.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/mood-motivations.webp',
        bullets: [
          'Wonder: Get lost in another world.',
          'Puzzles: Solve puzzles and twists.',
          'Adrenaline: Heart-pounding action',
          'Catharsis: Feel all the emotions',
          'Passion: Chemistry and butterflies',
          'Learning: Learn something new',
          'Philosophy: Sit with big questions',
        ],
      },
      { type: 'image', title: 'More exploration based on mood and vibe.', videoSrc: '/projects/shelfspace/moodexploration2.mp4', },
      {
        type: 'image',
        title: 'Inspired by mood rings.',
        imageSrc: '/projects/shelfspace/moodring-img.webp',
        imageAlt: 'Mood ring.',
        caption: 'I could play with this.',
      },
      {
        type: 'blank',
        title: 'My mood orb that changes by mood.',
        componentId: 'mood-orb',
      },
      {
        type: 'image',
        title: 'Designs',
        imageSrc: '/projects/shelfspace/moodread-home.webp',
        imageAlt: 'Phone screen.',
        caption: 'Readers are met with a path to discover via mood, or search shelves that fit their tastes.',
      },
      {
        type: 'image',
        title: 'Designs',
        imageSrc: '/projects/shelfspace/mood3.webp',
        imageAlt: 'Phone screen.',
        caption: 'As selections are made, the orb changes color.',
      },
      {
        type: 'image',
        title: 'Designs',
        imageSrc: '/projects/shelfspace/moodfinal.webp',
        imageAlt: 'Phone screen.',
        caption: 'Readers are brought to the discover tab with a mood set.',
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about Book Details.' },
      { type: 'title', title: 'Book Details', caption: 'Is this book right for me?' },
      { type: 'quote', text: 'Readers struggle to decide on books.', attribution: 'Problem' },
      {
        type: 'split',
        title: 'From interviews and behavior patterns:',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/bookdeets-research-quotes.webp',
        bullets: [ 
          'Readers don\’t (fully) trust aggregate ratings.',
          'They skim reviews looking for someone like them.',
          'They want emotional clarity (“Will this wreck me?”).',
          'They save books impulsively and forget why later.',
        ],
        caption: 'Discovery is emotional (moody). Decision-making is rational.',
      },
      {
        type: 'split',
        title: 'If we synthesize taste alignment + community context + emotional metadata into one structured view, readings will...',
        imagePosition: 'right',
        componentId: 'synthesis',
        bullets: [
          'Decide faster.',
          'Trust recommendations more.',
          'Save with intention instead of impulse.',
        ],
        caption: 'The Book Details View should be a conviction engine, not a product page.',
      },
      {
        type: 'split',
        title: 'How might we design a book page that answers: “Will I like this?”',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/bookdeets_workshop.webp',
        bullets: [ 
          'Trust mapping: what we think based on interviews and high-valued reviews on other apps.',
        ],
      },
      {
        type: 'split',
        title: 'We structured the page around 4 layers:',
        imagePosition: 'right',
        componentId: 'four-layers',
        bullets: [ 
          '	1.	Immediate Recognition (What is this?)',
          '	2.	Personal Fit (Is this for me?)',
          '	3.	Social Proof with Context (Who else liked this?)',
          '	4.	Action & Expression (What do I do with it?)',
        ],
        caption: 'Confidence → Context → Commitment.',
      },
      {
        type: 'split',
        title: 'How we handled information hierarchy.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/bookdeets_arch.webp',
        bullets: [ 
          '',
        ],
      },
      { type: 'image', title: 'Exploring what this could look like.', videoSrc: '/projects/shelfspace/bookdeets_wires.mp4', },
      { type: 'image', title: 'The full page.', videoSrc: '/projects/shelfspace/bookdeets_scroll.mp4', },
      {
        type: 'image',
        title: 'Top of the page.',
        imageSrc: '/projects/shelfspace/bookdeets_reasoning.webp',
        imageAlt: 'Book details reasoning.',
      },
      {
        type: 'image',
        title: 'Midway of page.',
        imageSrc: '/projects/shelfspace/bookdeets_reasoning2.webp',
        imageAlt: 'Book details reasoning.',
      },
      {
        type: 'image',
        title: 'Bottom of page.',
        imageSrc: '/projects/shelfspace/bookdeets_reasoning3.webp',
        imageAlt: 'Book details reasoning.',
      },
      {
        type: 'image',
        title: 'Visual candy.',
        imageSrc: '/projects/shelfspace/bookdeets_reasoning-backgrounds.webp',
        imageAlt: 'Book details reasoning.',
      },
      {
        type: 'image',
        title: 'Rating a book.',
        imageSrc: '/projects/shelfspace/bookdeets_rateabook.webp',
        imageAlt: 'Rating a book.',
      },
      {
        type: 'split',
        title: 'Early signs of success.',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/bookdeets-results.webp',
        bullets: [ 
          'High save-to-shelf rate. (baseline 5%)',
          'Fast time-to-save.',
          'Shelf exploration.',
          'Low bounce from book pages.',
        ],
        caption: 'Plus qualitative feedback: “I love that it tells me why I\’ll like it.”',
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about Onboarding + Reader Profile.' },
      { type: 'title', title: 'Onboarding + Reader Profile', caption: 'Our very own sorting hat.' },
      { type: 'quote', text: 'Onboarding in book apps feels like data entry.', attribution: 'The Problem.' },
      {
        type: 'blank',
        title: 'Imagine adding the hundreds of books from your past.',
        componentId: 'book-orbit',
      },
      { type: 'quote', text: 'Readers want to be seen.', attribution: 'Research Insight flipping a problem into an opportunity.' },
      {
        type: 'split',
        title: 'If we turn onboarding into a taste reveal moment, users will:',
        imagePosition: 'left',
        componentId: 'taste-reveal',
        bullets: [
          'Trust our recommendations faster.',
          'Feel emotionally invested earlier.',
          'Be more likely to share & invite friends.',
          'Avoid cold start fatigue*.',
        ],
        caption: 'We won\'t ask users to tell us who they are, we show them.',
      },
      {
        type: 'blank',
        title: 'Design Principles',
        componentId: 'design-principles',
       
      },
      {
        type: 'blank',
        title: 'Welcome and Goodreads Import',
        componentId: 'onboarding-videos',
      },
      {
        type: 'image',
        title: 'Delight and voice.',
        imageSrc: '/projects/shelfspace/onboarding_inter.webp',
        imageAlt: 'Delight design.',
        caption: 'If Goodreads data is uploaded, we offer feedback in our voice along with spinning books at random from your history.',
      },
      {
        type: 'image',
        title: 'Pick your top 7',
        imageSrc: '/projects/shelfspace/Onboarding_top7.webp',
        imageAlt: 'Delight design.',
        caption: 'This is a little bit intentional friction that: 1. Teaches users to build shelves. 2. Gives us weighted book data. 3. Immediate personalization.  ',
      },
      {
        type: 'image',
        title: 'Your taste Archetype',
        imageSrc: '/projects/shelfspace/onboarding-archetype.webp',
        imageAlt: 'Taste Archetype.',
        caption: 'Based on a reader\'s reading hiustory and top 7 books, we are able to discern an archetype for them. ',
      },
      { type: 'blank', title: 'Wowie', componentId: 'archetype-videos' },
      {
        type: 'image',
        title: 'All Archetypes',
        imageSrc: '/projects/shelfspace/archetypes.webp',
        imageAlt: 'Delight design.',
        caption: 'All of the archetypes illustrated. ',
      },
      { type: 'image', title: 'Reader DNA breakdown.', videoSrc: '/projects/shelfspace/onboarding_genres.mp4', },
      {
        type: 'image',
        title: 'More revealed about the reader',
        imageSrc: '/projects/shelfspace/onboarding_final4.webp',
        imageAlt: 'Reader reveals.',
        caption: 'All of the archetypes illustrated. ',
      },   
      {
        type: 'image',
        title: 'Recommended shelves made of their books.',
        imageSrc: '/projects/shelfspace/onboarding_finalshelves.webp',
        imageAlt: 'Recommended shelves.',
        caption: 'Get them started with a full digital bookcase.',
      },
      {
        type: 'split',
        title: 'We solve cold start by:',
        imagePosition: 'left',
        imageSrc: '/projects/shelfspace/myshelves.webp',
        bullets: [ 
          'Importing Goodreads (if available).',
          'Anchoring on 7 emotional favorites.',
          'Generating archetype blend.',
          'Pre-building 2\–3 shelves.',
          'Thus, the reader lands in an experience that already feels like them.',
        ],
        caption: 'No empty state.',
      },
      { type: 'title', title: 'Fin', caption: 'Questions?' },
     
    ],
  },
  /* ===================================
   Pigeon 
   =================================== */
  {
    kind: 'project',
    slug: 'pigeon',
    title: 'Pigeon AI',
    tag: 'AI agent harness / The \'Openclaw\' or \'Cursor\' for traders',
    year: '2025-2026',
    description: 'I designed the end-to-end experience for a chat-based research + trading agent that turns messy, real-world intent ("buy X", "what\'s happening today", "move funds") into safe, verifiable actions across chains and venues\u2014without making users learn new interfaces.',
    hero: '/projects/pigeon/hero-pigeon.webp',
    locked: true,
    slides: [
      {
        type: 'intro',
        title: 'Pigeon',
        subtitle: [
          ' The first agentic wallet that can talk, code, research, and trade from anywhere. The \'Cursor\' of trading.',
        ],
        meta: [
          { label: 'When', value: '2025-present' },
          { label: 'Role', value: 'Designer' },
          { label: 'Team', value: 'Core Team (2 ENG, 1 PM, & Me)' },
        ],
        tags: ['Product Design', 'Experience Design', 'Frontend'],
        dividers: { afterSubtitle: 'rainbow' },
        avatarSrc: '',
        logoSrc: '/projects/pigeon/pigeon-logo.webp',
      },
      {
        type: 'toc',
        title: 'Contents',
        entries: [
          { label: 'Context', slideIndex: 2 },
          { label: 'Early Onboarding', slideIndex: 11 },
          { label: 'Branding', slideIndex: 26 },
          { label: 'Pigeon Terminal', slideIndex: 47 },

        ],
      },
      { type: 'title', title: 'Trading is fragmented. Users shouldn\'t have to be the glue.', caption: 'Research lives on X/news/Dex tools, execution lives in wallets/exchanges, and the hardest part—turning messy human intent into correct, safe, verifiable actions—falls on the person.' },
      {
        type: 'split',
        title: 'This leads to 3 core failures:',
        imagePosition: 'right',
        componentId: 'overwhelmed-trader',
        bullets: [
          'Context-switching tax: you bounce between apps to go from idea -> trade.',
          'Intent ambiguity: "Buy this, close that, bridge funds." is underspecified.',
          'Trust gap: Who can I trust with my money.',
        ],
        caption: 'All on top of Crypto, an industry with a learning curve and a troubled reputation',
      },
      {
        type: 'split',
        title: 'Discussed and experienced by everyone on the team',
        imagePosition: 'right',
        imageSrc: '/projects/pigeon/brainstorm1.webp',
        imageAlt: 'Team brainstorm session',
        bullets: [
          'Keeping track of current market trends in one tab, dexscreener in another, gpt in a third, and a terminal in a fourth',
          'Bridging isn\'t always seemless. Takes effort. UX stress/step.',
          'Do I need a VPN for this product, or is it just buggy?',
        ],
        caption: 'Expert traders have the tools, time, and experience to handle all of this, but not everyone.',
      },
      {
        type: 'split',
        title: 'Our hypothesis: ',
        imagePosition: 'left',
        componentId: 'chat-simplicity',
        bullets: [

          'How might users leverage AI (probabilistic models) to gain an edge in a high stakes environment where you need deterministic policy and action?',
          'AI is finally smart enough to trade real money.',
        ],
        caption: 'In July of 2025, this was very much and uncertain notion given how much models still hallucinated. When working with someone\'s money, you have to make sure AI acts without mistake.',
      },
      {
        type: 'image',
        title: 'AI was not smart enough, and it only made slop.',
        imageSrc: '/projects/pigeon/pigeon-wrong-example.webp',
        imageAlt: 'App mockup',
        caption: 'When Pigeon was but a baby AI, it couldn\'t even tell me what was in the wallet it made for me.',
      },
      {
        type: 'timeline',
        title: 'Pigeon Timeline',
        entries: [
          { label: 'Incubation', sublabel: 'Prove Concept', startYear: 2025, startMonth: 8, endYear: 2025, endMonth: 9, details: ['Goal: Make on sms and telegram'] },
          { label: 'MVP', sublabel: 'Get it in front of users', startYear: 2025, startMonth: 10, endYear: 2025, endMonth: 12, details: ['Goal: Make it reliable and find PMF'] },
          { label: 'MCP', sublabel: 'Open up Pigeon to ultimate customization', startYear: 2026, startMonth: 1, endYear: 2026, endMonth: 1, details: ['Prove Pigeon could work as a \'vibe trader\''] },
          { label: 'Terminal', sublabel: 'Terminal Builder', startYear: 2026, startMonth: 2, endYear: 2026, endMonth: 3, details: ['Release a Terminal Builder. Pigeon can create the UI\'s a user wants.'] },
        ],
        caption: 'We set out to make Pigeon more intellegent, and phased rollout to ensure proper training of the ai and that it makes fewer mistakes.',
      },
      {
        type: 'blank',
        title: 'Pigeon has since come a long way to collapse complexity. Trading is as simple as a chat.',
        componentId: 'pigeon-hub',
      },
      {
        type: 'image',
        title: 'For example',
        imageSrc: '/projects/pigeon/pigeon-poly-example.webp',
        imageAlt: 'App mockup',
        caption: 'Pigeon quickily executing a sell-off of one of my Polymarket bets. Fast, quick, no fuss.',
      },

      { type: 'title', title: 'It wasn\'t easy getting here.', caption: 'But you\'re not here to listen to the technical journey. I\'ll walk you through the design impact that evolved our little \'pidgey\' into a \'Pidgeotto\' into a \'Pidgeot\'. And how this this chat bot became a terminal that builds terminals.' },

      { type: 'title', title: 'Onboarding onto Pigeon', caption: 'Trust is key.' },
      {
        type: 'blank',
        title: 'Pigeon User Journey',
        componentId: 'pigeon-journey',
      },
      {
        type: 'split',
        title: 'Although chat-based trading isn\’t new (Bonkbot, Bankr, etc.), AI trading via natural language was still novel.',
        imagePosition: 'left',
        imageSrc: '/projects/pigeon/onboarding_old.webp',
        bullets: [ 
          'What we heard from users: ',
          '"What do I do?"',
          '"I don\'t know what\'s possible."',
          '"Oh, so I can just ask it to place bets?"',
          'Pigeon does so much, it suffers from not having clear focus or framing',
        ],
      },
      {
        type: 'split',
        title: 'Early data showed:',
        imagePosition: 'right',
        imageSrc: '/projects/pigeon/onboarding_old.webp',
        bullets: [ 
          'High first-session drop-off.',
          'Low reengagement.',
          'Confusion before first executed trade.',
          'The problem was clearly ... clarity.',
        ],
      },
      {
        type: 'blank',
        title: 'Our Hypothesis',
        componentId: 'hypothesis',
      },
      { type: 'quote', text: 'Conversation is the interface. Onboarding UX has to live in conversation.', attribution: 'Design Ethos.' },
      {
        type: 'image',
        title: 'Intro part 1',
        imageSrc: '/projects/pigeon/onboarding_pigeonpt1.webp',
        imageAlt: 'Onboarding screen 1',
        caption: '3 core changes.',
      },
      {
        type: 'image',
        title: 'Intro part 2',
        imageSrc: '/projects/pigeon/onboarding_part2.webp',
        imageAlt: 'Onboarding screen 2',
        caption: 'Easy path to more information.',
      },
      {
        type: 'blank',
        title: 'Day 1',
        componentId: 'day1-journey',
      },
      {
        type: 'image',
        title: 'What a message might look like.',
        imageSrc: '/projects/pigeon/Dynamic-engagement.webp',
        imageAlt: 'Onboarding message',
      },
      { type: 'quote', text: 'We let the pigeons out of the coup!', attribution: 'They have free autonomy to reengage users how they see fit, on a timeline we set.' },
      {
        type: 'blank',
        title: '60 Day Contextual Reengagment',
        componentId: 'reengagement-timeline',
      },
      { type: 'image', title: 'Mapped out for development.', videoSrc: '/projects/pigeon/onboarding_reengage.mp4', },
      {
        type: 'split',
        title: 'Early signs of success.',
        imagePosition: 'left',
        imageSrc: '/projects/pigeon/onboarding_results.webp',
        bullets: [ 
          'Day one messages up 13% ⬆️ (in first week)',
          'Users who created an automation were 2x to stay active by day 14 ⬆️',
          'Overall retention at day 14 up, but cohort remains flat by day 30.',
          'Trade volume remained consistent with growth. (users are creating automations for research or non-trades).',
        ],
        caption: 'Early signal that this boosted early retention and automation creation, but more work needs to be had at increasing trade volume.',
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about Branding.' },
      { type: 'title', title: 'Branding', caption: 'A pigeon.' },
      { type: 'quote', text: 'Designing an AI brand that lives in a chat avatar.', attribution: 'The brand had to work at 32px.' },
      {
        type: 'split',
        title: 'Why a pigeon?',
        imagePosition: 'left',
        imageSrc: '/projects/pigeon/branding_history.mp4',
        bullets: [ 
          'They are an animal that transects the concept of messaging and reliability.',
          'Because for centuries, pigeons had been domesticated to deliver messages across vast distances. trusted, and man\'s best frined of the skies. They helped us win wars. Rescued lives.',
          'Also ... UM, they are CUTE 🥺',
          'The attributes of a pigeon, and what they had accomplished in history, became the aspirational backbone of the brand.',
        ],
      },
      { type: 'quote', text: 'Pigeon isn\’t a fintech brand. It\'s a copilot.', attribution: 'It doesn\'t oversell. It doesn\'t perform friendliness.' },
      {
        type: 'split',
        title: 'Voice: Trader Friend, Not a Bank',
        imagePosition: 'left',
        componentId: 'voice-chat',
        bullets: [ 
          'Confident. Fast. Slight Brooklyn edge.',
          'Plain language. Short sentences.',
          'A structure that follows: Here\’s what I checked. Here\’s what I did. Here\’s the receipt',
          'Trust is earned with proof, not vibes. Tx hashes, order IDs, balances updated.',
        ],
      },
      {
        type: 'blank',
        title: '',
        componentId: 'voice-tone',
      },
      { type: 'quote', text: 'The visual direction had a few twists and turns', attribution: 'Our bird had a few faces.' },
      {
        type: 'image',
        title: 'Where are we now?',
        imageSrc: '/projects/pigeon/branding_logoalone.webp',
        imageAlt: 'Pigeon logo',
      },
      {
        type: 'image',
        title: 'Prior options.',
        imageSrc: '/projects/pigeon/logo-exploration-1.webp',
        imageAlt: 'Pigeon logo',
      },
      {
        type: 'image',
        title: 'Prior options.',
        imageSrc: '/projects/pigeon/logo-exploration-2.webp',
        imageAlt: 'Pigeon logo',
      },
      {
        type: 'image',
        title: 'Prior options.',
        imageSrc: '/projects/pigeon/logo-exploration-3.webp',
        imageAlt: 'Pigeon logo',
      },
      {
        type: 'blank',
        title: 'I coded a globe.',
        componentId: 'wireframe-globe',
      },
      {
        type: 'image',
        title: 'I riffed off the globe.',
        imageSrc: '/projects/pigeon/logo-exploration-4.webp',
        imageAlt: 'Pigeon logo',
      },
      {
        type: 'blank',
        title: 'I made more shapes.',
        componentId: 'wireframe-shapes',
      },
      { type: 'image', title: 'Expanded on this for a new landing page.', videoSrc: '/projects/pigeon/newhomepage.mp4', },
      { type: 'image', title: 'Little animations to help communicate the idea.', videoSrc: '/projects/pigeon/prefillbox.mp4', },
      { type: 'quote', text: 'This direction becomes the foundation for the next stage of Pigeon.', attribution: 'The terminal that builds terminals.' },
      { type: 'quote', text: 'But before we jump there, a few fun branded moments of fun.', attribution: 'A visual cleanse.' },
      {
        type: 'image',
        title: 'Pigeon NFTs growth hack (Digimon theme).',
        imageSrc: '/projects/pigeon/pigeonNFTs.webp',
        imageAlt: 'Pigeon NFT',
      },
      {
        type: 'image',
        title: 'Polybattle: 5 agents chat with Pigeon and compete on earnings.',
        imageSrc: '/projects/pigeon/polybattle.webp',
        imageAlt: 'Polybattle',
      },
      {
        type: 'image',
        title: 'Reskinning Pigeon Code.',
        imageSrc: '/projects/pigeon/pigeon_code.webp',
        imageAlt: 'Pigeon code',
      },
      { type: 'title', title: 'Pigeon Terminal', caption: 'How design could affect trust.' },
      { type: 'quote', text: 'Trading terminals assume they know what you want.', attribution: 'Fixed layouts. Preset widgets. Every competitor designs their idea of the perfect terminal.' },
      {
        type: 'split',
        title: 'What if we let users describe the workflow, and let AI generate the interface?',
        imagePosition: 'left',
        componentId: 'intent-to-interface',
        bullets: [ 
          'Pigeon already understands user intent.',
          'We unlock personal, shareable terminals',
          'Strategy-native.',
          'Fast iterations, and better fit to chase trends in the market.',
        ],
      },
      { type: 'quote', text: 'Intent -> Structure -> Interface.', attribution: 'Full trading loop.' },
      { type: 'image', title: 'Example: Track New York elections of Polymarket.', videoSrc: '/projects/pigeon/terminal_add block.mp4',   caption: '(This is only a prototype and not connected to any data, so it is slow.)', },
      { type: 'image', title: 'This ui is customizable, vibe-codable, and adjustable.', videoSrc: '/projects/pigeon/terminal_expandable.mp4',  caption: 'All blocks that are vibe coded are styled based on a visuals\.md file, and they are expandable to your heart\'s content. ', },
      { type: 'image', title: 'Why stop at one terminal screen?', videoSrc: '/projects/pigeon/terminal-lots.mp4',   caption: '(This terminal could have as many views as you would like.)', },
      { type: 'image', title: 'Track anything you want.', videoSrc: '/projects/pigeon/terminal_chart.mp4', },  
      { type: 'image', title: 'Social + Leaderboards.', videoSrc: '/projects/pigeon/terminal_social.mp4', },  
      { type: 'quote', text: 'Why does all this matters?', attribution: 'There is a reason.' },
      { type: 'quote', text: 'The future isn\’t AI recommending what to trade next. It\’s AI rendering tools.', attribution: 'Full trading loop.' },
      {
        type: 'split',
        title: 'Pigeon started as a chat assistant. Now it\'s a system that turns intent into execution and execution into interface.',
        imagePosition: 'left',
        componentId: 'chat-to-interface',
        bullets: [
          'Users describe outcomes..',
          'AI builds the tool.',
        ],
      },
      { type: 'quote', text: 'We grew from 0 -> 38k users and $100m+ real-dollar trading volume.', attribution: '' },

      { type: 'title', title: 'Fin', caption: 'Questions?' },
    ],
  },

    /* ===================================
   Ketl
   =================================== */

  {
    kind: 'project',
    slug: 'Ketl',
    title: 'Ketl',
    tag: 'Social / Zero-knowledge proofs',
    year: '2023',
    description: 'A brief one-liner about this project.',
    hero: '/projects/ketl/ketl-hero.webp',
    locked: true,
    slides: [
      {
        type: 'intro',
        title: 'ketl',
        subtitle: [
          'A pseudonymous social network for founders and VCs.',
        ],
        meta: [
          { label: 'When', value: '2023' },
          { label: 'Role', value: 'Designer' },
          { label: 'Team', value: 'Core Team (6+ ENG, PM, & Me)' },
        ],
        tags: ['Product Design', 'Experience Design', 'Branding'],
        dividers: { afterSubtitle: 'rainbow' },
        avatarSrc: '',
        logoSrc: '/projects/ketl/ketl_logo.webp',
      },
  
      {
        type: 'toc',
        title: 'Contents',
        entries: [
          { label: 'Context', slideIndex: 2 },
          { label: 'Idea to product', slideIndex: 7 },
          { label: 'How branding weaves through the porduct.', slideIndex: 15 },
          { label: 'Life of the rich and anonymous', slideIndex: 39 },
          { label: 'Results & lessons learned', slideIndex: 53 },
      

        ],
      },
      { type: 'title', title: 'Professional networks force a tradeoff...', caption: 'Use your real name → credibility. Stay anonymous → honesty.' },
      { type: 'quote', text: 'ketl asks, \'what if we could do both?\'.', attribution: 'Have honest conversations without the reputational risk.' },
      
      {
        type: 'split',
        title: 'ketl runs on a difficult promise of proving you belong without revealing who you are.',
        imagePosition: 'right',
        componentId: 'zk-promise',
        bullets: [
          'Real-name networks are performative, reputation-constrained, and surface-level. (LinkedIn, Fishbowl...)',
          'Anonymous forums are noisey, lack trust, and it\'s hard to varify expertise.',
        ],
      },
      { type: 'quote', text: 'ketl could solve this with zero-knowledge proofs.', attribution: 'Proof of person, no traceability.' },
      {
        type: 'split',
        title: 'Why This Matters',
        imagePosition: 'left',
        componentId: 'why-this-matters',
        bullets: [
          'Founders and VCs can share real experiences (fundraising, deal dynamics, operator mistakes) without the performative pressure of real-name platforms.',
          ' Zero-knowledge verification ensures participants actually belong, raising discourse quality while preserving pseudonymity.',
          'Reputation accrues to proven participants, creating a compounding graph of credible, insider conversation.',
        ],
      },
      { type: 'title', title: 'Ideation to Launch', caption: 'How design thinking got us to MLP (Minimal Lovable Product).' },

      { type: 'quote', text: 'The original vision wasn\’t a social network.', attribution: 'It was infrastructure: What new products become possible with zero-knowledge proofs?' },
      {
        type: 'split',
        title: 'We ran early brainstorm sessions around:',
        imagePosition: 'left',
        videoSrc: '/projects/ketl/brainstorm1.mp4',
        bullets: [
          'Provable identity.',
          'Private credentials.',
          'Initial opportunity brainstrom -> How Might anonymity be used to enhance social interaction?.',
          'The seven deadly sins of product brainstorm -> What core emotions drive product desire?',
        ],
      },
      {
        type: 'split',
        title: 'We started to narrow down:',
        imagePosition: 'right',
        videoSrc: '/projects/ketl/brainstorm2.mp4',
        bullets: [
          'We pushed further into brainstorming, looking deeper at value x social.',
          'Mapped these ideas to our audience + potential.',
          'We then grouped the core ideas with the greatest potential for our audience.',
          'WhaleTalk became a focus: a space for people to prove financial status without revealing full identity.',
        ],
      },
      {
        type: 'split',
        title: 'From whaletalk, we came to the idea of VCs (Many whales are VCs). We explored vision + answered questions:',
        imagePosition: 'left',
        videoSrc: '/projects/ketl/brainstorm3.mp4',
        bullets: [
          'Where does credibility materially change behavior?',
          'What would be a VC\'s JTBD?',
          'Fun fact if you\'ve read this far: During the offiste this took place, I came up with the name and phrases like, \'spill the tea,\' when I burned my hand on a tea kettle. Inspiration finds you when you least expect it, and sometimes it hurts',
        ],
      },
      {
        type: 'split',
        title: 'Building an atomic network',
        imagePosition: 'right',
        videoSrc: '/projects/ketl/brainstorm4.mp4',
        bullets: [
          'We discussed what ketl\'s atomic network might look Linkedin.',
          'Created persona\'s of likely users based on other social network behavior, setting goals around these numbers.',
          'We discussed how to seed content, how to encourage users to post the kinds of content we think might perform well, and what a season 0 of this product might look like.',
        ],
      },
      {
        type: 'split',
        title: 'Finally, we began feature prioritization and planning.',
        imagePosition: 'left',
        videoSrc: '/projects/ketl/brainstorm5.mp4',
        bullets: [
          'I ran an effort x impact mapping of features that sprung up in past brainstorms.',
          'With features mapped, we prioritized based on what got the most votes + effort x impact scoring.',
        ],
      },
      { type: 'quote', text: 'With our vision and MLP set, we executed',  },
      { type: 'title', title: 'Branding', caption: 'How I approached a pseudonymous social network.' },
      { type: 'quote', text: 'ketl leads with intrigue, but earns trust fast enough that the mystery feels intentional, not risky.', attribution: 'Design Principle.' },
      {
        type: 'split',
        title: 'The brand tension',
        imagePosition: 'left',
        componentId: 'brand-tension',
        bullets: [
          'ketl needed to hold two opposing signals:',
          '1. Cryptic enough to feel insider (secret society vibe).',
          '2. Credible enough to trust.',
          '👇',
          'Too clear → feels like LinkedIn.',
          'Too mysterious → feels like crypto (= untrustworthy.)',
        ],
        caption: 'The brand lives in the narrow space between.',
      },
      {
        type: 'blank',
        title: 'Balance is found in layers (Design onion).',
        componentId: 'brand-layers',
      },
      { type: 'quote', text: 'Intrigue.', attribution: 'The brand pull.' },
      {
        type: 'split',
        title: 'ketl logomark.',
        imagePosition: 'left',
        videoSrc: '/projects/ketl/updated.mp4',
        bullets: [
          '1. Exclusivity: The pyramid subtly signals a private, insider space. A network you enter by belonging, not by browsing.',
          '2. Verifiable identity: The eye represents selective visibility, not full exposure, but the ability to prove what matters.',
          '3. Identity through transformation: The prismatic treatment reflects ketl\’s zk foundation. Your identity enters the system, is cryptographically transformed, and emerges as a secure, verifiable signal rather than raw personal data.',
        ],
        caption: 'Oh yeah, it\'s also the shape of a kettle.',
      },
      {
        type: 'image',
        title: 'There had been other explorations.',
        imageSrc: '/projects/ketl/oldlogos.webp',
        imageAlt: 'ketllogos',
      },
      {
        type: 'image',
        title: 'A mysterious background.',
        videoSrc: '/projects/ketl/login_s1.mp4',
      },
      {
        type: 'image',
        title: 'Our mascot: the exploration.',
        videoSrc: '/projects/ketl/mascot-search.mp4',
      },
      {
        type: 'image',
        title: 'Our mascot. (the orb motif had represented \'zk proofs\' for us in the past). ',
        imageSrc: '/projects/ketl/the-mascot.webp',
        imageAlt: 'ketllogos',
      },
      {
        type: 'image',
        title: 'How we come across in outward-facing media. ',
        imageSrc: '/projects/ketl/slide-template14-1.webp',
        imageAlt: 'ketllogos',
      },
      {
        type: 'image',
        title: 'How we come across in outward-facing media Pt 2. ',
        imageSrc: '/projects/ketl/slide-template14.webp',
        imageAlt: 'ketllogos',
      },
      {
        type: 'dual-video',
        title: 'Our login screen + tilt effect.',
        leftSrc: '/projects/ketl/homescreen.mp4',
        rightSrc: '/projects/ketl/reveal-tilt.MP4',
        caption: 'Please excuse that rude spam caller!.',
      },
      { type: 'quote', text: 'Orientation.', attribution: 'Build a foundation.' },
      {
        type: 'image',
        title: 'Access to content via clean typography. ',
        imageSrc: '/projects/ketl/type-clarity.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'image',
        title: 'Simple and familiar information architecture and navigation.',
        videoSrc: '/projects/ketl/complete.mp4',
      },
      {
        type: 'image',
        title: 'Badges to instill a sense of identity. ',
        imageSrc: '/projects/ketl/badges.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'image',
        title: 'Your role embedded everywhere you go. ',
        imageSrc: '/projects/ketl/role-label.webp',
        imageAlt: 'ketlscreen',
      },
      { type: 'quote', text: 'Proof.', attribution: 'Build a foundation.' },
      {
        type: 'image',
        title: 'Everyone is verified. ',
        imageSrc: '/projects/ketl/verify-yourself.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'image',
        title: 'Content with value. ',
        imageSrc: '/projects/ketl/ketl-bank.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'image',
        title: 'Consistent privacy signals. ',
        videoSrc: '/projects/ketl/consistentsignals.mp4',
      },
      {
        type: 'image',
        title: 'Transparent entanglment ledger. ',
        imageSrc: '/projects/ketl/entanglement.webp',
        imageAlt: 'ketlscreen',
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about some anonymous features.' },
      { type: 'title', title: 'Life of the rich and anonymous', caption: 'Desinging with a blindfold!' },
      { type: 'quote', text: 'ketl operates in a fragile environment.', attribution: 'Users want to speak freely, but fear exposure.' },
      {
        type: 'split',
        title: 'Anonymous Onboarding: The Core Challenge.',
        imagePosition: 'left',
        componentId: 'anonymous-onboarding',
        bullets: [
          'Onboarding anonymous users is fundamentally harder than traditional signup.',
          'We needed to answer, immediately: Is this space credible? Am I safe to speak? Do others here actually belong?',
          'WITHOUT overwhelming users with zk mechanics.',
        ],
        caption: 'Trust had to be felt fast.',
      },
      {
        type: 'split',
        title: 'Journey Brainstorm & Mapping.',
        imagePosition: 'right',
        videoSrc: '/projects/ketl/journeymap.mp4',
        bullets: [
          'We ran structured exercises to map the emotional journey',
        ],
      },
      {
        type: 'image',
        title: 'Onboaridng wires to break it down. ',
        imageSrc: '/projects/ketl/onboaridng_wires.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'image',
        title: 'Onboaridng wires to break it down. ',
        videoSrc: '/projects/ketl/firstroundonboarding.mp4',
      },
      {
        type: 'image',
        title: 'Then the final breakdown. ',
        videoSrc: '/projects/ketl/round2onboarid.mp4',
      },
      {
        type: 'image',
        title: 'While there are a lot of moving pieces, we keep decisions and user experience simple. ',
        videoSrc: '/projects/ketl/simple-onboarding.mp4',
      },
      { type: 'quote', text: 'Shake to shadow.', attribution: 'Building IRL incognito.' },
      {
        type: 'split',
        title: 'Shake to hide identity.',
        imagePosition: 'right',
        videoSrc: '/projects/ketl/shaketoshad.mp4',
        bullets: [
          'You can shake your phone to hide your username and details.',
          'It\'s fast under pressure. It\'s memorable. Satisfying.',
        ],
      },
      { type: 'quote', text: 'Rephrase with AI.', attribution: 'Disguise my words, ser.' },
      {
        type: 'image',
        title: 'We introduced AI-assisted rewriting to help users throw lurkers off their tail. ',
        videoSrc: '/projects/ketl/Rephrase.mp4',
        caption: 'Even in pseudonymous spaces, users self-censor.',
      },
      { type: 'quote', text: 'Rating VCs & Founders.', attribution: 'Uh-oh...' },
      {
        type: 'image',
        title: 'Rating individuals: Expanding anonymous reputation (kred) beyond content. ',
        videoSrc: '/projects/ketl/ratings.mp4',
        caption: 'This was designed but never launched.',
      },
      { type: 'quote', text: 'Questions before continuing?', attribution: 'Next, we\'ll talk about results & lessons learned.' },
      { type: 'title', title: 'Results and lessons learned', caption: 'Design Outcomes.' },
      { type: 'quote', text: 'From a design standpoint, ketl validated the core bet.',  },
      {
        type: 'image',
        title: 'Zk-verification can help a digital community thrive. ',
        imageSrc: '/projects/ketl/socialengage.mp4',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'split',
        title: 'Where the design worked.',
        imagePosition: 'right',
        videoSrc: '/projects/ketl/shaketoshad.mp4',
        bullets: [
          'Users understood verification signals (insight from talking to users).',
          'The environment felt serious and moderated (no racist tirads or inappropriate content).',
          'Conversations moved beyond surface-level takes (early industry alpha bubbled up).',
          'The cryptic → clarity sequencing held.',
        ],
      },
      {
        type: 'split',
        title: 'Where the design fell short.',
        imagePosition: 'left',
        imageSrc: '/projects/ketl/moderation.webp',
        imageAlt: 'ketlscreen',
        bullets: [
          'Verification introduces unavoidable friction (sign-ups were slow coming. Testing with users showed many stresses).',
          'Pseudonymity increases cognitive overhead (not every new person we spoke to understood ketl immediately).',
          'Though it was only an MLP, much of the design never reached a state of polish or perfect UX.',
        ],
      },
      {
        type: 'split',
        title: 'Signals of product design fit.',
        imagePosition: 'left',
        imageSrc: '/projects/ketl/goingwell.webp',
        imageAlt: 'ketlscreen',
        bullets: [
          'Despite growth friction, qualitative feedback was strong among the target audience.',
          'Users consistently responded to the credibility of verified cohorts.',
          'Despite growth friction, qualitative feedback was strong among the target audience.',
        ],
      },
      {
        type: 'image',
        title: 'This indicated the experience was landing correctly for the intended user.',
        imageSrc: '/projects/ketl/praise.webp',
        imageAlt: 'ketlscreen',
      },
      {
        type: 'split',
        title: 'Design lessons.',
        imagePosition: 'left',
        componentId: 'design-lessons',
        bullets: [
          'Trust systems behave differently from engagement systems.',
          'Some friction is protective, not harmful.',
          'The best privacy UX makes complex guarantees feel obvious.',
        ],
      },
      { type: 'title', title: 'Fin', caption: 'Questions?' },
    



    ],
  },

  /* ===================================
   LUNCHBREAK 
   =================================== */
   {
    kind: 'project',
    slug: 'Lunchbreak',
    title: 'Lunchbreak',
    tag: 'Socialfi',
    year: '2024',
    description: 'A brief one-liner about this project.',
    hero: '/projects/lunchbreak/hero-lunch.webp',
    locked: true,
    slides: [
      {
        type: 'intro',
        title: 'Lunchbreak',
        subtitle: [
          'The first socialFi app that\’s also an expert and influencer marketplace.',
        ],
        meta: [
          { label: 'When', value: '2024' },
          { label: 'Role', value: 'Designer' },
          { label: 'Team', value: 'Core Team (2 ENG, PM, & Me)' },
        ],
        tags: ['Product Design', 'Experience Design', 'Branding'],
        dividers: { afterSubtitle: 'rainbow' },
        avatarSrc: '',
        logoSrc: '/projects/lunchbreak/small_lunchbreak.gif',
      },
  
      {
        type: 'toc',
        title: 'Contents',
        entries: [
          { label: 'Context', slideIndex: 2 },
          { label: 'Product Iteration & Evolution', slideIndex: 6 },
          { label: 'Branding', slideIndex: 13 },
          { label: 'Core Screens: Design Rapid Fire', slideIndex: 26 },

        ],
      },
      { type: 'title', title: 'Context', caption: '' },
      {
        type: 'split',
        title: 'Cold outreach is broken.',
        imagePosition: 'left',
        componentId: 'cold-outreach',
        bullets: [
          'Inboxes are flooded',
          'Warm intros are gatekept.',
          'High-signal people are overwhelmed',
        ],
        caption: 'What if access to attention was priced transparently?',
      },
      {
        type: 'split',
        title: 'Enter Lunchbreak, the SocialFi network + expert marketplace.',
        imagePosition: 'right',
        imageSrc: '/projects/lunchbreak/welcome.webp',
        imageAlt: 'lunchbreakdesign',
        bullets: [
          'Set prices for replies and calls',
          'Monetize their inbound demand.',
          'Back people they believe in when you buy \'seats\' at their lunch table.',
          'Earn through network effects',
        ],
        caption: 'It\’s a financialized attention layer.',
      },
      { type: 'quote', text: 'Lunchbreak believes that attention is the new scarce resource.', attribution: '', },
      { type: 'title', title: 'Product Iteration & Evolution', caption: '' },
      {
        type: 'split',
        title: 'The Product Didn\’t Start Here. It morphed into many shapes.',
        imagePosition: 'right',
        videoSrc: '/projects/lunchbreak/initial_brainstorm.mp4',
        bullets: [
          'Social network.',
          'Expert marketplace',
          'Creator monetization tool',
          'Professional graph',
        ],
        caption: 'Each only solved a part of the problem.',
      },
      { type: 'quote', text: 'Through iteration and brainstorming over 2 weeks, we reframed the product as SocialFi infrastructure.', attribution: '', },
      {
        type: 'image',
        title: 'I explored in parallel over those 2 weeks. (Day 1-3)',
        videoSrc: '/projects/lunchbreak/week1-2.mp4',
        caption: 'Scorched earth discovery. Playing out ideas to show others and gather feedback.',
      },
      {
        type: 'image',
        title: 'Day 4-7',
        videoSrc: '/projects/lunchbreak/week2-2.mp4',
        caption: 'We touched base daily to review and give feedback.',
      },
      {
        type: 'image',
        title: 'Day 7-14',
        videoSrc: '/projects/lunchbreak/week2.5-2.mp4',
        caption: 'We even spoke to users in our coworking space to come into our office and give feedback. Much of this moved exploration away from ideas like \'top 8 colleagues\' ',
      },
      {
        type: 'split',
        title: 'How this shaped design.',
        imagePosition: 'right',
        imageSrc: '/projects/lunchbreak/changedthedesign.webp',
        imageAlt: 'lunchbreakdesign',
        bullets: [
          'Rapid iteration and testing allowed us to pivot ideas quickly and gather feedback (no wasted tears over something we could grow attached to).',
          'Through these mixings of ideas, a brand emerged from the chaos.',
          'We didn\'t settle on the first thing I made.',
        ],
        caption: 'Speed is king. Feedback kept us grounded.',
      },
     
      { type: 'title', title: 'Branding', caption: '' },
      {
        type: 'split',
        title: 'Lunchbreak lives in an awkward but interesting space.',
        imagePosition: 'left',
        videoSrc: '/projects/lunchbreak/redchair.mp4',
        bullets: [
          'A professional network.',
          'A SocialFi product.',
          'A messaging tool.',
        ],
        caption: 'The brand needed to feel credible enough for money, but modern enough for network effects.',
      },
      {
        type: 'blank',
        title: 'Design Principles.',
        componentId: 'lunchbreak-principles',
      },
      { type: 'quote', text: 'Visual assets.', attribution: '', },
      {
        type: 'split',
        title: 'Lunchbreak logo.',
        imagePosition: 'left',
        imageSrc: '/projects/lunchbreak/logolunch.webp',
        imageAlt: 'lunchbreakdesign',
        bullets: [
          'Initials of the product.',
          'Signiture-like mark, but refined for a professional nature.',
          'A quirky typeface. DX-Rigraf (indie font felt appropriate). Break intentionally slanted.',
        ],
      },
      {
        type: 'image',
        title: 'Seats.',
        imageSrc: '/projects/lunchbreak/seats.webp',
        imageAlt: 'lunchbreakdesign',
        caption: 'Nostalgic. Speaks to the anme of lunchbreak). Piercings to show it\'s edgy (dang, that sounds cringe written out lol)',
      },
      {
        type: 'image',
        title: 'The signiture.',
        imageSrc: '/projects/lunchbreak/signiture.webp',
        imageAlt: 'lunchbreakdesign',
        caption: 'Adds humanity and fun to an otherwise expected profile (we aren\'t reinventing the wheel with profiles).',
      },
      {
        type: 'image',
        title: '3d assets',
        imageSrc: '/projects/lunchbreak/vouched.webp',
        imageAlt: 'lunchbreakdesign',
        caption: 'Unconventional landing.', 
      },
      {
        type: 'image',
        title: 'Stickers',
        videoSrc: '/projects/lunchbreak/sticker.mp4',
        caption: 'Unconventional landing.',
      },
      {
        type: 'image',
        title: 'The landing page.',
        videoSrc: '/projects/lunchbreak/landingpage.mp4',
        caption: 'Unconventional landing.',
      },
      {
        type: 'image',
        title: 'I even wrote a script for a video and worked with my cousin to create it.',
        imageSrc: '/projects/lunchbreak/video_post.webp',
        imageAlt: 'lunchbreakdesign',
        linkUrl: 'https://x.com/heylunchbreak/status/1825555695611339142',
        caption: 'Click the image to view it',
      },
      {
        type: 'image',
        title: 'The interface can be expressive.',
        videoSrc: '/projects/lunchbreak/expresive.mp4',
        caption: 'The interface can take influence from all of this.', 
      },
      {
        type: 'image',
        title: 'The interface can be simple and refined.',
        imageSrc: '/projects/lunchbreak/messages1.webp',
        imageAlt: 'lunchbreakdesign',
        caption: 'It can be tame.', 
      },
      { type: 'title', title: 'Core Screens: Design Rapid Fire', caption: '' },
      {
        type: 'sections-split',
        title: 'Onboarding',
        imagePosition: 'left',  // or 'right'
        videoSrc: '/projects/lunchbreak/onboarding-mapping.mp4',
        sections: [
          { label: 'Problem', text: 'New users were landing in Lunchbreak without immediately grasping the core value: that access and responses are priced. Early flows felt like a generic social signup, creating confusion and drop-off before users experienced the economic loop.' },
          { label: 'Goal', text: 'Collapse time-to-understanding and get users to their first meaningful action (set a price, send a paid message, or back a profile) as quickly as possible. Make the “priced attention” model obvious within the first session.' },
          { label: 'Outcome', text: 'We clarified the product mental model earlier in the flow and reduced first-session friction.' },
        ],
      },
      {
        type: 'image',
        title: 'The old flow we launched with.',
        imageSrc: '/projects/lunchbreak/onboarding_flow.webp',
        imageAlt: 'lunchbreakdesign',
      },
      {
        type: 'image',
        title: 'The new flow part 1.',
        imageSrc: '/projects/lunchbreak/bondoardingnew1.webp',
        imageAlt: 'lunchbreakdesign',
      },
      {
        type: 'image',
        title: 'The new flow part 2.',
        imageSrc: '/projects/lunchbreak/bondoardingnew2.webp',
        imageAlt: 'lunchbreakdesign',
      },
      {
        type: 'sections-split',
        title: 'Progressive Web App',
        imagePosition: 'right',  // or 'right'
        imageSrc: '/projects/lunchbreak/progressiveweb.webp',
        imageAlt: 'onboarding',
        sections: [
          { label: 'Problem', text: 'Lunchbreak runs as a Progressive Web App, which meant users had to manually add the site to their home screen — a high-friction, unfamiliar step. Most users don\’t naturally complete this flow, creating drop-off before they experienced the product as a native-like app.' },
          { label: 'Goal', text: 'Reduce friction and cognitive load around installation by clearly guiding users through the “Add to Home Screen” flow and reinforcing why it\’s worth the extra step..' },
          { label: 'Outcome', text: 'We simplified the install path with contextual prompts and clearer affordances, making the behavior feel intentional rather than technical. More users successfully saved Lunchbreak to their home screen, improving return behavior and making the product feel more app-like in daily use.' },
        ],
      },
      {
        type: 'sections-split',
        title: 'Messaging',
        imagePosition: 'right',  // or 'right'
        imageSrc: '/projects/lunchbreak/message-screen.webp',
        imageAlt: 'onboarding',
        sections: [
          { label: 'Problem', text: 'Charging for messages introduces immediate user friction and skepticism. If the flow feels too transactional, users hesitate to send. If it feels too casual, the value of paid access becomes unclear. We needed to normalize paid messaging without making it feel like spam or pay-to-play.' },
          { label: 'Goal', text: 'Make the value exchange obvious and trustworthy at the moment of send. Users should instantly understand what they\’re paying for, what response to expect, and why it\’s worth it — all without slowing down the conversation flow.' },
          { label: 'Outcome', text: 'By clarifying pricing, response guarantees, and timing at the point of action, we reduced hesitation around paid outreach. Messaging felt more intentional and professional, helping users treat paid messages as high-signal access rather than cold DMs.' },
        ],
      },
      {
        type: 'image',
        title: 'Message examples',
        imageSrc: '/projects/lunchbreak/buy-message.webp',
        imageAlt: 'lunchbreakdesign',
  
      },
      {
        type: 'sections-split',
        title: 'Tradable profiles',
        imagePosition: 'left',  // or 'right'
        imageSrc: '/projects/lunchbreak/profiletrack.webp',
        imageAlt: 'onboarding',
        sections: [
          { label: 'Problem', text: 'Lunchbreak\’s core mechanic treats access to people as something you can back and price — but standard social profiles didn\’t communicate that mental model. Users still read profiles as static identity pages, not dynamic assets whose value moves with demand.' },
          { label: 'Goal', text: 'Reframe the profile to feel like a living market surface: make pricing, supporter activity, and seat dynamics immediately legible so users understand they\’re evaluating — and potentially backing — an asset, not just viewing a bio.' },
          { label: 'Outcome', text: 'By foregrounding price signals, supporter graphs, and seat availability, profiles shifted from passive identity pages to active market surfaces. Users more quickly understood the economic model, increasing confidence in buying seats and reinforcing the network\’s financialized behavior loop.' },
        ],
      },
      {
        type: 'sections-split',
        title: 'Design handoff',
        imagePosition: 'right',  // or 'right'
        videoSrc: '/projects/lunchbreak/handoff.mp4',
        sections: [
          { label: 'Problem', text: 'As the product evolved quickly, design-to-engineering handoff risked becoming fragmented. Without strong structure, small inconsistencies in spacing, components, and states could compound — slowing builds and creating avoidable back-and-forth.' },
          { label: 'Goal', text: 'Create a handoff system that was fast, unambiguous, and scalable. Ensure engineers could implement confidently without constant clarification by organizing work in Figma around a clear, reusable design system.' },
          { label: 'Outcome', text: 'By systematizing components, states, and specs in Figma, handoff became significantly smoother and more predictable. Engineers could move faster with fewer questions, visual consistency improved across surfaces, and the team spent less time resolving design debt during implementation.' },
        ],
      },
      {
        type: 'sections-split',
        title: 'Home + Discovery',
        imagePosition: 'left',  // or 'right'
        imageSrc: '/projects/lunchbreak/directory.webp',
        imageAlt: 'onboarding',
        sections: [
          { label: 'Problem', text: 'Users were landing in the product without clear next steps. Two high-value actions — sharing their message link (to drive inbound demand) and discovering seats to buy (to drive engagement) — were buried or disconnected, slowing early momentum.' },
          { label: 'Goal', text: 'Make the home surface action-oriented. Prioritize quick distribution (share your link) and high-intent exploration (find seats worth buying) so users could immediately participate in the network\’s core loops.' },
          { label: 'Outcome', text: 'We elevated share and discovery into first-class actions on the home screen, reducing time-to-first meaningful action. Users more quickly activated the supply side (inbound messages) while simultaneously increasing seat exploration and network engagement.' },
        ],
      },


      { type: 'title', title: 'Fin', caption: 'Questions?' },
  
    ],
  },





  /* ===================================
   END OF CASE STUDIES
   =================================== */

  { kind: 'divider', label: 'Misc' },






  {
    kind: 'mini',
    slug: 'Icons & Illustrations',
    title: 'Icons & Illustrations',
    tag: 'Visual',
    year: '2026',
    description: 'A test mini project to verify the scrollable page works.',
    blocks: [
      { type: 'component', componentId: 'under-construction' },
        /* ===================================
      { type: 'heading', title: 'This is a mini project', subtitle: 'A scrollable page with mixed content blocks' },
      { type: 'text', content: 'This is a paragraph of text. Mini projects render as scrollable pages instead of slideshows. You can mix images, text, headings, and custom components freely.' },
      { type: 'heading', title: 'Image Examples' },
      { type: 'image', src: '/projects/shelfspace/moodring-img.webp', alt: 'Test image', caption: 'A full-width image with caption.' },
      { type: 'text', content: 'Below is a 2-up image grid:' },
      {
        type: 'image-grid',
        columns: 2,
        images: [
          { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid image 1', caption: 'First image' },
          { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid image 2', caption: 'Second image' },
        ],
      },
      { type: 'text', content: 'And a 3-up image grid:' },
      {
        type: 'image-grid',
        columns: 3,
        images: [
          { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 1' },
          { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 2' },
          { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 3' },
        ],
          
      },
      =================================== */
    ],
  },







]


export const TRASH_ENTRIES: TrashEntry[] = [
  {
    kind: 'trash-item',
    slug: 'px-workshop',
    title: 'Ro: Mobile App',
    tag: 'Design Thinking Workshop',
    year: 'Aug 2021',
    pdfSrc: '/trash/ro-mobile-app.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'alto-vision',
    title: 'Alto App Vision Prototype',
    tag: 'Prototype (not case study)',
    year: '2021',
    pdfSrc: '/trash/Alto_prototype.mp4',
  },
  {
    kind: 'trash-item',
    slug: 'wework-intents',
    title: 'WeWork: User Intents',
    tag: 'JTBD Mobile Discovery',
    year: '2018',
    pdfSrc: '/trash/User_Intents_WeWork_Case_Study.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'wework-app-ia',
    title: 'WeWork: App IA',
    tag: 'Indormation Architecture',
    year: '2019',
    pdfSrc: '/trash/wework-app-ia.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'ro-delay-flow',
    title: 'Ro: Delay Flow',
    tag: 'UX / Retention',
    year: '2021',
    pdfSrc: '/trash/delay-flow-ro.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'welive-neighbors',
    title: 'WeLive: Neighbors',
    tag: 'JTBD / Mobile',
    year: '2018',
    pdfSrc: '/trash/Neighbors-WeLive.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'welive-events',
    title: 'WeLive: Events',
    tag: 'JTBD / Mobile',
    year: '2018',
    pdfSrc: '/trash/welive-events.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'welive-ds',
    title: 'WeLive: Design System',
    tag: 'Design System',
    year: '2018',
    pdfSrc: '/trash/welive-ds.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'ro-icons',
    title: 'Ro Icons',
    tag: 'Icons',
    year: '2020',
    pdfSrc: '/trash/ro-icon-kit.pdf',
  },
  {
    kind: 'trash-item',
    slug: 'pride-erg',
    title: 'Pride ERGs',
    tag: 'Work Culture',
    year: '2017',
    pdfSrc: '/trash/pride-erg.pdf',
  },

]