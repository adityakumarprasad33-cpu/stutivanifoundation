'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import { Button } from '@/components/ui/button';
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, 
  Heading1, Heading2, Heading3, List, ListOrdered, 
  Quote, Code, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Image as ImageIcon, Link as LinkIcon,
  Table as TableIcon, Undo, Redo
} from 'lucide-react';
import { MediaSelectorDialog } from '@/features/gallery/components/selector/media-selector-dialog';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [mediaSelectorOpen, setMediaSelectorOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
      Youtube.configure({ inline: false }),
      Placeholder.configure({ placeholder: 'Write your story here...' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden bg-white dark:bg-gray-900">
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-1">
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo size={16} />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Bold size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Italic size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <UnderlineIcon size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Strikethrough size={16} />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Heading1 size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Heading2 size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Heading3 size={16} />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <List size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <ListOrdered size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Quote size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <Code size={16} />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <AlignLeft size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <AlignCenter size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <AlignRight size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <AlignJustify size={16} />
        </Button>
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />
        <Button type="button" variant="ghost" size="sm" onClick={() => {
          const url = window.prompt('URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }} className={editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''}>
          <LinkIcon size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setMediaSelectorOpen(true)}>
          <ImageIcon size={16} />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon size={16} />
        </Button>
      </div>
      
      <div className="p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none focus:outline-none min-h-[400px]">
        <EditorContent editor={editor} />
      </div>

      <MediaSelectorDialog
        open={mediaSelectorOpen}
        onOpenChange={setMediaSelectorOpen}
        onSelect={(assets) => {
          assets.forEach(asset => {
            if (asset.assetType === 'IMAGE') {
              editor.chain().focus().setImage({ src: asset.cloudinary?.secureUrl || '' }).run();
            } else if (asset.assetType === 'YOUTUBE') {
              editor.chain().focus().setYoutubeVideo({ src: asset.youtube?.originalUrl || '' }).run();
            }
          });
          setMediaSelectorOpen(false);
        }}
      />
    </div>
  );
}
