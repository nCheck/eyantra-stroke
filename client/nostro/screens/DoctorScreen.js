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




export default class DoctorScreen extends React.Component {

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
        
            {
                this.props.navigation.state.params.prediction ?
                <View>
                <Button full bordered danger style={{ padding: 10 , margin:20}} >
                <Text style={ { fontSize: 20 } } > You are risk of stroke </Text>
                 </Button>
                <Button full bordered style={{ padding: 10 , margin:20}} >
                <Text style={ { fontSize: 20 } } > Click here to Contact Doctor </Text>
                </Button>
                </View>  :
                <Button full bordered success style={{ padding: 10 , margin:20}} >
                <Text style={ { fontSize: 20 } } > Congrats, there's no risk of stroke </Text>
                </Button>                
            }

            </View>

            </Content>

            <Footer>

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