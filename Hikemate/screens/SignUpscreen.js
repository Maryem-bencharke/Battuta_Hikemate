import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import HMInput from './HMInput'; 
import validator from 'validator';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
 
const SignUpscreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('MA'); // Default country code
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignUp = async () => {
        let isValid = true;
        var emailValid = false;

        // Username validation
        if (!username.trim()) {
            setUsernameError("Username cannot be empty");
            isValid = false;
        } else if (username.length < 3) {
            setUsernameError("Username should be minimum 3 characters");
        } else {
            setUsernameError('');
        }

        // Email validation
        if (!validator.isEmail(email)) {
            setEmailError("Please enter a valid email");
            isValid = false;
        } else {
            setEmailError("");
            emailValid = true;
        }

        // Phone number validation
        if (!phoneNumber.trim()) {
            setPhoneNumberError("Phone number is required");
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        // Password validation
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (isValid && emailValid) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                if (user) {
                    await set(ref(db, 'users/' + user.uid), {
                        username: username,
                        email: email,
                        phoneNumber: phoneNumber,
                        profilePicture: '' // Placeholder for profile picture if needed
                    });
                    alert('User account created & signed in!');
                    // Reset form
                    setUsername('');
                    setEmail('');
                    setPhoneNumber('');
                    setPassword('');
                    // Navigate to home screen or wherever appropriate
                    navigation.navigate('Login'); // Uncomment and adjust based on your navigation setup
                }
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setEmailError('That email address is already in use!');
                } else if (error.code === 'auth/invalid-email') {
                    setEmailError('That email address is invalid!');
                } else {
                    alert(error.message);
                }
            }
        }
    };

    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <View style={styles.container}>
                    <Image source={require('../assets/logo7.png')} style={styles.logo} />
                </View>
                <Text style={styles.title}>Create an account</Text>
                <HMInput
                    label="Username"
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    containerStyle={styles.inputWrapper}
                />
                {usernameError.length > 0 && <Text style={styles.errorTextStyle}>{usernameError}</Text>}
                <HMInput
                    label="Email address"
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    containerStyle={styles.inputWrapper}
                />
                {emailError.length > 0 && <Text style={styles.errorTextStyle}>{emailError}</Text>}
                <HMInput
                    label="Phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    isPhoneInput
                    defaultCode={countryCode}
                    containerStyle={[styles.inputWrapper, { marginBottom: 10 }]}
                />
                {phoneNumberError.length > 0 && <Text style={styles.errorTextStyle}>{phoneNumberError}</Text>}
                <HMInput
                    label="Password"
                    placeholder="**********"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={!passwordVisible}
                    containerStyle={styles.inputWrapper}
                />
                {passwordError.length > 0 && <Text style={styles.errorTextStyle}>{passwordError}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonTitle}>SignUp</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.push('Login')}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SignUpscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
    },
    inputWrapper: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logo: {
        width: 164,
        height: 43,
        marginBottom: 70,
    },
    buttonTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#429590',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        marginRight: 5,
    },
    loginLink: {
        color: '#429590',
        fontWeight: 'bold',
    },
    errorTextStyle: {
        color: 'red', 
        alignSelf: 'flex-start',
        marginLeft: 5,
        marginTop: 0, 
        fontSize: 12,
    },
});



