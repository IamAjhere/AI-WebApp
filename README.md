
# Bullion Price Prediction System

The Bullion Price Prediction System is a comprehensive application that combines a stacked LSTM-based prediction model with a MERN stack web application to provide users with real-time bullion price predictions, sentiment analysis, and a community chat room. The system utilizes historical data from Yahoo Finance and TensorFlow to predict gold, silver, and platinum prices for the next 30 days.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- Stacked LSTM-based prediction model using TensorFlow for gold, silver, and platinum prices
- MERN stack web application with a user-friendly interface
- Real-time bullion price predictions and charts
- Sentiment analysis feature for the latest bullion news
- Real-time chatting room for community discussions

## Installation

Before you begin the installation process, ensure you have the following prerequisites installed:

- Python 3.8 or later
- Node.js 14.x or later
- MongoDB

### LSTM Script Setup

1.  Navigate to the `LSTM_script` folder and install the required packages by running the following command:

	```
	pip install -r requirements.txt
	``` 

2.  Run the `python_lstm.py` script to generate models for gold, silver, and platinum:

	```
	python python_lstm.py
	``` 

3.  Update the MongoDB URI in the `predict_&_upload.py` script with your MongoDB instance's connection details.
    
4.  Run the `predict_&_upload.py` script to save the predicted data for each metal type in separate collections:
    
	```
    python predict_&_upload.py
    ```

### Web Application Setup

1.  In the root folder, navigate to the `client` folder and run the following command to start the React frontend:

	```
	cd client
    npm install
    npm start
    ```

2.  Create a `.env` file in the `server` folder and add the following environment variables, replacing `<value>` with the appropriate values:

	```
	NEWSAPI_SECRET=<your_newsapi_secret>
    USERR=<your_username>
    PASS=<your_password>
    TOKEN_SECRET=<your_token_secret>
    ```

3.  In a separate terminal, navigate to the `server` folder and run the following command to start the Node.js backend:

	```
	cd server
    npm install
    npm start
    ``` 

The Bullion Price Prediction System is now up and running. You can access the web application by opening your browser and navigating to `http://localhost:3000`.

## Usage

1.  Open the web application in your browser at `http://localhost:3000`.
2.  View real-time bullion price predictions and charts for gold, silver, and platinum.
3.  Use the sentiment analysis feature to get insights into the latest bullion news.
4.  Join the real-time chat room to discuss market trends and predictions with other users.

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.mit.edu/~amini/LICENSE.md) file for details.
