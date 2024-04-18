import { UploadCloudIcon } from 'lucide-react'
import { useState, ChangeEvent, useRef } from 'react'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
    onChange?: (imageUrl: string) => void
}

function ImageUploader({ onChange }: ImageUploaderProps): JSX.Element {
    const [image, setImage] = useState<string | null>(null)
    const cloudname = process.env.NEXT_PUBLIC_CLOUDNAME
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = async (file: File) => {
        toast.loading('Uploading image...')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'pearlhabsye')

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            )

            if (!response.ok) {
                throw new Error('Failed to upload image')
            }

            const data = await response.json()
            setImage(data.secure_url)
            if (onChange) {
                onChange(data.secure_url)
            }
            toast.success('Image uploaded successfully')
            setTimeout(() => {
                toast.dismiss()
            }, 1000)
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Failed to upload image')
            setTimeout(() => {
                toast.dismiss()
            }, 1000)
        }
    }

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            handleImageUpload(file)
        }
    }

    return (
        <div>
            <input
                ref={fileInputRef}
                className='hidden'
                type='file'
                onChange={handleInputChange}
            />
            <div
                className='aspect-video w-60 border border-zinc-300 rounded-md flex flex-col items-center justify-center cursor-pointer bg-zinc-50 hover:bg-zinc-100'
                onClick={handleClick}>
                <UploadCloudIcon />
                <p>Upload Image</p>
            </div>
        </div>
    )
}

export default ImageUploader
