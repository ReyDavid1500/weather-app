Simple Weather App - A modern React TypeScript application featuring multi-city weather forecasts with an intuitive tab-based interface. 
Built with React 19, TypeScript, and Tailwind CSS, the app integrates OpenWeatherMap API to display 5 day / 3 hour step forecasts for multiple cities. 
Key features include real-time city search across 20,000+ locations, dynamic tab management, responsive design, and efficient data caching using React Query. 
The project demonstrates modern React patterns including custom hooks for state management, component composition, error handling, and accessibility best practices.

Assesment Details:

Test project for a small weather application

Scope
A small weather application should be created with following basic functionalities:

- Show three tabs with predefined cities (Rio de Janeiro, Beijing and Los Angeles)
- Connect to a backend to get the weather data
- Show for the selected city a forecast for the next hours and the next days should be
  presented
- The user should get the ability to refresh the data
- On the next page is a mockup for the small weather application
- Weather icons are available at https://openweathermap.org/weather-conditions
- Bonus: allow to search for a city

  For the backend following JSON rest API will be used:

- The API documentation can be found here: https://openweathermap.org/api
- The used access key for the API is VITE_API_KEY
- The API key is used for the free subscription plan, so please ensure to use the API functions
  which are available for that subscription plan
- Please use the API responsibly and keep in mind that excessive or misuse can lead to
  temporary blockages
- If your key gets temporarily blocked, please get in touch with us and you can get another key
- Under the link the usage and samples can be found
- Bonus: use the small city meta data https://www.weatherbit.io/api/meta (the one with
  ~20,000 cities) for the city search
