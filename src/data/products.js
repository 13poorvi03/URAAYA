export const PRODUCTS = [
  // --- WOMEN'S COLLECTION ---
  {
    id: 'uraaya-w-01',
    name: 'Atelier Double-Breasted Cashmere Coat',
    category: 'women',
    subcategory: 'Coats & Jackets',
    price: 890,
    originalPrice: 1150,
    badge: 'Atelier Exclusive',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 38,
    colors: [
      { name: 'Camel Warm Sand', hex: '#C2A382', bg: 'bg-[#C2A382]' },
      { name: 'Midnight Noir', hex: '#111111', bg: 'bg-[#111111]' },
      { name: 'Alabaster Ivory', hex: '#FAF6EE', bg: 'bg-[#FAF6EE]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A masterwork of quiet luxury, crafted from double-faced Grade-A Mongolian cashmere with hand-finished horn buttons. Features an architectural relaxed silhouette, peaked lapels, and a belted waist for effortless tailoring.',
    fabric: '95% Pure Mongolian Cashmere, 5% Mulberry Silk. Cupro satin interior lining.',
    care: 'Specialist dry clean only. Store in provided cotton garment bag with cedar hanger.',
    sustainability: 'Hand-loomed in Biella, Italy using sustainable, certified humane-shearing cashmere.',
    modelInfo: 'Model is 5\'10" / 178cm wearing size Small (IT 40 / UK 8).'
  },
  {
    id: 'uraaya-w-02',
    name: 'Sculptural Bias-Cut Silk Evening Gown',
    category: 'women',
    subcategory: 'Dresses',
    price: 720,
    originalPrice: null,
    badge: 'Runway Edition',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 22,
    colors: [
      { name: 'Champagne Gold', hex: '#D8C5A4', bg: 'bg-[#D8C5A4]' },
      { name: 'Obsidian Black', hex: '#0D0D0D', bg: 'bg-[#0D0D0D]' },
      { name: 'Bordeaux Rouge', hex: '#581825', bg: 'bg-[#581825]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An ethereal evening gown cut on the bias to caress the natural silhouette. Featuring a dramatic low back, cowl neckline, and fluid movement inspired by Mediterranean haute couture.',
    fabric: '100% Heavy Mulberry Silk Charmeuse (22mm weight).',
    care: 'Delicate dry clean only. Cool steam iron inside out.',
    sustainability: 'OEKO-TEX Standard 100 certified non-toxic organic dye process.',
    modelInfo: 'Model is 5\'9" / 175cm wearing size XS (IT 38).'
  },
  {
    id: 'uraaya-w-03',
    name: 'Oversized Sculpted Wool Blazer',
    category: 'women',
    subcategory: 'Tailoring',
    price: 540,
    originalPrice: 620,
    badge: 'Essential',
    isTrending: false,
    isFeatured: true,
    isNew: false,
    rating: 4.8,
    reviewsCount: 45,
    colors: [
      { name: 'Slate Charcoal', hex: '#2B2D2F', bg: 'bg-[#2B2D2F]' },
      { name: 'Ivory Crème', hex: '#F6F1E9', bg: 'bg-[#F6F1E9]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Strong shoulders meet fluid feminine tailoring. Cut from dry-handle virgin wool with subtle satin piped pockets and mother-of-pearl buttons. Pairs seamlessly with tailored trousers or denim.',
    fabric: '100% Fine Merino Virgin Wool; 100% Bemberg Viscose lining.',
    care: 'Dry clean only. Hang on tailored contour hanger.',
    sustainability: 'Woven in a zero-carbon Italian mill.',
    modelInfo: 'Model is 5\'11" / 180cm wearing size Small.'
  },
  {
    id: 'uraaya-w-04',
    name: 'Ribbed Cashmere Turtleneck Sweater',
    category: 'women',
    subcategory: 'Knitwear',
    price: 380,
    originalPrice: null,
    badge: 'Bestseller',
    isTrending: true,
    isFeatured: false,
    isNew: false,
    rating: 4.9,
    reviewsCount: 64,
    colors: [
      { name: 'Warm Oat', hex: '#D7C7B0', bg: 'bg-[#D7C7B0]' },
      { name: 'Espresso', hex: '#3E2A24', bg: 'bg-[#3E2A24]' },
      { name: 'Classic Black', hex: '#151515', bg: 'bg-[#151515]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Sumptuously soft 7-gauge knit engineered with clean fisherman ribbing. Designed with a folded funnel collar, dropped shoulders, and elongated cuffs for effortless layering.',
    fabric: '100% 2-ply Mongolian Grade-A Cashmere.',
    care: 'Hand wash in cold water with cashmere shampoo or green dry clean.',
    sustainability: 'Certified by Sustainable Fibre Alliance (SFA).',
    modelInfo: 'Model is 5\'8" / 173cm wearing size S.'
  },
  {
    id: 'uraaya-w-05',
    name: 'Pleated High-Waisted Palazzo Trousers',
    category: 'women',
    subcategory: 'Tailoring',
    price: 360,
    originalPrice: 420,
    badge: 'Editorial Pick',
    isTrending: false,
    isFeatured: false,
    isNew: true,
    rating: 4.7,
    reviewsCount: 19,
    colors: [
      { name: 'Alabaster White', hex: '#F9F7F2', bg: 'bg-[#F9F7F2]' },
      { name: 'Deep Taupe', hex: '#877B6E', bg: 'bg-[#877B6E]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Architectural front pleats cascade into a wide, floor-grazing leg. Crafted from crisp tropical wool blend that maintains its press through day-long soirees.',
    fabric: '70% Fine Tropical Wool, 28% Viscose, 2% Elastane.',
    care: 'Dry clean only.',
    sustainability: 'Eco-conscious fluid drape textiles sourced from Como, Italy.',
    modelInfo: 'Model is 5\'10" / 178cm wearing size 38 / Small.'
  },
  {
    id: 'uraaya-w-06',
    name: 'Pure Linen Belted Safari Trench',
    category: 'women',
    subcategory: 'Coats & Jackets',
    price: 610,
    originalPrice: null,
    badge: 'New Season',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 4.8,
    reviewsCount: 14,
    colors: [
      { name: 'Sun-Drenched Sand', hex: '#E3D7C5', bg: 'bg-[#E3D7C5]' },
      { name: 'Sage Leaf', hex: '#8F9779', bg: 'bg-[#8F9779]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An elevated interpretation of the classic utility trench in heavyweight unbleached Normandy flax linen. Features tortoiseshell buckles and storm flaps.',
    fabric: '100% French Normandy Linen.',
    care: 'Dry clean or gentle cycle cold, lay flat to dry in shade.',
    sustainability: 'Flax requires zero artificial irrigation and is fully biodegradable.',
    modelInfo: 'Model is 5\'9" / 176cm wearing size Small.'
  },

  // --- MEN'S COLLECTION ---
  {
    id: 'uraaya-m-01',
    name: 'Bespoke Double-Breasted Flannel Suit',
    category: 'men',
    subcategory: 'Tailoring',
    price: 1250,
    originalPrice: 1480,
    badge: 'Atelier Tailoring',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 31,
    colors: [
      { name: 'Pinstripe Charcoal', hex: '#26292B', bg: 'bg-[#26292B]' },
      { name: 'Deep Navy', hex: '#18202A', bg: 'bg-[#18202A]' }
    ],
    sizes: ['38R', '40R', '42R', '44R', '46R'],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Neapolitan style shoulder with soft canvassing and peaked lapels. Crafted from English Super 150s wool flannel that drapes with uncompromised distinction and authority.',
    fabric: '100% Super 150s Australian Merino Wool; pure silk lining.',
    care: 'Specialist dry clean. Air out after wear on broad-shouldered wooden hanger.',
    sustainability: 'Certified ethical wool sourcing from regenerative pastures.',
    modelInfo: 'Model is 6\'2" / 188cm with 39" chest wearing size 40R.'
  },
  {
    id: 'uraaya-m-02',
    name: 'Cashmere & Wool Raglan Overcoat',
    category: 'men',
    subcategory: 'Coats & Jackets',
    price: 980,
    originalPrice: null,
    badge: 'Iconic Piece',
    isTrending: true,
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 42,
    colors: [
      { name: 'Rich Camel', hex: '#B59473', bg: 'bg-[#B59473]' },
      { name: 'Noir Monolith', hex: '#111111', bg: 'bg-[#111111]' },
      { name: 'Forest Melange', hex: '#2A362D', bg: 'bg-[#2A362D]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An expansive raglan sleeve overcoat cut from luxurious double-face wool and cashmere. Designed with concealed horn button placket, deep welt pockets, and a dramatic back vent.',
    fabric: '85% Virgin Wool, 15% Mongolian Cashmere.',
    care: 'Dry clean only.',
    sustainability: 'Woven with closed-loop water filtration in Tuscany.',
    modelInfo: 'Model is 6\'1" / 185cm wearing size Medium.'
  },
  {
    id: 'uraaya-m-03',
    name: 'Fine Gauge Sea Island Cotton Polo',
    category: 'men',
    subcategory: 'Knitwear',
    price: 260,
    originalPrice: 310,
    badge: 'Signature',
    isTrending: false,
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 29,
    colors: [
      { name: 'Chalk White', hex: '#F7F7F4', bg: 'bg-[#F7F7F4]' },
      { name: 'Riviera Navy', hex: '#1C2735', bg: 'bg-[#1C2735]' },
      { name: 'Mocha', hex: '#5A463B', bg: 'bg-[#5A463B]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Spun from legendary West Indian Sea Island cotton renowned for its silk-like luster and rare fiber length. Seamless 18-gauge knit with genuine Australian mother-of-pearl buttons.',
    fabric: '100% Certified West Indian Sea Island Cotton.',
    care: 'Cold hand wash with mild detergent or green dry clean.',
    sustainability: 'Hand-picked organic non-GMO long-staple cotton.',
    modelInfo: 'Model is 6\'0" / 183cm wearing size Medium.'
  },
  {
    id: 'uraaya-m-04',
    name: 'Pleated Tapered Wool Gurkha Trousers',
    category: 'men',
    subcategory: 'Tailoring',
    price: 340,
    originalPrice: null,
    badge: 'Crafted',
    isTrending: true,
    isFeatured: false,
    isNew: false,
    rating: 4.8,
    reviewsCount: 18,
    colors: [
      { name: 'Olive Drab', hex: '#4B533E', bg: 'bg-[#4B533E]' },
      { name: 'Sandstone', hex: '#C5B59E', bg: 'bg-[#C5B59E]' }
    ],
    sizes: ['30', '32', '34', '36'],
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Inspired by military heritage, these Gurkha trousers feature a high-rise waist with integrated double buckle cummerbund closures and forward double pleats.',
    fabric: '100% High-Twist Gabardine Wool from England.',
    care: 'Dry clean only.',
    sustainability: 'Zero polyester or synthetic microfibers.',
    modelInfo: 'Model is 6\'2" wearing size 32.'
  },
  {
    id: 'uraaya-m-05',
    name: 'Supple Napa Leather Minimalist Jacket',
    category: 'men',
    subcategory: 'Coats & Jackets',
    price: 1100,
    originalPrice: 1350,
    badge: 'Limited Run',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 16,
    colors: [
      { name: 'Pitch Noir', hex: '#0B0B0B', bg: 'bg-[#0B0B0B]' },
      { name: 'Tobacco Brown', hex: '#4A3423', bg: 'bg-[#4A3423]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An uncluttered silhouette tailored from butter-soft Tuscan lamb napa. Finished with concealed matte riri hardware, discreet interior jet pockets, and silk twill lining.',
    fabric: '100% Full Grain Tuscan Lambskin; 100% Silk Twill lining.',
    care: 'Specialist leather care only.',
    sustainability: 'Vegetable-tanned with tree barks and tannin extracts.',
    modelInfo: 'Model is 6\'1" wearing size Large.'
  },

  // --- KIDS COLLECTION (PETIT URAAYA) ---
  {
    id: 'uraaya-k-01',
    name: 'Petit Double-Breasted Wool Peacoat',
    category: 'kids',
    subcategory: 'Kids Outerwear',
    price: 280,
    originalPrice: 340,
    badge: 'Petit URAAYA',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 19,
    colors: [
      { name: 'Heritage Navy', hex: '#192433', bg: 'bg-[#192433]' },
      { name: 'Oatmeal Heather', hex: '#DFD8CC', bg: 'bg-[#DFD8CC]' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Heirloom-quality mini tailoring. Crafted from non-scratch hypoallergenic virgin wool with soft brushed cotton lining and engraved mock-tortoise buttons.',
    fabric: '90% Soft Virgin Wool, 10% Cashmere; 100% Organic Brushed Cotton lining.',
    care: 'Dry clean or gentle hand spot cleaning.',
    sustainability: 'Made from certified non-toxic organic dyes safe for sensitive child skin.',
    modelInfo: 'Child model is 6 years old wearing size 5-6Y.'
  },
  {
    id: 'uraaya-k-02',
    name: 'Cable-Knit Cashmere Cardigan',
    category: 'kids',
    subcategory: 'Kids Knitwear',
    price: 195,
    originalPrice: null,
    badge: 'Soft Touch',
    isTrending: true,
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 27,
    colors: [
      { name: 'Milk White', hex: '#F7F6F2', bg: 'bg-[#F7F6F2]' },
      { name: 'Soft Biscuit', hex: '#CDBCA8', bg: 'bg-[#CDBCA8]' }
    ],
    sizes: ['2-3Y', '3-4Y', '5-6Y', '7-8Y'],
    images: [
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Charming traditional cable patterns spun in heavenly cloud-soft cashmere. Features natural olive wood button closures and ribbed cuffs designed to roll as they grow.',
    fabric: '100% Pure Mongolian Cashmere.',
    care: 'Gentle hand wash with wool shampoo, lay flat to dry.',
    sustainability: 'Traceable cruelty-free cashmere fiber.',
    modelInfo: 'Child model is 4 years old wearing size 3-4Y.'
  },
  {
    id: 'uraaya-k-03',
    name: 'Organic French Linen Smocked Dress',
    category: 'kids',
    subcategory: 'Kids Dresses',
    price: 165,
    originalPrice: 210,
    badge: 'Hand-Embroidered',
    isTrending: false,
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 15,
    colors: [
      { name: 'Blush Rose', hex: '#E2C2C2', bg: 'bg-[#E2C2C2]' },
      { name: 'Pristine White', hex: '#FFFFFF', bg: 'bg-[#FFFFFF]' }
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Hand-smocked bodice with delicate floral embroidery, flutter sleeves, and mother-of-pearl back buttons. Breathable, breezy, and effortlessly charming.',
    fabric: '100% Certified Organic Normandy Linen.',
    care: 'Machine wash delicate cold in laundry bag, line dry.',
    sustainability: 'GOTS Certified organic linen.',
    modelInfo: 'Model is 5 years old wearing size 4-5Y.'
  },
  {
    id: 'uraaya-k-04',
    name: 'Mini Tailored Chino Trousers',
    category: 'kids',
    subcategory: 'Kids Bottoms',
    price: 130,
    originalPrice: null,
    badge: 'Playful Luxury',
    isTrending: false,
    isFeatured: false,
    isNew: false,
    rating: 4.7,
    reviewsCount: 12,
    colors: [
      { name: 'Warm Khaki', hex: '#C5B399', bg: 'bg-[#C5B399]' },
      { name: 'Navy Blue', hex: '#1B263B', bg: 'bg-[#1B263B]' }
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    images: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Cut from durable yet soft stretch cotton twill with an internal elasticated waistband adjuster for the perfect fit through every adventure.',
    fabric: '98% Organic Pima Cotton, 2% Elastane.',
    care: 'Machine wash warm with like colors.',
    sustainability: 'Organic pima cotton with low chemical residue.',
    modelInfo: 'Model is 7 years old wearing size 7-8Y.'
  },

  // --- BAGS & ACCESSORIES ---
  {
    id: 'uraaya-a-01',
    name: 'The Monolith Sculptural Leather Tote',
    category: 'accessories',
    subcategory: 'Handbags',
    price: 920,
    originalPrice: 1100,
    badge: 'Iconic Design',
    isTrending: true,
    isFeatured: true,
    isNew: true,
    rating: 5.0,
    reviewsCount: 54,
    colors: [
      { name: 'Cognac Leather', hex: '#884D2B', bg: 'bg-[#884D2B]' },
      { name: 'Noir Matte', hex: '#0B0B0B', bg: 'bg-[#0B0B0B]' },
      { name: 'Warm Putty', hex: '#CBC0B1', bg: 'bg-[#CBC0B1]' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'An architectural statement piece molded from one seamless cut of Tuscan vegetable-tanned calfskin. Features hand-painted beveled edges, gold-embossed atelier crest, and a magnetic closure.',
    fabric: '100% Full-Grain Tuscan Saddle Leather. 24k Brushed Gold-plated brass hardware.',
    care: 'Condition biannually with natural beeswax balm. Avoid water immersion.',
    sustainability: 'Certified Italian Leather Consortium gold-rated tannery.',
    modelInfo: 'Dimensions: 38cm W x 32cm H x 14cm D. Handle drop: 22cm.'
  },
  {
    id: 'uraaya-a-02',
    name: 'Saddle Flap Crossbody in Pebble Leather',
    category: 'accessories',
    subcategory: 'Handbags',
    price: 640,
    originalPrice: null,
    badge: 'Bestseller',
    isTrending: true,
    isFeatured: true,
    isNew: false,
    rating: 4.9,
    reviewsCount: 68,
    colors: [
      { name: 'Emerald Forest', hex: '#1B3B2B', bg: 'bg-[#1B3B2B]' },
      { name: 'Caramel Tan', hex: '#A86D3C', bg: 'bg-[#A86D3C]' },
      { name: 'Noir Polished', hex: '#000000', bg: 'bg-[#000000]' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'A timeless silhouette with curved saddle base, signature custom sculpted gold lock clasp, adjustable leather shoulder strap, and microfiber suede-lined compartments.',
    fabric: '100% Full-grain pebbled Italian calf leather.',
    care: 'Store in protective flannel dust bag with acid-free tissue filler.',
    sustainability: 'Handcrafted in Florence by third-generation leather artisans.',
    modelInfo: 'Dimensions: 24cm W x 19cm H x 8cm D. Strap drop: 48-58cm.'
  },
  {
    id: 'uraaya-a-03',
    name: 'Molten Gold Sculpted Choker & Earrings Set',
    category: 'accessories',
    subcategory: 'Fine Jewelry',
    price: 450,
    originalPrice: 520,
    badge: 'Haute Bijoux',
    isTrending: true,
    isFeatured: false,
    isNew: true,
    rating: 4.9,
    reviewsCount: 33,
    colors: [
      { name: '24k Gold Vermeil', hex: '#D4AF37', bg: 'bg-[#D4AF37]' },
      { name: 'Rhodium Silver', hex: '#C0C0C0', bg: 'bg-[#C0C0C0]' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Molten organic forms cast by lost-wax process to mirror flowing mercury. Plated in thick 2.5 micron 24k gold vermeil over recycled 925 sterling silver.',
    fabric: 'Recycled 925 Sterling Silver with 24k Gold Vermeil heavy plating.',
    care: 'Wipe with microfiber polishing cloth. Avoid perfume and chlorine.',
    sustainability: '100% Recycled precious metals; RJC (Responsible Jewellery Council) certified.',
    modelInfo: 'Collar inner circumference: 38cm (flexible hinge).'
  },
  {
    id: 'uraaya-a-04',
    name: 'Cat-Eye Architectural Acetate Sunglasses',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 290,
    originalPrice: null,
    badge: 'Atelier Eyewear',
    isTrending: false,
    isFeatured: false,
    isNew: true,
    rating: 4.8,
    reviewsCount: 25,
    colors: [
      { name: 'Havana Tortoiseshell', hex: '#593C1E', bg: 'bg-[#593C1E]' },
      { name: 'High-Gloss Noir', hex: '#111111', bg: 'bg-[#111111]' }
    ],
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Thick 8mm beveled Japanese bio-acetate frames fitted with Zeiss anti-reflective UV400 lenses. Engraved gold core wire visible through hand-polished temples.',
    fabric: '100% Plant-derived Biodegradable Mazzucchelli Acetate; Carl Zeiss Vision lenses.',
    care: 'Rinse under lukewarm water, dry with optical cloth.',
    sustainability: 'Petroleum-free eco-acetate.',
    modelInfo: 'Frame dimensions: 52-19-145mm.'
  },
  {
    id: 'uraaya-a-05',
    name: 'Reversible Cashmere & Silk Monogram Scarf',
    category: 'accessories',
    subcategory: 'Scarves & Belts',
    price: 320,
    originalPrice: 380,
    badge: 'Gift Essential',
    isTrending: true,
    isFeatured: true,
    isNew: false,
    rating: 5.0,
    reviewsCount: 47,
    colors: [
      { name: 'Caramel & Crème', hex: '#D6BEA2', bg: 'bg-[#D6BEA2]' },
      { name: 'Charcoal & Smoke', hex: '#4A4A4A', bg: 'bg-[#4A4A4A]' }
    ],
    sizes: ['One Size (70x200cm)'],
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Jacquard woven with the subtle URAAYA atelier crest pattern. Double-sided drape with delicate hand-twisted fringe hems.',
    fabric: '70% Mongolian Cashmere, 30% Mulberry Silk.',
    care: 'Dry clean only.',
    sustainability: 'Hand-finished in Como, Italy.',
    modelInfo: 'Dimensions: 200cm length x 70cm width.'
  },
  {
    id: 'uraaya-a-06',
    name: 'Handcrafted Italian Leather Chelsea Boots',
    category: 'accessories',
    subcategory: 'Footwear',
    price: 680,
    originalPrice: 790,
    badge: 'Artisanal Footwear',
    isTrending: false,
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewsCount: 39,
    colors: [
      { name: 'Deep Espresso', hex: '#2F2016', bg: 'bg-[#2F2016]' },
      { name: 'Nero Black', hex: '#0B0B0B', bg: 'bg-[#0B0B0B]' }
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85'
    ],
    description: 'Blake-stitched construction in supple French calf leather. Features tonal elasticated side gussets, stacked leather heel with rubber tap, and calfskin lining.',
    fabric: '100% French Box Calf Leather upper and sole.',
    care: 'Apply wax polish and use cedar shoe trees after wear.',
    sustainability: 'Resoleable Goodyear/Blake construction designed to last decades.',
    modelInfo: 'Fits true to European size.'
  }
];

export const CATEGORIES = [
  {
    id: 'women',
    name: 'Women',
    tagline: 'Sculptural Tailoring & Haute Silhouettes',
    description: 'Explore the new season collection of flowing evening silks, architectural double-breasted coats, and refined knitwear.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    subcategories: ['All Women', 'Coats & Jackets', 'Dresses', 'Tailoring', 'Knitwear']
  },
  {
    id: 'men',
    name: 'Men',
    tagline: 'Modern Elegance & Master Tailoring',
    description: 'Precision suits, pure cashmere overcoats, sea-island cottons, and impeccably cut trousers crafted for discerning tastes.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    subcategories: ['All Men', 'Tailoring', 'Coats & Jackets', 'Knitwear']
  },
  {
    id: 'kids',
    name: 'Kids',
    tagline: 'Petit URAAYA — Refined Youth Couture',
    description: 'Miniature tailoring, heirloom cashmere cardigans, and organic French linens crafted with utmost gentleness.',
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85',
    subcategories: ['All Kids', 'Kids Outerwear', 'Kids Knitwear', 'Kids Dresses', 'Kids Bottoms']
  },
  {
    id: 'accessories',
    name: 'Bags & Accessories',
    tagline: 'Artisanal Tuscan Leather & Fine Jewelry',
    description: 'Hand-finished saddle leather handbags, 24k vermeil statement jewelry, Italian footwear, and cashmere scarves.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
    subcategories: ['All Accessories', 'Handbags', 'Fine Jewelry', 'Eyewear', 'Footwear', 'Scarves & Belts']
  }
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'atelier-aw26',
    title: 'Autumn / Winter Atelier',
    subtitle: 'VOL. IV — ARCHITECTURAL DRAPE',
    description: 'Heavyweight Mongolian cashmere meets structured virgin wool in an ode to minimalist silhouette.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    link: '/category/women'
  },
  {
    id: 'tailoring-capsule',
    title: 'The Sartorial Capsule',
    subtitle: 'MODERN POWER DRESSING',
    description: 'Sharp shoulders, Neapolitan tailoring, and fluid Gurkha trousers cut from English gabardine.',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85',
    link: '/category/men'
  },
  {
    id: 'tuscany-leather',
    title: 'Artisanal Tuscan Leather',
    subtitle: 'THE MONOLITH SERIES',
    description: 'Sculpted vegetable-tanned leather goods hand-edged by master artisans in Florence.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85',
    link: '/category/accessories'
  }
];

