import React, { useState } from 'react';

    function App() {
      const [selectedFiles, setSelectedFiles] = useState([]);

      const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
      };

      return (
        <div className="admin-container">
          <h1>Admin Page</h1>
          <input type="file" multiple onChange={handleFileChange} />
          <div className="file-list">
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <p><strong>Name:</strong> {file.name}</p>
                <p><strong>Size:</strong> {file.size} bytes</p>
                <p><strong>Type:</strong> {file.type}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default App;
