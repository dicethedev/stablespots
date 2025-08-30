export interface Business {
  _id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  paymentMethods: string[];
  website?: string;
  description?: string;
  verified: boolean;
  isOpen: boolean;
}

export const mockBusinessData: Business[] = [
  {
    _id: "1",
    name: "Crypto Cafe",
    category: "food",
    address:
      "21C Akin Ogunlewe Rd, off Ligali Ayorinde Street, VI, Lagos, 101241.",
    city: "New York",
    state: "NY",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    paymentMethods: ["USDC on Ethereum", "USDC on Polygon"],
    website: "https://example.com/cryptocafe",
    description:
      "A trendy cafe serving coffee and pastries with crypto payment options.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "2",
    name: "Digital Threads",
    category: "retail",
    address: "456 Token Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    lat: 37.7749,
    lng: -122.4194,
    paymentMethods: ["USDC on Base", "USDC on Solana"],
    website: "https://example.com/digitalthreads",
    description:
      "Contemporary clothing store accepting various cryptocurrencies.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "3",
    name: "Blockchain Books",
    category: "retail",
    address: "789 Crypto Lane",
    city: "London",
    country: "UK",
    lat: 51.5074,
    lng: -0.1278,
    paymentMethods: ["USDC on Ethereum"],
    website: "https://example.com/blockchainbooks",
    description: "Bookstore specializing in technology and finance literature.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "4",
    name: "Web3 Workspace",
    category: "services",
    address: "101 DeFi Drive",
    city: "Berlin",
    country: "Germany",
    lat: 52.52,
    lng: 13.405,
    paymentMethods: ["USDC on Optimism", "USDC on Arbitrum"],
    website: "https://example.com/web3workspace",
    description:
      "Coworking space catering to crypto entrepreneurs and developers.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "5",
    name: "Satoshi's Sushi",
    category: "food",
    address: "202 Bitcoin Boulevard",
    city: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lng: 139.6503,
    paymentMethods: ["USDC on Polygon", "USDC on Base"],
    website: "https://example.com/satoshisushi",
    description:
      "Traditional Japanese sushi restaurant embracing crypto payments.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "6",
    name: "NFT Gallery",
    category: "entertainment",
    address: "303 Ethereum Avenue",
    city: "Miami",
    state: "FL",
    country: "USA",
    lat: 25.7617,
    lng: -80.1918,
    paymentMethods: ["USDC on Ethereum", "USDC on Solana"],
    website: "https://example.com/nftgallery",
    description:
      "Art gallery showcasing digital and physical art with crypto payment options.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "7",
    name: "Crypto Hardware",
    category: "tech",
    address: "404 Mining Road",
    city: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    paymentMethods: ["USDC on Arbitrum", "USDC on Optimism"],
    website: "https://example.com/cryptohardware",
    description:
      "Store selling computers, mining equipment, and hardware wallets.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "8",
    name: "Blockchain Barbers",
    category: "services",
    address: "505 Altcoin Alley",
    city: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    paymentMethods: ["USDC on Base"],
    website: "https://example.com/blockchainbarbers",
    description: "Modern barbershop accepting cryptocurrency payments.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "9",
    name: "Smart Contract Properties",
    category: "real estate",
    address: "606 Token Terrace",
    city: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    paymentMethods: ["USDC on Ethereum", "USDC on Polygon"],
    website: "https://example.com/smartcontractproperties",
    description:
      "Real estate agency offering property purchases and rentals with crypto.",
    verified: true,
    isOpen: true,
  },
  {
    _id: "10",
    name: "Decentralized Dental",
    category: "healthcare",
    address: "707 Wallet Way",
    city: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lng: -79.3832,
    paymentMethods: ["USDC on Base", "USDC on Optimism"],
    website: "https://example.com/decentralizeddental",
    description:
      "Dental clinic accepting cryptocurrency payments for all services.",
    verified: true,
    isOpen: true,
  },
];

export const defaultMapCenter = [-97.922211, 39.381266]; // Center of US
export const defaultZoom = 3;
