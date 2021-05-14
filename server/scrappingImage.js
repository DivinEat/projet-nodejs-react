const { Scrapper, FileGenerator } = require("./scrapper");

new Scrapper(
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png",
  },
  (data) => data,
  (data) => FileGenerator(data, "./image.png")
).scrap();
