# Dansal Finder – Frontend

A location-based mobile application built with **React Native and Expo** to help users discover and explore Dansal locations across Sri Lanka during Vesak and Poya seasons.

The application provides an interactive map experience, allowing users to find nearby Dansals, explore different categories, and add new locations.

## Features

* **Interactive Map:** Explore Dansal locations through a map-based interface.
* **Location-Based Search:** Discover Dansals around the current location.
* **Category Filtering:** Filter locations by Dansal types such as rice and curry, ice cream, tea, and more.
* **Nearby Search:** Find Dansals within a configurable distance.
* **Add Dansal Locations:** Allow authenticated users to submit new Dansal locations.
* **Authentication:** Secure user authentication with JWT.
* **Efficient Data Fetching:** Uses tile-based fetching to retrieve location data efficiently based on map boundaries.
* **Incremental Synchronization:** Supports fetching updated location data to reduce unnecessary network requests.
* **Multilingual Support:** Sinhala and English language support.
* **Bottom Sheet Interface:** Provides an interactive search and filtering panel.
* **Responsive Mobile UI:** Designed for a smooth mobile experience.

## Tech Stack

* React Native
* Expo
* TypeScript / JavaScript
* React Navigation
* Axios
* i18next
* Expo SecureStore
* React Native Maps
* Ionicons

## Getting Started

### Prerequisites

* Node.js
* pnpm or npm
* Expo Go or an Android emulator
* Expo CLI through `npx`

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd dansal
```

Install dependencies:

```bash
pnpm install
```

### Environment Configuration

Configure your backend API URL according to your development environment.

For example, your API configuration might look like:

```js
const API_URL = "http://10.0.2.2:3000/api";
```

Use `10.0.2.2` for an Android emulator connecting to a backend running on the host machine. For physical devices, use the host machine's reachable local IP address.

### Run the Application

Start the Expo development server:

```bash
pnpm start
```

Run on Android:

```bash
pnpm android
```

Run on iOS:

```bash
pnpm ios
```

## Project Structure

```text
dansal/
├── app/
├── assets/
├── components/
├── contexts/
├── hooks/
├── i18n/
├── services/
├── utils/
├── app.json
├── package.json
└── README.md
```

*Update the structure to match your actual frontend repository.*

## Architecture

The application communicates with an Express.js backend that manages authentication, Dansal locations, and geospatial queries.

### Tile-Based Data Fetching

Instead of requesting all Dansal locations at once, the frontend uses map boundaries and tile-based fetching to retrieve relevant data.

* Fetches locations according to the visible map area.
* Reduces unnecessary data transfer.
* Supports incremental synchronization for updated locations.
* Improves efficiency when users move or zoom around the map.

### Authentication

* Stores authentication tokens securely using Expo SecureStore.
* Uses JWT-based authentication for protected API requests.
* Supports authenticated location submissions.

### Internationalization

Uses i18next to support Sinhala and English, allowing users to interact with the application in their preferred language.

## Dansal Categories

The application supports multiple Dansal categories, including:

* Rice and curry
* Ice cream
* Tea and drinks
* Soup
* Fruits
* Biscuits
* Milk
* Belimal
* Kos
* Other categories

## Future Improvements

* Nearby Dansal notifications.
* Improved offline support.
* Enhanced map performance.
* More advanced location-based filtering.
* Better synchronization for frequently updated locations.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

Add your preferred license if you intend to distribute the project publicly.
