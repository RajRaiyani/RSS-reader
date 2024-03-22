
function upsertFeeds(feeds){
    let data = localStorage.getItem('feeds');
    if(!data){
        localStorage.setItem('feeds', JSON.stringify(feeds));
        return;
    }

    data = JSON.parse(data);

    feeds.forEach(feed => {
        const index = data.findIndex(item => item.title === feed.title);
        if(index === -1)data.push(feed);
    });

    localStorage.setItem('feeds', JSON.stringify(data));
}

function getFeeds(){
    let data = localStorage.getItem('feeds');
    if(!data){
        return [];
    }
    data = JSON.parse(data);
    data.sort((a,b)=>new Date(b.pubDate)-new Date(a.pubDate));
    return data;
}

function addTagString(tagString){
    localStorage.setItem('tagString', tagString);
}

function getTagString(){
    return localStorage.getItem('tagString') || '';
}

export {
    upsertFeeds,
    getFeeds,
    addTagString,
    getTagString
}