import React from 'react';
import slide_image_1 from "../../assets/img/product1.png";
import slide_image_2 from "../../assets/img/product2.png";
import slide_image_3 from "../../assets/img/product3.png";
import slide_image_4 from "../../assets/img/product4.png";

const features = [
  { name: 'Brand', description: 'Premium sneaker brands with top-notch quality.' },
  { name: 'Material', description: 'Made from high-quality leather, mesh, and breathable fabrics for maximum comfort.' },
  { name: 'Sizes', description: 'Available in multiple sizes ranging from US 5 to US 13.' },
  { name: 'Sole Type', description: 'Durable rubber sole with anti-slip technology for enhanced grip.' },
  { name: 'Colors', description: 'Variety of color options including classic white, black, and trendy mixed tones.' },
  { name: 'Special Features', description: 'Lightweight, cushioned insoles, and sweat-resistant inner lining for all-day comfort.' },
];

const Work = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Product Highlights</h2>
          <p className="mt-4 text-gray-500">
            Discover our premium sneakers, crafted with high-quality materials for unmatched comfort and style.
            Designed for everyday wear, our shoes provide superior support, durability, and a sleek modern look.
          </p>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src={slide_image_1}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src={slide_image_2}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src={slide_image_3}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src={slide_image_4}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}

export default Work