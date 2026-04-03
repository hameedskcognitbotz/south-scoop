export type Category = "Politics" | "Tech" | "Business" | "Cinema" | "Local News" | "Sports";

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: Category;
  readTime: string;
  language: string;
  trending?: boolean;
  thumbnail?: string;
  publishedAt: string;
  content: {
    tldr: string;
    points: string[];
    body: string;
  };
}

export const categoryColors: Record<Category, string> = {
  Politics: "bg-primary text-primary-foreground",
  Tech: "bg-foreground text-background",
  Business: "bg-emerald-700 text-white dark:bg-emerald-600",
  Cinema: "bg-amber-700 text-white dark:bg-amber-600",
  "Local News": "bg-sky-700 text-white dark:bg-sky-600",
  Sports: "bg-rose-700 text-white dark:bg-rose-600",
};

export const categoryEmojis: Record<Category, string> = {
  Politics: "🟣",
  Tech: "🔵",
  Business: "🟢",
  Cinema: "🟠",
  "Local News": "🔴",
  Sports: "🟡",
};

export const articles: Article[] = [
  {
    id: "1",
    slug: "andhra-budget-2026",
    title: "Andhra Pradesh Budget 2026: ₹2.8 Lakh Crore Focus on Infra & Welfare",
    summary: "Key allocations focus on infrastructure, agriculture, and Amaravati development.",
    category: "Politics",
    readTime: "45 sec",
    language: "en",
    trending: true,
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-04-02T08:00:00Z",
    content: {
      tldr: "AP government increases spending on infrastructure and welfare schemes. Amaravati capital city project gets renewed funding. Major push for irrigation and rural employment programs.",
      points: [
        "₹20,000 crore allocated for Amaravati capital development",
        "New irrigation projects across Rayalaseema region announced",
        "Focus on rural employment with ₹5,000 crore NREGS supplement",
        "Free laptop scheme for intermediate students expanded",
        "Healthcare budget increased by 18% year-over-year"
      ],
      body: "The Andhra Pradesh government presented its annual budget for 2026-27 with a total outlay of ₹2.8 lakh crore, marking a significant increase from the previous year. Chief Minister highlighted the government's commitment to completing the Amaravati capital city project within the next three years.\n\nThe budget places heavy emphasis on infrastructure development, with dedicated allocations for national highways, rural roads, and port connectivity. The Machilipatnam port project received ₹3,000 crore in fresh funding.\n\nAgriculture continues to be a priority with the Rythu Bharosa scheme getting enhanced payouts. Farmers will now receive ₹15,000 annually under the direct benefit transfer program. The irrigation sector saw allocations for completing pending projects in the Godavari and Krishna basins.\n\nEducation received a substantial boost with the expansion of the free laptop scheme to all intermediate students across government and aided colleges. The establishment of five new universities in underserved districts was also announced.\n\nThe healthcare sector saw an 18% increase in budget allocation, with plans to establish 200 new primary health centers and upgrade existing district hospitals with modern diagnostic equipment."
    }
  },
  {
    id: "2",
    slug: "rrr-sequel-announcement",
    title: "SS Rajamouli Confirms RRR Sequel with Ram Charan & Jr NTR",
    summary: "India's biggest director announces the much-awaited sequel, shooting begins October.",
    category: "Cinema",
    readTime: "30 sec",
    language: "en",
    trending: true,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-04-01T14:00:00Z",
    content: {
      tldr: "SS Rajamouli officially confirms RRR 2 with both Ram Charan and Jr NTR returning. The film will have a pan-world release strategy with shooting starting October 2026.",
      points: [
        "Both Ram Charan and Jr NTR confirmed to return",
        "Budget estimated at ₹800 crore — India's most expensive film",
        "Shooting begins October 2026 across 5 countries",
        "MM Keeravani returns as music composer",
        "Planned for Sankranti 2028 release"
      ],
      body: "In what is being called the biggest announcement in Indian cinema this year, legendary director SS Rajamouli has officially confirmed the sequel to his global blockbuster RRR. The film, tentatively titled 'RRR 2: Rise Once More,' will bring back the dynamic duo of Ram Charan and Jr NTR.\n\nSpeaking at a press conference in Hyderabad, Rajamouli said the story has been in development for two years. 'The sequel will explore a completely new dimension of the characters while maintaining the emotional core that audiences loved,' he stated.\n\nThe production budget is estimated at ₹800 crore, making it potentially the most expensive Indian film ever produced. DVV Danayya returns as producer with backing from international studios for global distribution.\n\nMM Keeravani, who won the Academy Award for 'Naatu Naatu,' will compose the music. The film will feature extensive VFX sequences with work being handled by both Indian and international studios.\n\nShooting is planned across locations in India, Europe, Africa, Japan, and South America, with principal photography beginning in October 2026."
    }
  },
  {
    id: "3",
    slug: "bengaluru-metro-phase-3",
    title: "Bengaluru Metro Phase 3 Approved: 45 km Ring Line to Ease Traffic",
    summary: "Union cabinet gives green signal to ₹18,000 crore metro expansion project.",
    category: "Local News",
    readTime: "40 sec",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-04-01T10:00:00Z",
    content: {
      tldr: "Bengaluru Metro Phase 3 gets Union Cabinet approval. The 45 km ring line will connect Hebbal, Koramangala, JP Nagar, and Rajajinagar, expected to reduce traffic congestion by 30%.",
      points: [
        "45 km ring line connecting major residential and IT hubs",
        "₹18,000 crore project with 50-50 Centre-State funding",
        "32 new stations planned along the route",
        "Expected completion by 2030",
        "Will integrate with suburban rail network"
      ],
      body: "The Union Cabinet has approved Bengaluru Metro Phase 3, a 45 km ring line that promises to transform public transportation in India's Silicon Valley. The project, estimated at ₹18,000 crore, will be funded equally by the Central and Karnataka state governments.\n\nThe ring line will connect major hubs including Hebbal, Koramangala, JP Nagar, Rajajinagar, and Yeshwanthpur, creating a circular metro network that integrates with existing Phase 1 and Phase 2 lines.\n\nBMRCL Managing Director stated that the project will feature 32 new stations, with several having multi-modal integration with the upcoming suburban rail network and BMTC bus terminals.\n\nThe project is expected to be completed by 2030 and will reduce traffic congestion on major corridors by an estimated 30%. Daily ridership is projected at 8 lakh passengers once fully operational."
    }
  },
  {
    id: "4",
    slug: "hyderabad-ai-hub",
    title: "Hyderabad Emerges as India's AI Capital with 200+ Startups",
    summary: "Telangana's AI ecosystem surpasses Bengaluru in growth rate for first time.",
    category: "Tech",
    readTime: "35 sec",
    language: "en",
    trending: true,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-04-02T06:00:00Z",
    content: {
      tldr: "Hyderabad's AI startup ecosystem has grown 340% in 3 years, overtaking Bengaluru in growth rate. T-Hub and IIIT Hyderabad driving innovation with government backing.",
      points: [
        "200+ AI startups now operating from Hyderabad",
        "340% growth in AI ecosystem over 3 years",
        "T-Hub 2.0 incubating 60+ AI-focused companies",
        "IIIT Hyderabad producing top AI research globally",
        "Telangana AI Mission attracted ₹4,000 crore in investments"
      ],
      body: "Hyderabad has quietly but decisively emerged as India's artificial intelligence capital, with over 200 AI-focused startups now operating from the city. A new NASSCOM report reveals that Telangana's AI ecosystem has grown 340% over the past three years, surpassing Bengaluru's growth rate for the first time.\n\nThe growth is attributed to a combination of factors: world-class academic institutions like IIIT Hyderabad producing cutting-edge AI research, the state government's proactive Telangana AI Mission (T-AIM), and the presence of T-Hub 2.0 — the world's largest innovation campus.\n\nMajor global companies including Google, Microsoft, Amazon, and Apple have expanded their AI research teams in Hyderabad. The city now hosts the largest AI research workforce outside of the US Bay Area.\n\nThe Telangana government's AI Mission has attracted over ₹4,000 crore in investments, with a focus on AI applications in agriculture, healthcare, and governance. The state offers special incentives for AI startups including subsidized office space and cloud computing credits."
    }
  },
  {
    id: "5",
    slug: "kerala-monsoon-prep-2026",
    title: "Kerala Launches Most Advanced Monsoon Early Warning System",
    summary: "AI-powered system can predict flooding 72 hours in advance with 90% accuracy.",
    category: "Local News",
    readTime: "35 sec",
    language: "en",
    publishedAt: "2026-03-31T12:00:00Z",
    thumbnail: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop&q=80",
    content: {
      tldr: "Kerala debuts India's most sophisticated monsoon warning system using AI and IoT sensors. Can predict district-level flooding 72 hours ahead, a major upgrade after the devastating 2018 floods.",
      points: [
        "AI model trained on 50 years of rainfall data",
        "5,000 IoT sensors deployed across all 14 districts",
        "72-hour advance flood prediction with 90% accuracy",
        "Automatic alerts via SMS, WhatsApp, and local TV",
        "₹500 crore investment in disaster preparedness"
      ],
      body: "Kerala has launched India's most advanced monsoon early warning system, combining artificial intelligence with a network of 5,000 IoT sensors deployed across all 14 districts. The system can predict district-level flooding up to 72 hours in advance with 90% accuracy.\n\nDeveloped in collaboration with IIT Madras and the Indian Space Research Organisation (ISRO), the AI model has been trained on 50 years of historical rainfall, river flow, and topographical data specific to Kerala's unique geography.\n\nThe system automatically triggers multi-channel alerts via SMS, WhatsApp, local television broadcasts, and community loudspeakers when flood risk exceeds predetermined thresholds. District collectors receive detailed risk maps with evacuation route recommendations.\n\nThe state has invested ₹500 crore in overall disaster preparedness, including the warning system, reinforced relief camps, pre-positioned rescue equipment, and trained volunteer networks in flood-prone areas."
    }
  },
  {
    id: "6",
    slug: "csk-ipl-2026-playoff",
    title: "CSK Storms into IPL 2026 Playoffs with Dhoni's Farewell Season Magic",
    summary: "Chennai Super Kings clinch playoff berth; Dhoni hints at retirement after this season.",
    category: "Sports",
    readTime: "30 sec",
    language: "en",
    trending: true,
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-04-02T09:00:00Z",
    content: {
      tldr: "MS Dhoni leads CSK to IPL 2026 playoffs in what's widely expected to be his final season. Emotional scenes at Chepauk as fans celebrate the legendary captain's journey.",
      points: [
        "CSK clinch 4th position with 8 wins from 14 matches",
        "Dhoni scores crucial 42*(18) in the must-win last league game",
        "Ruturaj Gaikwad leads run charts with 580 runs",
        "Chepauk crowd gives Dhoni 10-minute standing ovation",
        "Qualifier 2 against RCB on April 5th"
      ],
      body: "In what is being described as one of the most emotional nights in IPL history, Chennai Super Kings stormed into the IPL 2026 playoffs with a thrilling 6-wicket victory over Mumbai Indians at MA Chidambaram Stadium.\n\nMS Dhoni, in what's widely expected to be his final IPL season, played a vintage knock of 42 not out from just 18 balls, including four massive sixes, to guide CSK home in the must-win encounter. The Chepauk crowd erupted in celebration, giving the legendary captain a 10-minute standing ovation.\n\nCaptain Ruturaj Gaikwad has been in phenomenal form, leading the tournament run charts with 580 runs from 14 matches. The young batting lineup, combined with Dhoni's finishing prowess, has been the cornerstone of CSK's campaign.\n\nCSK will face Royal Challengers Bengaluru in Qualifier 2 on April 5th, with the winner advancing to face Gujarat Titans in the final."
    }
  },
  {
    id: "7",
    slug: "tamil-nadu-ev-policy",
    title: "Tamil Nadu Unveils Ambitious EV Policy: 50% Electric Vehicles by 2030",
    summary: "State targets becoming India's EV manufacturing hub with ₹10,000 crore incentives.",
    category: "Business",
    readTime: "40 sec",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-03-30T11:00:00Z",
    content: {
      tldr: "Tamil Nadu announces comprehensive EV policy targeting 50% electric vehicle adoption by 2030. Major incentives for manufacturers and buyers, with Chennai positioned as India's EV capital.",
      points: [
        "50% EV adoption target by 2030 across all vehicle categories",
        "₹10,000 crore incentive package for EV manufacturers",
        "100% road tax exemption for EVs until 2030",
        "5,000 charging stations planned across the state",
        "Ola, TVS, and Hyundai expanding EV plants in TN"
      ],
      body: "Tamil Nadu has unveiled one of India's most ambitious electric vehicle policies, targeting 50% EV adoption across all vehicle categories by 2030. The comprehensive policy includes a ₹10,000 crore incentive package for manufacturers, positioning Chennai as India's electric vehicle capital.\n\nThe state government will offer 100% road tax exemption for all electric vehicles purchased before 2030, along with subsidies of up to ₹1.5 lakh for two-wheelers and ₹3 lakh for four-wheelers. Commercial EVs will receive even higher subsidies.\n\nA network of 5,000 charging stations will be established across the state, with mandatory EV charging provisions in all new commercial and residential buildings. The government is also partnering with TANGEDCO to offer special electricity tariffs for EV charging.\n\nMajor manufacturers including Ola Electric, TVS Motor, and Hyundai are expanding their EV manufacturing facilities in Tamil Nadu. The state already accounts for 35% of India's automobile production and aims to maintain its dominance in the EV transition."
    }
  },
  {
    id: "8",
    slug: "tollywood-pan-india-wave",
    title: "Tollywood's Global Box Office Crosses ₹10,000 Crore in 2025-26",
    summary: "Telugu cinema industry achieves historic milestone, overtaking Bollywood internationally.",
    category: "Cinema",
    readTime: "30 sec",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-03-29T16:00:00Z",
    content: {
      tldr: "Telugu film industry's global box office collection crosses ₹10,000 crore for the fiscal year, a historic milestone. Pan-India appeal and growing international markets drive the surge.",
      points: [
        "₹10,000 crore global box office — highest ever for any Indian film industry",
        "North American collections up 180% year-over-year",
        "5 Telugu films crossed ₹500 crore worldwide",
        "OTT deals contributing additional ₹3,000 crore in revenue",
        "Hyderabad film city expansion announced"
      ],
      body: "The Telugu film industry has achieved a historic milestone, with its global box office collections crossing ₹10,000 crore for the fiscal year 2025-26. This makes Tollywood the highest-grossing Indian film industry globally, overtaking Bollywood for the second consecutive year.\n\nThe surge is driven by the pan-India appeal of Telugu films, which have found massive audiences across Hindi-speaking markets and internationally. North American collections alone have grown 180% year-over-year.\n\nFive Telugu films crossed the ₹500 crore mark worldwide this year, with two entering the exclusive ₹1,000 crore club. The combination of high production values, compelling storytelling, and star power has positioned Telugu cinema as India's premier film industry.\n\nOTT platforms have added another ₹3,000 crore in revenue through digital rights deals, with major streamers competing aggressively for Telugu content. The state government has announced a major expansion of Hyderabad's film city to accommodate the growing production pipeline."
    }
  },
  {
    id: "9",
    slug: "karnataka-startup-fund",
    title: "Karnataka Launches ₹5,000 Crore Startup Fund for Tier-2 Cities",
    summary: "Mysuru, Mangaluru, and Hubli-Dharwad to get dedicated tech parks and incubators.",
    category: "Business",
    readTime: "35 sec",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-03-28T09:00:00Z",
    content: {
      tldr: "Karnataka government creates India's largest state-level startup fund at ₹5,000 crore, specifically targeting tier-2 cities. Aims to decongest Bengaluru while spreading tech prosperity.",
      points: [
        "₹5,000 crore fund — largest state startup fund in India",
        "Dedicated tech parks in Mysuru, Mangaluru, and Hubli-Dharwad",
        "₹50 lakh seed funding for qualifying startups",
        "Free coworking spaces for first 2 years",
        "Tax holidays for 5 years for startups in tier-2 cities"
      ],
      body: "In a bold move to decentralize Karnataka's tech ecosystem, the state government has launched a ₹5,000 crore startup fund specifically targeting tier-2 cities. The fund, the largest of its kind by any Indian state, aims to create vibrant startup ecosystems in Mysuru, Mangaluru, Hubli-Dharwad, Belagavi, and Kalaburagi.\n\nEach city will get a dedicated tech park with state-of-the-art infrastructure, high-speed internet connectivity, and built-in incubation facilities. The government will provide free coworking spaces for the first two years and seed funding of up to ₹50 lakh for qualifying startups.\n\nStartups setting up in tier-2 cities will enjoy 5-year tax holidays, subsidized electricity, and preferential access to government contracts. The program also includes partnerships with IITs, NITs, and leading universities for talent pipeline development.\n\nThe initiative is expected to create 50,000 direct jobs and attract international companies looking for cost-effective alternatives to Bengaluru's increasingly expensive real estate market."
    }
  },
  {
    id: "10",
    slug: "vizag-it-corridor",
    title: "Vizag IT Corridor Attracts 15 Global Tech Giants in Q1 2026",
    summary: "Visakhapatnam's tech sector booms as companies seek alternatives to Hyderabad and Bengaluru.",
    category: "Tech",
    readTime: "35 sec",
    language: "en",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
    publishedAt: "2026-03-27T14:00:00Z",
    content: {
      tldr: "Vizag's IT corridor signs 15 major global tech companies in Q1 2026 alone. Lower costs and government incentives make it an attractive alternative to saturated tech hubs.",
      points: [
        "15 global companies including TCS, Infosys, and Accenture expand to Vizag",
        "IT exports from Vizag grow 250% in 2 years",
        "Average office rent 60% lower than Hyderabad",
        "AP government offers 10-year tax holidays for IT companies",
        "New international airport connectivity boosting business travel"
      ],
      body: "Visakhapatnam's burgeoning IT corridor has attracted 15 global technology companies in the first quarter of 2026 alone, cementing the coastal city's position as one of India's fastest-growing tech destinations.\n\nMajor IT services companies including TCS, Infosys, and Accenture have signed agreements to establish or expand operations in Vizag, drawn by office rents that are 60% lower than Hyderabad and generous government incentives.\n\nThe Andhra Pradesh government's IT policy offers 10-year tax holidays, subsidized land, and dedicated infrastructure for tech companies setting up in Vizag. The recently upgraded international airport has also improved connectivity.\n\nIT exports from Vizag have grown 250% over the past two years, with the city now contributing significantly to Andhra Pradesh's technology sector revenue. Industry experts predict Vizag could become a top-10 Indian tech city by 2028."
    }
  }
];
