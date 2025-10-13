const HeroSection = () => {
  return (
    <>
      <div className="relative bg-base-100 overflow-hidden">

        {/* CONTENT */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-base-content">
          <span className="mt-24 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs text-primary">
            ✨ New chapter everyday
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-5 md:leading-[70px]">
            Turn daydreams into{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              page‑turners
            </span>{" "}
            with Likho
          </h1>

          <p className="max-w-2xl text-center text-base md:text-lg my-7 text-base-content/80">
            A cozy writing space for hobby authors. Draft scenes, organize chapters, and share short stories—without the pressure.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="bg-primary hover:bg-primary/90 text-primary-content rounded-full px-8 h-12 m-1 ring-1 ring-primary/40 ring-offset-2 flex items-center transition-colors"
            >
              Start writing
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <div className="mt-6 text-xs text-base-content/60">
            No credit card • Free forever plan • 100+ novels
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;