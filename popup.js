const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "District of Columbia", abbreviation: "DC" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
];

function saveAsFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function saveAsFile(content, filename, mimeType) {
  // ... (existing saveAsFile function code)
}

function evaluateCriteria(data) {
  const followerCountThreshold = 500;
  const connectionCountThreshold = 50;
  const distanceValueThreshold = 2;

  const parsedFollowerCount = parseInt(data.followersNumber.replace(/,/g, ''), 10);
  const parsedConnectionCount = parseInt(data.connectionCount, 10);
  const parsedDistanceValue = parseInt(data.distanceValue, 10);

  const meetsFollowerCountCriteria = parsedFollowerCount >= followerCountThreshold;
  const meetsConnectionCountCriteria = parsedConnectionCount >= connectionCountThreshold;
  const meetsDistanceValueCriteria = parsedDistanceValue <= distanceValueThreshold;

  const locationIncludesState = states.some(state => data.location.includes(state.name) || data.location.includes(state.abbreviation));
  const meetsLocationCriteria = data.location && (locationIncludesState || data.location.includes("United States"));

  const allCriteriaMet = meetsFollowerCountCriteria && meetsConnectionCountCriteria && meetsDistanceValueCriteria && meetsLocationCriteria;
  const criteriaMet = [meetsFollowerCountCriteria, meetsConnectionCountCriteria, meetsDistanceValueCriteria, meetsLocationCriteria].filter(value => value).length;
  const totalEvaluation = criteriaMet >= 3 ? 'Profile Probably Acceptable' : 'Profile Needs Review';

  return {
    meetsFollowerCountCriteria,
    meetsConnectionCountCriteria,
    meetsDistanceValueCriteria,
    meetsLocationCriteria,
    allCriteriaMet, // Add this line
    totalEvaluation
  };
}

document.getElementById('extractData').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
      const evaluationResults = evaluateCriteria(response);

      const output = document.getElementById('output');
      output.innerHTML = `
        <p>Profile picture URL: ${response.profilePictureURL || 'Not found'}</p>
        <p>Additional text: ${response.additionalText || 'Not found'}</p>
        <p>About section: ${response.aboutSection || 'Not found'}</p>
        <p><strong style="color: red;">Connection count:</strong> ${response.connectionCount || 'Not found'}</p>
        <p><strong style="color: red;">Followers number:</strong> ${response.followersNumber || 'Not found'}</p>
        <p><strong style="color: red;">Distance value:</strong> ${response.distanceValue || 'Not found'}</p>
        <p><strong style="color: red;">Location:</strong> ${response.location || 'Not found'}</p>
        <p><strong style="color: blue;">Meets follower count criteria:</strong> ${evaluationResults.meetsFollowerCountCriteria ? 'Yes' : 'No'}</p>
        <p><strong style="color: blue;">Meets connection count criteria:</strong> ${evaluationResults.meetsConnectionCountCriteria ? 'Yes' : 'No'}</p>
        <p><strong style="color: blue;">Meets distance value criteria:</strong> ${evaluationResults.meetsDistanceValueCriteria ? 'Yes' : 'No'}</p>
         <p><strong style="color: blue;">Meets location criteria:</strong> ${evaluationResults.meetsLocationCriteria ? 'Yes' : 'No'}</p>
        <p><strong style="color: green;">Total Evaluation:</strong> ${evaluationResults.totalEvaluation}</p>
        ${evaluationResults.allCriteriaMet ? '<p><strong style="color: orange;">THIS PROFILE MEETS ALL CRITERIA</strong></p>' : ''}
      `;
    });
  });
});

document.getElementById('exportJSON').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
      const evaluationResults = evaluateCriteria(response);

      const output = {
        ...response,
        meetsFollowerCountCriteria: evaluationResults.meetsFollowerCountCriteria,
        meetsConnectionCountCriteria: evaluationResults.meetsConnectionCountCriteria,
        meetsDistanceValueCriteria: evaluationResults.meetsDistanceValueCriteria,
        meetsLocationCriteria: evaluationResults.meetsLocationCriteria,
        totalEvaluation: evaluationResults.totalEvaluation,
      };

      saveAsFile(JSON.stringify(output, null, 2), 'linkedin-data.json', 'application/json');
    });
  });
});
document.getElementById('exportCSV').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
      const evaluationResults = evaluateCriteria(response);

      const output = {
        ...response,
        meetsFollowerCountCriteria: evaluationResults.meetsFollowerCountCriteria,
        meetsConnectionCountCriteria: evaluationResults.meetsConnectionCountCriteria,
        meetsDistanceValueCriteria: evaluationResults.meetsDistanceValueCriteria,
        meetsLocationCriteria: evaluationResults.meetsLocationCriteria,
        totalEvaluation: evaluationResults.totalEvaluation,
      };

      const csvContent = [
        'Profile Picture URL,Additional Text,About Section,Connection Count,Followers Number,Distance Value,Location',
        `"${output.profilePictureURL}","${output.additionalText}","${output.aboutSection}",${output.connectionCount},${output.followersNumber},${output.distanceValue},"${output.location}"`,
      ].join('\n');
      saveAsFile(csvContent, 'exported-data.csv', 'text/csv');
    });
  });
});
document.getElementById('reverseImageSearch').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, (response) => {
      const profilePictureURL = response.profilePictureURL;
      if (profilePictureURL) {
        const tineyeUrl = `https://tineye.com/search?url=${encodeURIComponent(profilePictureURL)}`;
        window.open(tineyeUrl, '_blank');
      } else {
        alert('Profile picture URL not found.');
      }
    });
  });
});
