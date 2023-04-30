function extractProfilePictureURL() {
  const img = document.querySelector('.pv-top-card-profile-picture__image');
  if (img) {
    return img.src;
  }
  return null;
}


function extractAdditionalText() {
  const additionalTextElement = document.querySelector('.text-body-medium.break-words[data-generated-suggestion-target]');
  return additionalTextElement ? additionalTextElement.textContent.trim() : null;
}

function extractFollowerCount() {
  const followerElement = document.querySelector('.ember-view.link-without-visited-state > .t-bold');
  if (followerElement) {
    const followerCount = followerElement.textContent.trim().replace(/,/g, '');
    return followerCount;
  }
  return null;
}


function extractAboutSection() {
  const aboutElement = document.querySelector('.display-flex.ph5.pv3 .pv-shared-text-with-see-more.full-width');
  return aboutElement ? aboutElement.textContent.trim() : null;
}

function extractConnectionCount() {
  let connectionElement = document.querySelector('.pv-top-card--list-bullet .text-body-small span.t-black--light');
  if (!connectionElement) {
    connectionElement = document.querySelector('.pv-top-card--list-bullet .text-body-small');
  }

  if (connectionElement) {
    const countElement = connectionElement.querySelector('.t-bold');
    if (countElement) {
      return countElement.textContent.trim();
    } else if (connectionElement.textContent.includes('500+')) {
      return '500+';
    } else {
      return connectionElement.textContent.trim();
    }
  }
  return null;
}


function extractFollowersNumber() {
  const followersElement = document.querySelector('.pvs-header__title-container .pvs-header__subtitle.text-body-small span');
  if (followersElement) {
    return followersElement.textContent.trim();
  }
  return null;
}

function extractDistanceValue() {
  const distanceElement = document.querySelector('span.dist-value');
  if (distanceElement) {
    return distanceElement.textContent.trim();
  }
  return null;
}

function extractLocation() {
  const locationElement = document.querySelector('span.text-body-small.inline.t-black--light.break-words');
  if (locationElement) {
    return locationElement.textContent.trim();
  }
  return null;
}

function extractKeywords(text) {
  const stopWords = [
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were', 'will', 'with',
    'your', 'them', 'more', 'then', 'high', 'than', 'around', 'find', 'these', 'through', 'you', 'their', 'they', 'or', 'if', 'about', 'have', 'would', 'this', 'can', 'who'
  ];

  const words = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));

  const wordFrequencies = words.reduce((map, word) => {
    map[word] = (map[word] || 0) + 1;
    return map;
  }, {});

  const sortedWords = Object.keys(wordFrequencies).sort(
    (a, b) => wordFrequencies[b] - wordFrequencies[a]
  );

  return sortedWords.slice(0, 15);
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractData') {
    const aboutSection = extractAboutSection();
    const keywords = extractKeywords(aboutSection);

    sendResponse({
      profilePictureURL: extractProfilePictureURL(),
      additionalText: extractAdditionalText(),
      followerCount: extractFollowerCount(),
      aboutSection: aboutSection,
      keywords: keywords,
      connectionCount: extractConnectionCount(),
      followersNumber: extractFollowersNumber(),
      distanceValue: extractDistanceValue(),
      location: extractLocation(),
    });
    return true;
  }
});
