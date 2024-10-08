import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleTherapyButtonClick = () => {
        navigate("/Therapy"); // Navigate to Therapy page
    };

    const handlePlanButtonClick = () => {
        navigate("/request");
    };

    const handleEquipmentButtonClick = () => {
        navigate("/equipments");
    };

    const handleReportButtonClick = () => {
        navigate("/Overview");
    };

    // Get current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    
    // Inline styles for the component
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100vh',
            paddingTop: '20px',
            backgroundColor: '#9BA4BF', // Set background color
        },
        title: {
            marginBottom: '20px'
        },
        dateDisplay: {
            position: 'absolute',
            top: '20px',
            left: '15%',
            transform: 'translateX(-50%)', // Center the date horizontally
            textAlign: 'center',
            fontSize: '18px',
            color: 'black', // Set color to black
            padding: '10px', // Add padding for better spacing
        },
        positionDisplay:{
            position: 'absolute',
            top: '20px',
            left: '85%',
            transform: 'translateX(-50%)', // Center the date horizontally
            textAlign: 'center',
            fontSize: '18px',
            color: 'black', // Set color to black
            padding: '10px', // Add padding for better spacing
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        },
        button: {
            width: '200px',
            backgroundColor: '#6B75FE', // Set button color
            color: 'white', // Set button text color
            border: 'none', // Remove default border
            padding: '10px', // Add some padding
            borderRadius: '5px', // Add border radius for rounded corners
            cursor: 'pointer', // Change cursor on hover
            transition: 'background-color 0.3s', // Smooth background color transition
        },
        buttonHover: {
            backgroundColor: '#5B6BFE' // Darker shade for hover effect
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.dateDisplay}>
                Hello, Hirushi.<br />
                Today is {formattedDate}.
            </div>
            <div style={styles.positionDisplay}>
                W.A.H.Divyanjalie<br/>
                Mobility Support<br/>
                Coordinator
            </div>
            <h1 style={styles.title}>Home</h1>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    onClick={handleTherapyButtonClick}
                >
                    Mobility Therapy Session
                </button>

                <button
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    onClick={handlePlanButtonClick}
                >
                    Mobility Request
                </button>

                <button
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    onClick={handleEquipmentButtonClick}
                >
                    Mobility Equipments
                </button>

                <button
                    style={styles.button}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    onClick={handleReportButtonClick}
                >
                    Overview
                </button>
            </div>
        </div>
    );
}
