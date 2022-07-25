import { UploadOutlined } from "@ant-design/icons"
import { Button, message, Typography, Upload, UploadProps } from "antd"
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload"
import { MouseEventHandler, useState } from "react"
import { uploadFile } from "../service/upload"

export const MyUploadFile = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [progress, setProgress] = useState(0);

  const handleSubmit: MouseEventHandler<HTMLElement> = async(e) => {  
    e.preventDefault();

    console.log(fileList)
    if (fileList.length===0) message.error("Please choose file first.")
    try {
      let result = await uploadFile(fileList, setProgress)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange: ((info: UploadChangeParam<UploadFile<any>>) => void) = ({fileList}) => {
    setFileList(fileList)
  }
  return (
    <>
      <Typography.Title>Test upload file</Typography.Title>
      <Upload
        beforeUpload={(file: RcFile) => false}
        fileList={fileList}
        maxCount={1}
        onChange={handleChange}
      >
        <Button icon={<UploadOutlined />}>Chọn file</Button>
      </Upload>
      <Button onClick={handleSubmit}>Upload</Button>
    </>
  )
}