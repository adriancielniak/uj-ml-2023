import { ChangeEvent, useState } from "react";
import axios, { AxiosResponse } from "../node_modules/axios/index";


const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseInt, setResponseInt] = useState<number | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const response: AxiosResponse<{ result: number }> = await axios.post(
        'http://127.0.0.1:8000/api/image', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const result = response.data.result;
      setResponseInt(result);
      console.log('Upload successful. Response:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

    return(
        <div>
            <h2>Image Upload</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {responseInt !== null && (
        <div>
          <p>Server response: {responseInt}</p>
        </div>
      )}
        </div>
    )
}

export default ImageUpload;