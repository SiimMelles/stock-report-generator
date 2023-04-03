# Stock Report Generation Application :chart_with_upwards_trend:

Application for generating and downloading stock chart reports.

API built using express.js, TypeScript and Chart.js.
User interface built using React.js, TypeScript and MaterialUI.

## Prerequisites :whale:

Make sure you have installed `Docker` and `docker-compose`

## Running the application

Booting up the whole application stack easy to do using `docker-compose`. Just run:

    docker-compose up --build

and open up `http://localhost:3000` in a browser!

### Running separately

To run the API individually, navigate to the `report-generator-api` folder and run:

    npm start

Same goes for the UI, navigate to the `report-generator-front` folder and run:

    npm start
