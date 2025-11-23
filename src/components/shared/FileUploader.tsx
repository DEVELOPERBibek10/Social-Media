import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";

interface FileUploaderProps {
  fieldChange: (file: File[]) => void;
  mediaUrl?: string;
}

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpg", ".jpeg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center flex-col rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl && file ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={fileUrl}
              alt="image"
              className="h-80 lg:h-[380px] w-full object-cover rounded-3xl"
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col w-full border boder-slate-300 rounded-xl p-7 h-80 lg:h-[512px]">
          <img
            src="https://cdn-icons-png.flaticon.com/128/10402/10402480.png"
            alt="file upload"
            width={88}
            height={60}
          />
          <h3 className="text-base font-medium leading-[140%] text-slate-700 mb-2 mt-6">
            Drag and drop the photo you want to upload
          </h3>
          <p className="text-slate-400 text-sm font-normal leading-[140%] mb-6">
            SVG,PNG,JPG,JPEG
          </p>

          <Button
            type="button"
            className="h-12 bg-blue-300 hover:bg-blue-400 px-5 text-slate-800 cursor-pointer"
          >
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
