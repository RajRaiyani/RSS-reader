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
  const promiseArray = [];
  promiseArray.push(fetch(constants.rssUrl+'?gl=US').then(response => response.json()))
  promiseArray.push(fetch(constants.rssUrl+'?gl=IN').then(response => response.json()))
  promiseArray.push(fetch(constants.rssUrl+'?gl=IT').then(response => response.json()))
  promiseArray.push(fetch(constants.rssUrl+'?gl=NZ').then(response => response.json()))
  promiseArray.push(fetch(constants.rssUrl+'?gl=AU').then(response => response.json()))
  promiseArray.push(fetch(constants.rssUrl+'?gl=SG').then(response => response.json()))
  const result = await Promise.all(promiseArray);
  const items = result.reduce((acc, val) => acc.concat(val.items), []);
  
  items.forEach(item => {
    const list = convertDescriptionToJSON(item.content);
    item.content = list;
  });

  items.sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate));
  return items;
}

export default RSS;