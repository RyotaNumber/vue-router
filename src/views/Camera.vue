<template>
    <v-main>
      <v-row>
        <!-- 各写真のサムネイルを表示 -->
        <v-col
          v-for="(photo, index) in photos"
          :key="index"
          cols="2"
        >
          <v-img
            :src="photo"
            max-width="150"
            class="my-thumbnail"
            @click="openDialog(index)"
          />
        </v-col>
  
        <!-- 写真が5つ未満ならプラスボタンを表示 -->
        <v-col v-if="photos.length < 5" cols="2">
          <v-btn icon @click="openCamera">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
  
      <!-- 拡大画像のダイアログ -->
      <v-dialog v-model="showDialog" max-width="600px">
        <v-card>
          <v-img :src="photos[currentPhotoIndex]" />
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
  import axios from "axios";
  
  export default {
    data() {
      return {
        photos: [], // 撮影された写真を格納する配列
        showDialog: false, // 拡大画像表示用ダイアログの表示制御
        currentPhotoIndex: null, // 現在表示している写真のインデックス
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
            this.photos.push(e.target.result); // Base64データを配列に追加
          };
          reader.readAsDataURL(file); // Base64形式に変換
        }
      },
      openDialog(index) {
        // サムネイルをクリックしたときに拡大画像を表示
        this.currentPhotoIndex = index;
        this.showDialog = true;
      },
      async uploadPhoto() {
        try {
          // 選択された写真をアップロード
          const photo = this.photos[this.currentPhotoIndex];
          await axios.post("https://your-fastapi-server.com/upload", {
            photo: photo,
            car_id: 1, // 車両IDを含める
          });
          alert("写真がアップロードされました");
          this.showDialog = false; // ダイアログを閉じる
        } catch (error) {
          console.error("アップロードエラー:", error);
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
  