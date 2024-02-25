"use client"

import { useCreateUploadFiles } from "@/api"
import Button from "@/components/button/Button"
import FileUpload from "@/components/form/FileUpload"
import Image from "next/image"
import { FormEventHandler, useEffect, useRef, useState } from "react"

export default function Page() {
  const { data, error, mutate, isPending } = useCreateUploadFiles()
  const [files, setFiles] = useState<FileList>()
  const inputFileEl = useRef<HTMLInputElement>(null)
  const submit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    if (files) {
      mutate({ data: { files: Array.from(files ?? []) } })
    }
  }

  useEffect(() => {
    if (data) {
      setFiles(undefined)
    }
  }, [data])

  return (
    <div className="px-5 flex flex-col gap-4">
      <h1 className="text-3xl font-bold mt-4 mb-2">Upload</h1>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mt-4 mb-2">Form</h2>
        <FileUpload
          multiple
          onChange={e => setFiles(e.target.files ?? undefined)}
        />
        <Button type="submit" className="w-48 text-lg" disabled={isPending}>
          Upload
        </Button>
      </form>

      {data && (
        <section>
          <h2 className="text-2xl font-bold mt-4 mb-2">Result</h2>
          <div>
            <h3>Data</h3>
            <ul>
              {(data as { filenames: string[] })?.filenames.map(filename => (
                <div key={filename}>
                  <Image
                    width={100}
                    height={100}
                    src={filename}
                    alt=""
                    className="max-w-full w-96"
                  />
                </div>
              ))}
            </ul>
            <pre className="font-mono">{JSON.stringify(data, null, 2)}</pre>
          </div>
          <div>
            <h3>Error</h3>
            <pre className="font-mono"> {JSON.stringify(error, null, 2)}</pre>
          </div>
        </section>
      )}
    </div>
  )
}
