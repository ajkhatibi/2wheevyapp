import React, {Component} from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    Button,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            userename: '',
            email: '',
            password: '',
            animating: false
        }
    }

    registerAndGoBack() {
        console.log('this trigger is working: ' + this.state.email, this.state.password)
        setTimeout(() => {
            this.setState({animating: true}),
            10000
        })
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                console.log('register has been successful' + response)
                this
                    .props
                    .navigator
                    .pop()
            })
            .catch((error) => {
                console.log('error on register' + error)
                alert('error on re')
            })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.wrapper}>
                    <ActivityIndicator
                        animating={this.state.animating}
                        size='large'
                        style={styles.loading}
                        white='white'/>
                    <TextInput
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        returnKeyType='next'
                        autoCapitalize='none'
                        placeholderTextColor='rgba(255,255,255,0.2)'
                        placeholder='Choose a username'
                        style={styles.input}/>
                    <TextInput
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        returnKeyType='next'
                        autoCapitalize='none'
                        placeholderTextColor='rgba(255,255,255,0.2)'
                        placeholder='email'
                        style={styles.input}/>
                    <TextInput
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                        returnKeyType='go'
                        secureTextEntry
                        autoCapitalize='none'
                        placeholderTextColor='rgba(255,255,255,0.2)'
                        placeholder='password'
                        style={styles.input}/>
                    <TouchableOpacity
                        onPress={this
                        .registerAndGoBack
                        .bind(this)}
                        style={styles.buttonCon}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        backgroundColor: '#3498db',
        flex: 1,
        justifyContent: 'center',
        padding: 20

    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'

    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: 'white',
        paddingHorizontal: 10
    },
    buttonCon: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
