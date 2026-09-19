/**
 * Renders a JSON-LD block. Server component — the payload never reaches the
 * client bundle. `<` is escaped so a string in the data can't close the tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
