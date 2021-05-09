const products = [
  {
    name: 'Niner 2021 Air 9 2-star Hardtail Mountain bike',
    image: '/images/b1.jpg',
    description:
      'The Air 9 aluminum hardtail blends the agility and efficiency of a pedal-friendly XC bike with the versatility, toughness and capability of a rowdy trail rig. Lightweight and snappy, poppy and peppy, the AIR 9 has plenty of stiffness to get you up to speed when you stomp on the pedals evolution geometry puts the rider in the sweet, balanced spot on the bike. The roomy cockpit has a comfortable reach for short stem lengths, giving you quick handling and plenty of maneuverability to blast through rock gardens and cut hard corners. The steep 74-degree seat angle gets you centered over the BB for climbing and pairs nicely with the short 430mm chainstay length for supreme pedaling efficiency.. And of course, the slack, 68-degree head tube angle and long wheelbase contribute stability and self-confidence when you’re dropping into the steepest lines.Hit the trail big with the 2-Star SRAM SX build, without a big hit to your wallet. Thanks to SRAMs outstanding SX Eagle drivetrain, you can bring every ounce of AIR 9 performance to bear at an affordable price level',
    brand: 'Niner',
    category: 'Bikes',
    price: 1800.00,
    countInStock: 18,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Surly Karte Monkey 27.5" Rigid Mountain Bike',
    image: '/images/b2.jpg',
    description:
      'This Karate Monkey features a steel front fork for rigid rip speed.Progressive trail geometry and Surly’s Gnot-Boost rear dropout system deliver a versatile bike with the ability to swap hubs and wheel sizes. If you want to round-house kick some trail right in the face, the Karate Monkey is your sled.Features:100% Surly Chromoly steel frame, double-butted main triangle and 44mm headtubeThe tubeset uses Surly custom trumpet tubes for greater stiffness and durabilityAdjustable rear dropouts with 145mm Gnot-Boost spacing. Works with 142 and 148 x 12mm thru, as well as 135mm w/ 10/12 washerInternal dropper seatpost routing with 30.9mm seat tube IDClearance for 27.5 x 3 or 29 x 2.55" tires ',
    brand: 'Surly',
    category: 'Bikes',
    price: 1675.00,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Batch Bicycles 24 Mountain Bike',
    image: '/images/b3.jpg',
    description:
      'The world is full of adventure and there is no better way to explore than upon two wheels. The Batch Bicycles 24" mountain bike features reliable and rugged quality, a suspension fork, and easy controls that will quickly turn your kid into an adventure-seeking pedaler.Features:Lightweight 6061 alloy frame designed to withstand casual mountain biking and trail riding 50mm travel suspension for boosts control and off-road performanceAlloy linear pull brakes are easy to operate and provide quick stopping powerShimano Tourney 7sp drivetrain makes it easy to find the right gear for any terrain24" wheels roll fast and give the bike a nimble feel for beginners',
    brand: 'Batch Bicycles',
    category: 'Bikes',
    price: 399.99,
    countInStock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Batteship BMX Bike (20.75" toptube)',
    image: '/images/b4.jpg',
    description:
      'The 2021 We The People Battleship BMX Bike is for any rider wanting or needing a fully aftermarket bike to tear up some tech street riding. From the frame, all the way to the grips, every component included in this build is extremely high-end and has been carefully thought out to provide the best ride and performance possible. The WTP Battleship frame has a geometry designed to excel at technical street lines while exuding the ultimate in confidence boosting strength. WTPs Battleship fork compliments the frame geometry perfectly by utilizing a 15mm offset creating an easy to nose manual ride. If you love fakies, the Left Hand Drive WTP Helix freecoaster has you covered. An Eclat nylon sprocket guard, 4 WTP Helix hub guards, and the Eclat plastic Venom pegs have all been included with the package meaning that this bike has everything needed to be ready to ride. Honestly, there is too much going on here to list it all out. If you need more convincing that the WTP Battleship is top of line, check out the specs below- we are blown away.',
    brand: 'BMX',
    category: 'Bikes',
    price: 1099.99,
    countInStock: 20,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Se Racing 2021 Bronco 16" Bmx Bike (Pink) (15.1" toptube)',
    image: '/images/b5.jpg',
    description:
      'The Bronco 16 may be small, but it’s made for big adventures. Built with a lightweight 6061 aluminum frame, this bike is ready to zip around on. The training wheels, coaster brake, and hand brake will be sure to build confidence when going out on new adventures around the neighborhood.Features:Lightweight 6061 aluminum frame with low standover height to correctly fit young ridersCoaster brake rear hub and rear hand brakes for added safetyAdjustable handlebar and seat height for growing kidsComes equipped with training wheels, which can be removed later as the rider progresses21.7 lbs',
    brand: 'SE Racing',
    category: 'Bikes',
    price: 239.99,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Strider Sports 12 Sport Kids Balance Bike (Red)',
    image: '/images/b6.jpg',
    description:
      'A lightweight, steel balance bike designed to teach children how to balance without the distraction of pedals or training wheels.Features:Ages 18 months to 5 yearsAdjustable seat and handlebar height, no tool requiredMaintenance free puncture proof tiresBuilt-in footrestErgonomically-designed, padded seatHandlebar pad and mini grips',
    brand: 'Strider Sports',
    category: 'Bikes',
    price: 109.99,
    countInStock: 1,
    rating: 0,
    numReviews: 0,
  },
  
  
  
  {
    name: 'Surly Karate Monkey 27.5" Hardtail Mountain Bike (High Fiber Green) (XS)',
    image: '/images/b7.jpg',
    description:
      'The Karate Monkey Front Suspension bike features a Rock Shox 35 Gold RL A2 suspension fork with 140mm travel, and it’s paired with a dropper post out the box. Progressive trail geometry and Surly’s Gnot-Boost rear dropout system deliver a versatile bike with the ability to swap hubs and wheel sizes. If you want to round-house kick some trail right in the face, the Karate Monkey is your sled.',
    brand: 'Surly',
    category: 'Bikes',
    price: 2299.00,
    countInStock: 22,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Fit Bike Co 2021 Str BMX Bike (Md)',
    image: '/images/b8.jpg',
    description:
      'The Mid-Drive Electric Cruiser Bike is your stylish ride for the beachfront, boardwalk, or around the neighborhood. With high, comfortable handlebars, bright lights, and step-through frame, this bike is good old fashioned fun.Picture yourself at the beach, rolling effortlessly down the boardwalk, free to explore and enjoy the sunshine. The Electric Cruiser makes cruising everywhere a breeze. ',
    brand: 'Fit Bike',
    category: 'Bikes',
    price: 2498.00,
    countInStock: 13,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Se Racing 2021 Big Ripper Bike (29") (Ball Burnish Silver)',
    image: '/images/b9.jpg',
    description:
      'The Electric Fat Trike is the perfect companion for your next off-road adventure. The 24" x 4" front wheel rolls over anything in your way, and the rear 20" x 4" wheels lower your center of gravity for stability. The front suspension and suspension seatpost keep you comfortable on rough terrain.The Electric Fat Trike sports versatile wide 4" tires with a low-profile tread for both on-road and off-road use. These tough tires will tolerate inflation pressures from 5-30 psi, so you can let the air out for serious traction on loose surfaces or pump them up hard for great on-road performance.',
    brand: 'Se Racing',
    category: 'Bikes',
    price: 749.99,
    countInStock: 2,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Gt 2021 La Bomba Pro 26" Dj Bike (22.2" Toptube)',
    image: '/images/b10.jpg',
    description:
      'The SCOTT Speedster is light, agile and cost efficient. The Speedster 30 features a Shimano groupset and Syncros components. Youll be upping your velocity in no timeFor whom is the Scott Speedster 30 suitable?For the price-conscious racing driver. In no other bike category do prices reach such heights as with racing bikes. But if you dont calculate in milligrams or milliseconds, youll get a fast bike with outstanding features for a plausible budget. The road bike is a trend that is just coming back. For good reason: ever wider cycle paths and the will to do something for your health can best be combined with the road bike. Speed and stiffness are still combined in this category with sufficient comfort.',
    brand: 'GT',
    category: 'Bikes',
    price: 899.00,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Izip Vibe 2.0 Step Commuter (Onxy Black) (M)',
    image: '/images/b11.jpg',
    description:
      'The IZIP Vibe 2.0 is the perfect electric bike, a meld of function, style and power. The reliable Bosch Active Line center motor will help propel you up to 20 mph and leave you with plenty of energy to go where you need to go. The Vibe 2.0 has been a crowd favorite for years with its comfortable, upright riding position, and now with the addition of the Bosch drive system, it’s better than ever. Take time to incorporate positive vibes into your life in a way that promotes fitness and fun.',
    brand: 'SE Racing',
    category: 'Bikes',
    price: 2150.00,
    countInStock: 8,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'Bombtrack Outlaw Urban Bike (Matee Teal) (650B) (XL)',
    image: '/images/b12.jpg',
    description:
      'This is the Bombtrack Outlaw Urban Commuter Bike. Fly past crosstown traffic in style and comfort while carrying a slab of beer or multiple pizzas on the integrated front rack. The Outlaw was designed to tackle commutes and to get you where you need to go. Features: Oil-free Gates carbon belt driveShimano BL-M200 post mount hydraulic disc brakesWTB Horizon tires Bombtrack front rack included',
    brand: 'Bombtrack',
    category: 'Bikes',
    price: 1649.99,
    countInStock: 2,
    rating: 0,
    numReviews: 0,
  },
]

export default products
