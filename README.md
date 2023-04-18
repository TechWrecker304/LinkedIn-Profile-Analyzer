# LinkedIn Profile Analyzer

LinkedIn Profile Analyzer is a Chrome extension that helps you analyze LinkedIn profiles based on specific evaluation criteria. It extracts data from a LinkedIn profile and provides a summary of the extracted data, along with an evaluation of the profile based on predefined rules.

## Features

- Extracts data from a LinkedIn profile, including profile picture URL, additional text, about section, connection count, followers number, distance value, and location.
- Evaluates the extracted data against the following criteria:
  - Follower count >= 500
  - Connection count >= 50
  - Distance value <= 2
  - Location within the United States
- Displays the evaluation results in the extension's popup.
- Exports the extracted data and evaluation results as a JSON or CSV file.

## Installation

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/yourusername/linkedin-profile-analyzer.git
   ```

2. In Chrome, open the Extensions page (`chrome://extensions/`).
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the `linkedin-profile-analyzer` folder.

## Usage

1. Navigate to a LinkedIn profile page.
2. Click on the LinkedIn Profile Analyzer extension icon in your browser toolbar.
3. Click "Extract Data" to display the extracted data and evaluation results in the popup.
4. To export the data as a JSON or CSV file, click "Export JSON" or "Export CSV" respectively.

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Notes

This is designed for LinkedIn Profiles you are NOT connected to currently.  It will work with profiles you are connected to but is more optimized for those you are not.  

It is NOT designed for Company Profiles, it will not work with them.  That will come later.

It is not extracting the Profile Picture URL (although there is a placeholder for it) that is an update coming soon.

If you run it on YOUR OWN profile while you logged in it will give mixed results.

Initial Threshold "Criteria" can be adjusted in the code.  I only set it the way it is now for just testing and as example. 
Thresholds are in the popup.js area in this function
function evaluateCriteria(data) {
  const followerCountThreshold = 500;
  const connectionCountThreshold = 50;
  const distanceValueThreshold = 2;
................................. rest of code
