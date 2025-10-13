import React, { useMemo, useState } from "react";
import {
  User,
  FileText,
  Ghost,
  BarChart3,
  Sparkles,
} from "lucide-react";

const ProfileTabs = ({
  className = "",
  defaultTab = "profile",
  panels = {},
}) => {
  const tabs = useMemo(
    () => [
      { key: "profile", label: "Profile", Icon: User },
      { key: "drafts", label: "Drafts", Icon: FileText },
      { key: "anonymous", label: "Anonymous", Icon: Ghost },
      { key: "stats", label: "Stats", Icon: BarChart3 },
      { key: "recommended", label: "Recommended", Icon: Sparkles },
    ],
    []
  );

  const initialKey = tabs.some((t) => t.key === defaultTab) ? defaultTab : "profile";
  const [active, setActive] = useState(initialKey);

  // simple unique id base for ARIA links
  const idBase = useMemo(
    () => "profile-tabs-" + Math.random().toString(36).slice(2, 8),
    []
  );

  return (
    <div className={`card bg-base-100 border border-base-300 shadow-sm mt-4 mx-4 ${className}`}>
      <div className="card-body">
        <div role="tablist" aria-label="Profile sections" className="tabs tabs-bordered">
          {tabs.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${idBase}-${key}-tab`}
              aria-selected={active === key}
              aria-controls={`${idBase}-${key}-panel`}
              className={`tab gap-2 ${active === key ? "tab-active text-primary" : "text-base-content/70"}`}
              onClick={() => setActive(key)}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="mt-4">
          {/* Profile */}
          <div
            id={`${idBase}-profile-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-profile-tab`}
            hidden={active !== "profile"}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            {panels.profile ?? (
              <EmptyPanel
                icon={<User className="text-primary" size={18} />}
                title="Profile"
                text="Your profile content goes here."
              />
            )}
          </div>

          {/* Drafts */}
          <div
            id={`${idBase}-drafts-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-drafts-tab`}
            hidden={active !== "drafts"}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            {panels.drafts ?? (
              <EmptyPanel
                icon={<FileText className="text-secondary" size={18} />}
                title="Drafts"
                text="You don't have any drafts yet."
              />
            )}
          </div>

          {/* Anonymous */}
          <div
            id={`${idBase}-anonymous-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-anonymous-tab`}
            hidden={active !== "anonymous"}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            {panels.anonymous ?? (
              <EmptyPanel
                icon={<Ghost className="text-accent" size={18} />}
                title="Anonymous"
                text="Anonymous posts and activity will appear here."
              />
            )}
          </div>

          {/* Stats */}
          <div
            id={`${idBase}-stats-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-stats-tab`}
            hidden={active !== "stats"}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            {panels.stats ?? (
              <EmptyPanel
                icon={<BarChart3 className="text-info" size={18} />}
                title="Stats"
                text="Your engagement and read stats will show up here."
              />
            )}
          </div>

          {/* Recommended */}
          <div
            id={`${idBase}-recommended-panel`}
            role="tabpanel"
            aria-labelledby={`${idBase}-recommended-tab`}
            hidden={active !== "recommended"}
            className="rounded-box border border-base-300 bg-base-100 p-4"
          >
            {panels.recommended ?? (
              <EmptyPanel
                icon={<Sparkles className="text-success" size={18} />}
                title="Recommended"
                text="Recommended posts and users for you."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmptyPanel = ({ icon, title, text }) => (
  <div className="flex items-center gap-3 text-base-content/80">
    <div className="p-2 rounded-full bg-base-200">{icon}</div>
    <div className="flex flex-col">
      <span className="font-medium">{title}</span>
      <span className="text-sm">{text}</span>
    </div>
  </div>
);

export default ProfileTabs;