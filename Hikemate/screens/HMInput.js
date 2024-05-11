import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';

const HMInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    containerStyle,
    isPhoneInput,
    defaultCode,
    error,
    onEndEditing,
    onBlur,

}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={containerStyle}>
            <Text style={[styles.placeholderText, { color: '#429590' }]}>{label}</Text>
            {isPhoneInput ? (
                <PhoneInput
                    defaultValue={value}
                    initialCountry={defaultCode}
                    defaultCode={defaultCode}
                    onChangeText={onChangeText}
                    containerStyle={styles.phoneInput}
                    onEndEditing={onEndEditing}
                    onBlur={onBlur}
                />
            ) : (
                <View style={styles.passwordInputWrapper}>
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        keyboardType={keyboardType}
                        style={styles.input}
                        onEndEditing={onEndEditing}
                        onBlur={onBlur}
                    />

                    {secureTextEntry && (
                        <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIcon}>
                            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color='#000' />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 4,  
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        height: 55,  
        color: 'black', 
    },
    phoneInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 4,  
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        height: 55,  
        color: '#429590', 
    },
    phoneInputContainer: {
        marginBottom: 10,
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
});

export default HMInput;



