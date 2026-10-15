// Re-mounts on every navigation: a black-and-gold curtain lifts off each new page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="route-curtain" aria-hidden="true">
        <span />
      </div>
      <div className="route-in">{children}</div>
    </>
  );
}
