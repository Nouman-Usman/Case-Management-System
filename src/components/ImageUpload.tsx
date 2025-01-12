/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NQSgJV3KCgC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [files, setFiles] = useState([])
  const [isInvalid, setIsInvalid] = useState(false)
  const [scale, setScale] = useState(1)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter((file) => file.type.startsWith("image/"))
    if (validFiles.length !== droppedFiles.length) {
      setIsInvalid(true)
    } else {
      setFiles(validFiles)
      setIsInvalid(false)
    }
  }
  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = selectedFiles.filter((file: File) => file.type.startsWith("image/"))
    if (validFiles.length !== selectedFiles.length) {
      setIsInvalid(true)
    } else {
      setFiles(validFiles)
      setIsInvalid(false)
    }
  }
  const handleZoom = (value) => {
    setScale(value)
    setWidth(files[0].width * value)
    setHeight(files[0].height * value)
  }
  const handleResize = (e) => {
    const newWidth = Math.max(e.target.value, files[0].width)
    setWidth(newWidth)
    setHeight((files[0].height / files[0].width) * newWidth)
    setScale(newWidth / files[0].width)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div
        className="relative w-full max-w-2xl p-8 bg-card rounded-lg shadow-lg"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-md">
          {files.length > 0 ? (
            <div className="relative w-full h-full overflow-hidden" style={{ transform: `scale(${scale})` }}>
              <img
                src="/placeholder.svg"
                alt="Uploaded"
                width={width}
                height={height}
                className="object-contain"
                style={{ aspectRatio: width / height, objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <UploadIcon className="w-12 h-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Drag and drop files here or{" "}
                <label htmlFor="file-input" className="font-medium text-primary cursor-pointer">
                  import
                </label>
              </p>
            </div>
          )}
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
          />
        </div>
        {isInvalid && <div className="mt-4 text-red-500">Only image files are allowed. Please try again.</div>}
        {files.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="zoom">Zoom:</Label>
              <Slider
                id="zoom"
                min={0.5}
                max={2}
                step={0.1}
                value={[scale]}
                onValueChange={handleZoom}
                className="w-full max-w-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="width">Width:</Label>
              <Input
                id="width"
                type="number"
                min={files[0].width}
                value={Math.round(width)}
                onChange={handleResize}
                className="w-24"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}