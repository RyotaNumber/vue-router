<template>
  <v-main>
    <v-container>
      <v-sheet>
        <v-row>
          <!-- 各写真のサムネイルを表示 -->
          <v-col
            v-for="(photo, index) in photos"
            :key="index"
            cols="2"
            class="flex justify-center align-center"
          >
            <v-img
              :src="photo"
              max-width="150"
              class="my-thumbnail"
              @click="openDialog(index)"
            />
          </v-col>
        </v-row>

        <!-- 拡大画像のダイアログ -->
        <v-dialog
          v-model="showDialog"
          max-width="600px"
          @click:outside="resetCurrentPhotoIndex"
        >
          <v-card>
            <v-img :src="photos[currentPhotoIndex]" />
            <v-card-actions>
              <v-btn color="warning" @click="deletePhoto">
                削除する
              </v-btn>
              <v-btn color="primary" @click="retakePhoto">
                撮影しなおす
              </v-btn>
              <v-btn color="secondary" @click="resetCurrentPhotoIndex">
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
      </v-sheet>
    </v-container>
  </v-main>
  <Footer>
    <div class="d-flex justify-space-evenly">
      <v-btn icon @click="openCamera" class="">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <!-- 5枚まとめてアップロード -->
      <v-btn icon color="success" @click="uploadAllPhotos">
        <v-icon> mdi-upload-multiple </v-icon>
      </v-btn>
    </div>
  </Footer>
</template>

<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {useConfirmDialog} from "@vueuse/core"

export default {
  components: {
    Footer,
  },
  data() {
    return {
      photos: [], // 撮影された写真を格納する配列
      currentPhotoIndex: null, // 現在表示している写真のインデックス
      showDialog: false, // 拡大画像表示用ダイアログの表示制御
    };
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
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
          const base64Image = e.target.result;
          // 再撮影の場合はインデックスの写真を上書き、そうでなければ追加
          if (this.currentPhotoIndex !== null) {
            this.photos[this.currentPhotoIndex] = base64Image;
            this.currentPhotoIndex = null; // インデックスをリセット
          } else {
            this.photos.push(base64Image); // 新しい写真を追加
          }
          this.showDialog = false; // ダイアログを閉じる
        };
        reader.readAsDataURL(file); // Base64形式に変換
      }
    },
    openDialog(index) {
      // サムネイルをクリックしたときに拡大画像を表示
      this.currentPhotoIndex = index;
      this.showDialog = true;
    },
    resetCurrentPhotoIndex() {
      // ダイアログを閉じたときにインデックスをリセット
      this.showDialog = false;
      this.currentPhotoIndex = null;
    },
    retakePhoto() {
      // 再撮影のためにカメラを再度開く
      this.openCamera();
    },
    deletePhoto(){
      this.showDialog = false;
      this.photos.splice(this.currentPhotoIndex,1)
    },
    async uploadAllPhotos() {
      console.log(this.photos);
      return;
      try {
        // 5枚の写真をまとめてアップロード
        await axios.post("https://your-fastapi-server.com/upload", {
          photos: this.photos,
          car_id: 1, // 車両IDを含める
        });
        alert("5枚の写真がアップロードされました");
      } catch (error) {
        console.error("アップロードエラー:", error);
      }
    },
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = ""; // この行がないと警告が表示されません
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
