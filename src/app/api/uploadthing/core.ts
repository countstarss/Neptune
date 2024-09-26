'use client'
import { useUser } from "@/hooks/useUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {

      // MARK: Auth
      const user = useUser()
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userDetails?.full_name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId,fileURL:file.url };
    }),
  songUploader: f({ audio: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // MARK: Auth
      const user = useUser()
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.userDetails?.full_name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId,fileURL:file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
