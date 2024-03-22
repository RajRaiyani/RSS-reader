import constants from '../config/const.js';


function convertDescriptionToJSON(description){
  const list = [];
  const expression =/<a[^\>]*href="([^"]*)"[^\>]*>([^\<]*)<\/a>/g;

  let match;
  while ((match = expression.exec(description)) !== null) {
    list.push({link: match[1],title: match[2]});
  }
  return list;
}

async function RSS(){
  const response = await fetch(constants.rssUrl);
  const data = await response.json();
  
  data.items.forEach(item => {
    const list = convertDescriptionToJSON(item.content);
    item.content = list;
  });

  return data;
}

export default RSS;