import React, {Component} from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Image,
    Text,
    KeyboardAvoidingView,
    Button,
    StatusBar,
    TextInput,
    TouchableOpacity
} from 'react-native';
import wheevyimg from '../../assets/wheevyimg.png';
import {SocialIcon} from 'react-native-elements';
import firebase from 'firebase';
import {Facebook, Location, Permissions} from 'expo';

var config = {
    apiKey: "AIzaSyDBZpFNpgJRoK-EM2QkBGDRI5aTpjIjL0A",
    authDomain: "reactreduxapp-27035.firebaseapp.com",
    databaseURL: "https://reactreduxapp-27035.firebaseio.com",
    projectId: "reactreduxapp-27035",
    storageBucket: "reactreduxapp-27035.appspot.com",
    messagingSenderId: "675941933456"
};
firebase.initializeApp(config);

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'ajkhatibi@nowsoftware.us',
            password: 'akbar1!2',
            locationResults: null
        }
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.LOCATION)
            .then((response) => {
                if (response.status === 'granted') {
                    Location
                        .getCurrentPositionAsync({})
                        .then((response) => {
                            this.setState({locationResults: response.coords})
                            console.log('Second promise reveals location at: ' + JSON.stringify(response, null, 4))
                            Alert.alert(JSON.stringify(this.state.locationResults, null, 4))
                        })
                        .catch((error) => {
                            console.log('second promise error is: ' + error)
                        })
                }
            })
            .catch((error) => {
                console.log('error on the promise: ' + error)
            })
    }

    loginToProfile() {
        console.log('this login to profile function is wokring ' + this.state.username, this.state.password)
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.username, this.state.password)
            .then((response) => {
                this
                    .props
                    .navigator
                    .replace({
                        name: 'Profile'
                    })
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('You are not a user. Please register to login!')
            })
    }

    register(name) {
        this
            .props
            .navigator
            .push({name})
    }

    loginWithFacebook() {
        Facebook
            .logInWithReadPermissionsAsync('192845417924374', {permissions: ['public_profile']})
            .then((response) => {
                switch (response.type) {
                    case 'success':
                        {
                            this
                                .props
                                .navigator
                                .immediatelyResetRouteStack([
                                    {
                                        name: 'Profile',
                                        name: 'Login'
                                    }
                                ])
                        };
                        break;
                    case 'cancel':
                        {
                            Alert.alert('login was canceled')
                        };
                        break;
                    default:
                        {
                            Alert.alert('oopsie, login failed')
                        }

                }
                console.log('login permissions worked with facebook' + response.type)
            })
            .catch((error) => {
                Alert.alert('this button for facebook is not working. ')
            })
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.wheevyimgCon}>
                    <Image style={styles.wheevyimg} source={wheevyimg}/>
                    <Text style={styles.title}>Wheevy</Text>
                    <Text style={styles.paragraph}>The anonymous chat app</Text>
                </View>
                <View style={styles.loginContainer}>
                    <StatusBar barStyle='light-content'/>
                    <TextInput
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='email-address'
                        placeholderTextColor='rgba(255,255,255,0.2)'
                        placeholder='username or email'
                        style={styles.input}/>
                    <TextInput 
                    onSubmitEditing={this.loginToProfile.bind(this)} 
                    onChangeText={(password) => this.setState({password})} 
                    value={this.state.password} 
                    returnKeyType='go' 
                    secureTextEntry 
                    placeholderTextColor='rgba(255,255,255,0.2)' 
                    placeholder='password' 
                    style={styles.input} 
                    />
                    <TouchableOpacity
                        onPress={this
                        .loginToProfile
                        .bind(this)}
                        style={styles.buttonCon}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        onPress={this
                        .loginWithFacebook
                        .bind(this)}/>
                    <Button
                        color='white'
                        title='create an account'
                        onPress={() => this.register('Register')}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    wheevyimg: {
        width: 100,
        height: 100
    },
    wheevyimgCon: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold'
    },
    paragraph: {
        color: 'white'
    },
    loginContainer: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: 'white',
        paddingHorizontal: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
    buttonCon: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        borderRadius: 25
    }
});
