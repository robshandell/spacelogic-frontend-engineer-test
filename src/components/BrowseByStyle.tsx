import Image from "next/image";

const styles = [
  { name: "Casual", image: "/images/casual-section-img.png", width: "short" },
  { name: "Formal", image: "/images/formal-section-img.png", width: "long" },
  { name: "Party", image: "/images/party-section-img.png", width: "long" },
  { name: "Gym", image: "/images/gym-section-img.png", width: "short" },
];

export function BrowseByStyle() {
  return (
    <section
      className="py-12 md:py-20 animate-fade-in-up"
      aria-labelledby="browse-by-style-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#eaeaea] rounded-2xl md:rounded-3xl p-8 md:p-12 pb-14 md:pb-20">
          <h2
            id="browse-by-style-heading"
            className="text-2xl md:text-4xl font-extrabold text-black uppercase tracking-tight text-center mb-8 md:mb-12"
          >
            Browse by dress style
          </h2>
          <div className="flex flex-wrap gap-3 md:gap-5">
            {styles.map(({ name, image, width }) => (
              <a
                key={name}
                href="#"
                className={`group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out min-h-[200px] md:min-h-[260px] max-h-[320px] md:max-h-[360px] flex flex-[0_0_100%] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  width === "short" ? "sm:flex-[0_0_calc(40%-0.375rem)] md:flex-[0_0_calc(40%-0.625rem)]" : "sm:flex-[0_0_calc(60%-0.375rem)] md:flex-[0_0_calc(60%-0.625rem)]"
                }`}
                aria-label={`Browse ${name} dress style`}
              >
                <span className="absolute top-5 left-5 z-10 font-bold text-black text-2xl md:text-3xl">
                  {name}
                </span>
                <div className="absolute top-0 right-0 bottom-0 w-[65%] md:w-[60%]">
                  <Image
                    src={image}
                    alt={`${name} style – outfit example`}
                    fill
                    className="object-contain object-right transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 65vw, 35vw"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
