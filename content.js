function extractProfilePictureURL() {
  const button = document.querySelector('.profile-photo-edit__edit-btn');
  if (button) {
    const img = button.querySelector('img');
    if (img) {
      return img.src;
    }
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
  const connectionElement = document.querySelector('.pv-top-card--list-bullet .text-body-small span.t-black--light');
  if (connectionElement) {
    const countElement = connectionElement.querySelector('.t-bold');
    if (countElement) {
      return countElement.textContent.trim();
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractData') {
    sendResponse({
      profilePictureURL: extractProfilePictureURL(),
      additionalText: extractAdditionalText(),
      followerCount: extractFollowerCount(),
      aboutSection: extractAboutSection(),
      connectionCount: extractConnectionCount(),
      followersNumber: extractFollowersNumber(),
      distanceValue: extractDistanceValue(),
      location: extractLocation(),
    });
    return true;
  }
});
