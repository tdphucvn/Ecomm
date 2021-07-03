import React, {useState, useEffect} from 'react'

const App = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const URL = "http://localhost:5000/items";
            const method = {method: 'GET', contentType: 'application/json'};
            fetch(URL, method)
                .then(res => res.json())
                .then(result => console.log(result))
                .catch(err => console.log(err));
        };
        fetchData();
    }, []);

    return (
        <div>
            Hello world
        </div>
    )
}

export default App
