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
