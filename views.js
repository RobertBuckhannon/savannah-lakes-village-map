/* ============================================================
   Savannah Lakes Village — view system
   Geometry corrected 2026-09-17 against the owner-outlined
   satellite of the real corridor. The developable land is a
   1.29 mi x 0.61 mi band running NE–SW along US-378; the lake
   reaches only the SW end at the marina.
   Pin coordinates are % of each base image's width / height.
   ============================================================ */

window.SVL.views = {
  corridor: {
    src: 'assets/map/corridor.jpg',
    label: 'Corridor',
    title: 'The full corridor',
    blurb: '1.29 miles NE–SW along US-378 · ~360 acres. Water reaches the southwest end only. Labels appear on hover — open a district for detail.',
    alt: 'Aerial view northeast up the full Savannah Lakes Village development corridor',
    dense: true,
  },
  marina: {
    src: 'assets/map/marina.jpg',
    label: 'Marina District',
    title: 'Marina District',
    blurb: 'The southwest end — the only true lake frontage. The amphitheater sits in the existing graded bowl, stage at the low southwest end, seating rising northeast toward the parking pad.',
    alt: 'Aerial view of the marina, amphitheater bowl, tiki bar and beach at the southwest end',
  },
  village: {
    src: 'assets/map/village.jpg',
    label: 'Village & Wedding',
    title: 'Village & Wedding District',
    blurb: 'The northeast end at the US-378 commercial node. Entirely inland — no lake frontage. Cottages spread deep across the ridge fingers.',
    alt: 'Aerial view of the wedding barn, chapel, village center and cottages at the northeast end',
  },
  illustrated: {
    src: 'assets/map/illustrated.jpg',
    label: 'Illustrated',
    title: 'Illustrated plan',
    blurb: 'The original schematic master plan. Diagrammatic — not to scale or true orientation.',
    alt: 'Illustrated master plan of Savannah Lakes Village',
  },
};

/* Which district zoom each venue belongs to */
window.SVL.district = {
  marina: 'marina', dockside: 'marina', tiki: 'marina',
  amphitheater: 'marina', beach: 'marina',
  wedding: 'village', chapel: 'village', 'village-center': 'village',
  greens: 'village', townhomes: 'village', cottages: 'village',
  'opportunity-center': 'village',
};

/* Pin placements per view */
window.SVL.placements = {
  corridor: {
    marina: [23.5, 90.5], dockside: [28.0, 80.0], tiki: [18.5, 84.5],
    beach: [12.5, 88.0], amphitheater: [24.0, 72.5],
    greens: [27.0, 62.0], townhomes: [26.5, 54.5], cottages: [41.5, 45.5],
    'opportunity-center': [52.0, 36.0], 'village-center': [61.0, 24.5],
    chapel: [71.0, 17.0], wedding: [80.0, 11.0],
  },
  marina: {
    marina: [85.5, 32.0], dockside: [71.8, 42.5], amphitheater: [42.5, 45.5],
    tiki: [28.5, 64.0], beach: [10.5, 38.5],
  },
  village: {
    wedding: [21.9, 37.3], chapel: [39.3, 43.6], 'village-center': [52.7, 25.2],
    greens: [53.5, 42.1], townhomes: [70.2, 50.5], cottages: [81.0, 69.5],
    'opportunity-center': [13.4, 79.4],
  },
  illustrated: {
    marina: [72.5, 62.5], dockside: [72, 80], tiki: [41, 74.5],
    amphitheater: [32, 50], wedding: [57, 19], chapel: [22.5, 28],
    cottages: [72, 34], townhomes: [33, 41], 'village-center': [49, 30],
    'opportunity-center': [61, 45], greens: [43.5, 62], beach: [44, 84],
  },
};

/* Measured site facts, shown under the corridor view */
window.SVL.geometry = [
  ['Corridor length', '1.29 miles NE–SW'],
  ['Corridor width', '0.61 miles'],
  ['Area within boundary', '~360 acres'],
  ['True lake frontage', 'Southwest end only'],
  ['US-378 frontage', 'Full 1.29-mile west edge'],
  ['Amphitheater bowl', '~415 ft × 485 ft, already graded'],
  ['Bowl fall', 'High northeast → low southwest'],
  ['Cart trail spine', 'Full corridor, spurs to every cluster'],
];
