import DottedMap from "dotted-map";
import EventMap, { type MapPin } from "./motion/EventMap";
import { projects } from "@/lib/data";

const cities = [
  { city: "Mumbai", lat: 19.076, lng: 72.877, note: "Home studio · fashion & corporate" },
  { city: "Hyderabad", lat: 17.385, lng: 78.487, note: "Weddings & celebrations" },
  { city: "Udaipur", lat: 24.585, lng: 73.712, note: "Destination wedding" },
  { city: "Greater Noida", lat: 28.474, lng: 77.504, note: "Brand experience" },
];

// The dotted map is computed on the server at build time; only the pins are interactive.
export default function IndiaMap() {
  const map = new DottedMap({ height: 70, countries: ["IND"], grid: "diagonal" });
  const points = map.getPoints();
  const { width, height } = map.image;

  const located = cities.map((c) => {
    const pt = map.getPin({ lat: c.lat, lng: c.lng })!;
    return { ...c, px: pt.x, py: pt.y };
  });
  const hub = located[0];

  const pins: MapPin[] = located.map((c) => {
    const work = projects.filter((p) => p.location === c.city);
    return {
      city: c.city,
      x: (c.px / width) * 100,
      y: (c.py / height) * 100,
      note: c.note,
      image: work[0]?.image ?? projects[0].image,
      projects: work.map((p) => ({ title: p.title, slug: p.slug })),
    };
  });

  return (
    <EventMap pins={pins}>
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={0.24} fill="#c9a96e" opacity={0.35} />
        ))}
        {/* Golden routes from the Mumbai studio, drawn as the map scrolls into view. */}
        {located.slice(1).map((c) => {
          const mx = (hub.px + c.px) / 2;
          const my = Math.min(hub.py, c.py) - 8;
          return (
            <path
              key={c.city}
              d={`M${hub.px} ${hub.py} Q${mx} ${my} ${c.px} ${c.py}`}
              fill="none"
              stroke="#e8d3a2"
              strokeWidth={0.18}
              pathLength={1}
              data-anim="draw"
            />
          );
        })}
      </svg>
    </EventMap>
  );
}
