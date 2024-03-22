

function renderFeeds(id,feeds){
    const container = document.getElementById(id);
    container.innerHTML = '';
    feeds.forEach(element => {
      const item = document.createElement('div');
      item.classList.add('feed-card');
      item.innerHTML = `
        <h3>${element.title}</h3>
        <h5>${element.pubDate}</h5>
        ${element.description}
      `;
      container.appendChild(item);
    });
  
}

export {
    renderFeeds
}