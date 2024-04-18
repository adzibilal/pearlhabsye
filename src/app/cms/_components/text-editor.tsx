import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

interface TextEditorProps {
    onChange?: (content: string) => void
    value?: string | undefined | null
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange , value}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something …'
            })
        ],
        content: value ?? '',
        onUpdate: ({ editor }) => {
            onChange && onChange(editor.getHTML())
        }
    })

    return (
        <EditorContent
            className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            editor={editor}
        />
    )
}

export default TextEditor
