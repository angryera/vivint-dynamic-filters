# Vivint Dynamic Filters

## Overview

The Vivint Dynamic Filters project is designed to provide a flexible and efficient filtering system for dynamic datasets. It allows users to define, apply, and manage filters dynamically, enabling seamless data exploration and manipulation.

## Features

- Dynamic creation and management of filters.
- Support for multiple filter types (e.g., text, numeric, date).
- Easy integration with existing data pipelines.
- Highly customizable and extensible.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd vivint-dynamic-filters
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Configuration

- The project includes a configuration file (`config.json`) where you can customize filter settings and other parameters.
- Refer to the inline comments in the configuration file for guidance.

### Environment Variables

Create a `.env` file in the root directory with the following structure:

```
# Google Sheets Spreadsheet ID
SPREADSHEET_ID=YOUR_SPREADSHEET_ID_HERE

# Application port
PORT=3000
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git commit -m "Description of changes"
   git push origin feature-name
   ```
4. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.