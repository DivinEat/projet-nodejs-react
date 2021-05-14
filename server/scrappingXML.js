const { Scrapper, CSVGenerator } = require("./scrapper");

new Scrapper(
  {
    url: "https://www.myges.fr/teacher/planning-calendar",
    method: "POST",
    headers: {
      Accept: "application/xml",
      Cookie:
        "__utmz=175984062.1590479394.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utma=175984062.38601653.1590479394.1620135289.1620671666.108; __utmc=175984062; JSESSIONID=A890301BABD03970AA24A00B0022FB6B",
    },
    body: {
      "javax.faces.partial.ajax": true,
      "javax.faces.source": "calendar:myschedule",
      "javax.faces.partial.execute": "calendar:myschedule",
      "javax.faces.partial.render": "calendar:myschedule",
      "calendar:myschedule": "calendar:myschedule",
      "calendar:myschedule_start": 1620597600000,
      "calendar:myschedule_end": 1621202400000,
      calendar: "calendar",
      "calendar:filterPlanning": "date",
      "calendar:selectedDate_input": "11/05/21",
      "calendar:myschedule_view": "agendaWeek",
      "javax.faces.ViewState": "-7837805610014859983:3552832905594940681",
    },
  },
  (data) =>
    console.log(data.querySelector('[id="calendar:myschedule"]').textContent) ||
    [],
  (data) => CSVGenerator(data, "./planning.csv")
).scrap();
