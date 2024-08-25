import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [response, setResponse] = useState('');

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        if (isValidJson(jsonInput)) {
            try {
                const result = await axios.post('/bfhl', { data: JSON.parse(jsonInput) });
                setResponse(result.data);
            } catch (error) {
                console.error('Error processing the request:', error);
            }
        } else {
            alert('Invalid JSON input');
        }
    };

    const handleFilterChange = (e) => {
        setFilterOptions([...e.target.selectedOptions].map(option => option.value));
    };

    const filterResponse = () => {
        let filteredResponse = response;
        if (filterOptions.includes('Numbers')) {
            filteredResponse = filteredResponse.filter(item => !isNaN(item));
        }
        if (filterOptions.includes('Alphabets')) {
            filteredResponse = filteredResponse.filter(item => isNaN(item) && item.length === 1);
        }
        if (filterOptions.includes('Highest lowercase alphabet')) {
            const lowercaseAlphabets = filteredResponse.filter(item => item === item.toLowerCase());
            const highestAlphabet = Math.max(...lowercaseAlphabets);
            filteredResponse = [highestAlphabet];
        }
        return filteredResponse.join(',');
    };

    const isValidJson = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{process.env.REACT_APP_ROLL_NUMBER}</h1>
            <input
                type="text"
                value={jsonInput}
                onChange={handleInputChange}
                placeholder='{"data":["A","1","C","3"]}'
                style={styles.input}
            />
            <button onClick={handleSubmit} style={styles.button}>Submit</button>

            {response && (
                <div style={styles.filterContainer}>
                    <select multiple onChange={handleFilterChange} style={styles.select}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>

                    <div style={styles.response}>
                        <strong>Filtered Response:</strong> {filterResponse()}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    filterContainer: {
        marginTop: '20px',
        textAlign: 'left',
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    response: {
        backgroundColor: '#eef',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '10px',
    },
};

export default App;
