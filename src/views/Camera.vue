<template>
    <v-main>
      <v-btn color="primary" @click="openCamera">
        写真を撮影する
      </v-btn>
  
      <!-- サムネイル表示 -->
      <v-img
        v-if="photo"
        :src="photo"
        max-width="150"
        @click="showDialog = true"
        class="my-thumbnail"
      />
  
      <!-- 拡大画像を表示するダイアログ -->
      <v-dialog v-model="showDialog" max-width="600px">
        <v-card>
          <v-img :src="photo" />
          <v-card-actions>
            <v-btn color="primary" @click="uploadPhoto">
              写真をアップロードする
            </v-btn>
            <v-btn color="secondary" @click="showDialog = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- カメラから写真を撮るためのファイル入力 -->
      <input
        ref="cameraInput"
        type="file"
        accept="image/*"
        capture="environment"
        style="display: none"
        @change="onPhotoSelected"
      />
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        photo: null, // Base64エンコードされた画像データ
        showDialog: false, // 拡大画像用ダイアログの表示制御
      };
    },
    methods: {
      openCamera() {
        // カメラを開く
        this.$refs.cameraInput.click();
      },
      onPhotoSelected(event) {
        const file = event.target.files[0];
        if (file) {
          // ファイルをBase64に変換
          const reader = new FileReader();
          reader.onload = (e) => {
            this.photo = e.target.result; // Base64データを保存
          };
          reader.readAsDataURL(file); // Base64形式に変換
        }
      },
      async uploadPhoto() {
        try {
          // Base64形式の写真をFastAPIに送信
          await axios.post('https://your-fastapi-server.com/upload', {
            photo: this.photo,
            car_id: 1, // 車両IDを含める
          });
          alert('写真がアップロードされました');
          this.showDialog = false; // ダイアログを閉じる
        } catch (error) {
          console.error('アップロードエラー:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .my-thumbnail {
    cursor: pointer;
    border: 2px solid #ddd;
    border-radius: 4px;
  }
  </style>
  