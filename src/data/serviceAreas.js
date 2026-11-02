export const serviceAreas = [
  {
    name: "Houston",
    slug: "houston",
    county: "Harris",
    nearbyAreas: [
      "katy",
      "sugar-land",
      "pearland",
      "pasadena",
      "missouri-city",
    ],
    localContent:
      "A Houston property can need anything from a few vacant-unit updates to a coordinated interior and exterior program. Start with the building condition and the units actually available for work, rather than a city-wide cost assumption.",
    planningNote:
      "For a property inside Houston, confirm the site address, access routes, material storage, and any permit or inspection needs for the specific scope.",
  },
  {
    name: "Katy",
    slug: "katy",
    county: "Harris / Fort Bend",
    nearbyAreas: [
      "houston",
      "cypress",
      "sugar-land",
      "richmond",
      "missouri-city",
    ],
    localContent:
      "For apartment work in the Katy area, define the unit package before rolling it out across different floor plans. Cabinets, flooring transitions, and bathroom layouts can change the work even when the finish selection is the same.",
    planningNote:
      "Katy-area addresses can fall within different jurisdictions. Share the exact address so the scope and any permit requirements can be checked for the site.",
  },
  {
    name: "Sugar Land",
    slug: "sugar-land",
    county: "Fort Bend",
    nearbyAreas: ["houston", "missouri-city", "richmond", "pearland", "katy"],
    localContent:
      "Planning a renovation in Sugar Land? Separate unit work from shared-space improvements so the budget reflects both. A kitchen refresh and a leasing-office renovation need different access, material, and handoff plans.",
    planningNote:
      "If residents will remain on site, identify delivery access, parking, and which shared areas need to stay open during the job.",
  },
  {
    name: "Pearland",
    slug: "pearland",
    county: "Brazoria",
    nearbyAreas: [
      "houston",
      "friendswood",
      "league-city",
      "pasadena",
      "sugar-land",
    ],
    localContent:
      "For a Pearland apartment renovation, start with visible wear and any recurring maintenance issues. Replacing flooring or bathroom finishes should follow a review of moisture and subfloor conditions, not conceal them.",
    planningNote:
      "Share known leak or drainage concerns along with the finish scope so underlying repairs can be considered before installation.",
  },
  {
    name: "Pasadena",
    slug: "pasadena",
    county: "Harris",
    nearbyAreas: [
      "houston",
      "baytown",
      "pearland",
      "league-city",
      "friendswood",
    ],
    localContent:
      "Renovating a Pasadena apartment community starts with a clear distinction between routine turns and deeper repair work. A consistent finish package is useful only after you know which unit conditions differ.",
    planningNote:
      "Gather maintenance notes and identify units with previous repairs so the review can focus on exceptions as well as the standard unit.",
  },
  {
    name: "The Woodlands",
    slug: "the-woodlands",
    county: "Montgomery",
    nearbyAreas: ["spring", "conroe", "humble", "cypress", "houston"],
    localContent:
      "A renovation in The Woodlands may include unit interiors, amenities, or both. When shared spaces are part of the work, agree on access, temporary closures, and equipment protection before demolition or material deliveries.",
    planningNote:
      "Confirm any property-specific exterior approval requirements before finalizing colors or exterior materials.",
  },
  {
    name: "Spring",
    slug: "spring",
    county: "Harris",
    nearbyAreas: ["the-woodlands", "humble", "cypress", "conroe", "houston"],
    localContent:
      "For a Spring apartment renovation, a phased plan can connect unit availability with material ordering and trade scheduling. The starting point is knowing which units are vacant and which become available later.",
    planningNote:
      "Spring mailing addresses cover multiple areas. The exact site address helps establish jurisdiction and practical site logistics.",
  },
  {
    name: "Cypress",
    slug: "cypress",
    county: "Harris",
    nearbyAreas: ["katy", "spring", "the-woodlands", "houston", "humble"],
    localContent:
      "At a Cypress apartment property, start by documenting each floor plan and the finishes to retain or replace. A sample unit can help settle details before the same package is repeated elsewhere on the property.",
    planningNote:
      "Review material storage and delivery access before ordering for multiple units at once.",
  },
  {
    name: "League City",
    slug: "league-city",
    county: "Galveston",
    nearbyAreas: ["friendswood", "pearland", "pasadena", "baytown", "houston"],
    localContent:
      "For League City exterior or interior work, identify weather-exposed areas and any known water entry before choosing finishes. Surface upgrades and underlying repairs need to be separate, visible parts of the scope.",
    planningNote:
      "For exterior work, plan around suitable installation conditions and preserve safe resident access through the work area.",
  },
  {
    name: "Missouri City",
    slug: "missouri-city",
    county: "Fort Bend",
    nearbyAreas: ["sugar-land", "houston", "richmond", "pearland", "katy"],
    localContent:
      "A Missouri City apartment renovation can be scoped as a focused interior update or a broader community program. Identify the areas that need work first, then decide which can be grouped into the same phase.",
    planningNote:
      "Bring the property address, unit availability, and any management restrictions on work hours to the first conversation.",
  },
  {
    name: "Conroe",
    slug: "conroe",
    county: "Montgomery",
    nearbyAreas: ["the-woodlands", "spring", "humble", "cypress", "houston"],
    localContent:
      "For an apartment renovation in Conroe, match the scope to the condition of each unit before assuming every floor plan needs the same work. Repairs, finish upgrades, and shared-space work can be priced and scheduled as separate decisions.",
    planningNote:
      "Clarify site access and which units can be released together so a phased schedule is grounded in actual availability.",
  },
  {
    name: "Baytown",
    slug: "baytown",
    county: "Harris",
    nearbyAreas: ["pasadena", "houston", "league-city", "humble", "pearland"],
    localContent:
      "Planning work at a Baytown apartment property? Start with the repair history and the finish changes you want to make. Recurring leaks, damaged materials, or system issues should be considered before a cosmetic package is repeated.",
    planningNote:
      "Separate known repairs from allowances for concealed conditions so the bid is clear about what is and is not included.",
  },
  {
    name: "Richmond",
    slug: "richmond",
    county: "Fort Bend",
    nearbyAreas: ["sugar-land", "katy", "missouri-city", "houston", "pearland"],
    localContent:
      "For Richmond apartment communities, a renovation plan should account for both the apartment interiors and the spaces residents share. Prioritize the work, then check how unit access and material lead times affect each phase.",
    planningNote:
      "Share the exact property address and any existing plans so jurisdiction and site requirements can be reviewed.",
  },
  {
    name: "Friendswood",
    slug: "friendswood",
    county: "Galveston / Harris",
    nearbyAreas: ["pearland", "league-city", "pasadena", "houston", "baytown"],
    localContent:
      "At a Friendswood apartment property, define the finish scope alongside any repairs needed underneath it. Floors, bathrooms, paint, and trim often overlap in sequence even when they are separate budget items.",
    planningNote:
      "Confirm any requirements for utility interruptions, resident notices, and access before scheduling work in or near occupied spaces.",
  },
  {
    name: "Humble",
    slug: "humble",
    county: "Harris",
    nearbyAreas: ["spring", "the-woodlands", "baytown", "houston", "cypress"],
    localContent:
      "For apartment renovations in Humble, start with a realistic release plan for vacant units. Consistent finish choices and a clear punch-list standard help make the work repeatable as later units become available.",
    planningNote:
      "An exact address, floor plans, and the expected move-out sequence help turn a general renovation idea into a workable first phase.",
  },
];
export default serviceAreas;
