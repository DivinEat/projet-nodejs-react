
new Weather({
  datetime: "2020-03-04",
  tempmax: 25,
  tempmin: 14,
  description: "Confinement 2",
})
  .save()
  .then((data) => console.log(data))
  .then((_) =>
    Weather.aggregate([
      {
        $group: {
          _id: { date: "$datetime", desc: "$description" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          items: {
            $addToSet: {
              desc: "$_id.desc",
              count: "$count",
            },
          },
        },
      },
    ])
  )
  .then((data) => console.log(data));
