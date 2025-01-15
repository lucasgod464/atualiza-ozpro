import React, { useState } from 'react';
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://kpfxeuijerwuwqntxypy.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZnhldWlqZXJ3dXdxbnR4eXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzYyNjQsImV4cCI6MjA1MjUxMjI2NH0.rNFKwsZRhH_8aYAJv_nRqCBiYOw19r5EMQNVFd-QG7g';
    const supabase = createClient(supabaseUrl, supabaseKey);

    function App() {
      const [selectedFiles, setSelectedFiles] = useState([]);
      const bucketName = 'zpro-updates'; // Bucket name
      const uploadEndpoint = '/api/upload'; // Placeholder endpoint

      const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
      };

      // Placeholder for upload logic (would be on the server-side)
      const handleUpload = async () => {
        console.log('Uploading files to Supabase Storage bucket:', bucketName);
        console.log('Selected files:', selectedFiles);

        try {
          // Simulate upload using Supabase client (this will not actually upload)
          for (const file of selectedFiles) {
            const { data, error } = await supabase.storage
              .from(bucketName)
              .upload(file.name, file);

            if (error) {
              console.error('Error uploading file:', error);
            } else {
              console.log('File uploaded successfully:', data);
            }
          }

          // Send file metadata to placeholder endpoint
          const response = await fetch(uploadEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bucket: bucketName,
              files: selectedFiles.map(file => ({
                name: file.name,
                type: file.type,
                size: file.size,
              })),
            }),
          });

          if (response.ok) {
            console.log('Files sent to server for upload.');
          } else {
            console.error('Error sending files to server:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending files to server:', error);
        }
      };

      return (
        <div className="admin-container">
          <h1 className="admin-header">ZPRO System Update</h1>
          <div className="file-upload-section">
            <label htmlFor="file-input" className="file-input-label">
              Select Update Files
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="file-list">
            {selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <p>
                    <strong>Name:</strong> {file.name}
                  </p>
                  <p>
                    <strong>Size:</strong> {file.size} bytes
                  </p>
                  <p>
                    <strong>Type:</strong> {file.type}
                  </p>
                </div>
              ))
            ) : (
              <p>No files selected.</p>
            )}
          </div>
          {selectedFiles.length > 0 && (
            <button onClick={handleUpload} className="upload-button">
              Upload to Supabase
            </button>
          )}
        </div>
      );
    }

    export default App;
