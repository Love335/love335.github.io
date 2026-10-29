/** Two-column masonry of features on medium screens and up, one column below. */
export default function FeatureGrid({ children }: { children: React.ReactNode }) {
  return <div className="columns-1 gap-10 md:columns-2">{children}</div>;
}
