import React, { useEffect, useState } from "react";
import {
  User as UserIcon,
  Award,
  Users as UsersIcon,
  Heart,
  Mail,
  MessageSquare,
  BookOpen,
} from "lucide-react";

/**
 * Optional props:
 * - badges: string[] (e.g., ["Verified", "Top Writer"])
 * - stats: { followers: number, likes: number, messages: number, comments: number, reads: number }
 *
 * LocalStorage (fallbacks):
 * - user: JSON string with { fullname, avatar? }
 * - userBadges: JSON string array of strings
 * - userStats: JSON string object of { followers, likes, messages, comments, reads }
 */
const ProfileHeader = ({ badges: badgesProp, stats: statsProp, className = "" }) => {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [badges, setBadges] = useState(badgesProp || []);
  const [stats, setStats] = useState(
    statsProp || { fans: 0, likes: 0, messages: 0, comments: 0, reads: 0 }
  );

  useEffect(() => {
    // Read user info
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.fullname) setName(parsed.fullname);
        if (parsed?.avatar || parsed?.photoURL || parsed?.photo) {
          setAvatarUrl(parsed.avatar || parsed.photoURL || parsed.photo);
        }
      }
    } catch (e) {
      // no-op
    }

    // Read badges if not provided
    if (!badgesProp) {
      try {
        const storedBadges =
          typeof window !== "undefined" ? localStorage.getItem("userBadges") : null;
        if (storedBadges) {
          setBadges(JSON.parse(storedBadges));
        } else {
          setBadges(["Verified", "Top Writer", "100 Days", "Early Adopter"]);
        }
      } catch {
        setBadges(["Verified", "Top Writer", "100 Days", "Early Adopter"]);
      }
    }

    // Read stats if not provided
    if (!statsProp) {
      try {
        const storedStats =
          typeof window !== "undefined" ? localStorage.getItem("userStats") : null;
        if (storedStats) {
          setStats(JSON.parse(storedStats));
        }
      } catch {
        // keep defaults
      }
    }
  }, [badgesProp, statsProp]);

  const formatCompact = (n) => {
    try {
      return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n || 0);
    } catch {
      if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
      if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
      return String(n || 0);
    }
  };

  return (
    <section className={`grid grid-cols-[2fr_3fr] gap-6 justify-items-center px-4 ${className}`}>
  <div className="w-full">
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body items-center text-center gap-4">
        <div className="avatar">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="text-primary" size={48} aria-hidden="true" />
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-base-content">{name}</h2>
      </div>
    </div>
  </div>

  {/* Right: Badges + Stats (narrower) */}
  <div className="w-full flex flex-col gap-4 items-center">
    {/* Badges */}
    <div className="card bg-base-100 border border-base-300 shadow-sm w-full">
      <div className="card-body py-4 items-center text-center">
        <div className="flex items-center gap-2">
          <Award className="text-secondary" size={18} aria-hidden="true" />
          <h3 className="font-semibold text-base-content">Badges</h3>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {badges && badges.length > 0 ? (
            badges.map((b, idx) => (
              <span
                key={`${b}-${idx}`}
                className="badge badge-ghost border border-secondary/40 text-secondary"
                title={b}
              >
                {b}
              </span>
            ))
          ) : (
            <span className="text-sm text-base-content/60">No badges yet</span>
          )}
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="card bg-base-100 border border-base-300 shadow-sm w-full">
      <div className="card-body py-4 items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 justify-items-center w-full">
          <StatItem
            label="Fans"
            value={formatCompact(stats.fans)}
            icon={<UsersIcon size={18} />}
            colorClass="text-primary bg-primary/10"
          />
          <StatItem
            label="Likes"
            value={formatCompact(stats.likes)}
            icon={<Heart size={18} />}
            colorClass="text-secondary bg-secondary/10"
          />
          <StatItem
            label="Messages"
            value={formatCompact(stats.messages)}
            icon={<Mail size={18} />}
            colorClass="text-accent bg-accent/10"
          />
          <StatItem
            label="Comments"
            value={formatCompact(stats.comments)}
            icon={<MessageSquare size={18} />}
            colorClass="text-info bg-info/10"
          />
          <StatItem
            label="Reads"
            value={formatCompact(stats.reads)}
            icon={<BookOpen size={18} />}
            colorClass="text-success bg-success/10"
          />
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

const StatItem = ({ label, value, icon, colorClass }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-box border border-base-300 bg-base-100">
      <div className={`p-2 rounded-full ${colorClass} flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-base-content/70">{label}</span>
        <span className="text-lg font-semibold text-base-content">{value}</span>
      </div>
    </div>
  );
};

export default ProfileHeader;