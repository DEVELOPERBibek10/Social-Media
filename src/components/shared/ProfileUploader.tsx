import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";

interface ProfileUploaderProps {
  fieldChange: (file: File[]) => void;
  mediaUrl?: string;
}

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
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
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex items-center gap-6 flex-1 w-full  cursor-pointer">
        <img
          src={
            (file && fileUrl) ||
            "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          }
          alt="user avatar"
          className="h-24 w-24 rounded-full object-cover object-top"
        />
        <span className="text-blue-700 text-base font-normal leading-[140%] md:text-xl md:font-semibold md:tracking-tighter">
          Change profile picture
        </span>
      </div>
    </div>
  );
};

export default ProfileUploader;
