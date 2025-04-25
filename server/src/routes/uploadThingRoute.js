import { createUploadthing } from "uploadthing/server";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  videoAndImage: f(
    {
      image: {
        maxFileSize: "4MB",
        maxFileCount: 4,
      },
      video: {
        maxFileSize: "16MB",
      },
      blob: { maxFileSize: "8GB", maxFileCount: 10 },
    },
    {
      awaitServerData: true,
      // presignedURLTTL: 10,
      // // Each file will get a unique key (default)
      // getFileHashParts: (file) => [file.name, Date.now()],

      // Uploading the same file will yield the same key
      // getFileHashParts: (file) => [file.name],
      // getFileHashParts: () => ["foo"],
    }
  )
    .middleware(({ files }) => {
      files;
      return {
        uploadedBy: "fake-user-id-213",
      };
    })
    .onUploadError(({ error, fileKey }) => {
      console.log("upload error", { message: error.message, fileKey });
      throw error;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload completed", metadata, file);
      // await new Promise((r) => setTimeout(r, 15000));
      return { foo: "bar", baz: "qux" };
    }),
};
