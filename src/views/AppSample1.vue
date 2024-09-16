<template>
    <v-main>
      <input type="file" ref="fileInput" multiple @change="handleFileInputChange">
      <button @click="uploadFiles">Upload Files</button>
      <div v-if="uploadedFiles.length > 0">
        <h2>Uploaded Files:</h2>
        <ul>
          <li v-for="(file, index) in uploadedFiles" :key="index">{{ file.name }}</li>
        </ul>
      </div>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        uploadedFiles: []
      };
    },
    methods: {
      handleFileInputChange() {
        const selectedFiles = this.$refs.fileInput.files;
  
        // Log information about selected files to the console
        for (let i = 0; i < selectedFiles.length; i++) {
          console.log(`Selected File ${i + 1}:`);
          console.log(`Name: ${selectedFiles[i].name}`);
          console.log(`Type: ${selectedFiles[i].type}`);
          console.log(`Size: ${selectedFiles[i].size} bytes`);
          console.log('----------------------');
        }
      },
      uploadFiles() {
        const selectedFiles = this.$refs.fileInput.files;
        const formData = new FormData();
  
        // Append each selected file to FormData
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append('files[]', selectedFiles[i]);
        }
  
        // Simulate file upload using axios (replace this with your actual file upload API call)
        axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          // Update uploadedFiles with the response data or handle as needed
          this.uploadedFiles = response.data.files;
        })
        .catch(error => {
          console.error('Error uploading files:', error);
        });
      }
    }
  };
  </script>