import { UploadFile } from "antd";
import axios from "axios";

export const uploadFile = async (fileList: UploadFile[], updateProgress: Function) => {
  if (fileList.length===0) throw new Error("fileList length 0.")
  let formData = new FormData();
  formData.append("file", fileList[0].originFileObj!);
  let res = await axios.post(
    "http://localhost:8000/upload", 
    formData, 
    {
      onUploadProgress: (progressEvent: any) => {
        console.log(progressEvent)
      }
    }
  )
  return res
}