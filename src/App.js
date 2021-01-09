
import './App.css';

import {BrowserRouter, Switch, Route} from "react-router-dom";
import Info from "./weather/Info";
import Form from "./weather/Form";
import Weather from "./weather/Weather";
import {useState} from "react/cjs/react.production.min";
import {Component} from "react";


const API = 'b8aeccf25d12bba7b75bc60c2d8f2602';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            error: undefined,
        }
    }


    render() {



        let gettingWeather = async (event) => {
            event.preventDefault();

            const city = event.target.elements.city.value;

            const api_url = await
                fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
            const data = await api_url.json();




            if(city) {
                let sunset = data.sys.sunset;
                let date = new Date();
                date.setTime(sunset);
                let sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    pressure: data.main.pressure,
                    sunset: sunset_date,
                    error: undefined,
                });
            } else {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    error: 'Entry the city word',
                });
            }

        }


        return (
            <>
                {/*<BrowserRouter>
            <Navbar/>
            <Switch>
                <Route path='/' exact />
            </Switch>
        </BrowserRouter>*/}
        <div className='wrapper'>
            <div className="main">
                <div className="container">
                    <div className="row">
                        <div className='col-sm-5 info'>
                            <Info/>
                        </div>
                        <div className='col-sm-7 form'>
                            <Form weatherMethod={gettingWeather}/>
                            <Weather
                                temp={this.state.temp}
                                city={this.state.city}
                                country={this.state.country}
                                pressure={this.state.pressure}
                                sunset={this.state.sunset}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </div>



        </div>
            </>
        );
    }
}


export default App;
