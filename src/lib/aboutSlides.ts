export type { AnnotatedWord, RichSegment, RichParagraph, ColumnItem, IntroSlide, ImageSlide, ColumnsSlide, BlankSlide } from './slideTypes'
export type { Slide as AboutSlide } from './slideTypes'
import type { Slide } from './slideTypes'

/**
 * About slideshow data.
 *
 * Images go in public/about/
 * Reference them as "/about/filename.png"
 */
export const ABOUT_SLIDES: Slide[] = [
  {
    type: 'intro',
    title: 'Matt (some just call me whets) Whetsell',
    subtitle: [
      [
        'I\u2019m a designer & front-end developer who thrives in high-growth chaos\u2014most notably at ',
        { word: 'WeWork', popupText: 'First Product Designer, early employee, circa 2012. Designed nearly everything at some point, from a social network, room booking, WeLive app, events app, job board, and much, much more over 7 years.' },
        ', ',
        { word: 'Ro', popupText: 'Led Design on Retention and Mobile teams. Promoted to Staff Designer.' },
        ', and ',
        { word: 'Alto Pharmacy', popupText: 'Led design for customer support experience in app. Did vision explorations.' },
        '. I\u2019m currently building ',
        { word: 'Pigeon', popupText: 'A chat-based AI research + trading agent that turns messy intent into real trades.' },
        ' and ',
        { word: 'Shelfspace', popupText: 'A shelf-building, shelf-sharing reader community app.' },
        '.',
      ],
      [
        'Fun fact: 3 out of the 4 companies I\u2019ve worked for became ',
        { word: 'billion-dollar companies', popupText: 'WeWork, Ro, and Alto Pharmacy all reached $1B+ valuations.' },
        ' while I was there. Am I lucky? Hire me to find out ;)',
      ],
    ],
    avatarSrc: '/about/avatar.png',
  },

  {
    type: 'timeline',
    title: 'Career Timeline',
    entries: [
      { label: 'WeWork', sublabel: 'Product Designer \u2192 Sr. Product Designer', startYear: 2012, endYear: 2018, details: ['*First Product Designer', 'Designed:', '•Social/events/jobs app', '•Room booking', '•WeLive app', 'Worked on Pride ERG', 'Won Founder\'s Award (nominated by >50 coworkers)'] },
      { label: 'Ro', sublabel: 'Sr. Product Designer \u2192 Staff Designer', startYear: 2019, endMonth: 4, endYear: 2021, details: ['Retention team', 'Mobile team', 'Design System', 'Icons/Illustration kit', 'Ran interviews'] },
      { label: 'Alto', sublabel: 'Product Designer Lead', startYear: 2021, startMonth: 5, endMonth: 3, endYear: 2022, details: ['Customer support app', 'Vision explorations'] },
      { label: 'Big Whale Labs', sublabel: 'Pigeon & Shelfspace', startYear: 2022, startMonth: 4, details: ['Products:', 'Pigeon (ai quant)', 'LunchBreak (Socialfi)', 'Ketl (ZK Social)' , '$EGGs (FC Mini app)'] },
    ],
    caption: 'My work history.',
  },

  {
    type: 'columns',
    title: '3 ways to describe me as a designer...',
    columns: [
      {
        imageSrc: '/about/spongebob-cleaning.gif',
        imageAlt: 'Design work',
        header: 'Swiss Army Knife Designer',
        text: 'End-to-end designer. User research / IA / Workshops + Sprints / Wireframes / Design systems / Design ops / Visual design / Interaction design / Branding / Product design on Web, mobile, iOS, and Android for social, utility, health, and various consumer-facing experiences.',
      },
      {
        imageSrc: '/about/lotht.gif',
        imageAlt: 'collab work',
        header: 'Team Contributor',
        text: 'Mentorship, culture, new tools, and cross-functional relationship building',
      },
      {
        imageSrc: '/about/earth-on-fire.gif',
        imageAlt: 'Speed designing',
        header: 'Scorched Earth Design',
        text: 'Generation of ideas (divergent thinking + speed). I will explore a thousand ideas just to find the right one at great speed.',
      },
    ],
  },
  {
    type: 'blank',
    title: 'My approach as an individual contributor',
    componentId: 'process',
  },
  {
    type: 'image',
    title: 'Work culture Contributions',
    imageSrc: '/about/culture.png',
    imageAlt: 'My workspace setup',
    header: [
      'Cool shit I did for pride ',
      { word: '(PRIDE SWAG)', popupImage: '/about/pride-extra.png' },
      ' and what I created for ',
      { word: 'Interview Practicals', popupImage: '/about/practicals-ro.png' },
      '.',
    ],
  },
  {
    type: 'columns',
    title: 'A little of my personal self',
    columns: [
      {
        imageSrc: '/about/sponge-writing.gif',
        imageAlt: 'I write',
        header: 'I Write Fantasy Books',
        text: 'I write about 2k words daily.',
      },
      {
        imageSrc: '/about/bubble-tea.gif',
        imageAlt: 'bubble tea',
        header: 'I drink Bubble Tea Every Single Day',
        text: 'Favorite flavor is Passion Fruit.',
      },
      {
        imageSrc: '/about/tiktok-me.png',
        imageAlt: 'My tiktok',
        header: 'I Make Writing-Related Videos',
        text: 'Though I am less active now, I have still garnered over 160k followers across platforms.',
      },
    ],
  },


]
