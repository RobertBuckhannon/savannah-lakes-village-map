/* Savannah Lakes Village — view system
   Scale is calibrated to the two surveyed parcels the owner confirmed:
     - Peninsula + sales-center parcel .... 10.9 acres (~690 ft across)
     - Highway band parcel ............... 75.0 acres (~2,600 ft x ~1,250 ft)
   Total ~85.9 acres. Earlier drafts of this map overstated the site by ~6x.
*/
window.SVL = window.SVL || {};

window.SVL.views = {
  overview: {
    src: 'assets/map/overview.jpg',
    dense: true,
    label: 'Whole site',
    title: 'The whole site — 85.9 acres',
    blurb: 'Two parcels. The 10.9-acre peninsula holds the marina, the venues and the amphitheater; the 75-acre band along US-378 holds the wedding venues, the village and the cottages. US-378 crosses the causeway at the upper left.',
    alt: 'Aerial view of the full Savannah Lakes Village site showing the small peninsula and the wooded band along US-378.'
  },
  peninsula: {
    src: 'assets/map/peninsula.jpg',
    label: 'Peninsula · 10.9 ac',
    title: 'The peninsula — 10.9 acres',
    blurb: 'Water on three sides and only about 690 feet across. Everything here is within a five-minute walk: the covered slips, Dockside, the tiki bar, the beach, the greens, the amphitheater bowl and the welcome centre at the neck opposite the marina.',
    alt: 'Aerial view of the 10.9-acre peninsula with marina slips, restaurant, tiki bar, beach and amphitheater bowl.'
  },
  band: {
    src: 'assets/map/band.jpg',
    label: 'Highway band · 75 ac',
    title: 'The highway band — 75 acres',
    blurb: 'About 2,600 feet of US-378 frontage and roughly 1,250 feet deep. The wedding barn, garden and chapel sit near the highway; the village centre and townhomes step back; the cottages spread out sparsely through mature pine across the rest of the parcel.',
    alt: 'Aerial view of the 75-acre band along US-378 with wedding barn, chapel, village centre, townhomes and cottages spread through pine woods.'
  },
  illustrated: {
    src: 'assets/map/illustrated.jpg',
    label: 'Illustrated plan',
    title: 'The illustrated master plan',
    blurb: 'The original hand-drawn plan. Its relative positions are the reference this map is built from — north is up, the causeway is at the upper left and the peninsula is at the bottom.',
    alt: 'Illustrated hand-drawn master plan of Savannah Lakes Village.'
  },
  satellite: {
    src: '',
    label: 'Satellite',
    title: 'Satellite imagery',
    blurb: 'Live imagery of the actual parcels on Lake Thurmond. Master-plan markers live on the site and parcel views.',
    alt: 'Satellite imagery of the site.'
  }
};

/* which parcel each venue belongs to */
window.SVL.district = {
  'marina': 'peninsula',
  'dockside': 'peninsula',
  'tiki': 'peninsula',
  'beach': 'peninsula',
  'greens': 'peninsula',
  'amphitheater': 'peninsula',
  'opportunity-center': 'peninsula',
  'wedding': 'band',
  'chapel': 'band',
  'village-center': 'band',
  'townhomes': 'band',
  'cottages': 'band'
};

/* pin positions per view, in percent of image width/height — verified against each base image */
window.SVL.placements = {
  overview: {
    'wedding':            [81.0, 14.3],
    'chapel':             [44.0, 19.7],
    'village-center':     [63.1, 28.9],
    'townhomes':          [41.7, 39.4],
    'cottages':           [69.0, 52.0],
    'opportunity-center': [32.4, 66.0],
    'greens':             [44.0, 80.5],
    'amphitheater':       [34.1, 77.2],
    'marina':             [57.9, 77.2],
    'tiki':               [38.5, 85.0],
    'dockside':           [60.2, 87.2],
    'beach':              [41.7, 89.5]
  },
  peninsula: {
    'opportunity-center': [51.5, 11.9],
    'marina':             [79.9, 32.0],
    'greens':             [42.8, 41.7],
    'dockside':           [78.7, 46.1],
    'amphitheater':       [38.2, 54.3],
    'tiki':               [42.2, 69.9],
    'beach':              [48.6, 81.8]
  },
  band: {
    'wedding':        [13.9, 42.0],
    'chapel':         [31.3, 34.5],
    'village-center': [54.1, 28.2],
    'townhomes':      [70.8, 23.6],
    'cottages':       [58.0, 72.0]
  },
  illustrated: {
    'marina':             [72.5, 62.5],
    'dockside':           [72.0, 80.0],
    'tiki':               [41.0, 74.5],
    'amphitheater':       [32.0, 50.0],
    'wedding':            [57.0, 19.0],
    'chapel':             [22.5, 28.0],
    'cottages':           [72.0, 34.0],
    'townhomes':          [33.0, 41.0],
    'village-center':     [49.0, 30.0],
    'opportunity-center': [61.0, 45.0],
    'greens':             [43.5, 62.0],
    'beach':              [44.0, 84.0]
  }
};

/* measured / confirmed site geometry shown in the rail */
window.SVL.geometry = [
  ['Total site', '85.9 acres, two parcels'],
  ['Peninsula parcel', '10.9 acres, ~690 ft across'],
  ['Highway band parcel', '75.0 acres'],
  ['Band dimensions', '~2,600 ft × ~1,250 ft'],
  ['US-378 frontage', '~0.49 mile'],
  ['Peninsula water frontage', 'Three sides'],
  ['Cottage density', '~4.5 keys/acre across 42 ac'],
  ['Event parking', 'On the band — peninsula holds ~1.5 ac'],
  ['Cart trail spine', 'Links both parcels, spurs to every cluster'],
];
