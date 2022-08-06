var prop = PropertiesService.getScriptProperties().getProperties();

function getNotionDbData(){
  const url = 'https://api.notion.com/v1/databases/' + prop.NOTION_DB_ID + '/query';

  let headers = {
    'content-type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + prop.NOTION_TOKEN,
    'Notion-Version': '2022-02-22',
  };
  let options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    'method': 'post',
    'headers': headers,
  };

  let notion_data = UrlFetchApp.fetch(url, options);
  notion_data = JSON.parse(notion_data.getContentText());
  Logger.log(notion_data);
  return notion_data;
}

function json2Array(){
  const json = getNotionDbData()
  const results = json["results"]
  const columns = prop.PROPERTIES.split(",")

  var array = []
  array.push(columns)

  for(const page of results){
    const properties = page["properties"]

    var tmp = []

    for(const col of columns){
      const property = properties[col]
      const type = property["type"]

      if (type == "title") {
        tmp.push(getTitle(property["title"]))

      } else if (type == "date") {
        const date = property["date"]
        tmp.push( (date) ? date["start"] : date )

      } else if (type == "multi_select") {
        tmp.push(getMultiSelect(property["multi_select"]))

      } else if (type == "people") {
        tmp.push(getPeople(property["people"]))

      } else {
        tmp.push("not supported property type")
      }
    }

    array.push(tmp)
  }

  Logger.log(array)
  return array
}

function getTitle(title_array){
  var array = []
  for(const s of title_array){
    array.push(s["plain_text"])
  }
  return array.join("")
}

function getMultiSelect(multi_select_array){
  var array = []
  for(const x of multi_select_array){
    array.push(x["name"])
  }
  return array.join(",")
}

function getPeople(people_array){
  var array = []
  for(const x of people_array){
    array.push(x["name"])
  }
  return array.join(",")
}

function writeSpreadSheet(): void {
  const ss = SpreadsheetApp.openById(prop.SHEET_ID)
  const targetSheet = ss.getSheetByName(prop.SHEET_NAME)

  const data = json2Array()

  if (targetSheet) {
    targetSheet.clearContents()
    targetSheet.getRange(1, 1, data.length, data[0].length).setValues(data)
  }
}
