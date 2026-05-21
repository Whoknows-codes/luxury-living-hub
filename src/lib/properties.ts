export type PropertyStatus = "for-sale" | "viewed" | "new" | "pending";

export interface Agent {
  name: string;
  brokerage: string;
  phone: string;
  avatar: string;
}

export interface Property {
  id: string;
  price: number;
  status: PropertyStatus;
  beds: number;
  baths: number;
  sqft: number;
  acres: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  type: "House" | "Condo" | "Townhouse" | "Land";
  yearBuilt: number;
  images: string[];
  description: string;
  agent: Agent;
}

export const properties: Property[] = [
  {
    id: "1",
    price: 2000000,
    status: "for-sale",
    beds: 6,
    baths: 4,
    sqft: 3400,
    acres: 0.28,
    address: "17165 Midwood Dr",
    city: "Granada Hills",
    state: "CA",
    zip: "91344",
    lat: 34.2772,
    lng: -118.5256,
    type: "House",
    yearBuilt: 2008,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    ],
    description:
      "A stunning Mediterranean estate set on a quiet cul-de-sac in Granada Hills. Towering palms, a sweeping driveway, and a grand entry welcome you into soaring ceilings, an open chef's kitchen, and a primary suite with views of the San Fernando Valley. Resort-style backyard with pool, spa, and outdoor kitchen.",
    agent: {
      name: "Fiana S. Weiner",
      brokerage: "Weiner & Co. Realty",
      phone: "+1 (818) 555-0142",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
  },
  {
    id: "2",
    price: 2390000,
    status: "new",
    beds: 5,
    baths: 5,
    sqft: 4120,
    acres: 1.4,
    address: "842 Lakeshore Ridge",
    city: "Lake Geneva",
    state: "WI",
    zip: "53147",
    lat: 42.5917,
    lng: -88.4334,
    type: "House",
    yearBuilt: 2021,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=1600&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    ],
    description:
      "Modern farmhouse on 1.4 acres overlooking the lake. Vaulted timber beams, floor-to-ceiling windows, and a wraparound porch built for sunsets.",
    agent: {
      name: "Marcus Hollister",
      brokerage: "Northshore Premier",
      phone: "+1 (262) 555-0188",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
  },
  {
    id: "3",
    price: 875000,
    status: "for-sale",
    beds: 4,
    baths: 3,
    sqft: 2450,
    acres: 0.18,
    address: "29 Bayview Crescent",
    city: "Sausalito",
    state: "CA",
    zip: "94965",
    lat: 37.8591,
    lng: -122.4853,
    type: "Townhouse",
    yearBuilt: 1998,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
    ],
    description:
      "Hillside townhouse with panoramic bay views. Walk to the marina, ferries, and waterfront restaurants.",
    agent: {
      name: "Priya Anand",
      brokerage: "Bay & Bridge Realty",
      phone: "+1 (415) 555-0177",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
  },
  {
    id: "4",
    price: 1495000,
    status: "viewed",
    beds: 5,
    baths: 4,
    sqft: 3680,
    acres: 0.5,
    address: "514 Cedar Hollow Ln",
    city: "Park City",
    state: "UT",
    zip: "84060",
    lat: 40.6461,
    lng: -111.498,
    type: "House",
    yearBuilt: 2016,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    ],
    description:
      "Mountain modern retreat minutes from the slopes. Heated driveway, ski room, and a great room anchored by a stone hearth.",
    agent: {
      name: "Daniel Reyes",
      brokerage: "Summit Range Properties",
      phone: "+1 (435) 555-0119",
      avatar: "https://i.pravatar.cc/120?img=15",
    },
  },
  {
    id: "5",
    price: 395000,
    status: "for-sale",
    beds: 2,
    baths: 2,
    sqft: 1180,
    acres: 0,
    address: "1108 Marquee Ave #1402",
    city: "Austin",
    state: "TX",
    zip: "78701",
    lat: 30.2672,
    lng: -97.7431,
    type: "Condo",
    yearBuilt: 2019,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80",
    ],
    description:
      "High-floor downtown condo with a private balcony, floor-to-ceiling glass, and skyline views toward Lady Bird Lake.",
    agent: {
      name: "Sloane Becker",
      brokerage: "Capitol Urban Living",
      phone: "+1 (512) 555-0166",
      avatar: "https://i.pravatar.cc/120?img=44",
    },
  },
  {
    id: "6",
    price: 1180000,
    status: "pending",
    beds: 4,
    baths: 3,
    sqft: 2980,
    acres: 0.34,
    address: "76 Magnolia Pointe",
    city: "Charleston",
    state: "SC",
    zip: "29401",
    lat: 32.7765,
    lng: -79.9311,
    type: "House",
    yearBuilt: 2004,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
    ],
    description:
      "Lowcountry charmer with double porches, heart pine floors, and a courtyard garden tucked off King Street.",
    agent: {
      name: "Evelyn Carter",
      brokerage: "Harbor & Oak Realty",
      phone: "+1 (843) 555-0133",
      avatar: "https://i.pravatar.cc/120?img=20",
    },
  },
];

export const formatPrice = (n: number) =>
  `$${n.toLocaleString("en-US")}`;
