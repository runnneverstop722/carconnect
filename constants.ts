import { CarTypeInfo } from './types';

export const APP_NAME = "CarConnect";

export const CAR_TYPES_DATA: CarTypeInfo[] = [
  {
    id: "sedan",
    name: "Sedan",
    iconName: "SedanIcon",
    tagline: "Comfortable & Efficient Cruisers",
    description: "A passenger car with a three-box configuration featuring separate compartments for the engine, passengers, and cargo. Typically has four doors and a traditional trunk.",
    advantages: [
      { text: "Generally quieter rides due to better noise isolation from the trunk.", iconName: "VolumeOffIcon" },
      { text: "Lower seating position can be more comfortable and less tiring on long journeys.", iconName: "UserGroupIcon" },
      { text: "Often offer better fuel efficiency compared to larger vehicles.", iconName: "FuelIcon" },
      { text: "Typically provide good handling and a smooth ride.", iconName: "RoadIcon" }
    ],
    idealFor: [
      { text: "Daily commuting" },
      { text: "Small families" },
      { text: "Highway driving & road trips" }
    ],
    considerations: [
      { text: "Less cargo flexibility compared to hatchbacks or SUVs.", iconName: "ArchiveBoxXMarkIcon" },
      { text: "Lower ground clearance, making them less ideal for rough or unpaved roads.", iconName: "ArrowDownCircleIcon" }
    ],
    exampleNewModels: [
      { name: "Honda Civic Sedan" },
      { name: "Toyota Camry" },
      { name: "BMW 3 Series" }
    ],
    exampleRecentModels: [
      { name: "Mazda 6", note: "Often praised used buy" },
      { name: "Ford Fusion", note: "Popular previous gen" },
      { name: "Hyundai Elantra" }
    ]
  },
  {
    id: "suv",
    name: "SUV",
    iconName: "SuvIcon",
    tagline: "Versatile Family & Adventure Haulers",
    description: "Sport Utility Vehicles (SUVs) combine elements of road-going passenger cars with features from off-road vehicles, like raised ground clearance and often All-Wheel Drive (AWD) or Four-Wheel Drive (4WD).",
    advantages: [
      { text: "Ample cargo space and flexible seating configurations.", iconName: "ArchiveBoxIcon" },
      { text: "Higher seating position provides better road visibility.", iconName: "EyeIcon" },
      { text: "Often available with AWD/4WD for better traction in various conditions.", iconName: "CogIcon" },
      { text: "Versatile for various needs, from family transport to light off-roading.", iconName: "MapIcon" }
    ],
    idealFor: [
      { text: "Families needing space and versatility" },
      { text: "Carrying sports equipment or large items" },
      { text: "Areas with challenging weather (snow, rain)" },
      { text: "Light off-roading or unpaved roads" }
    ],
    considerations: [
      { text: "Typically have lower fuel economy than smaller cars.", iconName: "FuelIcon" },
      { text: "Can be larger and more challenging to park in tight spaces.", iconName: "ArrowsPointingOutIcon" }
    ],
    exampleNewModels: [
      { name: "Toyota RAV4" },
      { name: "Honda CR-V" },
      { name: "Ford Explorer" },
      { name: "Kia Telluride" }
    ],
    exampleRecentModels: [
      { name: "Subaru Forester", note: "Known for AWD" },
      { name: "Jeep Grand Cherokee", note: "Good for off-road capabilities" },
      { name: "Mazda CX-5" }
    ]
  },
  {
    id: "hatchback",
    name: "Hatchback",
    iconName: "HatchbackIcon",
    tagline: "Compact & Cargo-Flexible City Cars",
    description: "Hatchbacks feature a rear door (hatch) that swings upward, providing easy access to a spacious cargo area. They often share platforms with sedans but offer enhanced cargo versatility.",
    advantages: [
      { text: "Highly versatile cargo space, especially when rear seats are folded.", iconName: "ArchiveBoxArrowDownIcon" },
      { text: "Generally more fuel-efficient than SUVs.", iconName: "FuelIcon" },
      { text: "Compact size makes them easy to maneuver and park in urban environments.", iconName: "ArrowsPointingInIcon" }
    ],
    idealFor: [
      { text: "City driving and tight parking" },
      { text: "Individuals or small families needing flexible cargo options" },
      { text: "Budget-conscious buyers looking for practicality" }
    ],
    considerations: [
      { text: "Can have more road noise from the cargo area compared to sedans.", iconName: "VolumeUpIcon" },
      { text: "Styling might not appeal to everyone.", iconName: "QuestionMarkCircleIcon" }
    ],
    exampleNewModels: [
      { name: "Honda Civic Hatchback" },
      { name: "Mazda 3 Hatchback" },
      { name: "Volkswagen Golf GTI", note: "Performance oriented" }
    ],
    exampleRecentModels: [
      { name: "Subaru Impreza Hatchback" },
      { name: "Ford Focus Hatchback", note: "Previous generations" },
      { name: "Kia Forte5" }
    ]
  },
  {
    id: "truck",
    name: "Pickup Truck",
    iconName: "TruckIcon",
    tagline: "Powerful Hauling & Towing Machines",
    description: "Pickup trucks are characterized by an open cargo bed at the rear, designed for hauling goods. They are known for their towing capabilities and ruggedness.",
    advantages: [
      { text: "Excellent for hauling large or bulky items in the open bed.", iconName: "CubeTransparentIcon" },
      { text: "Strong towing capacities for trailers, boats, etc.", iconName: "LinkIcon" },
      { text: "Often available with 4WD and durable construction for tough jobs.", iconName: "WrenchScrewdriverIcon" }
    ],
    idealFor: [
      { text: "Tradespeople and businesses needing to transport tools/materials" },
      { text: "Towing trailers, boats, or campers" },
      { text: "Off-road enthusiasts (many models are capable)" }
    ],
    considerations: [
      { text: "Generally lower fuel economy due to size and power.", iconName: "FuelIcon" },
      { text: "Can be difficult to maneuver and park, especially in cities.", iconName: "ArrowsPointingOutIcon" },
      { text: "Ride comfort might be less refined than passenger cars unless designed for it.", iconName: "RoadIcon" }
    ],
    exampleNewModels: [
      { name: "Ford F-150" },
      { name: "Ram 1500" },
      { name: "Chevrolet Silverado 1500" },
      { name: "Toyota Tacoma" }
    ],
    exampleRecentModels: [
      { name: "Nissan Frontier", note: "Mid-size option" },
      { name: "GMC Sierra 1500" },
      { name: "Ford Ranger", note: "Popular mid-size" }
    ]
  }
];