import { useEffect, useState } from 'react';

export const CreateGenres = ({ handleCreate, type }) => {
    const [data, setData] = useState({
        name: '',
        code: '',
    });

    const [name, setName] = useState('');

    const conver = () => {};

    useEffect(() => {
        setData(() => {
            return {
                name,
                code: '',
            };
        });
    }, [name]);

    console.log(data);

    return (
        <div className="p-3">
            <div className="mb-3">
                <label className="d-block mb-1">Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="d-block mb-1">Code:</label>
                <input type="text" className="form-control" />
            </div>
            <button
                className="border-0 rounded-3 pt-2 pb-2 bg--primary p-2 mt-4"
                onClick={() => handleCreate(type, data)}
            >
                Add new {type}
            </button>
        </div>
    );
};
