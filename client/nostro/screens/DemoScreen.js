import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import t from 'tcomb-form-native';
import { Container, Content, Footer, Button } from 'native-base'

// import axios from 'axios';

import IP from '../constants/Address'


// ['age', 'hypertension', 'heart_disease', 'bmi', '[work_type_Govt_job',
//        '[work_type_Never_worked', '[work_type_Private',
//        '[work_type_Self-employed', '[work_type_children', 'res_type_Rural',
//        'res_type_Urban']

var work = t.enums({
    Govt_job : 'Government',
    Private : 'Private',
    'Self-employed' : 'Self-employed',
    Never_worked : 'Never_worked',

})

var res = t.enums({
    Rural : 'Rural',
    Urban : 'Urban'

})

const fund = t.struct({
    name: t.String,
    id: t.Number,
    age: t.Number,
    hypertension: t.Boolean,
    heart_disease : t.Boolean,
    height : t.Number,
    weight : t.Number,
    work_type : work,
    res_type : res

  });

const Form = t.form.Form;

export default class DemoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() , imageData : '' , value : ''  };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      
    handleChange(value) {
        this.setState({value});
    }

    handleSubmit(){
        const value = this._form.getValue();
        console.log(value)
        this.props.navigation.navigate( 'Upload' , { demoData : value } )
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params.other , "info ")
    }


  render() {
    return (

        <Container>

            <Content>

            <View style={styles.container}>
        
            <Text>
                { JSON.stringify( this.props.other ) }
            </Text>

            </View>

            </Content>

            <Footer>

            <Button full
            onPress={ this.handleSubmit }
            >
              <Text style={ styles.text } > Submit </Text>
            </Button>

            </Footer>

        </Container>

    );
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
      },
    text : {
        fontSize : 25,
        fontWeight: 'bold'
        
    }
});