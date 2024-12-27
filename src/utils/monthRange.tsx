function monthRange(startDate: string, endDate: string) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = monthNames[start.getMonth()];
  const startYear = start.getFullYear().toString().slice(2);
  const endMonth = monthNames[end.getMonth()];
  const endYear = end.getFullYear().toString().slice(2);

  return (
    <>
      <span className="text-tokyo-night-magenta">{startMonth}</span>
      {`'`}
      <span className="text-tokyo-night-orange">{startYear}</span>
      {` - `}
      <span className="text-tokyo-night-magenta">{endMonth}</span>
      {`'`}
      <span className="text-tokyo-night-orange">{endYear}</span>
    </>
  );
}

export default monthRange;
