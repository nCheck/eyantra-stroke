import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import t from 'tcomb-form-native';
import { Container, Content, Footer, Button } from 'native-base'
import { DocumentPicker } from 'expo';
// import axios from 'axios';
import axios from 'axios'
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
    systolic: t.Number,
    diastolic: t.Number,
    temperature : t.Number,
    heartrate : t.Number,

  });

const Form = t.form.Form;

export default class UploadScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() , fileData : '' , value : ''  };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._pickDocument = this._pickDocument.bind(this);
      }
      
    _pickDocument = async () => {
	    let result = await DocumentPicker.getDocumentAsync({});
		  this.setState({ fileData : result })
      console.log( this.state.fileData, "data" );
	}

    handleChange(value) {
        this.setState({value});
    }

    async handleSubmit(){
        var value = this._form.getValue();
        console.log(value)

        const data = new FormData();
        data.append('file', this.state.fileData);
        data.append('filename', this.state.fileData.name);

        var config = { headers: {  
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'}
        }

        demoData = this.props.navigation.state.params.demoData

        value = { ...value , ...demoData }

        await axios.post('http://192.168.1.106:9966/api/test', { form : value })
        .then(res => {
          // console.log(res);
          console.log(res.data);
        }).catch( err =>{
          console.log( err )
        } )

    }


  render() {
    return (

        <Container>

            <Content>

            <View style={styles.container}>
        
            <Form 
            type={ fund }
            value={ this.state.value }
            onChange={ this.handleChange }
            ref={c => this._form = c} 
            />

            <Button full
            onPress={ this._pickDocument }
            >
              <Text style={ styles.text } > Upload EEG </Text>
            </Button>

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







        //Demo Get Request
        // await axios.get("http://192.168.1.106:9966/"  , config
        // )
        // .then(function (response) {
        //   console.log( response.data )
        //   var opt = response.data
        //   props.navigation.navigate('Demo' , { other : opt['message'] })
        // })
        // .catch(function (error) {
        //   props.navigation.navigate('Home' , { other : error })
        // });