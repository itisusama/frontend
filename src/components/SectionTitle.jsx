
export default function SectionTitle({ text1, text2 }) {
  return (
    <div className="mx-auto mt-32 px-4 text-center">
      <span className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
        {text1}
      </span>
      <h3 className="mx-auto text-center text-base md:text-lg my-7 text-base-content/80">
        {text2}
      </h3>
    </div>
  );
}