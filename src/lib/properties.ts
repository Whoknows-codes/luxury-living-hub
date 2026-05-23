// 1. We import every single image directly from the src/assets folder.
// Ensure your files are renamed with dashes to match these!
import main1 from "@/assets/properties/main-1.jpg";
import subMain1 from "@/assets/properties/sub-main-1.jpg";
import subMain2 from "@/assets/properties/sub-main-2.jpg";
import subMain3 from "@/assets/properties/sub-main-3.jpg";

import main2 from "@/assets/properties/24-hut1.png";
import subMain4 from "@/assets/properties/24-hut2.png";
import subMain5 from "@/assets/properties/24-hut3.png";
import subMain6 from "@/assets/properties/24-hut4.png";

import main3 from "@/assets/properties/3518 Rockhaven.png";
import subMain6 from "@/assets/properties/sub-main-6.jpg";

import main4 from "@/assets/properties/5802-upland1.png";
import subMain7 from "@/assets/properties/5802-upland2.png";
import subMain8 from "@/assets/properties/5802-upland3.png";
import subMain9 from "@/assets/properties/5802-upland4.png";

import main5 from "@/assets/properties/2715-lake1.png";
import subMain10 from "@/assets/properties/2715-lake2.png";
import subMain11 from "@/assets/properties/2715-lake3.png";
import subMain12 from "@/assets/properties/2715-lake4.png";
import subMain13 from "@/assets/properties/2715-lake5.png";

import main6 from "@/assets/properties/3518 Rockhaven.png";
import subMain14 from "@/assets/properties/sub-main-11.jpg";

import main7 from "@/assets/properties/volta-model1.png";
import subMain15 from "@/assets/properties/volta-model2.png";
import subMain16 from "@/assets/properties/volta-model3.png";
import subMain17 from "@/assets/properties/volta-model4.png";
import subMain18 from "@/assets/properties/volta-model5.png";

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
    // 2. We pass the imported variables directly into the array (NO QUOTES)
    images: [main1, subMain1, subMain2, subMain3],
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
    baths: 3.5,
    sqft: 3500,
    acres: 1.4,
    address: "24 Hutchinson st NE",
    city: "Atlanta",
    state: "GA",
    zip: "30303",
    lat: 33.749,
    lng: -84.388,
    type: "House",
    yearBuilt: 2021,
    images: [main2, subMain4, subMain5, subMain6],
    description:
      "Modern farmhouse on 1.4 acres overlooking the lake. Vaulted timber beams, floor-to-ceiling windows, and a wraparound porch built for sunsets.",
    agent: {
      name: "James Milners",
      brokerage: "Northshore Premier",
      phone: "+1 (262) 555-0188",
      avatar: "https://i.pravatar.cc/120?img=12",
    },
  },
  {
    id: "3",
    price: 1125000,
    status: "for-sale",
    beds: 4,
    baths: 3.5,
    sqft: 2450,
    acres: 0.35,
    address: "3518 Rockhaven Cir NE",
    city: "Atlanta",
    state: "GA",
    zip: "30303",
    lat: 33.749,
    lng: -84.388,
    type: "Townhouse",
    yearBuilt: 1998,
    images: [main3, subMain6],
    description:
      "A rare opportunity to own a true architectural modern in one of Buckhead's most walkable and sought after locations. Defined by clean lines, dramatic volume, and effortless flow, this residence offers a level of design, light, and livability rarely found at this price point crafted for both elevated entertaining and everyday comfort. Dramatic ceiling heights and abundant natural light define the main living spaces, anchored by a striking two story chef's kitchen with marble countertops, custom cabinetry, and an expansive island.",
    agent: {
      name: "James Milners",
      brokerage: "Bay & Bridge Realty",
      phone: "+1 (415) 555-0177",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
  },
  {
    id: "4",
    price: 1095000,
    status: "viewed",
    beds: 3,
    baths: 3,
    sqft: 2646,
    acres: 0.5,
    address: "5802 Upland Terrance NE",
    city: "Tacoma",
    state: "WA",
    zip: "98422",
    lat: 40.6461,
    lng: -111.498,
    type: "House",
    yearBuilt: 2016,
    images: [main4, subMain7, subMain8, subMain9],
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
    price: 4190000,
    status: "for-sale",
    beds: 4,
    baths: 2.5,
    sqft: 2985,
    acres: 0,
    address: "715 Lake St",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    lat: 37.7749,
    lng: -122.4194,
    type: "House",
    yearBuilt: 2019,
    images: [main5, subMain10, subMain11, subMain12, subMain13],
    description:
      "Welcome to 2715 Lake Street. It's the kind of Sea Cliff home that rarely comes to market. A timeless, detached residence filled with warmth, light, and charm that defines this coveted neighborhood. Built in 1919 and tucked along one of Sea Cliff's most beloved blocks, the home embodies the classic character and gracious scale the neighborhood is known for.&#8232;Designed for modern living while honoring its original style, the home offers an ideal floor plan with four bedrooms, a sunroom, beautifully remodeled bathrooms, and expansive living spaces that feel both elegant and inviting.",
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
    images: [main6, subMain14],
    description:
      "Lowcountry charmer with double porches, heart pine floors, and a courtyard garden tucked off King Street.",
    agent: {
      name: "Evelyn Carter",
      brokerage: "Harbor & Oak Realty",
      phone: "+1 (843) 555-0133",
      avatar: "https://i.pravatar.cc/120?img=20",
    },
  },

  {
    id: "7",
    price: 2795000,
    status: "pending",
    beds: 6,
    baths: 5.5,
    sqft: 5711,
    acres: 0.34,
    address: "Volta Model - Modern Farmhouse Plan in PCI - 20008 by Paramount Construction",
    city: "Washington",
    state: "DC",
    zip: "20007",
    lat: 32.7765,
    lng: -79.9311,
    type: "House",
    yearBuilt: 2020,
    images: [main7, subMain15, subMain16, subMain17, subMain18],
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

export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
