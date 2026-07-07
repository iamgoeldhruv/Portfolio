import type { TextChunk } from "../data/portfolioData";

type RichTextProps = {
  chunks: TextChunk[];
};

export function RichText({ chunks }: RichTextProps) {
  return (
    <>
      {chunks.map((chunk, index) =>
        chunk.strong ? (
          <strong key={`${chunk.text}-${index}`}>{chunk.text}</strong>
        ) : (
          <span key={`${chunk.text}-${index}`}>{chunk.text}</span>
        ),
      )}
    </>
  );
}
