import React from "react";
import { novels } from "../../data/novels";
import { Button } from "../components";
// Parse dates like "16-Sep-25" into a real Date (assumes 20YY for two-digit years < 70)
const parsePostedDate = (str) => {
  if (!str) return new Date(0);
  const [dd, mon, yy] = str.split("-");
  const monthIdx = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const day = parseInt(dd, 10) || 1;
  const month = monthIdx[mon] ?? 0;
  const y = parseInt(yy, 10) || 0;
  const fullYear = y >= 70 ? 1900 + y : 2000 + y;
  return new Date(fullYear, month, day);
};

const RecentSection = () => {
  const latestSix = React.useMemo(() => {
    return [...novels]
      .filter((n) => n?.posted_date)
      .sort((a, b) => parsePostedDate(b.posted_date) - parsePostedDate(a.posted_date))
      .slice(0, 6);
  }, []);

  if (!latestSix.length) {
    return (
      <section className="px-4 md:px-16 lg:px-24 xl:px-40 py-10 text-base-content">
        <p className="text-sm text-base-content/70">No recent books to show.</p>
      </section>
    );
  }

  return (
    <section data-theme="red-light" className="px-4 md:px-16 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {latestSix.map((novel) => (
          <article
            key={novel.id}
            className="card bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition"
          >
            <figure>
              <img
                src={novel.cover}
                alt={novel.name}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="card-body p-4">
              <div className="flex flex-col items-center justify-between gap-2">
                <h3 className="text-base font-semibold text-base-content line-clamp-1">
                  {novel.name}
                </h3>
                <span className="badge badge-outline border-primary text-primary">
                  {novel.genre}
                </span>
              </div>

              <p className="text-sm text-base-content/70 line-clamp-4">
                {novel.summary}
              </p>

              <div className="mt-2 text-xs text-base-content/60">
                Posted: {novel.posted_date}
              </div>

              <div className="card-actions mt-3">
                <Button
                  variant="primary"
                  className="btn-sm"
                >
                  Read now
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentSection;