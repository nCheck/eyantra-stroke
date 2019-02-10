import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import t from 'tcomb-form-native';
import { Container, Content, Footer, Button } from 'native-base'
import { DocumentPicker } from 'expo';
import axios from 'axios'
import IP from '../constants/Address'


// ['age', 'hypertension', 'heart_disease', 'bmi', '[work_type_Govt_job',
//        '[work_type_Never_worked', '[work_type_Private',
//        '[work_type_Self-employed', '[work_type_children', 'res_type_Rural',
//        'res_type_Urban']



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
        this.state = { selectedFile : '' , value : '',
                systolic : '' , diastolic: '' , temperature: '', heartrate: '',
                dataLoaded : false, value : '' , gammaMid : ''
              };
    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._pickDocument = this._pickDocument.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
      }

      async handleLoad(){

        var config = { headers: {  
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'}
        }

        var ts = this;

        await axios.get(IP+":9966/api/loadCSV"  , config
        )
        .then(function (response) {
          var data = JSON.parse( response.data.data );
 
          var value = { systolic : data['sys'], 
          diastolic : data['dis'] , heartrate : data['hrt'],
          temperature : data['temp'] , dataLoaded : true }

          ts.setState( { value } )
          ts.setState( { dataLoaded : true  } )

          
        })
        .catch(function (error) {
          console.log( error )
          console.log("Eror")
        });        
      }

      async handleUpload() {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        await axios.post(IP+':9966/api/uploadEEG', data )
        .then(res => {
          console.log(res.data);
        }).catch( err =>{
          console.log( err )
        } )

        await axios.get( IP+':5000/loadEEG').then( res =>{
          console.log(res.data['gammaMid'], "gammaMid")
          this.setState({ gammaMid : res.data['gammaMid'] } )
        } ).catch( err =>{
          console.log( "Error" , err )
        } )
    
      }      
      

    _pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({});
      result['type'] = 'application/csv';
      this.setState({ selectedFile : result })
      this.handleUpload();

	}

    handleChange(value) {
        this.setState({value});
    }

    async handleSubmit(){
        var value = this._form.getValue();
        const data = { ...value , gammaMid : this.state.gammaMid , ...this.props.navigation.state.params.demoData }
        console.log(data)

        await axios.post(IP+':5000/predict', { data : data } ).then( res =>{
          console.log(res.data)
        } ).catch( err =>{
          console.log( "Error" , err )
        } )

        this.props.navigation.navigate( 'Doctor' , { prediction : true } )

    }


  render() {
    return (

        <Container>

            <Content>

            <View style={styles.container}>
        
            <Button full
            onPress={ this.handleLoad }
            >
              <Text style={ styles.text } > Load Data </Text>
            </Button>

            {
               ! this.state.dataLoaded ? 
              <Text> Not Loaded </Text> :
              
              <Form 
              type={ fund }
              value={ this.state.value }
              onChange={ this.handleChange }
              ref={c => this._form = c} 
              />

            }

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




