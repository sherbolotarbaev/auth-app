'use client';

import React from 'react';

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';

import { useRecordVoice } from '@/app/lib/hooks';
import { errorNotification } from '@/app/lib/notification';
import { useChat } from 'ai/react';

import { Message } from '@/app/components/ui/ai';

import {
  // ImageSvg,
  LoadSvg,
  MicrophoneSvg,
  SendSvg,
  StopSvg,
} from '@/public/svg';
import scss from '@/app/components/scss/conversation.module.scss';

const faqs: string[] = ["Who's Sher? 🧐", 'Give some information about Sher'];

export function Conversation() {
  const { recording, audioBlob, startRecording, stopRecording } = useRecordVoice();

  const [error, setError] = React.useState<string | JSX.Element | null>(null);
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [transcoding, setTranscoding] = React.useState<boolean>(false);
  // const [images, setImages] = React.useState<File[] | null>(null);

  const { messages, append, reload, stop, isLoading, input, setInput } = useChat({
    onResponse: async (response) => {
      if (response.status === 401) {
        setError(
          <span
            dangerouslySetInnerHTML={{
              __html: `Please <a href='/login'>log in</a> first.`,
            }}
          />,
        );
      }
    },
  });

  const editor = useEditor({
    autofocus: true,
    editable: true,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Message ChatGPT...',
      }),
      Image.configure({
        inline: true,

        HTMLAttributes: {
          class: 'editor_image',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'editor',
      },
      // handleKeyDown: (view, event) => {
      //   if (event.key === "Backspace" || event.key === "Delete") {
      //     const { state } = view;
      //     const { from, to } = state.selection;
      //     const pos = event.key === "Backspace" ? from : to;
      //     const offset = view.domAtPos(pos).offset;
      //     const node = state.doc.nodeAt(offset);

      //     if (node?.type.name === "image") {
      //       const tr = view.state.tr.delete(from, to);
      //       view.dispatch(tr);

      //       setImages((prevImages) => {
      //         const updatedImages = prevImages ? [...prevImages] : [];
      //         const imageIndex = updatedImages.findIndex(
      //           (img) => img.name === node.attrs.alt
      //         );
      //         if (imageIndex !== -1) {
      //           updatedImages.splice(imageIndex, 1);
      //         }
      //         return updatedImages;
      //       });
      //     }
      //   }
      // },
    },
    onUpdate: ({ editor }) => {
      setInput(editor.getText());
    },
  });

  // const fileInputRef = React.useRef<HTMLInputElement>(null);

  // const setFile = React.useCallback(() => {
  //   if (editor) {
  //     fileInputRef.current?.click();
  //   }
  // }, [editor]);

  // const onImageSelected = React.useCallback(
  //   async (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (
  //       editor &&
  //       e.target.files &&
  //       e.target.files.length > 0 &&
  //       e.target.files.length <= 5
  //     ) {
  //       const files = e.target.files;
  //       const newImages = Array.from(files);

  //       setImages((prevImages) => [...(prevImages || []), ...newImages]);

  //       for (const file of newImages) {
  //         editor
  //           .chain()
  //           .focus()
  //           .setImage({
  //             src: URL.createObjectURL(file),
  //             alt: file.name,
  //             title: file.name,
  //           })
  //           .run();
  //       }
  //     } else if (
  //       (e.target.files && e.target.files.length > 5) ||
  //       (images && images.length >= 5)
  //     ) {
  //       errorNotification("Please select up to 5 images");
  //       e.target.value = "";
  //       return;
  //     }
  //   },
  //   [editor]
  // );

  const newConversation = async (text: string) => {
    if (!text || text.length < 2 || text.length > 8192) {
      errorNotification(`Invalid text for AI: ${text}`);
      return;
    }

    editor?.commands.clearContent();

    setError(null);
    setDisabled(true);

    try {
      append({
        role: 'user',
        content: text,
      });
    } catch (e: any) {
      console.error(e);
      setError('Server Temporarily Unavailable');
    } finally {
      setDisabled(false);
    }
  };

  React.useEffect(() => {
    if (!input || input.length < 1 || input.length > 8192) {
      setDisabled(true);
    } else setDisabled(false);
  }, [input]);

  React.useEffect(() => {
    if (audioBlob) {
      const speechToText = async () => {
        setTranscoding(true);

        try {
          // const transcript =
          // setInput(transcript);
          // editor?.chain().focus().setContent(transcript).run();
        } catch (e: any) {
          console.error(e);
          setError(`Server Temporarily Unavailable: ${e.msg}`);
        } finally {
          setTranscoding(false);
        }
      };

      speechToText();
    }
  }, [audioBlob]);

  return (
    <>
      {messages.length > 0 &&
        messages.map((message, idx) => <Message message={message} key={idx} />)}

      <div className={scss.conversation}>
        {error && (
          <div className={scss.text}>
            <div className={scss.error}>{error}</div>
          </div>
        )}

        <div className={scss.faqs}>
          {faqs.map((faq, idx) => (
            <span
              key={idx}
              className={scss.faq}
              onClick={() => {
                setInput(faq);
                editor?.chain().focus().setContent(faq).run();
              }}
            >
              {faq}
            </span>
          ))}
        </div>

        <div className={scss.form}>
          <div className={scss.icons}>
            {/* <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={true}
            aria-hidden="true"
            disabled={images && images.length >= 5 ? true : false}
            style={{ display: "none" }}
            onChange={onImageSelected}
          />

          <ImageSvg
            className={
              images && images.length >= 5
                ? `${scss.icon} ${scss.disabled}`
                : scss.icon
            }
            style={{ fontSize: "1.45rem" }}
            onClick={setFile}
          /> */}

            {!recording && !transcoding ? (
              <MicrophoneSvg
                className={scss.icon}
                onClick={startRecording}
                style={{ fontSize: '1.55rem', fill: 'var(--accent-5)' }}
              />
            ) : transcoding ? (
              <LoadSvg
                className={`${scss.icon} ${scss.load}`}
                style={{ fontSize: '1.55rem', fill: 'var(--accent-5)' }}
              />
            ) : (
              <StopSvg
                className={scss.icon}
                onClick={stopRecording}
                style={{ fontSize: '1.55rem', fill: 'red' }}
              />
            )}
          </div>

          <EditorContent editor={editor} className={scss.editor} />

          <div className={scss.icons}>
            {disabled && !isLoading ? (
              <SendSvg
                className={`${scss.icon} ${scss.disabled}`}
                style={{
                  fontSize: '1.55rem',
                  fill: 'var(--accent-5)',
                }}
              />
            ) : isLoading ? (
              <LoadSvg
                className={`${scss.icon} ${scss.load}`}
                style={{ fontSize: '1.55rem', fill: 'var(--accent-5)' }}
              />
            ) : (
              <SendSvg
                className={scss.icon}
                style={{
                  fontSize: '1.55rem',
                  fill: 'var(--accent-8)',
                }}
                onClick={() => newConversation(input)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
