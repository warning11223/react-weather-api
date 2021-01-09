import React from 'react';


class Form extends React.Component {
    constructor(props) {
        super(props);
    }





    render(props) {

        return (
                <form action="" onSubmit={this.props.weatherMethod}>
                    <input type="text" name='city' placeholder='City' />
                    <button>Get weather</button>
                </form>
        )
    }
}

export default Form;