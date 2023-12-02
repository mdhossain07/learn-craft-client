const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="space-y-4 text-center my-8">
      <h2 className="text-5xl font-semibold ">{heading}</h2>
      <p>{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
