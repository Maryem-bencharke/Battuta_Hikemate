import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import HMInput from './HMInput'; 
import validator from 'validator';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Loginscreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigation = useNavigation();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useFocusEffect(
        useCallback(() => {
            setEmail('');
            setPassword('');
            setEmailError('');
            setPasswordError('');
        }, [])
    );

    const handleSubmit = async () => {
        setEmailError("");
        setPasswordError("");

        if (!validator.isEmail(email)) {
            setEmailError("Please enter a valid email");
            return;
        }
        if (password.length < 6) {
            setPasswordError("Password should be at least 6 characters");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in:', userCredential.user);
            navigation.navigate('Map'); 
        } catch (error) {
            console.error('Login error:', error);
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Wrong password. Please try again.");
                    break;
                case 'auth/user-not-found':
                    alert("No user found with this email address.");
                    break;
                case 'auth/invalid-email':
                    alert("The email address is not valid.");
                    break;
                case 'auth/user-disabled':
                    alert("This user has been disabled.");
                    break;
                case 'auth/invalid-credential':
                    alert("Invalid credentials. Please check your email and password.");
                    break;
                default:
                    alert("Login error: " + error.message);
                    break;
            }
        }
    };

    const handleForgotPassword = () => {
        if (!validator.isEmail(email)) {
            alert("Please enter a valid email address to reset password.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Password Reset', 'Check your email to reset your password.');
            })
            .catch(error => {
                alert("Failed to send password reset email: " + error.message);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.inputContainer}>
                <View style={styles.container}>
                    <Image source={require('../assets/logo7.png')} style={styles.logo} />
                </View>
                <Text style={styles.title}>Welcome!👋</Text>
                <HMInput
                    label="Email"
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    containerStyle={styles.inputWrapper}
                />
                {emailError.length > 0 && <Text style={styles.errorTextStyle}>{emailError}</Text>}
                <HMInput
                    label="Password"
                    placeholder="**********"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!passwordVisible}
                    containerStyle={styles.inputWrapper}
                />
                {passwordError.length > 0 && <Text style={styles.errorTextStyle}>{passwordError}</Text>}
                <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>You don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                        <Text style={styles.loginLink}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Loginscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    generalError: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center', 
        marginTop: 10, 
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
    },
    inputWrapper: {
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center', 
    },
    buttonTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
    forgotPassword: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 10,
    },
    logo: {
        width: 164,
        height: 43,
        marginBottom: 100,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        color: '#429590',
    },
    phoneInput: {
        height: 50,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#429590',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
    },
    loginText: {
        marginRight: 5,
    },
    loginLink: {
        color: '#429590',
        fontWeight: 'bold',
    },
    passwordInputWrapper: {
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end', 
        marginVertical: 5, 
    },
    errorTextStyle: {
        color: 'red', 
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 5, 
        fontSize: 14,
    },
});

