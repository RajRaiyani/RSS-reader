import RSS from './RSS.js';
import { upsertFeeds,getFeeds, addTagString, getTagString } from './storage.js';
import { renderFeeds } from './UI.js';

const applyTagBtn = document.getElementById('applyTag');
const clearTagBtn = document.getElementById('clearTag');
applyTagBtn.addEventListener('click',applyTags);
clearTagBtn.addEventListener('click',clearTags);

var feeds = []
var resultCount = 0;
var filteredFeeds = []


async function init(){
  const data = await RSS();
  const tagString = getTagString();
  document.getElementById('tag-input').value = tagString;
  feeds = data;
  upsertFeeds(data||[]);
  renderUi();
}

init();

function renderUi(){
  feeds = getFeeds();
  setResultCount(feeds.length);
  renderFeeds('container',feeds);
}


function applyTags(){
  const tagString = document.getElementById('tag-input').value.trim();
  console.log(tagString)
  addTagString(tagString);

  const tags = tagString.split(',').map(v=>v.trim().toLowerCase());
  filteredFeeds = feeds.forEach(feed=>{
    feed.matchScore = 0;
    tags.forEach(tag=>{
      if(feed.title.toLowerCase().includes(tag)){
        feed.matchScore++;
      }
      if(feed.content){
        feed.content.forEach(content=>{
          if(content.title.toLowerCase().includes(tag)){
            feed.matchScore++;
          }
        });
      }
    });
  })
  filteredFeeds = feeds.filter(feed=>feed.matchScore>0);
  filteredFeeds.sort((a,b)=>{
    if(a.matchScore === b.matchScore){
      return new Date(b.pubDate)-new Date(a.pubDate);
    }
    return b.matchScore - a.matchScore;
  });
  setResultCount(filteredFeeds.length);
  renderFeeds('container',filteredFeeds);
}

function clearTags(){
  renderFeeds('container',feeds);
  setResultCount(feeds.length);
}

function setResultCount(count){
  resultCount = count;
  document.getElementById('result-count').textContent = count;
}


async function main() {
  renderUi();
}


main();

